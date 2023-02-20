using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class CustomerContract
    {
        public string ContractId { get; set; }
        public string CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public DateTime? InviteDate { get; set; }
        public string InviteBy { get; set; }
        public DateTime? AcceptDate { get; set; }
        public string IsAccept { get; set; }
        public string IsInvite { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string OwnerId { get; set; }
        public string BranchId { get; set; }
    }
}
