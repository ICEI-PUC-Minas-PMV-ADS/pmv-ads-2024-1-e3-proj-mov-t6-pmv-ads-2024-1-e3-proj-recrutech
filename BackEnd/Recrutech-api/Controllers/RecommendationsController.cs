using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Recrutech_api.Model;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly recrutechDbContext _context;

        public RecommendationsController(recrutechDbContext context)
        {
            _context = context;
        }

        //// GET: api/Recommendations
        //[HttpGet("getAllRecommendations")]
        //public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecomendations()
        //{
        //    List<Recommendation> recommendations = await _context.Recomendations.ToListAsync();
        //    if (recommendations.IsNullOrEmpty())
        //    { 
        //    return Ok("Nenhuma recomendação encontrada.");
        //    }
        //    return Ok(recommendations);
        //    //return await _context.Recomendations.Where(x => x.IsActive == true).ToListAsync();
        //}

        // GET: api/Recommendations/5
        //[HttpGet("getRecommendationsByUser/{UserId}")]
        //public async Task<ActionResult<Recommendation>> GetRecommendation(int UserId, [FromQuery] bool? IsProvider = null)
        //{
        //    if (_context.Recomendations == null)
        //    {
        //        return NotFound();
        //    }
        //    List<Recommendation> recommendations = await _context.Recomendations.Where(x => x.UserRecommendations.Any(x => x.UserId == UserId)).ToListAsync();
        //    return Ok(recommendations);
        //}

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
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecommendationsByReceiver(long ReceiverId)
        {
            User userReceiver = await _context.GetAllUsers.FirstOrDefaultAsync(user => user.Id == ReceiverId);
            if (userReceiver == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            List<Recommendation> receiverRecommendations = await _context.Recomendations
                .Where(recommendation => recommendation.UserRecommendations.Any(ur => ur.UserId == userReceiver.Id))
                .ToListAsync();

            return Ok(receiverRecommendations);
        }

        // PUT: api/Recommendations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecommendation(int id, Recommendation recommendation)
        {
            if (id != recommendation.Id)
            {
                return BadRequest();
            }

            _context.Entry(recommendation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecommendationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
