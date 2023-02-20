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
    public class AccountAdjustmentPreviousRepository : IMauchlyCore.IMauchlyRepository<AccountAdjustmentPreviou, AuditDataContext>
    {
        public List<AccountAdjustmentPreviou> Get(string PeriodId)
        {
            try
            {
                List<AccountAdjustmentPreviou> response = new List<AccountAdjustmentPreviou>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountAdjustmentPreviou>();
                    response = otable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.AdjustmentId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<AccountAdjustmentSubPreviou>();
                        foreach (AccountAdjustmentPreviou obj in response)
                        {
                            obj.SubAdjustment = new List<AccountAdjustmentSubPreviou>();
                            obj.SubAdjustment = dtable.Where(a => a.AdjustmentId == obj.AdjustmentId).ToList();
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

        public AccountAdjustmentPreviou GetWithKey(string PeriodId)
        {
            try
            {
                AccountAdjustmentPreviou response = new AccountAdjustmentPreviou();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountAdjustmentPreviou>();
                    response = otable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (response != null)
                    {
                        var dtable = context.Set<AccountAdjustmentSubPreviou>();
                        response.SubAdjustment = new List<AccountAdjustmentSubPreviou>();
                        response.SubAdjustment = dtable.Where(a => a.AdjustmentId == response.AdjustmentId).ToList();
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public AccountAdjustmentPreviou Save(AccountAdjustmentPreviou input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        if (input.SubAdjustment != null && input.SubAdjustment.Count > 0)
                        {
                            input.Debit = input.Credit =  0;
                            input.Debit = input.SubAdjustment.Where(a => a.IsDelete == Common.NoDelete).Sum(a => a.Debit);
                            input.Credit = input.SubAdjustment.Where(a => a.IsDelete == Common.NoDelete).Sum(a => a.Credit);
                        }

                        var otable = context.Set<AccountAdjustmentPreviou>();
                        var atable = context.Set<AccountAdjustmentSubPreviou>();
                        if (string.IsNullOrEmpty(input.AdjustmentId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.AdjustmentId = Guid.NewGuid().ToString().ToUpper();
                            input.Code = !string.IsNullOrEmpty(input.Code ) ? input.Code  : PrefixRepository.GetAccountPeriodCode(context, input.UpdateBy);
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();

                            foreach (AccountAdjustmentSubPreviou obj in input.SubAdjustment)
                            {
                                obj.PeriodId = input.PeriodId;
                                obj.AdjustmentId = input.AdjustmentId;
                                obj.IsDelete = Common.NoDelete;
                                obj.CreatedBy = obj.UpdateBy= input.UpdateBy;
                                obj.CreatedOn = obj.UpdatedOn=input.UpdatedOn;
                                atable.Add(obj);
                                context.SaveChanges();
                            }
                        }
                        else
                        {
                            AccountAdjustmentPreviou val = otable.Where(a => a.AdjustmentId == input.AdjustmentId && a.PeriodId == input.PeriodId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Adjustment ในระบบ");

                            val.Name = input.Name;
                            val.Code = input.Code;
                            val.Description = input.Description;
                            val.Debit = input.Debit;
                            val.Credit = input.Credit;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;
                            //input = val;
                            context.SaveChanges();

                            foreach (AccountAdjustmentSubPreviou obj in input.SubAdjustment)
                            {
                                if (!obj.SubAdjustmentId.HasValue)
                                {
                                    obj.PeriodId = input.PeriodId;
                                    obj.AdjustmentId = input.AdjustmentId;
                                    obj.IsDelete = Common.NoDelete;
                                    obj.CreatedBy = obj.UpdateBy = input.UpdateBy;
                                    obj.CreatedOn = obj.UpdatedOn = input.UpdatedOn;
                                    atable.Add(obj);
                                }
                                else
                                {
                                    AccountAdjustmentSubPreviou sub = new AccountAdjustmentSubPreviou();
                                    sub = atable.Where(a => a.SubAdjustmentId == obj.SubAdjustmentId).FirstOrDefault();
                                    if (sub != null)
                                    {
                                        sub.Debit = obj.Debit;
                                        sub.Credit = obj.Credit;
                                        sub.IsDelete = obj.IsDelete;
                                        sub.UpdateBy = input.UpdateBy;
                                        sub.UpdatedOn = input.UpdatedOn;
                                    }
                                }
                                context.SaveChanges();
                            }
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

        public AccountAdjustmentPreviou Delete(AccountAdjustmentPreviou input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAdjustmentPreviou>();
                        AccountAdjustmentPreviou val = otable.Where(a => a.AdjustmentId == input.AdjustmentId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Adjustment ในระบบ");

                        val.IsDelete = Common.IsDelete;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();

                        var atable = context.Set<AccountAdjustmentSubPreviou>();
                        List<AccountAdjustmentSubPreviou> sub = new List<AccountAdjustmentSubPreviou>();
                        sub = atable.Where(a => a.AdjustmentId == val.AdjustmentId).ToList();
                        foreach (AccountAdjustmentSubPreviou del in sub)
                        {
                            del.IsDelete = Common.IsDelete;
                            del.UpdatedOn = input.UpdatedOn;
                            del.UpdateBy = input.UpdateBy;
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
    }
}
