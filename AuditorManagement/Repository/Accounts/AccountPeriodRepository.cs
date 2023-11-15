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
    public class AccountPeriodRepository : IMauchlyCore.IMauchlyRepository<AccountPeriod, AuditDataContext>
    {
        public List<AccountPeriod> Get(string OwnerId, string BranchId)
        {
            try
            {
                List<AccountPeriod> response = new List<AccountPeriod>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriod>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.CustomerId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Customer>();


                        foreach (AccountPeriod obj in response)
                        {
                            obj.Customer = new Customer();
                            obj.Customer = dtable.Where(a => a.CustomerId == obj.CustomerId).FirstOrDefault();
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

        public List<AccountPeriod> GetCustomerAssign(string OwnerId, string BranchId, string EmpId)
        {
            try
            {
                List<AccountPeriod> response = new List<AccountPeriod>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var astable = context.Set<CustomerAssign>();
                    List<CustomerAssign> assign = new List<CustomerAssign>();
                    assign = astable.Where(a => a.EmpId == EmpId && a.IsDelete == Common.NoDelete).ToList();
                    string[] assignarry = assign.ConvertAll(a => a.CustomerId).ToArray();

                    var otable = context.Set<Customer>();
                    List<Customer> cus = new List<Customer>();
                    cus = otable.Where(a => assignarry.Contains(a.CustomerId) &&
                    a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    string[] cusary = cus.ConvertAll(a => a.CustomerId).ToArray();

                    var gtable = context.Set<AccountPeriod>();
                    response = gtable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper()
                    && a.BranchId.ToUpper() == BranchId.ToUpper()
                    && cusary.Contains(a.CustomerId)
                    && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.CustomerId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Customer>();
                        var utable = context.Set<User>();
                        var etable = context.Set<Employee>();
                        var citable = context.Set<CustomerInviteProfile>();
                        foreach (AccountPeriod obj in response)
                        {
                            obj.Customer = new Customer();
                            obj.Customer = dtable.Where(a => a.CustomerId == obj.CustomerId).FirstOrDefault();


                            var Users = utable.Where(a => a.UserId == obj.IsCompleteAuditBy).FirstOrDefault();
                            if (Users != null)
                            {
                                obj.CompleteAuditBy = new Employee();
                                obj.CompleteAuditBy = etable.Where(a => a.EmpId == Users.EmpId).FirstOrDefault();
                            }

                            var UserCuss = utable.Where(a => a.UserId == obj.IsCompleteCustomerBy).FirstOrDefault();
                            if (UserCuss != null)
                            {
                                obj.CompleteCustomerBy = new CustomerInviteProfile();
                                obj.CompleteCustomerBy = citable.Where(a => a.ProfileId == UserCuss.UProfileId).FirstOrDefault();
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

        public List<AccountPeriod> Get(string CustomerId)
        {
            try
            {
                List<AccountPeriod> response = new List<AccountPeriod>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriod>();
                    response = otable.Where(a => a.CustomerId.ToUpper() == CustomerId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.CustomerId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Customer>();


                        foreach (AccountPeriod obj in response)
                        {
                            obj.Customer = new Customer();
                            obj.Customer = dtable.Where(a => a.CustomerId == obj.CustomerId).FirstOrDefault();
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
        public AccountPeriod GetWithKey(string PeriodId)
        {
            try
            {
                AccountPeriod response = new AccountPeriod();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriod>();
                    response = otable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (response != null)
                    {
                        var utable = context.Set<Customer>();
                        var ttable = context.Set<AccountTrialbalance>();
                        var adtable = context.Set<AccountAdjustment>();
                        var adstable = context.Set<AccountAdjustmentSub>();
                        var auftable = context.Set<AccountAuditFsgroup>();
                        var auatable = context.Set<AccountAuditAccount>();
                        var ustable = context.Set<User>();
                        var etable = context.Set<Employee>();
                        var pertable = context.Set<VUserspermission>();
                        var evtable = context.Set<AccountAuditFsgroupEvent>();
                        var potable = context.Set<AccountAuditFsgroupPolicy>();
                        var nstable = context.Set<AccountAuditFsgroupNotefs>();
                        var fsasstable = context.Set<AccountAuditFsgroupAssign>();

                        response.Customer = new Customer();
                        response.Customer = utable.Where(a => a.CustomerId.ToUpper() == response.CustomerId.ToUpper()).FirstOrDefault();

                        if (!string.IsNullOrEmpty(response.UploadBy))
                        {
                            User user = new User();
                            user = ustable.Where(a => a.UserId == response.UploadBy).FirstOrDefault();

                            response.UploadData = new Employee();
                            response.UploadData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                        }

                        response.TrialBalance = new List<AccountTrialbalance>();
                        response.TrialBalance = ttable.Where(a => a.PeriodId == response.PeriodId && a.IsDelete == Common.NoDelete).OrderBy(a => a.TrialBalanceId).ToList();

                        response.Adjustments = new List<AccountAdjustment>();
                        response.Adjustments = adtable.Where(a => a.PeriodId == response.PeriodId && a.IsDelete == Common.NoDelete).OrderBy(a => a.CreatedOn).ToList();

                        if (response.Adjustments != null && response.Adjustments.Count > 0)
                        {
                            foreach (AccountAdjustment obj in response.Adjustments)
                            {
                                obj.SubAdjustment = new List<AccountAdjustmentSub>();
                                obj.SubAdjustment = adstable.Where(a => a.PeriodId == response.PeriodId && a.AdjustmentId == obj.AdjustmentId && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();

                                obj.SubAdjustmentAgree = new List<AccountAdjustmentSub>();
                                obj.SubAdjustmentAgree = adstable.Where(a => a.PeriodId == response.PeriodId && a.AdjustmentId == obj.AdjustmentId && a.AdjustmentAgree == "Agree"
                                && a.AdjustmentPeriod == Common.IsPeriodCurrent && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();

                                obj.SubAdjustmentDisagree = new List<AccountAdjustmentSub>();
                                obj.SubAdjustmentDisagree = adstable.Where(a => a.PeriodId == response.PeriodId && a.AdjustmentId == obj.AdjustmentId && a.AdjustmentAgree == "Disagree"
                                && a.AdjustmentPeriod == Common.IsPeriodCurrent && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();

                                obj.SubAdjustmentPreviousAgree = new List<AccountAdjustmentSub>();
                                obj.SubAdjustmentPreviousAgree = adstable.Where(a => a.PeriodId == response.PeriodId && a.AdjustmentId == obj.AdjustmentId && a.AdjustmentAgree == "Agree"
                                && a.AdjustmentPeriod == Common.IsPeriodPrevious && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();

                                obj.SubAdjustmentPreviousDisagree = new List<AccountAdjustmentSub>();
                                obj.SubAdjustmentPreviousDisagree = adstable.Where(a => a.PeriodId == response.PeriodId && a.AdjustmentId == obj.AdjustmentId && a.AdjustmentAgree == "Disagree"
                                && a.AdjustmentPeriod == Common.IsPeriodPrevious && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();
                            }
                        }

                        response.SubAdjustments = new List<AccountAdjustmentSub>();
                        response.SubAdjustments = adstable.Where(a => a.PeriodId == response.PeriodId && a.IsDelete == Common.NoDelete).OrderBy(a => a.SubAdjustmentId).ToList();

                        response.FSGroups = new List<AccountAuditFsgroup>();
                        response.FSGroups = auftable.Where(a => a.PeriodId == response.PeriodId).OrderBy(a => a.Code).ToList();

                        foreach (AccountAuditFsgroup fs in response.FSGroups)
                        {
                            if (!string.IsNullOrEmpty(fs.PreparedBy))
                            {
                                User user = new User();
                                user = ustable.Where(a => a.UserId == fs.PreparedBy).FirstOrDefault();

                                fs.PrepareData = new Employee();
                                fs.PrepareData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                            }

                            if (!string.IsNullOrEmpty(fs.ReveiwedBy))
                            {
                                User user = new User();
                                user = ustable.Where(a => a.UserId == fs.ReveiwedBy).FirstOrDefault();

                                fs.ReveiwedData = new Employee();
                                fs.ReveiwedData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                            }

                            if (!string.IsNullOrEmpty(fs.AuditorBy))
                            {
                                User user = new User();
                                user = ustable.Where(a => a.UserId == fs.AuditorBy).FirstOrDefault();

                                fs.AuditorData = new Employee();
                                fs.AuditorData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                            }

                            fs.Policys = new List<AccountAuditFsgroupPolicy>();
                            fs.Policys = potable.Where(a => a.AuditFsgroupId == fs.AuditFsgroupId && a.IsDelete == Common.NoDelete).OrderBy(a => a.AuditPolicyId).ToList();

                            fs.NoteToFS = new List<AccountAuditFsgroupNotefs>();
                            fs.NoteToFS = nstable.Where(a => a.AuditFsgroupId == fs.AuditFsgroupId && a.IsDelete == Common.NoDelete).OrderBy(a => a.AuditNoteFsid).ToList();

                            var gtable = context.Set<AccountAuditFsgroupNotefsGet>();
                            var tttable = context.Set<AccountAuditFsgroupNotefsTable>();
                            foreach (AccountAuditFsgroupNotefs note in fs.NoteToFS)
                            {
                                if (note.NoteFstype == "Get")
                                {
                                    note.SubGroups = new List<AccountAuditFsgroupNotefsGet>();
                                    note.SubGroups = gtable.Where(a => a.AuditNoteFsid == note.AuditNoteFsid && a.IsDelete == Common.NoDelete).OrderBy(a => a.AuditNoteFsid).ToList();
                                }
                                else if (note.NoteFstype == "Table")
                                {
                                    note.Tables = new List<AccountAuditFsgroupNotefsTable>();
                                    note.Tables = tttable.Where(a => a.AuditNoteFsid == note.AuditNoteFsid && a.IsDelete == Common.NoDelete).OrderBy(a => a.AuditNoteFsid).ToList();
                                }
                            }

                            fs.Events = new List<AccountAuditFsgroupEvent>();
                            fs.Events = evtable.Where(a => a.AuditFsgroupId == fs.AuditFsgroupId).OrderByDescending(a => a.CreatedOn).ToList();

                            foreach (AccountAuditFsgroupEvent issue in fs.Events)
                            {
                                if (!string.IsNullOrEmpty(issue.CreatedBy))
                                {
                                    User user = new User();
                                    user = ustable.Where(a => a.UserId == issue.CreatedBy).FirstOrDefault();

                                    issue.CreateData = new Employee();
                                    issue.CreateData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                                }
                            }

                            fs.Assigns = fsasstable.Where(a => a.AuditFsgroupId == fs.AuditFsgroupId && a.IsActive == Common.IsActive && a.IsDelete == Common.NoDelete).ToList();

                            if (fs.Assigns?.Any() ?? false)
                            {
                                foreach (AccountAuditFsgroupAssign obj in fs.Assigns)
                                {
                                    obj.EmployeeData = new Employee();
                                    obj.EmployeeData = etable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                                    User UserData = new User();
                                    UserData = ustable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                                    VUserspermission PermissionData = new VUserspermission();
                                    PermissionData = pertable.Where(a => a.UserId.ToUpper() == UserData.UserId.ToUpper()).FirstOrDefault();

                                    if (PermissionData != null)
                                    {
                                        obj.PermissionCode = PermissionData.Code;
                                        obj.PermissionName = PermissionData.Name;
                                    }
                                }
                            }
                        }

                        response.Accounts = new List<AccountAuditAccount>();
                        response.Accounts = auatable.Where(a => a.PeriodId == response.PeriodId).OrderBy(a => a.TrialBalanceId).ToList();

                        var subtable = context.Set<MasterSubfsgroup>();
                        foreach (AccountAuditAccount acc in response.Accounts)
                        {
                            if (acc.SubFsgroupId.HasValue)
                            {
                                acc.SubFSGroup = new MasterSubfsgroup();
                                acc.SubFSGroup = subtable.Where(a => a.SubFsgroupId == acc.SubFsgroupId).FirstOrDefault();
                            }
                        }

                        var asstable = context.Set<AccountAuditFsgroupAssign>();
                        response.FSGroupsAssign = asstable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                        if (response.FSGroupsAssign?.Any() ?? false)
                        {
                            var groupby = response.FSGroupsAssign.GroupBy(a => a.EmpId).Select(b => new { EmpId = b.Key }).ToList();
                            string[] groupary = groupby.ConvertAll(a => a.EmpId).ToArray();
                            response.AssignEmps = new List<Employee>();
                            var ptable = context.Set<VUserspermission>();
                            response.AssignEmps = etable.Where(a => groupary.Contains(a.EmpId)).ToList();
                            foreach (Employee empas in response.AssignEmps)
                            {
                                User user = new User();
                                user = ustable.Where(a => a.EmpId == empas.EmpId).FirstOrDefault();

                                VUserspermission PermissionData = new VUserspermission();
                                PermissionData = ptable.Where(a => a.UserId.ToUpper() == user.UserId.ToUpper()).FirstOrDefault();

                                if (PermissionData != null)
                                {
                                    empas.PermissionCode = PermissionData.Code;
                                    empas.PermissionName = PermissionData.Name;
                                }
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

        public AccountPeriod Save(AccountPeriod input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriod>();
                        var ptable = context.Set<AccountPeriodProposal>();
                        if (string.IsNullOrEmpty(input.PeriodId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.PeriodId = Guid.NewGuid().ToString().ToUpper();
                            input.PeriodCode = PrefixRepository.GetAccountPeriodCode(context, input.UpdateBy);
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.IsUploadTrial = Common.NoUploadTrial;
                            input.IsRequestUpload = Common.NoResetUploadTrial;
                            input.IsAudit = Common.NoAudit;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();

                            if (!string.IsNullOrEmpty(input.ProposalId))
                            {
                                AccountPeriodProposal proposal = new AccountPeriodProposal();
                                proposal = ptable.Where(a => a.ProposalId == input.ProposalId).FirstOrDefault();
                                if (proposal != null)
                                {
                                    proposal.IsStatus = Common.IsProposalConvert;
                                    proposal.UpdateBy = input.UpdateBy;
                                    proposal.UpdatedOn = input.UpdatedOn;
                                    proposal.ConvertBy = input.UpdateBy;
                                    proposal.ConvertOn = input.UpdatedOn;
                                    context.SaveChanges();
                                }
                            }
                        }
                        else
                        {
                            AccountPeriod val = otable.Where(a => a.PeriodId == input.PeriodId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล รอบบัญชี ในระบบ");

                            val.Name = input.Name;
                            val.PeriodType = input.PeriodType;
                            val.Year = input.Year;
                            val.Quater = input.Quater;
                            val.StartDate = input.StartDate;
                            val.EndDate = input.EndDate;
                            val.MapPeriodId = input.MapPeriodId;
                            val.MapYear = input.MapYear;
                            val.IsMapPeriod = input.IsMapPeriod;
                            val.Remark = input.Remark;
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

        public AccountPeriod Delete(AccountPeriod input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriod>();
                        AccountPeriod val = otable.Where(a => a.PeriodId == input.PeriodId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล รอบบัญชี ในระบบ");

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

        public AccountPeriod ResetUpload(AccountPeriod input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriod>();
                        AccountPeriod val = otable.Where(a => a.PeriodId == input.PeriodId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล รอบบัญชี ในระบบ");

                        val.IsUploadTrial = Common.NoUploadTrial;
                        val.IsAudit = Common.NoAudit;
                        val.UploadDate = default(DateTime?);
                        val.UploadBy = string.Empty;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();

                        var ttable = context.Set<AccountTrialbalance>();
                        List<AccountTrialbalance> table = new List<AccountTrialbalance>();
                        table = ttable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                        foreach (AccountTrialbalance obj in table)
                        {
                            obj.IsDelete = Common.IsDelete;
                            obj.UpdatedOn = input.UpdatedOn;
                            obj.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }

                        var adtable = context.Set<AccountAdjustment>();
                        List<AccountAdjustment> adjusttable = new List<AccountAdjustment>();
                        adjusttable = adtable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                        foreach (AccountAdjustment obj in adjusttable)
                        {
                            obj.IsDelete = Common.IsDelete;
                            obj.UpdatedOn = input.UpdatedOn;
                            obj.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }

                        var sadtable = context.Set<AccountAdjustmentSub>();
                        List<AccountAdjustmentSub> sadjusttable = new List<AccountAdjustmentSub>();
                        sadjusttable = sadtable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                        foreach (AccountAdjustmentSub obj in sadjusttable)
                        {
                            obj.IsDelete = Common.IsDelete;
                            obj.UpdatedOn = input.UpdatedOn;
                            obj.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }

                        var padtable = context.Set<AccountAdjustmentPreviou>();
                        List<AccountAdjustmentPreviou> padjusttable = new List<AccountAdjustmentPreviou>();
                        padjusttable = padtable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                        foreach (AccountAdjustmentPreviou obj in padjusttable)
                        {
                            obj.IsDelete = Common.IsDelete;
                            obj.UpdatedOn = input.UpdatedOn;
                            obj.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }

                        var psadtable = context.Set<AccountAdjustmentSubPreviou>();
                        List<AccountAdjustmentSubPreviou> psadjusttable = new List<AccountAdjustmentSubPreviou>();
                        psadjusttable = psadtable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                        foreach (AccountAdjustmentSubPreviou obj in psadjusttable)
                        {
                            obj.IsDelete = Common.IsDelete;
                            obj.UpdatedOn = input.UpdatedOn;
                            obj.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }

                        var afstable = context.Set<AccountAuditFsgroup>();
                        var fslist = afstable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper()).ToList();
                        foreach (var r in fslist)
                            afstable.Remove(r);

                        context.SaveChanges();

                        var atatable = context.Set<AccountAuditAccount>();
                        var trlist = atatable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper()).ToList();
                        foreach (var r in trlist)
                            atatable.Remove(r);

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

        public AccountPeriod ConfirmBeforeAudit(AccountPeriod input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriod>();
                        AccountPeriod val = otable.Where(a => a.PeriodId == input.PeriodId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล รอบบัญชี ในระบบ");

                        val.IsAudit = Common.IsAudit;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();

                        // ดึง FS group Owner
                        FsgroupRepository FsgroupRepository = new FsgroupRepository();
                        List<Fsgroup> fstable = FsgroupRepository.Get(input.OwnerId, context);

                        var ttable = context.Set<AccountTrialbalance>();
                        List<AccountTrialbalance> table = new List<AccountTrialbalance>();
                        table = ttable.Where(a => a.PeriodId.ToUpper() == val.PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();

                        var FSGroupBy = table.GroupBy(a => new { a.FsgroupId }).Select(b => new { b.Key.FsgroupId }).ToList();

                        var afstable = context.Set<AccountAuditFsgroup>();
                        var atatable = context.Set<AccountAuditAccount>();
                        var politable = context.Set<MasterAccountPolicy>();
                        var fspolitable = context.Set<AccountAuditFsgroupPolicy>();
                        PrefixRepository PrefixRepository = new PrefixRepository();

                        foreach (var obj in FSGroupBy)
                        {
                            AccountAuditFsgroup group = new AccountAuditFsgroup();
                            group.PeriodId = val.PeriodId;
                            group.FsgroupId = obj.FsgroupId.Value;

                            Fsgroup fs = new Fsgroup();
                            fs = fstable.Where(a => a.FsgroupId == group.FsgroupId).FirstOrDefault();
                            if (fs != null)
                            {
                                group.Code = fs.Code;
                                group.Name = fs.Name;
                                group.PrepareStatus = Common.AuditWait;
                                group.ReveiwedStatus = Common.AuditWait;
                                group.AuditorStatus = Common.AuditWait;
                                group.CreatedOn = input.UpdatedOn;
                                group.CreatedBy = input.UpdateBy;
                                group.UpdatedOn = input.UpdatedOn;
                                group.UpdateBy = input.UpdateBy;
                                afstable.Add(group);

                                List<AccountTrialbalance> trial = new List<AccountTrialbalance>();
                                trial = table.Where(a => a.FsgroupId == group.FsgroupId).ToList();
                                int i = 1;
                                foreach (AccountTrialbalance detail in trial)
                                {
                                    AccountAuditAccount account = new AccountAuditAccount()
                                    {
                                        FsgroupId = group.FsgroupId,
                                        TrialBalanceId = detail.TrialBalanceId.Value,
                                        AccountRefCode = string.Format("{0}-{1}", group.Code, i.ToString().PadLeft(3, '0')),
                                        PrepareStatus = Common.AuditWait,
                                        ReveiwedStatus = Common.AuditWait,
                                        AuditorStatus = Common.AuditWait,
                                        CreatedOn = input.UpdatedOn,
                                        CreatedBy = input.UpdateBy,
                                        UpdatedOn = input.UpdatedOn,
                                        UpdateBy = input.UpdateBy,
                                        PeriodId = val.PeriodId
                                    };
                                    atatable.Add(account);
                                    i++;
                                }
                            }
                            context.SaveChanges();

                            if (val.IsMapPeriod == "N")
                            {
                                // ดึงข้อมูล Policy Master 
                                List<MasterAccountPolicy> policy = new List<MasterAccountPolicy>();
                                policy = politable.Where(a => a.FsgroupId == group.FsgroupId).ToList();

                                foreach (MasterAccountPolicy pol in policy)
                                {
                                    AccountAuditFsgroupPolicy AccountFsGroup = new AccountAuditFsgroupPolicy()
                                    {
                                        AuditPolicyRefCode = PrefixRepository.GetAccountPolicy(context, input.UpdateBy),
                                        IsDelete = Common.NoDelete,
                                        CreatedOn = input.UpdatedOn,
                                        CreatedBy = input.UpdateBy,
                                        UpdateBy = input.UpdateBy,
                                        UpdatedOn = input.UpdatedOn,
                                        AuditFsgroupId = group.AuditFsgroupId,
                                        Description = pol.Description,
                                        Subject = pol.Subject,
                                        IsPrint = Common.IsPrint
                                    };
                                    fspolitable.Add(AccountFsGroup);
                                }
                            }
                            else if (val.IsMapPeriod == "Y")
                            {
                                // ดึงข้อมูล Policy After Period
                                List<AccountAuditFsgroup> auditFsgroup = new List<AccountAuditFsgroup>();
                                auditFsgroup = afstable.Where(a => a.PeriodId == val.PeriodId && a.FsgroupId == obj.FsgroupId).ToList();

                                foreach (AccountAuditFsgroup adf in auditFsgroup)
                                {
                                    List<AccountAuditFsgroupPolicy> policy = new List<AccountAuditFsgroupPolicy>();
                                    policy = fspolitable.Where(a => a.AuditFsgroupId == adf.AuditFsgroupId).ToList();
                                    foreach (AccountAuditFsgroupPolicy pol in policy)
                                    {
                                        AccountAuditFsgroupPolicy AccountFsGroup = new AccountAuditFsgroupPolicy()
                                        {
                                            AuditPolicyRefCode = PrefixRepository.GetAccountPolicy(context, input.UpdateBy),
                                            IsDelete = Common.NoDelete,
                                            CreatedOn = input.UpdatedOn,
                                            CreatedBy = input.UpdateBy,
                                            UpdateBy = input.UpdateBy,
                                            UpdatedOn = input.UpdatedOn,
                                            AuditFsgroupId = group.AuditFsgroupId,
                                            Description = pol.Description,
                                            Subject = pol.Subject,
                                            IsPrint = Common.IsPrint
                                        };
                                        fspolitable.Add(AccountFsGroup);
                                    }
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

        public AccountPeriod ConfirmAfterAudit(AccountPeriod input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriod>();
                        AccountPeriod val = otable.Where(a => a.PeriodId == input.PeriodId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล รอบบัญชี ในระบบ");

                        var fstable = context.Set<AccountAuditFsgroup>();
                        List<AccountAuditFsgroup> fsgroup = new List<AccountAuditFsgroup>();
                        fsgroup = fstable.Where(a => a.PeriodId == input.PeriodId).ToList();
                        foreach (AccountAuditFsgroup fs in fsgroup)
                            if (fs.AuditorStatus != Common.IsStatusWorkflowComfirm)
                                throw new Exception("ไม่สามารถยืนยันรอบบัญชีได้ เนื่องจากยังยืนยันตรวจสอบบัญชีไม่ครบ ( FS Lead : " + fs.Code + " )");

                        val.IsCompleteAudit = Common.AuditConfirm;
                        val.IsCompleteAuditBy = input.UpdateBy;
                        val.IsCompleteAuditDate = input.UpdatedOn;
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

        public AccountPeriod ConfirmAfterCustomer(AccountPeriod input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriod>();
                        AccountPeriod val = otable.Where(a => a.PeriodId == input.PeriodId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล รอบบัญชี ในระบบ");

                        if (val.IsUploadTrial == Common.NoUploadTrial)
                            throw new Exception("ไม่สามารถยืนยันรอบบัญชีได้ เนื่องจากผู้ตรวจสอบยังยืนยันไม่เรียบร้อย");

                        var fstable = context.Set<AccountAuditFsgroup>();
                        List<AccountAuditFsgroup> fsgroup = new List<AccountAuditFsgroup>();
                        fsgroup = fstable.Where(a => a.PeriodId == input.PeriodId).ToList();
                        foreach (AccountAuditFsgroup fs in fsgroup)
                            if (fs.AuditorStatus != Common.IsStatusWorkflowComfirm)
                                throw new Exception("ไม่สามารถยืนยันรอบบัญชีได้ เนื่องจากผู้ตรวจสอบยังยืนยันไม่เรียบร้อย");

                        val.IsCompleteCustomer = Common.AuditConfirm;
                        val.IsCompleteCustomerBy = input.UpdateBy;
                        val.IsCompleteCustomerDate = input.UpdatedOn;
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

        public AccountPeriod GetDocument(string PeriodId)
        {
            try
            {
                AccountPeriod response = new AccountPeriod();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriod>();
                    response = otable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (response != null)
                    {
                        var auftable = context.Set<AccountAuditFsgroup>();
                        var auatable = context.Set<AccountAuditAccount>();
                        var dauatable = context.Set<AccountAuditAccountDoucment>();
                        var ustable = context.Set<VDocumentlist>();

                        List<AccountAuditAccount> Accounts = new List<AccountAuditAccount>();
                        Accounts = auatable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper()).ToList();
                        int[] accid = Accounts.ConvertAll(a => a.AuditAccountId.Value).ToArray();

                        List<AccountAuditAccountDoucment> Documents = new List<AccountAuditAccountDoucment>();
                        Documents = dauatable.Where(a => accid.Contains(a.AuditAccountId)).ToList();
                        string[] docid = Documents.ConvertAll(a => a.DocumentListId).ToArray();

                        response.DocumentList = ustable.Where(a => docid.Contains(a.DocumentListId)).ToList();
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public AccountPeriod GetAuditIssue(string PeriodId)
        {
            try
            {
                AccountPeriod response = new AccountPeriod();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriod>();
                    response = otable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (response != null)
                    {
                        var auftable = context.Set<AccountAuditFsgroup>();
                        var auatable = context.Set<AccountAuditAccount>();
                        var ustable = context.Set<AccountAuditAccountAuditissue>();

                        List<AccountAuditAccount> Accounts = new List<AccountAuditAccount>();
                        Accounts = auatable.Where(a => a.PeriodId.ToUpper() == PeriodId.ToUpper()).ToList();
                        int[] accid = Accounts.ConvertAll(a => a.AuditAccountId.Value).ToArray();

                        List<AccountAuditAccountAuditissue> Documents = new List<AccountAuditAccountAuditissue>();
                        response.AuditIssue = ustable.Where(a => accid.Contains(a.AuditAccountId)).ToList();
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
