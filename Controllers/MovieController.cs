using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DVDMovie.Models;
using Microsoft.EntityFrameworkCore;

namespace DVDMovie.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieController : ControllerBase
    {
        private DataContext dataContext;

        public MovieController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet("{id}")]
        public Movie GetMovie(long id)
        {
            System.Threading.Thread.Sleep(5000);
            Movie result = dataContext.Movies
                             .Include(m => m.Studio).ThenInclude(s => s.Movies)
                             .Include(m => m.Ratings)
                             .FirstOrDefault(m => m.MovieId == id);

            if (result != null)
            {
                if (result.Studio != null)
                {
                    result.Studio.Movies = result.Studio.Movies.Select(s =>
                    new Movie
                    {
                        MovieId = s.MovieId,
                        Name = s.Name,
                        Category = s.Category,
                        Description = s.Description,
                        Price = s.Price
                    });
                }
                if (result.Ratings != null)
                {
                    foreach (Rating rating in result.Ratings)
                    {
                        rating.Movie = null;
                    }
                }
            }
            return result;
        }
    }
}
