using System.ComponentModel.DataAnnotations;
using SQLite;
using MaxLengthAttribute = System.ComponentModel.DataAnnotations.MaxLengthAttribute;

namespace JournalGuardian.Models;

public class Category
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    [Required]
    [MaxLength(64)]
    [Unique]
    public string Name { get; set; } = string.Empty;
}
