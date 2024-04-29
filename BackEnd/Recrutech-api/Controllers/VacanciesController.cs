using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Recrutech_api.Model;
using Microsoft.IdentityModel.Tokens;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacanciesController : ControllerBase
    {
        private readonly recrutechDbContext _context;

        public VacanciesController(recrutechDbContext context)
        {
            _context = context;
        }

        // GET: api/Vacancies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vacancy>>> GetVacancies()
        {
            return await _context.Vacancies.ToListAsync();
        }

        // GET: api/Vacancies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vacancy>> GetVacancy(int id)
        {
            var vacancy =  _context.Vacancies.Where(x=> x.Id == id && x.IsActive).FirstOrDefault();

            if (vacancy == null)
            {
                return NotFound();
            }

            return vacancy;
        }

        // PUT: api/Vacancies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacancy(int id, Vacancy vacancy)
        {
            if (id != vacancy.Id)
            {
                return BadRequest();
            }

            _context.Entry(vacancy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacancyExists(id))
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

        // POST: api/Vacancies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vacancy>> PostVacancy(Vacancy vacancy)
        {
            _context.Vacancies.Add(vacancy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacancy", new { id = vacancy.Id }, vacancy);
        }

        // DELETE: api/Vacancies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacancy(int id)
        {
            var vacancy = await _context.Vacancies.FindAsync(id);
            if (vacancy == null)
            {
                return NotFound();
            }

            vacancy.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VacancyExists(int id)
        {
            return _context.Vacancies.Any(e => e.Id == id);
        }
        [HttpPost("CreateVacancies")]
        public async Task<ActionResult<Vacancy>> CreateVacancy([FromBody] VacancyWithUserId vacancyWithUserId)
        {
            // Verifica se o usuário é um recrutador válido
            var user = await _context.Users.FindAsync(vacancyWithUserId.UserId);
            if (user == null || user.IsRecruiter != true)
            {
                return BadRequest("O usuário não é um recrutador válido.");
            }

            var newVacancy = vacancyWithUserId.Vacancy;
            // Atribui o usuário à vaga usando apenas o UserId
            newVacancy.UserId = vacancyWithUserId.UserId;

            _context.Vacancies.Add(newVacancy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacancy", new { id = newVacancy.Id }, newVacancy);
        }
        
        public class VacancyWithUserId
        {
            public Vacancy Vacancy { get; set; }
            public int UserId { get; set; }
        }

    }
}

