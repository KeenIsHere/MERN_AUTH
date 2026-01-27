using System.ComponentModel.DataAnnotations;
using JournalGuardian.Models.Enums;
using SQLite;
using MaxLengthAttribute = System.ComponentModel.DataAnnotations.MaxLengthAttribute;

namespace JournalGuardian.Models;

public class Mood
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    [Required]
    [MaxLength(64)]
    [Unique]
    public string Name { get; set; } = string.Empty;

    [Required]
    public MoodType MoodType { get; set; }
}
