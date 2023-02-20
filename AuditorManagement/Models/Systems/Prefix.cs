using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class Prefix
    {
        public int Sid { get; set; }
        public string Prefixs { get; set; }
        public int? Year { get; set; }
        public int? Sequence { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
