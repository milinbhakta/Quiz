using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace quiz_backend.Controllers
{

    public class Credentials
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        readonly UserManager<IdentityUser> userManager;
        readonly SignInManager<IdentityUser> signInManager;


        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {
            SqlConnection connection = new SqlConnection(Global.DatabaseString);

            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var result = await userManager.CreateAsync(user, credentials.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await signInManager.SignInAsync(user, isPersistent: false);

            string token = CreateToken(user);

            JObject jObject = new JObject();
            jObject.Add(new JProperty("token",token));
            jObject.Add(new JProperty("username",user.UserName));

            try
            {
                connection.Open();
                string cmd = "insert into Login values("+ user.Email+","+ credentials.Password+","+ token +")";
                SqlCommand sqlCommand = new SqlCommand(cmd,connection);
                sqlCommand.ExecuteNonQuery();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            JsonResult jsonResult = new JsonResult(jObject);
            return Ok(jsonResult);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var result = await signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);
            if (!result.Succeeded)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(credentials.Email);
            JObject jObject = new JObject();
            jObject.Add(new JProperty("token", CreateToken(user)));
            jObject.Add(new JProperty("username", user.UserName));

            JsonResult jsonResult = new JsonResult(jObject);
            return Ok(jsonResult);
        }

        string CreateToken(IdentityUser user)
        {
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub , user.Id)
            };

            var key = "MIICWwIBAAKBgHIGRfI/OvBaqaRYoTXMts+t/jpvG7u5JYrDDH5bWvh96Nrkjhd0";
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}