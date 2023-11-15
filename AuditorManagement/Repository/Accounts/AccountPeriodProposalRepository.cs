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
    public class AccountPeriodProposalRepository : IMauchlyCore.IMauchlyRepository<AccountPeriodProposal, AuditDataContext>
    {
        public List<AccountPeriodProposal> Get(string OwnerId)
        {
            try
            {
                List<AccountPeriodProposal> response = new List<AccountPeriodProposal>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriodProposal>();
                    response = otable.Where(a => a.OwnerId == OwnerId && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.CreatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Customer>();
                        foreach (AccountPeriodProposal obj in response)
                        {
                            obj.Customer = new Customer();
                            obj.Customer = dtable.Where(a => a.CustomerId== obj.CustomerId).FirstOrDefault();
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

        public AccountPeriodProposal GetWithKey(string ProposalId)
        {
            try
            {
                AccountPeriodProposal response = new AccountPeriodProposal();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<AccountPeriodProposal>();
                    response = otable.Where(a => a.ProposalId.ToUpper() == ProposalId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public AccountPeriodProposal Save(AccountPeriodProposal input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {

                        var otable = context.Set<AccountPeriodProposal>();
                        var atable = context.Set<AccountPeriodProposalSub>();
                        if (string.IsNullOrEmpty(input.ProposalId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.ProposalId = Guid.NewGuid().ToString().ToUpper();
                            input.ProposalCode = !string.IsNullOrEmpty(input.ProposalCode) ? input.ProposalCode :
                                PrefixRepository.GetAllRefcode(PrefixRepository.Code.PPL.ToString(), context, input.UpdateBy);

                            input.IsStatus = Common.IsProposalWait;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();

                        }
                        else
                        {
                            AccountPeriodProposal val = otable.Where(a => a.ProposalId == input.ProposalId  && a.OwnerId == input.OwnerId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Proposal ในระบบ");

                            val.ProposalName = input.ProposalName;
                            val.ProposalNameEn = input.ProposalNameEn;
                            val.StartDate = input.StartDate;
                            val.ExpireDate = input.ExpireDate;

                            val.AuditRate = input.AuditRate;
                            val.PrepareRate = input.PrepareRate;
                            val.ReviewRate = input.ReviewRate;
                            val.ManagerRate = input.ManagerRate;

                            val.AuditHour = input.AuditHour;
                            val.PrepareHour = input.PrepareHour;
                            val.ReviewHour = input.ReviewHour;
                            val.ManagerHour = input.ManagerHour;

                            val.ProfitPercent = input.ProfitPercent;
                            val.AuditPercent = input.AuditPercent;

                            val.AuditAmount = input.AuditAmount;
                            val.PrepareAmount = input.PrepareAmount;
                            val.ReviewAmount = input.ReviewAmount;
                            val.ManagerAmount = input.ManagerAmount;

                            val.TotalAmount = input.TotalAmount;
                            val.AuditAccountAmount = input.AuditAccountAmount;
                            val.ProfitAccountAmount = input.ProfitAccountAmount;
                            val.GrandTotal = input.GrandTotal;

                            val.Section1 = input.Section1;
                            val.Section2 = input.Section2;
                            val.Section3 = input.Section3;
                            val.Section4 = input.Section4;
                            val.Section1En = input.Section1En;
                            val.Section2En = input.Section2En;
                            val.Section3En = input.Section3En;
                            val.Section4En = input.Section4En;

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

        public AccountPeriodProposal Delete(AccountPeriodProposal input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriodProposal>();
                        AccountPeriodProposal val = otable.Where(a => a.ProposalId == input.ProposalId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Proposal ในระบบ");

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

        public AccountPeriodProposal ChangeStatus(AccountPeriodProposal input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountPeriodProposal>();
                        AccountPeriodProposal val = otable.Where(a => a.ProposalId == input.ProposalId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Proposal ในระบบ");

                        val.IsStatus = input.IsStatus;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;

                        if (input.IsStatus == Common.IsProposalApprove)
                        {
                            val.CompleteOn = input.UpdatedOn;
                            val.CompleteBy = input.UpdateBy;
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
