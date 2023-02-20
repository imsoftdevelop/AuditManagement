using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class Package
    {
        public string PackageId { get; set; }
        public string PackageCode { get; set; }
        public string PackageName { get; set; }
        public int PackageLevel{ get; set; }
    }
}
