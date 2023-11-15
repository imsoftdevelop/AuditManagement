using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountPeriodProposal
    {
        public string ProposalId { get; set; }
        public string ProposalCode { get; set; }
        public string OwnerId { get; set; }
        public string ProposalName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpireDate { get; set; }
        public string CustomerId { get; set; }
        public int? AuditHour { get; set; }
        public int? PrepareHour { get; set; }
        public int? ReviewHour { get; set; }
        public int? ManagerHour { get; set; }
        public decimal? ProfitPercent { get; set; }
        public decimal? AuditPercent { get; set; }
        public decimal? AuditAmount { get; set; }
        public decimal? PrepareAmount { get; set; }
        public decimal? ReviewAmount { get; set; }
        public decimal? ManagerAmount { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? AuditAccountAmount { get; set; }
        public decimal? ProfitAccountAmount { get; set; }
        public decimal? GrandTotal { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? CompleteOn { get; set; }
        public string CompleteBy { get; set; }
        public DateTime? ConvertOn { get; set; }
        public string ConvertBy { get; set; }
        public string Section1 { get; set; }
        public string Section2 { get; set; }
        public string Section3 { get; set; }
        public string Section4 { get; set; }
        public string Section1En { get; set; }
        public string Section2En { get; set; }
        public string Section3En { get; set; }
        public string Section4En { get; set; }
        public string ProposalNameEn { get; set; }
        public string Remark { get; set; }
        public string IsStatus { get; set; }
        public decimal? AuditRate { get; set; }
        public decimal? PrepareRate { get; set; }
        public decimal? ReviewRate { get; set; }
        public decimal? ManagerRate { get; set; }

        [NotMapped]
        public Customer Customer { get; set; }
    }
}
