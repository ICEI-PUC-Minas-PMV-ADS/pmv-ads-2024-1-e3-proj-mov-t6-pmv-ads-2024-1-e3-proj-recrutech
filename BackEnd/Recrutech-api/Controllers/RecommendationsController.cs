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

        // GET: api/Recommendations
        [HttpGet("getAllRecommendations")]
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecomendations()
        {
            List<Recommendation> recommendations = await _context.Recomendations.ToListAsync();
            if (recommendations.IsNullOrEmpty())
            { 
            return Ok("Nenhuma recomendação encontrada.");
            }
            return Ok(recommendations);
            //return await _context.Recomendations.Where(x => x.IsActive == true).ToListAsync();
        }

        // GET: api/Recommendations/5
        [HttpGet("getRecommendationsByUser/{UserId}")]
        public async Task<ActionResult<Recommendation>> GetRecommendation(int UserId,[FromQuery] bool? IsProvider = null)
        {
          if (_context.Recomendations == null)
          {
              return NotFound();
          }
            List<Recommendation> recommendationsByUser = new List<Recommendation>();
            User user = await _context.Users.FindAsync(UserId);
            if(user == null)
            {
                return Ok("Usuário não encontrado.");
            }
            if(user.UserRecommendations.IsNullOrEmpty())
            {
                return Ok("Nenhuma recomendação encontrada para este usuário.");
            }
            foreach (UserRecommendation userRecommendation in user.UserRecommendations)
            {
                //recommendationsByUser.Add(IsProvider == null ? userRecommendation.Recommendation
                //                                             : !(bool)userRecommendation.IsProvider && !(bool)IsProvider
                //                                             ? userRecommendation.Recommendation
                //                                             : (bool)userRecommendation.IsProvider && (bool)IsProvider
                //                                             ? userRecommendation.Recommendation : null);
                if (IsProvider == null)
                {
                    recommendationsByUser.Add(userRecommendation.Recommendation); //Todas
                }
                else if (!(bool)userRecommendation.IsProvider && !(bool)IsProvider)
                {
                    recommendationsByUser.Add(userRecommendation.Recommendation); //Recebidas
                }
                else if ((bool)userRecommendation.IsProvider && (bool)IsProvider)
                {
                    recommendationsByUser.Add(userRecommendation.Recommendation); //Fornecidas
                }
            }
            return Ok(recommendationsByUser);
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
        [HttpPost]
        public async Task<ActionResult<Recommendation>> PostRecommendation(Recommendation recommendation)
        {
          if (_context.Recomendations == null)
          {
              return Problem("Entity set 'recrutechDbContext.Recomendations'  is null.");
          }
            _context.Recomendations.Add(recommendation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecommendation", new { id = recommendation.Id }, recommendation);
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
