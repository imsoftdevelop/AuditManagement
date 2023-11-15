using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditAccountConclusion
    {
        public int? ConclusionId { get; set; }
        public int? AuditAccountId { get; set; }
        public string ConclusionRefCode { get; set; }
        public string SequenceAuditProgram { get; set; }
        public string VerifyDesc { get; set; }
        public string ConclusionDesc { get; set; }
        public string IsConclusion { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public int? Auditprogramid { get; set; }
        public int? AuditprogramDetailid { get; set; }

        [NotMapped]
        public Employee CreatedData { get; set; }
        [NotMapped]
        public Auditprogram AuditProgram { get; set; }
    }
}
