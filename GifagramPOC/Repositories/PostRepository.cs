using GifagramPOC.Data;
using GifagramPOC.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Post> GetAll()
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .OrderByDescending(p => p.DateCreated)
                .ToList();
        }

        public List<Post> Search(string q)
        {
            return _context.Post
                .Where(p => p.Title.Contains(q) || p.Caption.Contains(q))
                .Include(p => p.UserProfile)
                .OrderByDescending(p => p.DateCreated)
                .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Comments)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Post> GetByUserProfileId(int id)
        {
            return _context.Post.Include(p => p.UserProfile)
                            .Where(p => p.UserProfileId == id)
                            .OrderBy(p => p.Title)
                            .ToList();
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            _context.Post.Remove(post);
            _context.SaveChanges();
        }
    }
}
