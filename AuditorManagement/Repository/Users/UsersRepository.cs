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
    public class UsersRepository : IMauchlyCore.IMauchlyRepository<User, AuditDataContext>
    {
        public User Authen(string Username, string Password)
        {
            try
            {
                User val = new User();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<User>();
                    val = otable.Where(a => a.Username.ToUpper() == Username.ToUpper() && a.Password == Password && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (val == null)
                        throw new Exception("กรุณาตรวจสอบ Username และ Password อีกครั้ง");

                    if (!string.IsNullOrEmpty(val.EmpId))
                    {
                        val.EmployeeData = new Employee();
                        val.EmployeeData = context.Set<Employee>().Where(a => a.EmpId.ToUpper() == val.EmpId.ToUpper()).FirstOrDefault();

                        if (!string.IsNullOrEmpty(val.EmployeeData.OwnerId))
                        {
                            val.OwnerData = new Owner();
                            val.OwnerData = context.Set<Owner>().Where(a => a.OwnerId.ToUpper() == val.EmployeeData.OwnerId.ToUpper()).FirstOrDefault();

                            val.PackageData = new Package();
                            val.PackageData = context.Set<Package>().Where(a => a.PackageId.ToUpper() == val.OwnerData.PackageId.ToUpper()).FirstOrDefault();

                            val.BranchData = new List<Branch>();
                            val.BranchData = context.Set<Branch>().Where(a => a.OwnerId.ToUpper() == val.EmployeeData.OwnerId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();

                        }
                    }
                    else if (!string.IsNullOrEmpty(val.UProfileId))
                    {
                        val.ProfileData = new CustomerInviteProfile();
                        val.ProfileData = context.Set<CustomerInviteProfile>().Where(a => a.ProfileId.ToUpper() == val.UProfileId.ToUpper()).FirstOrDefault();

                        val.UserCustomerData = new List<Userscustomer>();
                        val.UserCustomerData = context.Set<Userscustomer>().Where(a => a.UserId.ToUpper() == val.UserId.ToUpper()).ToList();

                    }

                    val.PermissionData = new List<VUserspermission>();
                    val.PermissionData = context.Set<VUserspermission>().Where(a => a.UserId.ToUpper() == val.UserId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();

                    if (val.IsActive == Common.NoActive)
                        throw new Exception("อีเมลนี้ถูกล็อค กรุณาติดต่อผู้ดูแลระบบ");

                    if (val.PermissionData == null)
                        throw new Exception("ไม่พบข้อมูลสิทธิการใช้งานระบบ กรุณาติดต่อผุ้ดูแลระบบ");

                }

                return val;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public User ChangePassword(User input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<User>();
                        User val = otable.Where(a => a.UserId.ToUpper() == input.UserId.ToUpper() && a.EmpId.ToUpper() == input.EmpId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูลพนักงานในระบบ");



                        val.Password = input.Password;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
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

        public User ForgetPassword(User input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<User>();
                        User val = otable.Where(a => a.Username.ToUpper() == input.Username.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูลพนักงานในระบบ");

                        val.Password = input.Password;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
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

        public User Register(User input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<User>();
                        var rtable = context.Set<Employee>();
                        var ptable = context.Set<Userspermission>();
                        var wtable = context.Set<Owner>();

                        Employee check = rtable.Where(a => a.Email.ToUpper() == input.EmployeeData.Email.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();
                        if (check != null)
                            throw new Exception("อีเมลนี้มีผุ้ใช้งานแล้ว กรุณาตรวจสอบอีกครั้ง.");

                        string empid = Guid.NewGuid().ToString().ToUpper();
                        string userid = Guid.NewGuid().ToString().ToUpper();
                        string ownerid = Guid.NewGuid().ToString().ToUpper();

                        input.UserId = userid;
                        input.EmpId = empid;
                        input.ActiveDate = DateTime.Now;
                        input.ExpireDate = DateTime.Now.AddYears(10);
                        input.IsGoogle = Common.NoGoogle;
                        input.IsReset = Common.NoReset;
                        input.IsActive = Common.IsActive;
                        input.IsDelete = Common.NoDelete;
                        input.CreatedOn = DateTime.Now;
                        input.CreatedBy = userid;
                        input.UpdatedOn = DateTime.Now;
                        input.UpdateBy = userid;
                        otable.Add(input);
                        context.SaveChanges();

                        PrefixRepository PrefixRepository = new PrefixRepository();
                        Employee emp = new Employee()
                        {
                            EmpId = empid,
                            OwnerId = ownerid,
                            EmpCode = PrefixRepository.GetEmployeeCode(context, userid),
                            FirstName = input.EmployeeData.FirstName,
                            LastName = input.EmployeeData.LastName,
                            FirstNameEn = input.EmployeeData.FirstNameEn,
                            LastNameEn = input.EmployeeData.LastNameEn,
                            CitizenId = input.EmployeeData.CitizenId,
                            MobilePhone = input.EmployeeData.MobilePhone,
                            Address = input.EmployeeData.Address,
                            Email = input.EmployeeData.Email,
                            RegisterDate = DateTime.Now,
                            IsActive = Common.IsActive,
                            IsDelete = Common.NoDelete,
                            CreatedOn = DateTime.Now,
                            CreatedBy = userid,
                            UpdatedOn = DateTime.Now,
                            UpdateBy = userid,
                        };
                        rtable.Add(emp); context.SaveChanges();

                        Userspermission per = new Userspermission()
                        {
                            UserId = userid,
                            PermissionCode = Common.owner,
                            IsDelete = Common.NoDelete,
                            CreatedOn = DateTime.Now,
                            CreatedBy = userid,
                            UpdatedOn = DateTime.Now,
                            UpdateBy = userid,
                        };
                        ptable.Add(per); context.SaveChanges();

                        Owner owner = new Owner()
                        {
                            OwnerId = ownerid,
                            EmpId = empid,
                            RegisterDate = DateTime.Now.Date,
                            ExpireDate = DateTime.Now.Date.AddYears(10),
                            PackageId = Common.FreePackage,
                            LastActivePackage = DateTime.Now.Date,
                            ExpirePackage = DateTime.Now.Date.AddYears(10),
                            IsActive = Common.IsActive,
                            IsDelete = Common.NoDelete,
                            CreatedOn = DateTime.Now,
                            CreatedBy = userid,
                            UpdatedOn = DateTime.Now,
                            UpdateBy = userid,
                        };
                        wtable.Add(owner);
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
