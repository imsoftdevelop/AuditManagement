using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class Owner
    {
        public string OwnerId { get; set; }
        public string EmpId { get; set; }
        public DateTime? RegisterDate { get; set; }
        public DateTime? ExpireDate { get; set; }
        public string PackageId { get; set; }
        public DateTime? LastActivePackage { get; set; }
        public DateTime? ExpirePackage { get; set; }
        public decimal? SpaceCurrent { get; set; }
        public string SpaceCurrentType { get; set; }
        public decimal? SpaceLimit { get; set; }
        public string SpaceLimitType { get; set; }
        public string IsStatusSpace { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
