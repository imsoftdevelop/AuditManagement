using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditAccount
    {
        public int? AuditAccountId { get; set; }
        public int? FsgroupId { get; set; }
        public int? TrialBalanceId { get; set; }
        public string AccountRefCode { get; set; }
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
        public int? SubFsgroupId { get; set; }
        public DateTime? PrepareDateStart { get; set; }
        public DateTime? PrepareDateEnd { get; set; }
        public int? PrepareTimeUseHour { get; set; }
        public string PrepareRemark { get; set; }
        public DateTime? ReviewedDateStart { get; set; }
        public DateTime? ReviewedDateEnd { get; set; }
        public int? ReviewedTimeUseHour { get; set; }
        public string ReviewedRemark { get; set; }
        public DateTime? AuditorDateStart { get; set; }
        public DateTime? AuditorDateEnd { get; set; }
        public int? AuditorTimeUseHour { get; set; }
        public string AuditorRemark { get; set; }

        public int? PrepareTimeUseMinute { get; set; }
        public int? ReviewedTimeUseMinute { get; set; }
        public int? AuditorTimeUseMinute { get; set; }
        [NotMapped]
        public MasterSubfsgroup SubFSGroup { get; set; }
        [NotMapped]
        public Employee PrepareData { get; set; }
        [NotMapped]
        public Employee ReveiwedData { get; set; }
        [NotMapped]
        public Employee AuditorData { get; set; }

        [NotMapped]
        public AccountTrialbalance TrialBalance { get; set; }
        [NotMapped]
        public AccountAuditAccountReference ReferenceVerify { get; set; }

        [NotMapped]
        public List<AccountAuditAccountReference> References { get; set; }
        [NotMapped]
        public List<AccountAdjustment> Adjustments { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustments { get; set; }

        [NotMapped]
        public List<AccountAuditAccountDoucment> Documents { get; set; }

        [NotMapped]
        public List<AccountAuditAccountConclusion> Conclusions { get; set; }

        [NotMapped]
        public List<AccountAuditAccountAuditissue> Issues { get; set; }

        [NotMapped]
        public List<AccountAuditAccountEvent> Events { get; set; }
    }
}
