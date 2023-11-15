using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditFsgroupNotefsTable
    {
        public int? AuditNoteFsid { get; set; }
        public int? AuditSubNoteFsid { get; set; }
        public string Description { get; set; }
        public string Header { get; set; }
        public string Column { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string IsUnderline { get; set; }
        
        [NotMapped]
        public List<string> HeaderInput { get; set; }
        [NotMapped]
        public List<string> ColumnInput { get; set; }
    }
}
