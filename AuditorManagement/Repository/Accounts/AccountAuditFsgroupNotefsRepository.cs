using Models;
using Models.Master;
using Models.Models;
using Repository.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using static Repository.Systems.PrefixRepository;

namespace Repository
{
    public class AccountAuditFsgroupNotefsRepository : IMauchlyCore.IMauchlyRepository<AccountAuditFsgroupNotefs, AuditDataContext>
    {

        public AccountAuditFsgroupNotefs Save(AccountAuditFsgroupNotefs input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroupNotefs>();
                        if (!input.AuditNoteFsid.HasValue)
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.AuditNoteFsrefCode = !string.IsNullOrEmpty(input.AuditNoteFsrefCode) ? input.AuditNoteFsrefCode : PrefixRepository.GetAllRefcode(Code.REFNOTEFS.ToString(), context, input.UpdateBy);
                            input.IsDelete = Common.NoDelete;
                            input.IsPrint = Common.NoPrint;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            AccountAuditFsgroupNotefs val = otable.Where(a => a.AuditNoteFsid == input.AuditNoteFsid).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Note FS ในระบบ");

                            val.NoteDetail = input.NoteDetail;
                            val.HeaderQty = input.HeaderQty;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;
                            context.SaveChanges();
                        }

                        if (input.SubGroups?.Any() ?? false)
                        {
                            var gtable = context.Set<AccountAuditFsgroupNotefsGet>();
                            foreach (AccountAuditFsgroupNotefsGet obj in input.SubGroups)
                            {
                                if (!obj.AuditSubNoteFsid.HasValue)
                                {
                                    obj.AuditNoteFsid = input.AuditNoteFsid;
                                    obj.IsDelete = Common.NoDelete;
                                    obj.CreatedBy = input.UpdateBy;
                                    obj.CreatedOn = input.UpdatedOn;
                                    obj.UpdateBy = input.UpdateBy;
                                    obj.UpdatedOn = input.UpdatedOn;
                                    context.Add(obj);
                                    context.SaveChanges();
                                }
                                else
                                {
                                    AccountAuditFsgroupNotefsGet gval = new AccountAuditFsgroupNotefsGet();
                                    gval = gtable.Where(a => a.AuditSubNoteFsid == obj.AuditSubNoteFsid).FirstOrDefault();
                                    if (gval != null)
                                    {
                                        gval.IsDelete = Common.NoDelete;
                                        gval.CreatedBy = input.UpdateBy;
                                        gval.CreatedOn = input.UpdatedOn;
                                        context.SaveChanges();
                                    }
                                }
                            }
                        }

                        if (input.Tables?.Any() ?? false)
                        {
                            var ttable = context.Set<AccountAuditFsgroupNotefsTable>();

                            List<AccountAuditFsgroupNotefsTable> del = new List<AccountAuditFsgroupNotefsTable>();
                            del = ttable.Where(a => a.AuditNoteFsid == input.AuditNoteFsid).ToList();
                            foreach (AccountAuditFsgroupNotefsTable rev in del)
                            {
                                rev.IsDelete = Common.IsDelete;
                                rev.UpdateBy = input.UpdateBy;
                                rev.UpdatedOn = input.UpdatedOn;
                                context.SaveChanges();
                            }

                            foreach (AccountAuditFsgroupNotefsTable obj in input.Tables)
                            {
                                obj.AuditNoteFsid = input.AuditNoteFsid;
                                obj.IsDelete = Common.NoDelete;
                                obj.CreatedBy = input.UpdateBy;
                                obj.CreatedOn = input.UpdatedOn;
                                obj.UpdateBy = input.UpdateBy;
                                obj.UpdatedOn = input.UpdatedOn;
                                context.Add(obj);
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

        public AccountAuditFsgroupNotefs Delete(AccountAuditFsgroupNotefs input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AccountAuditFsgroupNotefs>();
                        AccountAuditFsgroupNotefs val = otable.Where(a => a.AuditNoteFsid == input.AuditNoteFsid).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Note FS ในระบบ");

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
