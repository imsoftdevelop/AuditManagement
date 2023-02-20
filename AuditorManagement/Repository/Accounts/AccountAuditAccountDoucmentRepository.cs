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
    public class AccountAuditAccountDoucmentRepository : IMauchlyCore.IMauchlyRepository<AccountAuditAccountDoucment, AuditDataContext>
    {

        public void Save(Documentlist input, int AuditId, string RefCode)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountDoucment>();
                        var atable = context.Set<Documentlist>();
                        if (!string.IsNullOrEmpty(input.DocumentListId))
                        {
                            Documentlist val = atable.Where(a => a.DocumentListId == input.DocumentListId.ToUpper() && a.BranchId.ToUpper() == input.BranchId.ToUpper()
                            && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล เอกสาร ในระบบ");

                            val.PathFile = input.PathFile;
                            val.NameFile = input.NameFile;
                            val.Size = input.Size;
                            val.Extension = input.Extension;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            PrefixRepository PrefixRepository = new PrefixRepository();
                            AccountAuditAccountDoucment AuditRef = new AccountAuditAccountDoucment()
                            {
                                AuditAccountId = AuditId,
                                DocumentListId = input.DocumentListId,
                                DocumentRefCode = !string.IsNullOrEmpty(RefCode) ? RefCode : PrefixRepository.GetDocumentRefAudit(context, input.UpdateBy),
                                IsDelete = Common.NoDelete,
                                CreatedBy = input.UpdateBy,
                                CreatedOn = input.UpdatedOn,
                                UpdateBy = input.UpdateBy,
                                UpdatedOn = input.UpdatedOn,
                            };
                            context.Add(AuditRef);
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

        public void Save(AccountAuditAccountDoucment input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountDoucment>();
                        PrefixRepository PrefixRepository = new PrefixRepository();
                        input.DocumentRefCode = !string.IsNullOrEmpty(input.DocumentRefCode) ? input.DocumentRefCode : PrefixRepository.GetDocumentRefAudit(context, input.UpdateBy);
                        input.IsDelete = Common.NoDelete;
                        input.CreatedBy = input.UpdateBy;
                        input.CreatedOn = input.UpdatedOn;
                        context.Add(input);
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

        public AccountAuditAccountDoucment Delete(AccountAuditAccountDoucment input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditAccountDoucment>();
                        AccountAuditAccountDoucment val = otable.Where(a => a.DocumentRefId == input.DocumentRefId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Document ในระบบ");

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
