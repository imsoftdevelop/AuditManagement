using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class MasterHourRate
    {
        public int? HourId { get; set; }
        public string OwnerId { get; set; }
        public decimal? AuditHour { get; set; }
        public decimal? PrepareHour { get; set; }
        public decimal? ReviewHour { get; set; }
        public decimal? ManagerHour { get; set; }
        public string Remark { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
