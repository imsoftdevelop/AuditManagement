using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class AuditprogramFsgroup
    {
        public int? SystemId { get; set; }
        public string OwnerId { get; set; }
        public int? FsgroupId { get; set; }
        public int Auditprogramid { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }

        [NotMapped]
        public Auditprogram AuditPrograms { get; set; }
    }
}
