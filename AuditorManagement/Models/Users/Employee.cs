using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class Employee
    {
        public string EmpId { get; set; }
        public string OwnerId { get; set; }
        public string EmpCode { get; set; }
        public string TitleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string CitizenId { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string MobilePhone { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string FirstNameEn { get; set; }
        public string LastNameEn { get; set; }
        public DateTime? RegisterDate { get; set; }
        public string SignImagePath { get; set; }
        public string Tambol { get; set; }
        public string Amphur { get; set; }
        public string Province { get; set; }
        public string PostCode { get; set; }
        public string MobilePhone1 { get; set; }

        [NotMapped]
        public VUserspermission PermissionData { get; set; }
        [NotMapped]
        public User UserData { get; set; }

        [NotMapped]
        public string FullName { get { return FirstName + ' ' + LastName; } }

        [NotMapped]
        public string FullNameEn { get { return FirstNameEn + ' ' + LastNameEn; } }

        [NotMapped]
        public string PermissionCode { get; set; }

        [NotMapped]
        public string PermissionName { get; set; }
    }
}
