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
    public class CustomerContractRepository : IMauchlyCore.IMauchlyRepository<CustomerContract, AuditDataContext>
    {
        public List<CustomerContract> Get(string OwnerId, string BranchId, string CustomerId)
        {
            try
            {
                List<CustomerContract> response = new List<CustomerContract>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<CustomerContract>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper()
                    && a.CustomerId.ToUpper() == CustomerId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CustomerContract Save(CustomerContract input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerContract>();
                        var  ctable = context.Set<Userscustomer>();
                        if (string.IsNullOrEmpty(input.ContractId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.ContractId = Guid.NewGuid().ToString().ToUpper();
                            input.IsActive = input.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.IsInvite = Common.NoInvite;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            CustomerContract val = otable.Where(a => a.ContractId == input.ContractId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล ผู้ติดต่อ ในระบบ");

                            val.FirstName = input.FirstName;
                            val.LastName = input.LastName;
                            val.Email = input.Email;
                            val.MobilePhone = input.MobilePhone;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            if (val.IsAccept == Common.IsAccept && val.IsInvite == Common.IsInvite)
                            {
                                Userscustomer ucus = new Userscustomer();
                                ucus = ctable.Where(a => a.CustomerId == val.CustomerId).FirstOrDefault();
                                if (ucus != null)
                                {
                                    ucus.IsActive = Common.NoActive;
                                    ucus.UpdatedOn = input.UpdatedOn;
                                    ucus.UpdateBy = input.UpdateBy;
                                    context.SaveChanges();
                                }
                            }
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

        public CustomerContract Disabled(CustomerContract input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerContract>();
                        CustomerContract val = otable.Where(a => a.ContractId == input.ContractId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล ผู้ติดต่อ ในระบบ");

                        val.IsActive = Common.NoActive;
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

        public CustomerContract Delete(CustomerContract input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerContract>();
                        CustomerContract val = otable.Where(a => a.ContractId == input.ContractId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล ผู้ติดต่อ ในระบบ");

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

        public CustomerContract Invite(CustomerContract input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerContract>();
                        var itable = context.Set<CustomerInvite>();
                        CustomerContract val = otable.Where(a => a.ContractId == input.ContractId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล ผู้ติดต่อ ในระบบ");

                        val.IsInvite = Common.IsInvite;
                        val.InviteDate = DateTime.Now;
                        val.InviteBy = input.UpdateBy;
                        val.IsAccept = Common.NoAccept;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();

                        CustomerInvite invite = new CustomerInvite()
                        {
                            InviteId = Guid.NewGuid().ToString().ToUpper(),
                            InviteDate = DateTime.Now.Date,
                            InviteCode = Guid.NewGuid().ToString().Substring(0, 10),
                            CustomerId = val.CustomerId,
                            ContractId = val.ContractId,
                            Email = val.Email,
                            IsAccept = Common.NoAccept,
                            OwnerId = val.OwnerId,
                            UpdatedOn = input.UpdatedOn,
                            UpdateBy = input.UpdateBy,
                            CreatedOn = input.UpdatedOn,
                            CreatedBy = input.UpdateBy
                        };
                        itable.Add(invite);
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
