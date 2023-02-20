using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class FstopParentFsgroup
    {
        public int FstopId { get; set; }
        public int FsgroupId { get; set; }
        public string IsSystem { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string OwnerId { get; set; }
    }
}
