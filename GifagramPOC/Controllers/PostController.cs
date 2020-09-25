using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GifagramPOC.Data;
using GifagramPOC.Models;
using GifagramPOC.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GifagramPOC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userRepository;

        public PostController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _userRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_postRepository.GetByUserProfileId(id));
        }

        [HttpGet("search")]
        public IActionResult GetByUser(string q)
        {
            return Ok(_postRepository.Search(q));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Post post)
        {
            var currentUser = await GetCurrentUser();
            post.UserProfileId = currentUser.Id;
            post.DateCreated = DateTime.Now;

            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        public async Task<UserProfile> GetCurrentUser()
        {
            var fbuid = User.FindFirstValue("user_id");
            return await _userRepository.GetByFbUid(fbuid);
        }
    }
}
