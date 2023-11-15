using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class AuditprogramDetail
    {
        public int? Auditprogramid { get; set; }
        public int? Sequence { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public int? AuditprogramDetailid { get; set; }
        public List<AuditprogramDetailUse> DetailUse { get; set; }
    }
}
