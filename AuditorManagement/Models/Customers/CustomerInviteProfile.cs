using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class CustomerInviteProfile
    {
        public string ProfileId { get; set; }
        public string ProfileCode { get; set; }
        public string TitleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string CitizenId { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string MobilePhone { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string FirstNameEn { get; set; }
        public string LastNameEn { get; set; }
        public string Tambol { get; set; }
        public string Amphur { get; set; }
        public string Province { get; set; }
        public string PostCode { get; set; }
        public string MobilePhone1 { get; set; }

        [NotMapped]
        public string FullName { get { return FirstName + ' ' + LastName; } }
    }
}
