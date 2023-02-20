using Models;
using Models.Master;
using Models.Models;
using Repository.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Repository
{
    public class BranchRepository : IMauchlyCore.IMauchlyRepository<Branch, AuditDataContext>
    {
        public List<Branch> Get(string OwnerId)
        {
            try
            {
                List<Branch> response = new List<Branch>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Branch>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Parametermodel>();
                        foreach (Branch obj in response)
                        {
                            obj.ParamModel = new Parametermodel();
                            obj.ParamModel = dtable.Where(a => a.Code == obj.Model).FirstOrDefault();
                        }
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Branch> SaveFirst(Branch input)
        {
            try
            {
                List<Branch> response = new List<Branch>();
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Branch>();
                        if (string.IsNullOrEmpty(input.BranchId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.BranchId = Guid.NewGuid().ToString().ToUpper();
                            input.BranchCode = PrefixRepository.GetBranchCode(context, input.UpdateBy);
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }

                        var btable = context.Set<Branch>();
                        response = otable.Where(a => a.OwnerId == input.OwnerId && a.IsDelete == Common.NoDelete).ToList();

                    }
                    scope.Complete();
                }

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Branch Save(Branch input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Branch>();
                        if (string.IsNullOrEmpty(input.BranchId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.BranchId = Guid.NewGuid().ToString().ToUpper();
                            input.BranchCode = PrefixRepository.GetBranchCode(context, input.UpdateBy);
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            Branch val = otable.Where(a => a.BranchId == input.BranchId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล กิจการ ในระบบ");

                            val.BranchCode = input.BranchCode;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.Type = input.Type;
                            val.Model = input.Model;
                            val.TaxId = input.TaxId;
                            val.Description = input.Description;
                            val.Remark = input.Remark;
                            val.RegisterDate = input.RegisterDate;
                            val.Telephone = input.Telephone;
                            val.MobilePhone = input.MobilePhone;
                            val.FaxPhone = input.FaxPhone;
                            val.Email = input.Email;
                            val.WebSite = input.WebSite;
                            val.Address = input.Address;
                            val.AddressEn = input.AddressEn;
                            val.Amphur = input.Amphur;
                            val.AmphurEn = input.AmphurEn;
                            val.Tambol = input.Tambol;
                            val.TambolEn = input.TambolEn;
                            val.Province = input.Province;
                            val.ProvinceEn = input.ProvinceEn;
                            val.PostCode = input.PostCode;
                            val.PostCodeEn = input.PostCodeEn;
                            val.DueStartDate = input.DueStartDate;
                            val.ContractName = input.ContractName;
                            val.ContractPosition = input.ContractPosition;
                            val.ContractMobile = input.ContractMobile;
                            val.ContractMobile1 = input.ContractMobile1;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;
                            input = val;
                        }
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Branch SaveLogo(Branch input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Branch>();
                        Branch val = otable.Where(a => a.BranchId.ToUpper() == input.BranchId.ToUpper() && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล กิจการ ในระบบ");

                        val.LogoPath = input.LogoPath;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        context.SaveChanges();
                        input = val;
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Branch Delete(Branch input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Branch>();
                        Branch val = otable.Where(a => a.BranchId == input.BranchId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล กิจการ ในระบบ");

                        val.IsDelete = Common.IsDelete;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
