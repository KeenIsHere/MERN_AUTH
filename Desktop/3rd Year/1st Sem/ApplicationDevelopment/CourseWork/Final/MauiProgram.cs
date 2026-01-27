using JournalGuardian.Data;
using JournalGuardian.Interfaces;
using JournalGuardian.Services;
using JournalGuardian.State;
using Microsoft.Extensions.Logging;
using QuestPDF.Infrastructure;

namespace JournalGuardian;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

		builder.Services.AddMauiBlazorWebView();

		builder.Services.AddSingleton<AppDatabase>();
		builder.Services.AddSingleton<IJournalEntryService, JournalEntryService>();
		builder.Services.AddSingleton<IMetadataService, MetadataService>();
		builder.Services.AddSingleton<IAnalyticsService, AnalyticsService>();
		builder.Services.AddSingleton<ISecurityService, SecurityService>();
		builder.Services.AddSingleton<IExportService, ExportService>();
		builder.Services.AddSingleton<IPreferenceService, PreferenceService>();
		builder.Services.AddScoped<SessionState>();
		builder.Services.AddScoped<ThemeState>();

		QuestPDF.Settings.License = LicenseType.Community;

#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
		builder.Logging.AddDebug();
#endif

		return builder.Build();
	}
}
