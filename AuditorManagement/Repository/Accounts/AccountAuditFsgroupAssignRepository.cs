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
    public class AccountAuditFsgroupAssignRepository : IMauchlyCore.IMauchlyRepository<AccountAuditFsgroupAssign, AuditDataContext>
    {
        public AccountAuditFsgroupAssign Save(AccountAuditFsgroupAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroupAssign>();
                        if (!input.AssignFsid.HasValue)
                        {
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
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

        public AccountAuditFsgroupAssign Delete(AccountAuditFsgroupAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroupAssign>();
                        AccountAuditFsgroupAssign val = otable.Where(a => a.AssignFsid == input.AssignFsid).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล ผู้รับมอบหมาย ในระบบ");

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

        public AccountAuditFsgroupAssign Disabled(AccountAuditFsgroupAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroupAssign>();
                        var ctable = context.Set<Userscustomer>();
                        AccountAuditFsgroupAssign val = otable.Where(a => a.AssignFsid == input.AssignFsid).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล พนักงานที่รับมอบหมาย ในระบบ");

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

        public AccountAuditFsgroupAssign OnDisabled(AccountAuditFsgroupAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroupAssign>();
                        var ctable = context.Set<Userscustomer>();
                        AccountAuditFsgroupAssign val = otable.Where(a => a.AssignFsid == input.AssignFsid).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล พนักงานที่รับมอบหมาย ในระบบ");

                        val.IsActive = Common.IsActive;
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
