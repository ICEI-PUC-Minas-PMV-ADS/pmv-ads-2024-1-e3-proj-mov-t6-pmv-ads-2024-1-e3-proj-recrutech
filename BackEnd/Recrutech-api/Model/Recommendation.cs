using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Recommendation
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string? Description { get; set; }
        [JsonIgnore]
        public ICollection<UserRecommendation>? UserRecommendations { get; set; }
    }
}

