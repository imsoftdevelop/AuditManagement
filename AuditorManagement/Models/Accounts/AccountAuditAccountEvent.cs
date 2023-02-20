using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditAccountEvent
    {
        public int? AuditEventId { get; set; }
        public int? AuditAccountId { get; set; }
        public string IsEvent { get; set; }
        public string Remark { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string TimeUse { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }

        [NotMapped]
        public Employee CreateData { get; set; }
    }
}
