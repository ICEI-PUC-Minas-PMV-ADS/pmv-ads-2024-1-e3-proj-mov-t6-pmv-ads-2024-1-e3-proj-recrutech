﻿using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Recommendation : DeletableItem
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public ICollection<UserRecommendation>? UserRecommendations { get; set; }
    }
}

