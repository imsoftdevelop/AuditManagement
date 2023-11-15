using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class User
    {
        public string UserId { get; set; }
        public string EmpId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? ActiveDate { get; set; }
        public DateTime? ExpireDate { get; set; }
        public string IsGoogle { get; set; }
        public string GoogleTokenId { get; set; }
        public string IsReset { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string UProfileId { get; set; }

        [NotMapped]
        public Employee EmployeeData { get; set; }
        [NotMapped]
        public CustomerInviteProfile ProfileData { get; set; }
        [NotMapped]
        public List<VUserspermission> PermissionData { get; set; }
        [NotMapped]
        public Package PackageData { get; set; }
        [NotMapped]
        public Owner OwnerData { get; set; }
        [NotMapped]
        public List<Branch> BranchData { get; set; }
        [NotMapped]
        public List<Customer> CustomerData { get; set; }
        [NotMapped]
        public List<Userscustomer> UserCustomerData { get; set; }

        [NotMapped]
        public string BranchIdActive { get; set; }
        [NotMapped]
        public string BranchCodeActive { get; set; }
        [NotMapped]
        public string BranchNameActive { get; set; }

        [NotMapped]
        public string PermissionCodeActive { get; set; }
        [NotMapped]
        public string PermissionNameActive { get; set; }

        [NotMapped]
        public string CustomerIdActive { get; set; }
        [NotMapped]
        public string CustomerCodeActive { get; set; }
        [NotMapped]
        public string CustomerNameActive { get; set; }

        [NotMapped]
        public string PeriodIdActive { get; set; }
        [NotMapped]
        public string PeriodCodeActive { get; set; }
        [NotMapped]
        public string PeriodNameActive { get; set; }

        [NotMapped]
        public int? FSGroupIdActive { get; set; }
        [NotMapped]
        public string FSGroupCodeActive { get; set; }
        [NotMapped]
        public string FSGroupNameActive { get; set; }
    }
}
