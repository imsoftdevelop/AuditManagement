using System;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditAccountReference
    {
        public int? AuditReferenceId { get; set; }
        public int AuditAccountId { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public int? AuditReferenceAuditAccountId { get; set; }
        public int? TrialBalanceId { get; set; }
        [NotMapped]
        public AccountTrialbalance TrialBalance { get; set; }
        [NotMapped]
        public AccountAuditAccount AuditAccount { get; set; }
        
    }
}
