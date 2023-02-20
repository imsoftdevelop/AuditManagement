using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class FsgroupParentSubfsgroup
    {
        public int FsgroupId { get; set; }
        public int SubFsgroupId { get; set; }
        public string IsSystem { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string OwnerId { get; set; }

        [NotMapped]
        public Fsgroup FSGroup { get; set; }
        [NotMapped]
        public MasterSubfsgroup SubFSGroup { get; set; }
    }
}
