using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DVDMovie.Models;


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
            return dataContext.Movies.Find(id);
        }        
    }
}
