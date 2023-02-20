using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditFsgroup
    {
        public int? AuditFsgroupId { get; set; }
        public int? FsgroupId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string IsConclusion { get; set; }
        public string ConclusionDesc { get; set; }
        public string AuditComment { get; set; }
        public string PreparedBy { get; set; }
        public DateTime? PrepareDate { get; set; }
        public string PrepareStatus { get; set; }
        public string ReveiwedBy { get; set; }
        public DateTime? ReveiwedDate { get; set; }
        public string ReveiwedStatus { get; set; }
        public string AuditorBy { get; set; }
        public DateTime? AuditorDate { get; set; }
        public string AuditorStatus { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string PeriodId { get; set; }
        
        [NotMapped]
        public List<AccountAuditFsgroupPolicy> Policys { get; set; }
        [NotMapped]
        public List<AccountAuditFsgroupNotefs> NoteToFS { get; set; }

        [NotMapped]
        public Employee PrepareData { get; set; }
        [NotMapped]
        public Employee ReveiwedData { get; set; }
        [NotMapped]
        public Employee AuditorData { get; set; }
        [NotMapped]
        public List<AccountAuditFsgroupEvent> Events { get; set; }
        [NotMapped]
        public List<AccountAuditFsgroupAssign> Assigns { get; set; }

    }
}
