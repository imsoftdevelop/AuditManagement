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
    public class AccountAuditFsgroupRepository : IMauchlyCore.IMauchlyRepository<AccountAuditFsgroup, AuditDataContext>
    {
        public AccountAuditFsgroup Save(AccountAuditFsgroup input)
        {
            try
            {

                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroup>();
                        var potable = context.Set<AccountAuditFsgroupPolicy>();
                        var ntable = context.Set<AccountAuditFsgroupNotefs>();
                        AccountAuditFsgroup val = new AccountAuditFsgroup();
                        val = otable.Where(a => a.AuditFsgroupId == input.AuditFsgroupId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล ประเภท ในระบบ");

                        val.AuditComment = input.AuditComment;
                        val.IsConclusion = input.IsConclusion;
                        val.ConclusionDesc = input.ConclusionDesc;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        context.SaveChanges();

                        if (input.Policys != null && input.Policys.Count > 0)
                        {
                            foreach (AccountAuditFsgroupPolicy obj in input.Policys)
                            {
                                if (!obj.AuditPolicyId.HasValue)
                                {
                                    PrefixRepository PrefixRepository = new PrefixRepository();
                                    obj.AuditPolicyRefCode = PrefixRepository.GetAccountPolicy(context, input.UpdateBy);
                                    obj.IsDelete = Common.NoDelete;
                                    obj.CreatedOn = input.UpdatedOn;
                                    obj.CreatedBy = input.UpdateBy;
                                    potable.Add(obj);
                                }
                                else
                                {
                                    AccountAuditFsgroupPolicy policy = new AccountAuditFsgroupPolicy();
                                    policy = potable.Where(a => a.AuditPolicyId == obj.AuditPolicyId).FirstOrDefault();
                                    if (policy != null)
                                    {
                                        policy.Subject = obj.Subject;
                                        policy.Description = obj.Description;
                                        policy.IsDelete = obj.IsDelete;
                                        policy.IsPrint = obj.IsPrint;
                                        policy.UpdatedOn = input.UpdatedOn;
                                        policy.UpdateBy = input.UpdateBy;
                                    }
                                }
                                context.SaveChanges();
                            }
                        }

                        if (input.NoteToFS?.Any() ?? false)
                        {
                            foreach (AccountAuditFsgroupNotefs note in input.NoteToFS)
                            {
                                AccountAuditFsgroupNotefs notefs = new AccountAuditFsgroupNotefs();
                                notefs = ntable.Where(a => a.AuditNoteFsid == note.AuditNoteFsid).FirstOrDefault();
                                if (notefs != null)
                                {
                                    notefs.IsPrint = note.IsPrint;
                                    notefs.UpdatedOn = input.UpdatedOn;
                                    notefs.UpdateBy = input.UpdateBy;
                                }
                            }
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

        public void Save(AccountAuditFsgroup input, string Role, AccountAuditFsgroupEvent Events)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroup>();
                        var etable = context.Set<AccountAuditFsgroupEvent>();
                        var actable = context.Set<AccountAuditAccount>();
                        var acetable = context.Set<AccountAuditAccountEvent>();
                        var audittable = context.Set<AccountAuditAccountConclusion>();
                        var reftable = context.Set<AccountAuditAccountReference>();

                        AccountAuditFsgroup val = new AccountAuditFsgroup();
                        val = otable.Where(a => a.AuditFsgroupId == input.AuditFsgroupId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล FS Lead ในระบบ");

                        if (Role == "Account1")
                        {
                            val.PreparedBy = input.PreparedBy;
                            val.PrepareDate = input.PrepareDate;
                            val.PrepareStatus = input.PrepareStatus;
                        }
                        else if (Role == "Account2")
                        {
                            val.ReveiwedBy = input.ReveiwedBy;
                            val.ReveiwedDate = input.ReveiwedDate;
                            val.ReveiwedStatus = input.ReveiwedStatus;
                        }
                        else if (Role == "Audit")
                        {

                            if (input.PrepareStatus != Common.IsStatusWorkflowComfirm)
                            {
                                val.PreparedBy = input.AuditorBy;
                                val.PrepareDate = input.AuditorDate;
                                val.PrepareStatus = input.AuditorStatus;
                            }

                            if (input.ReveiwedStatus != Common.IsStatusWorkflowComfirm)
                            {
                                val.ReveiwedBy = input.AuditorBy;
                                val.ReveiwedDate = input.AuditorDate;
                                val.ReveiwedStatus = input.AuditorStatus;
                            }

                            val.AuditorBy = input.AuditorBy;
                            val.AuditorDate = input.AuditorDate;
                            val.AuditorStatus = input.AuditorStatus;
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

                        if (Events.IsEvent == Common.IsStatusWorkflowComfirm)
                        {
                            List<AccountAuditAccount> account = new List<AccountAuditAccount>();
                            account = context.Set<AccountAuditAccount>().Where(a => a.FsgroupId == val.FsgroupId.Value).OrderBy(a => a.AuditAccountId).ToList();
                            if (account?.Any() ?? false)
                            {
                                AccountAuditAccountEvent evact = new AccountAuditAccountEvent()
                                {
                                    IsEvent = Events.IsEvent,
                                    CreatedOn = Events.CreatedOn,
                                    CreatedBy = Events.CreatedBy,
                                    TimeUse = "0"
                                };

                                foreach (AccountAuditAccount act in account)
                                {
                                    AccountAuditAccountReference reference = new AccountAuditAccountReference();
                                    reference = reftable.Where(a => a.AuditReferenceAuditAccountId == act.AuditAccountId).FirstOrDefault();
                                    int accountrefid = act.AuditAccountId.Value;
                                    if (reference != null)
                                        accountrefid = reference.AuditAccountId;

                                    AccountAuditAccountConclusion conclusion = new AccountAuditAccountConclusion();
                                    conclusion = audittable.Where(a => a.AuditAccountId == accountrefid).FirstOrDefault();
                                    if (conclusion == null)
                                        throw new Exception("กรุณาเพิ่มรายการ Conclusion อย่างน้อย 1 รายการ ( เลขที่บัญชี : " + act.AccountRefCode + ")");

                                    if (Role == "Account1")
                                    {
                                        act.PreparedBy = input.PreparedBy;
                                        act.PrepareDate = input.PrepareDate;
                                        act.PrepareStatus = input.PrepareStatus;
                                    }
                                    else if (Role == "Account2")
                                    {
                                        act.ReveiwedBy = input.ReveiwedBy;
                                        act.ReveiwedDate = input.ReveiwedDate;
                                        act.ReveiwedStatus = input.ReveiwedStatus;
                                    }
                                    else if (Role == "Audit")
                                    {
                                        if (input.PrepareStatus != Common.IsStatusWorkflowComfirm)
                                        {
                                            act.PreparedBy = input.AuditorBy;
                                            act.PrepareDate = input.AuditorDate;
                                            act.PrepareStatus = input.AuditorStatus;
                                        }

                                        if (input.ReveiwedStatus != Common.IsStatusWorkflowComfirm)
                                        {
                                            act.ReveiwedBy = input.AuditorBy;
                                            act.ReveiwedDate = input.AuditorDate;
                                            act.ReveiwedStatus = input.AuditorStatus;
                                        }

                                        act.AuditorBy = input.AuditorBy;
                                        act.AuditorDate = input.AuditorDate;
                                        act.AuditorStatus = input.AuditorStatus;
                                    }
                                    act.UpdatedOn = input.UpdatedOn;
                                    act.UpdateBy = input.UpdateBy;
                                    context.SaveChanges();

                                    evact.AuditAccountId = act.AuditAccountId;
                                    acetable.Add(evact);
                                    context.SaveChanges();
                                }
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

        public List<AccountAuditFsgroupAssign> GetAssign(int AuditFSId)
        {
            try
            {
                List<AccountAuditFsgroupAssign> response = new List<AccountAuditFsgroupAssign>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountAuditFsgroupAssign>();
                    response = otable.Where(a => a.AuditFsgroupId == AuditFSId && a.IsDelete == Common.NoDelete).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var atable = context.Set<Employee>();
                        var ptable = context.Set<VUserspermission>();
                        var utable = context.Set<User>();
                        foreach (AccountAuditFsgroupAssign obj in response)
                        {
                            obj.EmployeeData = new Employee();
                            obj.EmployeeData = atable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            User UserData = new User();
                            UserData = utable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            VUserspermission PermissionData = new VUserspermission();
                            PermissionData = ptable.Where(a => a.UserId.ToUpper() == UserData.UserId.ToUpper()).FirstOrDefault();

                            if (PermissionData != null)
                            {
                                obj.PermissionCode = PermissionData.Code;
                                obj.PermissionName = PermissionData.Name;
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
    }
}
