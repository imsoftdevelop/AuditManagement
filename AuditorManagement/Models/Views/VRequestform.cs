using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
   

    public partial class VRequestform
    {
        public int RequestKey { get; set; }
        public string RequestId { get; set; }
        public string OwnerId { get; set; }
        public string UserId { get; set; }
        public string Subject { get; set; }
        public string Detail { get; set; }
        public string ContactName { get; set; }
        public string ContactMobilePhone { get; set; }
        public string ContactEmail { get; set; }
        public string Status { get; set; }
        public DateTime? ApproveOn { get; set; }
        public string ApproveBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? RequestDate { get; set; }
        public string ResponseMessage { get; set; }
        public string FullName { get; set; }
        public string StatusName    { get; set; }
        public string ApproveFullName { get; set; }
        public string SubjectName { get; set; }
    }
}
