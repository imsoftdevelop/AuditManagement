using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAdjustment
    {
        public string AdjustmentId { get; set; }
        public string PeriodId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string IsAgree { get; set; }
        public string IsPeriod { get; set; }

        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustment { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustmentAgree { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustmentDisagree { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustmentPreviousAgree { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSub> SubAdjustmentPreviousDisagree { get; set; }
    }
}
