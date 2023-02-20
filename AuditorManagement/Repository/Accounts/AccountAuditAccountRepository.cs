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
    public class AccountAuditAccountRepository : IMauchlyCore.IMauchlyRepository<AccountAuditAccount, AuditDataContext>
    {
        public AccountAuditAccount GetWithKey(int AuditAccountId)
        {
            try
            {
                AccountAuditAccount response = new AccountAuditAccount();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountAuditAccount>();
                    response = otable.Where(a => a.AuditAccountId == AuditAccountId).FirstOrDefault();

                    if (response != null)
                    {
                        var ttable = context.Set<AccountTrialbalance>();
                        var adtable = context.Set<AccountAdjustment>();
                        var adstable = context.Set<AccountAdjustmentSub>();
                        var auatable = context.Set<AccountAuditAccount>();
                        var ustable = context.Set<User>();
                        var etable = context.Set<Employee>();
                        var rftable = context.Set<AccountAuditAccountReference>();

                        if (!string.IsNullOrEmpty(response.PreparedBy))
                        {
                            User user = new User();
                            user = ustable.Where(a => a.UserId == response.PreparedBy).FirstOrDefault();

                            response.PrepareData = new Employee();
                            response.PrepareData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                        }

                        if (!string.IsNullOrEmpty(response.ReveiwedBy))
                        {
                            User user = new User();
                            user = ustable.Where(a => a.UserId == response.ReveiwedBy).FirstOrDefault();

                            response.ReveiwedData = new Employee();
                            response.ReveiwedData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                        }

                        if (!string.IsNullOrEmpty(response.AuditorBy))
                        {
                            User user = new User();
                            user = ustable.Where(a => a.UserId == response.AuditorBy).FirstOrDefault();

                            response.AuditorData = new Employee();
                            response.AuditorData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                        }

                        response.TrialBalance = new AccountTrialbalance();
                        response.TrialBalance = ttable.Where(a => a.TrialBalanceId == response.TrialBalanceId && a.IsDelete == Common.NoDelete).FirstOrDefault();

                        response.ReferenceVerify = new AccountAuditAccountReference();
                        response.ReferenceVerify = rftable.Where(a => a.AuditReferenceAuditAccountId == response.AuditAccountId && a.IsDelete == Common.NoDelete).FirstOrDefault();
                        if (response.ReferenceVerify != null)
                        {
                            response.ReferenceVerify.AuditAccount = new AccountAuditAccount();
                            response.ReferenceVerify.AuditAccount = otable.Where(a => a.AuditAccountId == response.ReferenceVerify.AuditAccountId ).FirstOrDefault();
                        }

                        response.References = new List<AccountAuditAccountReference>();
                        response.References = rftable.Where(a => a.AuditAccountId == response.AuditAccountId && a.IsDelete == Common.NoDelete).ToList();
                        if (response.References?.Any() ?? false)
                        {
                            foreach (AccountAuditAccountReference refs in response.References)
                            {
                                refs.TrialBalance = new AccountTrialbalance();
                                refs.TrialBalance = ttable.Where(a => a.TrialBalanceId == refs.TrialBalanceId && a.IsDelete == Common.NoDelete).FirstOrDefault();
                            }
                        }

                        response.SubAdjustments = new List<AccountAdjustmentSub>();
                        response.SubAdjustments = adstable.Where(a => a.PeriodId == response.PeriodId && a.IsDelete == Common.NoDelete
                        && a.AccountCode == response.TrialBalance.AccountCode
                        && a.AdjustmentPeriod == "Current").OrderBy(a => a.CreatedOn).ToList();
                        if (response.SubAdjustments != null && response.SubAdjustments.Count > 0)
                        {
                            string[] adjustid = response.SubAdjustments.ConvertAll(a => a.AdjustmentId).ToArray();
                            response.Adjustments = adtable.Where(a => adjustid.Contains(a.AdjustmentId)).ToList();
                        }

                        if (response.Adjustments != null && response.Adjustments.Count > 0)
                        {
                            foreach (AccountAdjustment obj in response.Adjustments)
                            {
                                obj.SubAdjustment = new List<AccountAdjustmentSub>();
                                obj.SubAdjustment = adstable.Where(a => a.PeriodId == response.PeriodId && a.AdjustmentId == obj.AdjustmentId && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();
                            }
                        }

                        var dtable = context.Set<AccountAuditAccountDoucment>();
                        response.Documents = new List<AccountAuditAccountDoucment>();
                        response.Documents = dtable.Where(a => a.AuditAccountId == response.AuditAccountId && a.IsDelete == Common.NoDelete).OrderBy(a => a.CreatedOn).ToList();

                        var dstable = context.Set<VDocumentlist>();
                        foreach (AccountAuditAccountDoucment fs in response.Documents)
                        {
                            fs.Document = new VDocumentlist();
                            fs.Document = dstable.Where(a => a.DocumentListId == fs.DocumentListId && a.IsDelete == Common.NoDelete).FirstOrDefault();
                        }

                        var actable = context.Set<AccountAuditAccountConclusion>();
                        response.Conclusions = new List<AccountAuditAccountConclusion>();
                        response.Conclusions = actable.Where(a => a.AuditAccountId == response.AuditAccountId && a.IsDelete == Common.NoDelete).OrderBy(a => a.CreatedOn).ToList();

                        foreach (AccountAuditAccountConclusion issue in response.Conclusions)
                        {
                            if (!string.IsNullOrEmpty(issue.CreatedBy))
                            {
                                User user = new User();
                                user = ustable.Where(a => a.UserId == issue.CreatedBy).FirstOrDefault();

                                issue.CreatedData = new Employee();
                                issue.CreatedData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                            }
                        }

                        var istable = context.Set<AccountAuditAccountAuditissue>();
                        response.Issues = new List<AccountAuditAccountAuditissue>();
                        response.Issues = istable.Where(a => a.AuditAccountId == response.AuditAccountId && a.IsDelete == Common.NoDelete).OrderBy(a => a.CreatedOn).ToList();

                        foreach (AccountAuditAccountAuditissue issue in response.Issues)
                        {
                            if (!string.IsNullOrEmpty(issue.CompleteBy))
                            {
                                User user = new User();
                                user = ustable.Where(a => a.UserId == issue.CompleteBy).FirstOrDefault();

                                issue.CompleteData = new Employee();
                                issue.CompleteData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                            }
                        }

                        var evtable = context.Set<AccountAuditAccountEvent>();
                        response.Events = new List<AccountAuditAccountEvent>();
                        response.Events = evtable.Where(a => a.AuditAccountId == response.AuditAccountId).OrderByDescending(a => a.CreatedOn).ToList();

                        foreach (AccountAuditAccountEvent issue in response.Events)
                        {
                            if (!string.IsNullOrEmpty(issue.CreatedBy))
                            {
                                User user = new User();
                                user = ustable.Where(a => a.UserId == issue.CreatedBy).FirstOrDefault();

                                issue.CreateData = new Employee();
                                issue.CreateData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                            }
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

        public void Save(AccountAuditAccount input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccount>();

                        AccountAuditAccount val = new AccountAuditAccount();
                        val = otable.Where(a => a.AuditAccountId == input.AuditAccountId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Sub Lead ในระบบ");

                        val.AuditComment = input.AuditComment;
                        val.SubFsgroupId = input.SubFsgroupId;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        context.SaveChanges();
                    }
                    scope.Complete();
                }
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
                            input.IsUpload = Common.NoUploadTrial;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
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

        public void Save(AccountAuditAccount input, string Role, AccountAuditAccountEvent Events)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccount>();
                        var etable = context.Set<AccountAuditAccountEvent>();

                        AccountAuditAccount val = new AccountAuditAccount();
                        val = otable.Where(a => a.AuditAccountId == input.AuditAccountId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Sub Lead ในระบบ");

                        if (Role == "Account1")
                        {
                            if (input.PrepareStatus == Common.IsStatusWorkflowComfirm)
                            {
                                val.PrepareDateStart = input.PrepareDateStart;
                                val.PrepareDateEnd = input.PrepareDateEnd;
                                val.PrepareTimeUseHour = input.PrepareTimeUseHour;
                                val.PrepareTimeUseMinute = input.PrepareTimeUseMinute;
                            }
                            val.PreparedBy = input.PreparedBy;
                            val.PrepareDate = input.PrepareDate;
                            val.PrepareStatus = input.PrepareStatus;
                            val.PrepareRemark = input.PrepareRemark;
                        }
                        else if (Role == "Account2")
                        {
                            if (input.ReveiwedStatus == Common.IsStatusWorkflowComfirm)
                            {
                                val.ReviewedDateStart = input.ReviewedDateStart;
                                val.ReviewedDateEnd = input.ReviewedDateEnd;
                                val.ReviewedTimeUseHour = input.ReviewedTimeUseHour;
                                val.ReviewedTimeUseMinute = input.ReviewedTimeUseMinute;
                            }
                            val.ReveiwedBy = input.ReveiwedBy;
                            val.ReveiwedDate = input.ReveiwedDate;
                            val.ReveiwedStatus = input.ReveiwedStatus;
                            val.ReviewedRemark = input.ReviewedRemark;
                        }
                        else if (Role == "Audit")
                        {
                            if (input.AuditorStatus == Common.IsStatusWorkflowComfirm)
                            {
                                val.AuditorDateStart = input.AuditorDateStart;
                                val.AuditorDateEnd = input.AuditorDateEnd;
                                val.AuditorTimeUseHour = input.AuditorTimeUseHour;
                                val.AuditorTimeUseMinute = input.AuditorTimeUseMinute;
                            }
                            val.AuditorBy = input.AuditorBy;
                            val.AuditorDate = input.AuditorDate;
                            val.AuditorStatus = input.AuditorStatus;
                            val.AuditorRemark = input.AuditorRemark;
                        }
                        else if (Role == "Manager")
                        {
                            val.AuditorBy = input.AuditorBy;
                            val.AuditorDate = input.AuditorDate;
                            val.AuditorStatus = input.AuditorStatus;
                        }

                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        context.SaveChanges();

                        etable.Add(Events);
                        context.SaveChanges();

                        if (Common.IsStatusWorkflowBack == Events.IsEvent)
                        {
                            var fstable = context.Set<AccountAuditFsgroup>();
                            var fsetable = context.Set<AccountAuditFsgroupEvent>();

                            AccountAuditFsgroup Fsgroup = new AccountAuditFsgroup();
                            Fsgroup = fstable.Where(a => a.FsgroupId == val.FsgroupId).FirstOrDefault();
                            if (Fsgroup != null)
                            {
                                if (Role == "Account1")
                                {
                                    Fsgroup.PreparedBy = input.PreparedBy;
                                    Fsgroup.PrepareDate = input.PrepareDate;
                                    Fsgroup.PrepareStatus = input.PrepareStatus;
                                }
                                else if (Role == "Account2")
                                {
                                    Fsgroup.ReveiwedBy = input.ReveiwedBy;
                                    Fsgroup.ReveiwedDate = input.ReveiwedDate;
                                    Fsgroup.ReveiwedStatus = input.ReveiwedStatus;
                                }
                                else if (Role == "Audit")
                                {
                                    Fsgroup.AuditorBy = input.AuditorBy;
                                    Fsgroup.AuditorDate = input.AuditorDate;
                                    Fsgroup.AuditorStatus = input.AuditorStatus;
                                }
                                else if (Role == "Manager")
                                {
                                    Fsgroup.AuditorBy = input.AuditorBy;
                                    Fsgroup.AuditorDate = input.AuditorDate;
                                    Fsgroup.AuditorStatus = input.AuditorStatus;
                                }

                                Fsgroup.UpdatedOn = input.UpdatedOn;
                                Fsgroup.UpdateBy = input.UpdateBy;
                                context.SaveChanges();

                                AccountAuditFsgroupEvent FSEvent = new AccountAuditFsgroupEvent()
                                {
                                    AuditFsgroupId = Fsgroup.AuditFsgroupId,
                                    CreatedBy = input.UpdateBy,
                                    CreatedOn = input.UpdatedOn,
                                    IsEvent = Events.IsEvent,
                                };

                                fsetable.Add(FSEvent);
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

        public List<AccountAuditAccount> GetParemeterPeriod(string PeriodId)
        {
            try
            {
                List<AccountAuditAccount> response = new List<AccountAuditAccount>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountAuditAccount>();
                    var ttable = context.Set<AccountTrialbalance>();
                    response = otable.Where(a => a.PeriodId == PeriodId)
                        .OrderBy(a => a.TrialBalanceId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (AccountAuditAccount obj in response)
                        {
                            obj.TrialBalance = new AccountTrialbalance();
                            obj.TrialBalance = ttable.Where(a => a.TrialBalanceId == obj.TrialBalanceId).FirstOrDefault();
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
    }
}
