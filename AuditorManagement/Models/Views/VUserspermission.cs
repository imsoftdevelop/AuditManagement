using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class VUserspermission
    {
        public string UserId { get; set; }
        public string PermissionCode { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public string Username { get; set; }
        
    }
}
