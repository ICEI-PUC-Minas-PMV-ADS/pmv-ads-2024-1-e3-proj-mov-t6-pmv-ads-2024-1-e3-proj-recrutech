using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using Recrutech_api.Model;
using Recrutech_api.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly recrutechDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IGenericUpdateService _GenericUpdateService;

        public UsersController(recrutechDbContext context, IConfiguration configuration, IGenericUpdateService GenericUpdateService)
        {
            _context = context;
            _configuration = configuration;
            _GenericUpdateService = GenericUpdateService;
        }

        // GET: api/Users
        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {

            return await _context.GetAllUsers.ToListAsync();
            
        }

        // GET: api/Users/5
        [HttpGet("getUser/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.GetAllUsers.FirstOrDefaultAsync(x=> x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("createUser")]
        [SwaggerResponse(200, "Created", typeof(Teste))]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpPost("loginWithAuth")]
        public async Task<ActionResult<ReturnUser>> LoginReturnToken([FromBody] UserLoginRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Preencha todos os campos");
            }
            
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email
                                                                && x.Password == request.Senha 
                                                                && x.IsActive);

            if (user == null)
            {
                return BadRequest("Nome de usuário ou senha incorretos");
            }
            return new ReturnUser
            {
                UserId = user.Id,
                jwtToken = GenerateToken(user.Id, user.Email)
            };
        }


        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("UpdateUserRegistration/{id}")]
        public async Task<IActionResult> UpdateUserRegistration(int id,[FromBody] JsonPatchDocument<User> updateUser)
        {
            User userContext = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Id == id);
            await _GenericUpdateService.UpdateObject(updateUser, userContext, id, ModelState);
            return Ok(userContext);
        }

        // DELETE: api/Users/5
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.IsActive = false;
            user.VacanciesOwner.ForEach(x => x.IsActive = false);
            user.Curriculum.IsActive = false;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok("User deleted");
        }


        public class UserLoginRequest
        {
            public string? Email { get; set; }
            public string? Senha { get; set; }
        }

        private string GenerateToken(long Id,string Email)
        {
            var claims = new[]
{
                new Claim("id",Id.ToString()),
                new Claim("email",Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var privateKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:secretKey"]));

            var credentials = new SigningCredentials(privateKey, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddMinutes(10);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["jwt:issuer"],
                audience: _configuration["jwt:audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
          

        }

        public class ReturnUser
        {
            public string? jwtToken { get; set; }
            public long? UserId { get; set; }
        }
    }

    }

