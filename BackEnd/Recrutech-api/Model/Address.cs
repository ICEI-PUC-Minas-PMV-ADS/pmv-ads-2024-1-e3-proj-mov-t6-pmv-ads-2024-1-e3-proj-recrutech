﻿using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Address : DeletableItem
    {
        public int Id { get; set; }
        public string? Cep { get; set; }
        public string? Logradouro { get; set; }
        public string? Complemento { get; set; }
        public string? Bairro { get; set; }
        public string? Localidade { get; set; }
        public string? UF { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

    }
}
