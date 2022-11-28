using GameGuidanceAPI.Context;
using GameGuidanceAPI.Helpers;
using GameGuidanceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameGuidanceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GameGuidanceDBContext _authContext;
        public UserController(GameGuidanceDBContext gameGuidanceDBContext)
        {
            _authContext= gameGuidanceDBContext;
        }


        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate ([FromBody] User userObj)
        {
            
            if(userObj == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName && x.Password == userObj.Password);

            if(user == null)
                return NotFound(new {Message = "User Not Found!" });

            return Ok(new { Message = "Login Success!"});
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null )
                return BadRequest();
            //Check username
            if(await CheckUserNameExistAsync(userObj.UserName))
                return BadRequest(new { message = "Username Already Exists!"});
            //Check password Strength


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new { Message = "User Registered"});
        }

        private async Task<bool> CheckUserNameExistAsync(string userName)
            => await _authContext.Users.AnyAsync(x => x.UserName == userName);
        

    }
}
