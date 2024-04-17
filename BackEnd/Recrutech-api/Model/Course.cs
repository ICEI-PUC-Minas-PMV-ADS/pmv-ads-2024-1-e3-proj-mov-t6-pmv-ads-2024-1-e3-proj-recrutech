using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Course : Period
    {
        public int Id { get; set; }
        public string? Institution { get; set; }
        public string? MyCourse { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
