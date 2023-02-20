using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditAccountAuditissue
    {
        public int? AuditIssueId { get; set; }
        public int AuditAccountId { get; set; }
        public string AuditIssueRefCode { get; set; }
        public string Issue { get; set; }
        public string Solution { get; set; }
        public string IsStatus { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CompleteOn { get; set; }
        public string CompleteBy { get; set; }

        [NotMapped]
        public Employee CompleteData { get; set; }
    }
}
