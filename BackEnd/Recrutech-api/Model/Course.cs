using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Course : Period
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string? Institution { get; set; }
        public string? MyCourse { get; set; }
    }
}
