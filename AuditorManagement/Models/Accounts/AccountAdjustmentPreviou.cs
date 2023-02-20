using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAdjustmentPreviou
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

        [NotMapped]
        public List<AccountAdjustmentSubPreviou> SubAdjustment { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSubPreviou> SubAdjustmentAgree { get; set; }
        [NotMapped]
        public List<AccountAdjustmentSubPreviou> SubAdjustmentDisagree { get; set; }
    }
}
