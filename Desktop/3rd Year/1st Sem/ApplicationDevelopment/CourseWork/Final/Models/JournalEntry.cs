using System.ComponentModel.DataAnnotations;
using SQLite;
using MaxLengthAttribute = System.ComponentModel.DataAnnotations.MaxLengthAttribute;

namespace JournalGuardian.Models;

public class JournalEntry
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    [Required]
    [MaxLength(128)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string ContentMarkdown { get; set; } = string.Empty;

    [Indexed(Unique = true)]
    public DateTime EntryDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [Required]
    public int PrimaryMoodId { get; set; }

    public int? CategoryId { get; set; }

    public int WordCount { get; set; }
}
