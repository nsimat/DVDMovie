
namespace DVDMovie.Models{
    
    public class CartMovieSelection{

        public long movieId { get; set; }
        public string name { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
    }
}