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
    public class AccountAuditAccountConclusionRepository : IMauchlyCore.IMauchlyRepository<AccountAuditAccountConclusion, AuditDataContext>
    {

        public AccountAuditAccountConclusion Save(AccountAuditAccountConclusion input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountConclusion>();
                        if (!input.ConclusionId.HasValue)
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.ConclusionRefCode = !string.IsNullOrEmpty(input.ConclusionRefCode) ? input.ConclusionRefCode :
                                PrefixRepository.GetAllRefcode(PrefixRepository.Code.REFCON.ToString(), context, input.UpdateBy);
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            AccountAuditAccountConclusion val = otable.Where(a => a.ConclusionId == input.ConclusionId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Adjustment ในระบบ");

                            val.SequenceAuditProgram = input.SequenceAuditProgram;
                            val.VerifyDesc = input.VerifyDesc;
                            val.ConclusionDesc = input.ConclusionDesc;
                            val.IsConclusion= input.IsConclusion;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;
                            //input = val;
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

        public AccountAuditAccountConclusion Delete(AccountAuditAccountConclusion input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountConclusion>();
                        AccountAuditAccountConclusion val = otable.Where(a => a.ConclusionId == input.ConclusionId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Conclusion ในระบบ");

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
