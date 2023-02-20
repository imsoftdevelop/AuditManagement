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
    public class AccountTrialbalanceRepository : IMauchlyCore.IMauchlyRepository<AccountTrialbalance, AuditDataContext>
    {
        public List<AccountTrialbalance> Save(List<AccountTrialbalance> input, string CustomerId, string PeriodId, string UpdateBy)
        {
            try
            {
                List<AccountTrialbalance> response = new List<AccountTrialbalance>();
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountTrialbalance>();
                        foreach (AccountTrialbalance obj in input)
                        {
                            if (!obj.TrialBalanceId.HasValue)
                            {
                                obj.CustomerId = CustomerId;
                                obj.PeriodId = PeriodId;
                                obj.IsDelete = Common.NoDelete;
                                obj.CreatedBy = obj.UpdateBy = UpdateBy;
                                obj.CreatedOn = obj.UpdatedOn = DateTime.Now;
                                context.Add(obj);
                                context.SaveChanges();
                            }
                            else
                            {
                                AccountTrialbalance tral = new AccountTrialbalance();
                                tral = otable.Where(a => a.TrialBalanceId == obj.TrialBalanceId).FirstOrDefault();
                                if (tral != null)
                                {
                                    tral.FsgroupId = obj.FsgroupId;
                                    tral.PreviousYear = obj.PreviousYear;
                                    tral.UpdatedOn = DateTime.Now;
                                    tral.UpdateBy = UpdateBy;
                                    context.SaveChanges();
                                }
                            }
                        }

                        var ptable = context.Set<AccountPeriod>();
                        AccountPeriod val = new AccountPeriod();
                        val = ptable.Where(a => a.PeriodId == PeriodId && a.CustomerId == CustomerId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล รอบบัญชี");

                        if (val.IsUploadTrial == Common.NoUploadTrial)
                        {
                            val.IsUploadTrial = Common.IsUploadTrial;
                            val.UploadDate = DateTime.Now;
                            val.UploadBy = UpdateBy;
                            context.SaveChanges();
                        }

                        response = otable.Where(a => a.PeriodId == PeriodId && a.CustomerId == CustomerId && a.IsDelete == Common.NoDelete).ToList();
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

        public void Save(AccountTrialbalance input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountTrialbalance>();
                        if (!input.TrialBalanceId.HasValue)
                        {
                            AccountTrialbalance tral = new AccountTrialbalance();
                            tral = otable.Where(a => a.PeriodId == input.PeriodId && a.IsDelete == Common.NoDelete && a.AccountCode == input.AccountCode).FirstOrDefault();
                            if (tral != null)
                            {
                                tral.Amount = input.Amount;
                                tral.UpdatedOn = input.UpdatedOn;
                                tral.UpdateBy = input.UpdateBy;
                            }
                            else
                            {
                                input.IsUpload = Common.NoUploadTrial;
                                input.IsDelete = Common.NoDelete;
                                input.CreatedBy = input.UpdateBy;
                                input.CreatedOn = input.UpdatedOn;
                                context.Add(input);
                            }
                            context.SaveChanges();
                        }
                        else
                        {
                            AccountTrialbalance tral = new AccountTrialbalance();
                            tral = otable.Where(a => a.TrialBalanceId == input.TrialBalanceId).FirstOrDefault();
                            if (tral != null)
                            {
                                tral.FsgroupId = input.FsgroupId;
                                tral.PreviousYear = input.PreviousYear;
                                tral.IsDelete = input.IsDelete;
                                tral.UpdatedOn = input.UpdatedOn;
                                tral.UpdateBy = input.UpdateBy;
                                context.SaveChanges();
                            }
                        }
                    }
                    scope.Complete();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void SaveNoted(AccountTrialbalance input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountTrialbalance>();
                        AccountTrialbalance tral = new AccountTrialbalance();
                        tral = otable.Where(a => a.TrialBalanceId == input.TrialBalanceId).FirstOrDefault();
                        if (tral != null)
                        {
                            tral.Noted = input.Noted;
                            tral.UpdatedOn = input.UpdatedOn;
                            tral.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }
                    }
                    scope.Complete();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
