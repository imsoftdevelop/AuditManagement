using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AuditprogramDetailUse
    {
        public int Auditprogramuseid { get; set; }
        public int? Auditprogramid { get; set; }
        public decimal? Hours { get; set; }
        public string UserId { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string PeriodId { get; set; }
        public int? AuditprogramDetailid { get; set; }
        public int? AuditAccountId { get; set; }
        public int? FsgroupId { get; set; }
        [NotMapped]
        public string PeriodName { get; set; }
        [NotMapped]
        public Employee CreatedData { get; set; }
    }
}
