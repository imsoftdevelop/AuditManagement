using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class Userscustomer
    {
        public string UserId { get; set; }
        public string CustomerId { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
