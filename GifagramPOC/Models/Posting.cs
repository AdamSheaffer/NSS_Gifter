using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Models
{
    public class Posting
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
        public string UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
