using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class UserRecommendation
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonIgnore]
        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        [JsonIgnore]
        public int? RecommendationId { get; set; }
        public bool? IsProvider { get; set; }
        public Recommendation? Recommendation { get; set; }
       
    }
}
