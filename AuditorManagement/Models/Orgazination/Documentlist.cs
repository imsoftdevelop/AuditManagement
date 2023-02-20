using System;
using System.Collections.Generic;

#nullable disable

namespace Models.Models
{
    public partial class Documentlist
    {
        public string DocumentListId { get; set; }
        public string BranchId { get; set; }
        public string OwnerId { get; set; }
        public string CustomerId { get; set; }
        public string DocumentListCode { get; set; }
        public string UploadType { get; set; }
        public string DocumentStyleId { get; set; }
        public string DocumentTypeId { get; set; }
        public string NameFile { get; set; }
        public string PathFile { get; set; }
        public string Extension { get; set; }
        public decimal? Size { get; set; }
        public string LinkPath { get; set; }
        public string Remark { get; set; }
        public string IsDelete { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
