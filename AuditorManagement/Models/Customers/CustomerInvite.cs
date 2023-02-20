using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class CustomerInvite
    {
        public string InviteId { get; set; }
        public DateTime? InviteDate { get; set; }
        public string InviteCode { get; set; }
        public string CustomerId { get; set; }
        public string ContractId { get; set; }
        public string OwnerId { get; set; }
        public string IsAccept { get; set; }
        public DateTime? AcceptDate { get; set; }
        public string Email { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
