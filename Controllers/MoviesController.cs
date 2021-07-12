﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DVDMovie.Models;
using Microsoft.EntityFrameworkCore;
using DVDMovie.Controllers.BindingTargets;

namespace DVDMovie.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MoviesController : ControllerBase
    {
        private DataContext dataContext;

        public MoviesController(DataContext dataContext)
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

        [HttpGet]
        public IEnumerable<Movie> GetMovies(string category,
                                            string search,
                                            bool related = false)
        {
            IQueryable<Movie> query = dataContext.Movies;

            if (!string.IsNullOrWhiteSpace(category))
            {
                string catLower = category.ToLower();
                query = query.Where(m => m.Category.ToLower().Contains(catLower));
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchLower = search.ToLower();
                query = query.Where(m => m.Name.ToLower().Contains(searchLower) 
                                    || m.Description.ToLower().Contains(searchLower));
            }

            if (related)
            {
                query = query.Include(m => m.Studio).Include(m => m.Ratings);
                List<Movie> data = query.ToList();
                data.ForEach(m =>
                {
                    if (m.Studio != null)
                    {
                        m.Studio.Movies = null;
                    }
                    if (m.Ratings != null)
                    {
                        m.Ratings.ToList().ForEach(r => r.Movie = null);

                    }
                });
                return data;
            }
            return query;
        }

        public IActionResult CreateMovie([FromBody] MovieData mdata) 
        {
            if(ModelState.IsValid) 
            {
                Movie movie = mdata.Movie;
                if(movie.Studio != null && movie.Studio.StudioId != 0)
                {
                    dataContext.Attach(movie);
                }
                dataContext.Add(movie);
                dataContext.SaveChanges();
                return Ok(movie.MovieId);
            }
            return BadRequest(ModelState);
        }
    }
}
