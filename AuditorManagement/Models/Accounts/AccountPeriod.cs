using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountPeriod
    {
        public string PeriodId { get; set; }
        public string PeriodCode { get; set; }
        public string CustomerId { get; set; }
        public string OwnerId { get; set; }
        public string BranchId { get; set; }
        public string Name { get; set; }
        public string PeriodType { get; set; }
        public int? Year { get; set; }
        public int? Quater { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? CustomerReviewDate { get; set; }
        public DateTime? CustomerConfirmDate { get; set; }
        public string CustomerConfirmBy { get; set; }
        public DateTime? AuditConfirmDate { get; set; }
        public string AuditConfirmBy { get; set; }
        public string IsUploadTrial { get; set; }
        public string IsRequestUpload { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string IsMapPeriod { get; set; }
        public string MapPeriodId { get; set; }
        public string Remark { get; set; }
        public int? MapYear { get; set; }
        public string IsAudit { get; set; }
        public DateTime? UploadDate { get; set; }
        public string UploadBy { get; set; }

        public string IsCompleteAudit { get; set; }
        public string IsCompleteAuditBy { get; set; }
        public DateTime? IsCompleteAuditDate { get; set; }
        public string IsCompleteCustomer { get; set; }
        public string IsCompleteCustomerBy { get; set; }
        public DateTime? IsCompleteCustomerDate { get; set; }
        public string ProposalId { get; set; }
        public string SignatureNameFile { get; set; }
        public string SignaturePathFile { get; set; }
        public string SignatureExtension { get; set; }
        public decimal? SignatureSize { get; set; }
        public string ReportSignNameFile { get; set; }
        public string ReportSignPathFile { get; set; }
        public string ReportSignExtension { get; set; }
        public decimal? ReportSignSize { get; set; }
        public string RemarkSignReportDraft { get; set; }

        [NotMapped]
        public Customer Customer { get; set; }

        [NotMapped]
        public Employee UploadData { get; set; }

        [NotMapped]
        public List<AccountTrialbalance> TrialBalance { get; set; }
        [NotMapped]
        public List<AccountAdjustment> Adjustments { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustments { get; set; }
        [NotMapped]
        public List<AccountAuditFsgroup> FSGroups { get; set; }
        [NotMapped]
        public List<AccountAuditFsgroupAssign> FSGroupsAssign { get; set; }
        [NotMapped]
        public List<AccountAuditAccount> Accounts { get; set; }
        [NotMapped]
        public List<Employee> AssignEmps { get; set; }

        [NotMapped]
        public Employee CompleteAuditBy { get; set; }
        [NotMapped]
        public CustomerInviteProfile CompleteCustomerBy { get; set; }

        [NotMapped]
        public List<VDocumentlist> DocumentList { get; set; }

        [NotMapped]
        public List<AccountAuditAccountAuditissue > AuditIssue { get; set; }
    }
}
