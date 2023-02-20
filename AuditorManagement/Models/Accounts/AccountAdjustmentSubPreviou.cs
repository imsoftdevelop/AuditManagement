using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class AccountAdjustmentSubPreviou
    {
        public int? SubAdjustmentId { get; set; }
        public string AdjustmentId { get; set; }
        public string AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AdjustmentType { get; set; }
        public string AdjustmentAgree { get; set; }
        public string AdjustmentModel { get; set; }
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string PeriodId { get; set; }
    }
}
