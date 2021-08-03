using Microsoft.AspNetCore.Mvc;
using DVDMovie.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace DVDMovie.Controllers
{
    [Route("/api/orders")]
    [ApiController]
    public class OrderValuesController : Controller
    {
        private DataContext dataContext;

        public OrderValuesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public IEnumerable<Order> GetOrders()
        {
            return dataContext.Orders.Include(o => o.Movies).Include(o => o.Payment);
        }

        [HttpPost("{id}")]
        public void MarkShipped(long id)
        {
            Order order = dataContext.Orders.Find(id);
            if (order != null)
            {
                order.Shipped = true;
                dataContext.SaveChanges();
            }
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] Order order)
        {
            if (ModelState.IsValid)
            {
                order.OrderId = 0;
                order.Shipped = false;
                order.Payment.Total = GetPrice(order.Movies);

                ProcessPayment(order.Payment);
                if (order.Payment.AuthCode != null)
                {
                    dataContext.Add(order);
                    dataContext.SaveChanges();
                    return Ok(new
                    {
                        orderId = order.OrderId,
                        authCode = order.Payment.AuthCode,
                        amount = order.Payment.Total
                    });
                }
                else
                {
                    return BadRequest("Payment rejected");
                }
            }
            return BadRequest(ModelState);
        }

        private decimal GetPrice(IEnumerable<CartLine> lines)
        {
            IEnumerable<long> ids = lines.Select(l => l.MovieId);
            IEnumerable<Movie> movies = dataContext.Movies.Where(m => ids.Contains(m.MovieId));
            return movies.Select(m => lines.First(l => l.MovieId == m.MovieId).Quantity * m.Price).Sum();
        }

        private void ProcessPayment(Payment payment)
        {
            // integrate your payment system here
            payment.AuthCode = "12345";
        }
    }
}