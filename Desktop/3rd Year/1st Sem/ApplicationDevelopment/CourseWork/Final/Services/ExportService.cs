using System.Linq;
using JournalGuardian.Data;
using JournalGuardian.Interfaces;
using JournalGuardian.Models;
using JournalGuardian.Models.Common;
using JournalGuardian.Models.Dto;
using Markdig;
using Microsoft.Extensions.Logging;
using Microsoft.Maui.Storage;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using PdfColors = QuestPDF.Helpers.Colors;

namespace JournalGuardian.Services;

public class ExportService : DatabaseServiceBase, IExportService
{
    private readonly IJournalEntryService _journalEntryService;
    private readonly ILogger<ExportService> _logger;

    public ExportService(AppDatabase database, IJournalEntryService journalEntryService, ILogger<ExportService> logger)
        : base(database)
    {
        _journalEntryService = journalEntryService;
        _logger = logger;
    }

    public Task InitializeAsync() => EnsureInitializedAsync();

    public async Task<OperationResult<string>> ExportEntriesAsync(DateTime from, DateTime to)
    {
        try
        {
            await EnsureInitializedAsync();
            await _journalEntryService.InitializeAsync();

            if (from > to)
            {
                return OperationResult<string>.Fail("The end date must be on or after the start date.");
            }

            var normalizedFrom = from.Date;
            var normalizedTo = to.Date;

            var entries = await Connection.Table<JournalEntry>()
                .Where(entry => entry.EntryDate >= normalizedFrom && entry.EntryDate <= normalizedTo)
                .OrderBy(entry => entry.EntryDate)
                .ToListAsync();

            if (entries.Count == 0)
            {
                return OperationResult<string>.Fail("No entries found for the selected range.");
            }

            var details = new List<JournalEntryDetail>();
            foreach (var entry in entries)
            {
                var detail = await _journalEntryService.GetByIdAsync(entry.Id);
                if (detail != null)
                {
                    details.Add(detail);
                }
            }

            var outputPath = Path.Combine(FileSystem.AppDataDirectory, $"Journal_{normalizedFrom:yyyyMMdd}_{normalizedTo:yyyyMMdd}.pdf");
            BuildDocument(details, normalizedFrom, normalizedTo).GeneratePdf(outputPath);

            return OperationResult<string>.Ok(outputPath);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to export journal entries from {From} to {To}", from, to);
            return OperationResult<string>.Fail("Export failed. Check logs for more detail.");
        }
    }

    private static Document BuildDocument(IEnumerable<JournalEntryDetail> details, DateTime from, DateTime to)
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(40);
                page.Size(PageSizes.A4);
                page.PageColor(PdfColors.White);

                page.Header()
                    .Text($"Journal Entries ({from:dd MMM yyyy} - {to:dd MMM yyyy})")
                    .FontSize(20)
                    .SemiBold()
                    .FontColor(PdfColors.Blue.Darken2);

                page.Content().Stack(stack =>
                {
                    foreach (var detail in details)
                    {
                        stack.Item().Column(column =>
                        {
                            column.Spacing(5);
                            column.Item().Text($"{detail.Entry.EntryDate:dddd, dd MMM yyyy}").Bold();
                            column.Item().Text(detail.Entry.Title).FontSize(14);

                            var primaryMood = detail.PrimaryMood?.Name ?? "-";
                            var secondaryMoods = string.Join(", ", detail.SecondaryMoods.Select(m => m.Name));
                            var tags = string.Join(", ", detail.Tags.Select(t => t.Name));

                            column.Item().Text($"Moods: {primaryMood}{(string.IsNullOrWhiteSpace(secondaryMoods) ? string.Empty : $" | Secondary: {secondaryMoods}")}");
                            if (detail.Category != null)
                            {
                                column.Item().Text($"Category: {detail.Category.Name}");
                            }

                            if (!string.IsNullOrWhiteSpace(tags))
                            {
                                column.Item().Text($"Tags: {tags}");
                            }

                            var plainText = Markdown.ToPlainText(detail.Entry.ContentMarkdown);
                            column.Item().Text(plainText).FontSize(11);

                            column.Item()
                                .PaddingTop(10)
                                .PaddingBottom(10)
                                .LineHorizontal(0.5f)
                                .LineColor(PdfColors.Grey.Lighten2);
                        });
                    }
                });
            });
        });
    }
}
