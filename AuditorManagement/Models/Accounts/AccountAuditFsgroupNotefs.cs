using System;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


#nullable disable

namespace Models.Models
{
    public partial class AccountAuditFsgroupNotefs
    {
        public int? AuditNoteFsid { get; set; }
        public int? AuditFsgroupId { get; set; }
        public string AuditNoteFsrefCode { get; set; }
        public string NoteFstype { get; set; }
        public string NoteDetail { get; set; }
        public string IsDelete { get; set; }
        public string IsPrint { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public int? HeaderQty { get; set; }
        
        [NotMapped]
        public List<AccountAuditFsgroupNotefsGet> SubGroups { get; set; }
        [NotMapped]
        public List<AccountAuditFsgroupNotefsTable> Tables { get; set; }
    }
}
