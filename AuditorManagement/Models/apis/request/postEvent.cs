using System;
using System.Collections.Generic;
using System.Text;

namespace Models.apis.request
{
    public class postEvent
    {
        public int? AuditFsgroupId { get; set; }
        public int? AuditAccountId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string IsStatus { get; set; }
        public string Remark { get; set; }
    }
}
