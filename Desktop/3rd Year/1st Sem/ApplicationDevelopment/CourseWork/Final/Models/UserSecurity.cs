using System.ComponentModel.DataAnnotations;
using SQLite;
using MaxLengthAttribute = System.ComponentModel.DataAnnotations.MaxLengthAttribute;

namespace JournalGuardian.Models;

public class UserSecurity
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    [Required]
    [MaxLength(256)]
    public string PinHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(256)]
    public string Salt { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
