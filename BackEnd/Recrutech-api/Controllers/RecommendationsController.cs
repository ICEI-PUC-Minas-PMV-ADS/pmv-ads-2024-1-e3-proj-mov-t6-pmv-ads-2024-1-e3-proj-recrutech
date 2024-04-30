using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Recrutech_api.Interfaces;
using Recrutech_api.Model;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly recrutechDbContext _context;
        private readonly IGenericUpdateService _GenericUpdateService;

        public RecommendationsController(recrutechDbContext context, IGenericUpdateService GenericUpdateService)
        {
            _context = context;
            _GenericUpdateService = GenericUpdateService;
        }

        [HttpGet("getRecommendationsByProvider/{ProviderId}")]
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecommendationsByProvider(long ProviderId)
        {
            User userProvider = await _context.GetAllUsers.FirstOrDefaultAsync(user => user.Id == ProviderId);
            if (userProvider == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            List<Recommendation> providerRecommendations = await _context.Recomendations
                .Where(recommendation => recommendation.ProviderId == userProvider.Id)
                .ToListAsync();

            return Ok(providerRecommendations);
        }

        [HttpGet("getRecommendationsByReceiver/{ReceiverId}")]
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecommendationsByReceived(long ReceiverId)
        {
            User userReceiver = await _context.GetAllUsers.FirstOrDefaultAsync(user => user.Id == ReceiverId);
            if (userReceiver == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            List<Recommendation> receiverRecommendations = await _context.Recomendations
                .Where(recommendation => recommendation.UserRecommendations.Any(ur => ur.UserId == userReceiver.Id) && recommendation.ProviderId != ReceiverId)
                .ToListAsync();

            return Ok(receiverRecommendations);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("UpdateRecommendation/{recommendationId}")]
        public async Task<IActionResult> UpdateUserRecommendation(int recommendationId,[FromBody] JsonPatchDocument<Recommendation> updateRecommendation,[FromQuery] int providerId)
        {
            if (updateRecommendation == null || providerId == 0 || updateRecommendation == null)
            {
                return BadRequest("Recomendação não encontrada.");
            }

            if (updateRecommendation == null || providerId == 0)
            {
                return BadRequest("Dados de atualização inválidos.");
            }

            if (updateRecommendation.Operations.Any(operation => operation.path != "/description" || operation.op != "replace"))
            {
                return BadRequest("Operação de atualização inválida.");
            }

            if (await _context.Recomendations.FirstOrDefaultAsync(x => x.Id == recommendationId && x.ProviderId == providerId) == null) return BadRequest("Usuário não é o provedor da recomendação selecionada."); 
            
            Recommendation recommendationContext = await _context.Recomendations.FirstOrDefaultAsync(x => x.Id == recommendationId);
            await _GenericUpdateService.UpdateObject(updateRecommendation, recommendationContext, recommendationId, ModelState);
            return Ok(recommendationContext);
        }

        // POST: api/Recommendations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateRecommendation")]
        public async Task<ActionResult<Recommendation>> PostRecommendation([FromBody]Recommendation recommendation, long ReceivedId)
        {
            User userProvider = await _context.GetAllUsers.FirstOrDefaultAsync(user => user.Id == recommendation.ProviderId);
            User userReceived = await _context.GetAllUsers.FirstOrDefaultAsync(user => user.Id == ReceivedId);
            if (userReceived == null || userProvider == null) 
            {
                return BadRequest("Usuário não encontrado.");
            }

            List<UserRecommendation>recommendationsList = new List<UserRecommendation>();
            UserRecommendation providerRecommendation = new UserRecommendation
            {
                UserId = userProvider.Id,
                Recommendation = recommendation
            };


            UserRecommendation receivedRecommendation = new UserRecommendation
            {
                UserId = userReceived.Id,
                Recommendation = recommendation
            }; 
            recommendationsList.Add(providerRecommendation);
            recommendationsList.Add(receivedRecommendation);
            _context.UserRecomendations.AddRange(recommendationsList);


            await _context.SaveChangesAsync();

            return Ok(recommendationsList);
        }

        // DELETE: api/Recommendations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecommendation(int id)
        {
            if (_context.Recomendations == null)
            {
                return NotFound();
            }
            var recommendation = await _context.Recomendations.FindAsync(id);
            if (recommendation == null)
            {
                return NotFound();
            }

            _context.Recomendations.Remove(recommendation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecommendationExists(int id)
        {
            return (_context.Recomendations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
