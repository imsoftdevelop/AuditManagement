using Models;
using Models.Master;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Repository.Systems;

namespace Repository
{
    public class EmployeeRepository : IMauchlyCore.IMauchlyRepository<Employee, AuditDataContext>
    {
        public List<Employee> Get(string OwnerId)
        {
            try
            {
                List<Employee> response = new List<Employee>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Employee>();
                    var utable = context.Set<User>();
                    var ptable = context.Set<VUserspermission>();

                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper()
                        && a.IsDelete == Common.NoDelete).OrderByDescending(a => a.UpdatedOn).ToList();
                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<User>();
                        foreach (Employee obj in response)
                        {
                            obj.UserData = new User();
                            obj.UserData = utable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            obj.PermissionData = new VUserspermission();
                            obj.PermissionData = ptable.Where(a => a.UserId.ToUpper() == obj.UserData.UserId.ToUpper()).FirstOrDefault();
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

        public Employee GetWithKey(string EmpId)
        {
            try
            {
                Employee response = new Employee();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Employee>();
                    var utable = context.Set<User>();
                    var ptable = context.Set<VUserspermission>();

                    response = otable.Where(a => a.EmpId.ToUpper() == EmpId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();
                    response.UserData = new User();
                    response.UserData = utable.Where(a => a.EmpId.ToUpper() == response.EmpId.ToUpper()).FirstOrDefault();

                    response.PermissionData = new VUserspermission();
                    response.PermissionData = ptable.Where(a => a.UserId.ToUpper() == response.UserData.UserId.ToUpper()).FirstOrDefault();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Employee Save(Employee input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Employee>();
                        if (string.IsNullOrEmpty(input.EmpId))
                        {
                            string empid = Guid.NewGuid().ToString().ToUpper();
                            string usrid = Guid.NewGuid().ToString().ToUpper();

                            Employee val = otable.Where(a => a.Email.ToUpper() == input.Email.ToUpper() && a.OwnerId.ToUpper() == input.OwnerId.ToUpper() && a.IsActive == Common.IsActive).FirstOrDefault();
                            if (val != null)
                                throw new Exception("อีเมลนี้มีผู้ใช้งานแล้ว.");

                            PrefixRepository PrefixRepository = new PrefixRepository();

                            input.EmpId = empid;
                            input.EmpCode = string.IsNullOrEmpty(input.EmpCode) ? PrefixRepository.GetEmployeeCode(context, input.UpdateBy) : input.EmpCode;
                            input.RegisterDate = DateTime.Now;
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();

                            var utable = context.Set<User>();
                            input.UserData.UserId = usrid;
                            input.UserData.EmpId = empid;
                            input.UserData.ActiveDate = DateTime.Now;
                            input.UserData.ExpireDate = DateTime.Now.AddYears(10);
                            input.UserData.IsGoogle = Common.NoGoogle;
                            input.UserData.IsReset = Common.IsReset;
                            input.UserData.IsActive = Common.IsActive;
                            input.UserData.IsDelete = Common.NoDelete;
                            input.UserData.CreatedOn = input.UserData.UpdatedOn = input.UpdatedOn;
                            input.UserData.CreatedBy = input.UserData.UpdateBy = input.UpdateBy;
                            utable.Add(input.UserData);
                            context.SaveChanges();

                            if (input.PermissionData != null)
                            {
                                var ptable = context.Set<Userspermission>();
                                Userspermission permission = new Userspermission()
                                {
                                    UserId = usrid,
                                    PermissionCode = input.PermissionData.PermissionCode,
                                    IsDelete = Common.NoDelete,
                                    CreatedOn = input.UpdatedOn,
                                    CreatedBy = input.UpdateBy,
                                    UpdatedOn = input.UpdatedOn,
                                    UpdateBy = input.UpdateBy,
                                };
                                ptable.Add(permission);
                                context.SaveChanges();
                            }
                        }
                        else
                        {
                            Employee val = otable.Where(a => a.EmpId.ToUpper() == input.EmpId.ToUpper() && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูลพนักงานในระบบ");

                            val.EmpCode = input.EmpCode;
                            val.TitleName = input.TitleName;
                            val.FirstName = input.FirstName;
                            val.LastName = input.LastName;
                            val.FirstNameEn = input.FirstNameEn;
                            val.LastNameEn = input.LastNameEn;
                            val.Gender = input.Gender;
                            val.CitizenId = input.CitizenId;
                            val.Email = input.Email;
                            val.Address = input.Address;
                            val.Tambol = input.Tambol;
                            val.Amphur = input.Amphur;
                            val.Province = input.Province;
                            val.PostCode = input.PostCode;
                            val.MobilePhone = input.MobilePhone;
                            val.MobilePhone1 = input.MobilePhone1;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            if (!string.IsNullOrEmpty(input.IsActive))
                            {
                                var utable = context.Set<User>();
                                User usr = utable.Where(a => a.EmpId.ToUpper() == val.EmpId.ToUpper()).FirstOrDefault();
                                usr.IsActive = input.IsActive;
                                context.SaveChanges();

                                if (!string.IsNullOrEmpty(input.PermissionData.PermissionCode))
                                {
                                    var ptable = context.Set<Userspermission>();
                                    Userspermission pusr = ptable.Where(a => a.UserId.ToUpper() == usr.UserId.ToUpper()).FirstOrDefault();
                                    pusr.PermissionCode = input.PermissionData.PermissionCode;
                                    context.SaveChanges();
                                }
                            }

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

        public Employee SaveSignature(Employee input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Employee>();
                        Employee val = otable.Where(a => a.EmpId.ToUpper() == input.EmpId.ToUpper() && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูลพนักงานในระบบ");

                        val.SignImagePath = input.SignImagePath;
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

        public Employee Delete(Employee input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Employee>();
                        Employee val = otable.Where(a => a.EmpId.ToUpper() == input.EmpId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล พนักงาน ในระบบ");

                        val.IsDelete = Common.IsDelete;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;

                        var utable = context.Set<User>();
                        User usr = utable.Where(a => a.EmpId.ToUpper() == val.EmpId.ToUpper()).FirstOrDefault();
                        usr.IsDelete = Common.IsDelete;
                        context.SaveChanges();

                        var ptable = context.Set<Userspermission>().Where(a => a.UserId.ToUpper() == usr.UserId.ToUpper() && a.PermissionCode == Common.owner).FirstOrDefault();
                        if (ptable != null)
                        {
                            if (ptable.PermissionCode != null)
                                throw new Exception("ไม่สามารถลบข้อมูล ผู้ดูแลระบบได้");
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

        public List<Employee> GetEmpPermissionAssign(string OwnerId, string CustomerId)
        {
            try
            {
                List<Employee> response = new List<Employee>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Employee>();
                    var utable = context.Set<User>();
                    var ptable = context.Set<VUserspermission>();
                    var astable = context.Set<CustomerAssign>();
                    List<CustomerAssign> assign = new List<CustomerAssign>();
                    assign = astable.Where(a => a.CustomerId == CustomerId && a.IsDelete == Common.NoDelete).ToList();

                    string[] assary = assign.ConvertAll(a => a.EmpId).ToArray();
                   

                    if (assary.Length > 0)
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.IsActive == Common.IsActive && !assary.Contains(a.EmpId)
                        && a.IsDelete == Common.NoDelete).OrderByDescending(a => a.FirstName).ToList();
                    else
                        response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.IsActive == Common.IsActive
                            && a.IsDelete == Common.NoDelete).OrderByDescending(a => a.FirstName).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<User>();
                        foreach (Employee obj in response)
                        {
                            obj.UserData = new User();
                            obj.UserData = utable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            obj.PermissionData = new VUserspermission();
                            obj.PermissionData = ptable.Where(a => a.UserId.ToUpper() == obj.UserData.UserId.ToUpper()).FirstOrDefault();

                            if (obj.PermissionData != null)
                            {
                                obj.PermissionCode = obj.PermissionData.PermissionCode;
                                obj.PermissionName = obj.PermissionData.Name;
                            }
                        }
                    }
                }
                return response.Where(a => a.PermissionCode != Common.owner && a.PermissionCode != Common.cus && a.PermissionCode != Common.supadmin).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
