using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBackEnd.Models
{
    public class UserProfile
    {
        public string EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string PermissionCode { get; set; }
        public string PermissionName { get; set; }
    }
}
