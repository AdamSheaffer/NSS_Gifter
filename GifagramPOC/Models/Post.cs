using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Models
{

    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string Caption { get; set; }

        public int? UserProfileId { get; set; }

        public DateTime DateCreated { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
