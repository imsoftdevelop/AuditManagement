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
    public class DocumentlistRepository : IMauchlyCore.IMauchlyRepository<Documentlist, AuditDataContext>
    {
        public List<VDocumentlist> Get(string OwnerId, string BranchId)
        {
            try
            {
                List<VDocumentlist> response = new List<VDocumentlist>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<VDocumentlist>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderBy(a => a.CustomerId).ToList();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<VDocumentlist> GetCustomerAssign(string OwnerId, string BranchId, string EmpId)
        {
            try
            {
                List<VDocumentlist> response = new List<VDocumentlist>();
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

                    var dtable = context.Set<VDocumentlist>();
                    response = dtable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() 
                    && a.BranchId.ToUpper() == BranchId.ToUpper()
                    && (cusary.Contains(a.CustomerId) || string.IsNullOrEmpty(a.CustomerId))
                    && a.IsDelete == Common.NoDelete)
                        .OrderBy(a => a.CustomerId).ToList();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Documentlist Save(Documentlist input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Documentlist>();
                        if (string.IsNullOrEmpty(input.DocumentListId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.DocumentListId = Guid.NewGuid().ToString().ToUpper();
                            input.DocumentListCode = !string.IsNullOrEmpty(input.DocumentListCode) ? input.DocumentListCode : PrefixRepository.GetDocumentCode(context, input.UpdateBy);
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            Documentlist val = otable.Where(a => a.DocumentListId == input.DocumentListId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล เอกสาร ในระบบ");

                            val.DocumentListCode = input.DocumentListCode;
                            val.DocumentTypeId = input.DocumentTypeId;
                            val.LinkPath = input.LinkPath;
                            val.Remark = input.Remark;
                            val.UpdateBy = input.UpdateBy;
                            val.UpdatedOn = input.UpdatedOn;
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

        public Documentlist SaveFile(Documentlist input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Documentlist>();
                        Documentlist val = otable.Where(a => a.DocumentListId == input.DocumentListId.ToUpper() && a.BranchId.ToUpper() == input.BranchId.ToUpper()
                        && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล เอกสาร ในระบบ");

                        val.PathFile = input.PathFile;
                        val.NameFile = input.NameFile;
                        val.Size = input.Size;
                        val.Extension = input.Extension;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        context.SaveChanges();
                        input = val;
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

        public Documentlist Delete(Documentlist input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Documentlist>();
                        Documentlist val = otable.Where(a => a.DocumentListId == input.DocumentListId.ToUpper() && a.OwnerId == input.OwnerId.ToUpper() && a.BranchId == input.BranchId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล เอกสาร ในระบบ");

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
