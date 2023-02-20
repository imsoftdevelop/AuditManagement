﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models.Models
{
    public partial class Branch
    {
        public string BranchId { get; set; }
        public string BranchCode { get; set; }
        public string OwnerId { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public string Type { get; set; }
        public string TaxId { get; set; }
        public string Description { get; set; }
        public DateTime? RegisterDate { get; set; }
        public string Telephone { get; set; }
        public string MobilePhone { get; set; }
        public string FaxPhone { get; set; }
        public string Email { get; set; }
        public string WebSite { get; set; }
        public string Address { get; set; }
        public string AddressEn { get; set; }
        public string Amphur { get; set; }
        public string AmphurEn { get; set; }
        public string Tambol { get; set; }
        public string Province { get; set; }
        public string PostCode { get; set; }
        public DateTime? DueStartDate { get; set; }
        public string LogoPath { get; set; }
        public string IsActive { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public string Model { get; set; }
        public string ContractName { get; set; }
        public string ContractPosition { get; set; }
        public string ContractMobile { get; set; }
        public string ContractMobile1 { get; set; }
        public string Remark { get; set; }
        public string TambolEn { get; set; }
        public string ProvinceEn { get; set; }
        public string PostCodeEn { get; set; }

        [NotMapped]
        public Parametermodel ParamModel { get; set; }
    }
}
