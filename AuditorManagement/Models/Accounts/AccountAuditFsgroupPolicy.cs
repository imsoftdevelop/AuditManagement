using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditFsgroupPolicy
    {
        public int? AuditPolicyId { get; set; }
        public int? AuditFsgroupId { get; set; }
        public string AuditPolicyRefCode { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
