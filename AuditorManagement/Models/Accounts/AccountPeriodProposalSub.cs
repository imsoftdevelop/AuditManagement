using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class AccountPeriodProposalSub
    {
        public int? SubProposalId { get; set; }
        public string ProposalId { get; set; }
        public string Description { get; set; }
        public decimal? Amount { get; set; }
        public string Unit { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string DescriptionEn { get; set; }
        public string UnitEn { get; set; }
    }
}
