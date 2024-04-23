using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class UserRecommendation : DeletableItem
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public int? RecommendationId { get; set; }
        public bool? IsProvider { get; set; }
        public Recommendation? Recommendation { get; set; }
    }
}
