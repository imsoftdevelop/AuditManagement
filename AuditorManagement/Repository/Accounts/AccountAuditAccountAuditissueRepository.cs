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
    public class AccountAuditAccountAuditissueRepository : IMauchlyCore.IMauchlyRepository<AccountAuditAccountAuditissue, AuditDataContext>
    {
      
        public AccountAuditAccountAuditissue Save(AccountAuditAccountAuditissue input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountAuditissue>();
                        if (!input.AuditIssueId.HasValue)
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.AuditIssueRefCode = !string.IsNullOrEmpty(input.AuditIssueRefCode ) ? input.AuditIssueRefCode : PrefixRepository.GetDocumentRefIssue(context, input.UpdateBy);
                            input.IsDelete = Common.NoDelete;
                            input.IsStatus = Common.IsIssueWait;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            AccountAuditAccountAuditissue val = otable.Where(a => a.AuditIssueId == input.AuditIssueId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Adjustment ในระบบ");

                            val.Issue = input.Issue;
                            val.Solution = input.Solution;
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

        public AccountAuditAccountAuditissue Delete(AccountAuditAccountAuditissue input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountAuditissue>();
                        AccountAuditAccountAuditissue val = otable.Where(a => a.AuditIssueId == input.AuditIssueId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Issue ในระบบ");

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

        public AccountAuditAccountAuditissue ChangeStatus(AccountAuditAccountAuditissue input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountAuditissue>();
                        AccountAuditAccountAuditissue val = otable.Where(a => a.AuditIssueId == input.AuditIssueId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Issue ในระบบ");

                        val.IsStatus = input.IsStatus;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;

                        if (val.IsStatus == "Complete")
                        {
                            val.CompleteBy = input.UpdateBy;
                            val.CompleteOn = input.UpdatedOn;
                        }

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
