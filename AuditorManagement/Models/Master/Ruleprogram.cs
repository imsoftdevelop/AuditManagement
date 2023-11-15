using Models.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Master
{
    public partial class Ruleprogram
    {
        public int? Ruleprogramid { get; set; }
        public int? Sequence { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public string IsActive { get; set; }
        public string IsSystem { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string OwnerId { get; set; }

        [NotMapped]
        public List<RuleprogramDetail> RuleDetail { get; set; }
    }
}
