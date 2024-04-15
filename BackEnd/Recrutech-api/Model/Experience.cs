using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Experience : Period
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string? Enterprise { get; set; }
        public string? Function { get; set; }
    }
}
