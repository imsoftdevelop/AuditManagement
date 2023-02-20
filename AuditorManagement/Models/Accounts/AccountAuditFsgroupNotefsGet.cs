using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditFsgroupNotefsGet
    {
        public int? AuditNoteFsid { get; set; }
        public int? AuditSubNoteFsid { get; set; }
        public int SubFsgroupId { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
