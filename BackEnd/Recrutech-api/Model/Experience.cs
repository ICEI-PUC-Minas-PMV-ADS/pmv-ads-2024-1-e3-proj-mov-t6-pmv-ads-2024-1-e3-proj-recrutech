using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Experience : Period
    {
        public int Id { get; set; }
        public string? Enterprise { get; set; }
        public string? Function { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
