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
    public class AccountAuditAccountReferenceRepository : IMauchlyCore.IMauchlyRepository<AccountAuditAccountReference, AuditDataContext>
    {

        public List<AccountAuditAccountReference> Save(int AccountAudit, string UpdateBy, List<AccountAuditAccountReference> request)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountReference>();

                        List<AccountAuditAccountReference> References = new List<AccountAuditAccountReference>();
                        References = otable.Where(a => a.AuditAccountId == AccountAudit).ToList();
                        References.ForEach(a => { a.IsDelete = Common.IsDelete; a.UpdateBy = UpdateBy; a.UpdatedOn = DateTime.Now; });

                        foreach (AccountAuditAccountReference input in request)
                        {
                            AccountAuditAccountReference val = new AccountAuditAccountReference();
                            val = References.Where(a => a.TrialBalanceId == input.TrialBalanceId).FirstOrDefault();
                            if (val != null)
                            {
                                val.IsDelete = Common.NoDelete;
                                val.UpdateBy = UpdateBy;
                                val.UpdatedOn = DateTime.Now;
                                context.SaveChanges();
                            }
                            else
                            {
                                input.IsDelete = Common.NoDelete;
                                input.CreatedBy = UpdateBy;
                                input.CreatedOn = DateTime.Now;
                                input.UpdateBy = UpdateBy;
                                input.UpdatedOn =DateTime.Now;
                                context.Add(input);
                                context.SaveChanges();
                            }
                        }
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return request;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public AccountAuditAccountReference Delete(AccountAuditAccountReference input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountReference>();
                        AccountAuditAccountReference val = otable.Where(a => a.AuditReferenceId == input.AuditReferenceId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Reference ในระบบ");

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
