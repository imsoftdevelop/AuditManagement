using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountTrialbalance
    {
        public int? TrialBalanceId { get; set; }
        public string PeriodId { get; set; }
        public string CustomerId { get; set; }
        public string AccountCode { get; set; }
        public string AccountName { get; set; }
        public int? FsgroupId { get; set; }
        public decimal? Amount { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string IsUpload { get; set; }
        public decimal? PreviousYear { get; set; }
        public string Noted { get; set; }

        [NotMapped]
        public string iserror { get; set; }
        [NotMapped]
        public string error { get; set; }
        [NotMapped]
        public decimal? Debit { get; set; }
        [NotMapped]
        public decimal? Credit { get; set; }
        [NotMapped]
        public decimal? Audit { get; set; }
    }
}
