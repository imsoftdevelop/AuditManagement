using System;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


#nullable disable

namespace Models.Models
{
    public partial class AccountAuditFsgroupAssign
    {
        public int? AssignFsid { get; set; }
        public int? AuditFsgroupId { get; set; }
        public string PeriodId { get; set; }
        public string EmpId { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }

        [NotMapped]
        public Employee EmployeeData { get; set; }
        [NotMapped]
        public string PermissionCode { get; set; }

        [NotMapped]
        public string PermissionName { get; set; }
    }
}
