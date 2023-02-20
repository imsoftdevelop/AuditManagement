using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class VAuditprogramFsgroup
    {
        public int AuditProgramId { get; set; }
        public string OwnerId { get; set; }
        public string AuditProgramCode { get; set; }
        public string AuditProgramName { get; set; }
        public string AuditProgramEn { get; set; }
        public string IsSystem { get; set; }
        public string IsDelete { get; set; }
        public string IsActive { get; set; }
        public int? FsgroupId { get; set; }
        public string FsgroupCode { get; set; }
        public string FsgroupName { get; set; }
        public string FsgroupNameEn { get; set; }
    }
}
