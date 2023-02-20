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
    public class CustomerAssignRepository : IMauchlyCore.IMauchlyRepository<CustomerAssign, AuditDataContext>
    {
        public List<CustomerAssign> Get(string OwnerId,string BranchId,string CustomerId)
        {
            try
            {
                List<CustomerAssign> response = new List<CustomerAssign>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<CustomerAssign>();
                    var ptable = context.Set<VUserspermission>();
                    var utable = context.Set<User>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper()
                    && a.CustomerId.ToUpper() == CustomerId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    var atable = context.Set<Employee>();
                    foreach (CustomerAssign obj in response)
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
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CustomerAssign Save(CustomerAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerAssign>();
                        if (string.IsNullOrEmpty(input.AssignId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.AssignId = Guid.NewGuid().ToString().ToUpper();
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
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

        public CustomerAssign Disabled(CustomerAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerAssign>();
                        var ctable = context.Set<Userscustomer>();
                        CustomerAssign val = otable.Where(a => a.AssignId == input.AssignId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล พนักงานที่รับมอบหมาย ในระบบ");

                        val.IsActive = Common.NoActive;
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

        public CustomerAssign OnDisabled(CustomerAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerAssign>();
                        var ctable = context.Set<Userscustomer>();
                        CustomerAssign val = otable.Where(a => a.AssignId == input.AssignId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล พนักงานที่รับมอบหมาย ในระบบ");

                        val.IsActive = Common.IsActive;
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

        public CustomerAssign Delete(CustomerAssign input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<CustomerAssign>();
                        CustomerAssign val = otable.Where(a => a.AssignId == input.AssignId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล พนักงานที่รับมอบหมาย ในระบบ");

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
