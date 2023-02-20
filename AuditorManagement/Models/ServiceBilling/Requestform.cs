using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public class RequestformStatus
    {
        public static string WaitingRequest = "10";
        public static string WaitingProcess = "20";
        public static string CancelRequest = "87";
        public static string CompleteRequest = "99";
    }
    public partial class Requestform
    {
        public int? RequestKey { get; set; }
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
    }
}
