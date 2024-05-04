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
using Microsoft.AspNetCore.JsonPatch;
using Recrutech_api.Interfaces;
using Recrutech_api.Helpers;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacanciesController : ControllerBase
    {
        private readonly recrutechDbContext _context;
        private readonly IGenericUpdateService _GenericUpdateService;

        public VacanciesController(recrutechDbContext context, IGenericUpdateService GenericUpdateService)
        {
            _context = context;
            _GenericUpdateService = GenericUpdateService;
        }

        // GET: api/Vacancies
        [HttpGet("GetAllVacancies")]
        public async Task<ActionResult<IEnumerable<Vacancy>>> GetVacancies()
        {
            return await _context.GetAllVacancies.ToListAsync();
        }

        // GET: api/Vacancies/5
        [HttpGet("getVacancieById/{id}")]
        public async Task<ActionResult<Vacancy>> GetVacancy(int id)
        {
            var vacancy = _context.GetAllVacancies.Where(x=> x.Id == id && x.IsActive).FirstOrDefault();

            if (vacancy == null)
            {
                return NotFound();
            }

            return vacancy;
        }

        [HttpGet("getVacanciesFilter")]
        public async Task<ActionResult<List<Vacancy>>> GetVacancyFilter([FromQuery] float min, float max, bool salario = false,
                                            bool estagio = false, bool junior = false, bool pleno = false, bool senior = false, string? local = null)
        {

            List<Vacancy> filteredVacancies = await _context.GetAllVacancies
                 .If(estagio || junior || pleno || senior, x => x.Where(y => (y.Cargo == ECargo.Estagio && estagio ||
                     y.Cargo == ECargo.Junior && junior || y.Cargo == ECargo.Pleno && pleno || y.Cargo == ECargo.Senior && senior)))
                 .If(local != null, x => x.Where(y => y.Location.ToLower().Contains(local.ToLower())))
                 .Where(x => x.Remuneration >= min && x.Remuneration <= max).ToListAsync(); 

            if (salario) filteredVacancies = filteredVacancies.OrderByDescending(x => x.Remuneration).ToList();

            return Ok(filteredVacancies);

        }

        [HttpGet("getVacanciesByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Vacancy>>> GetVacancyByUserId(long userId)
        {
            if (userId == null) {
                return BadRequest("Please provide a valid User Id");
            }
            List<Vacancy> vacancyContext = await _context.GetAllVacancies.Where(x => x.UserId == userId).ToListAsync();
            if (vacancyContext.Count == 0) { return Ok("This user has no vacancies"); }
            return vacancyContext;
        }



        [HttpPatch("updateVacancy/{id}")]
        public async Task<IActionResult> UpdateVacancy(int id, [FromBody] JsonPatchDocument<Vacancy> updateVacancy)
        {
            Vacancy vacancyContext = await _context.GetAllVacancies.FirstOrDefaultAsync(x => x.Id == id);
            if (vacancyContext == null) return BadRequest("Vaga não encontrada na base de dados");
            await _GenericUpdateService.UpdateObject(updateVacancy, vacancyContext, id, ModelState);
            return Ok(vacancyContext);
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

        [HttpPost("CreateVacancies")]
        public async Task<ActionResult<Vacancy>> CreateVacancy([FromBody] Vacancy vacancy)
        {
            var user = await _context.Users.FindAsync(vacancy.UserId);
            if (user == null || user.IsRecruiter != true)
            {
                return BadRequest("O usuário não é um recrutador válido.");
            }

            _context.Vacancies.Add(vacancy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacancy", new { id = vacancy.Id }, vacancy);
        }

        [HttpPost("ApplyCvToVacancy")]
        public async Task<ActionResult<Vacancy>> ApplyCvToVacancy([FromQuery] int vacancyId, int cvId)
        {

            Vacancy vacancy = await _context.GetAllVacancies.FirstOrDefaultAsync(x => x.Id == vacancyId);
            Curriculum curriculum = await _context.GetAllCvs.FirstOrDefaultAsync(x => x.Id == cvId);
            if (vacancy == null || curriculum == null) return BadRequest("Vaga ou curriculo não encontrado na base de dados");
            vacancy.Cvs.Add(curriculum);

            _context.Entry(vacancy).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok("Curriculo aplicado com sucesso");
        }

    }
}

