using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DVDMovie.Models
{
    public class Order
    {
        [BindNever]
        public long OrderId { get; set; }
        [Required]
        public string Name { get; set; }
        public IEnumerable<CartLine> Movies { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public Payment Payment { get; set; }
        [BindNever]
        public bool Shipped { get; set; } = false;

    }

    public class Payment
    {

        [BindNever]
        public long PaymentId { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public string CardExpiry { get; set; }
        [Required]
        public string CardSecurityCode { get; set; }
        [BindNever]
        [Column(TypeName = "decimal(8,2)")]
        public decimal Total { get; set; }
        [BindNever]
        public string AuthCode { get; set; }
    }

    public class CartLine
    {
        [BindNever]
        public long CartLineId { get; set; }
        [Required]
        public long MovieId { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
