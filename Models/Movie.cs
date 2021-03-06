using System.Collections.Generic;

namespace DVDMovie.Models{
    public class Movie{
        public long MovieId { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public Studio Studio { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }
}