using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AccountAuditAccountDoucment
    {
        public int? DocumentRefId { get; set; }
        public int AuditAccountId { get; set; }
        public string DocumentListId { get; set; }
        public string DocumentRefCode { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }

        [NotMapped]
        public VDocumentlist Document { get; set; }
    }
}
