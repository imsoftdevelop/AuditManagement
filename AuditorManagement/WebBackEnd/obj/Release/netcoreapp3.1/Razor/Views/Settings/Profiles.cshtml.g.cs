#pragma checksum "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Settings\Profiles.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c7a04d63d99fe188c7601318fb6f50226824c45f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Settings_Profiles), @"mvc.1.0.view", @"/Views/Settings/Profiles.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\_ViewImports.cshtml"
using WebBackEnd;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\_ViewImports.cshtml"
using WebBackEnd.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c7a04d63d99fe188c7601318fb6f50226824c45f", @"/Views/Settings/Profiles.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ead68448a78493b9f1b96ab94b1b134c0b39571e", @"/Views/_ViewImports.cshtml")]
    public class Views_Settings_Profiles : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Settings\Profiles.cshtml"
  
    Layout = null;

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""container-fluid"" data-ng-init=""init()"">

    <div class=""row"">
        <div class=""col-sm-12"">
            <div class=""page-title-box"">
                <h4>ข้อมูลส่วนตัว</h4>
                <ol class=""breadcrumb m-0"">
                    <li class=""breadcrumb-item""><a href=""javascript: void(0);"">ตั้งค่า</a></li>
                    <li class=""breadcrumb-item""><a href=""javascript: void(0);"">ข้อมูลส่วนตัว</a></li>
                </ol>
            </div>
        </div>
    </div>

    <div class=""row"">
        <div class=""col-xl-4"">
            <div class=""card"">
                <div class=""card-body card-body-table"">
                    <div class=""text-center bg-light rounded px-4 py-3"">
                        <div class=""chat-user-status"">
                            <img");
            BeginWriteAttribute("src", " src=\"", 846, "\"", 901, 2);
#nullable restore
#line 25 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Settings\Profiles.cshtml"
WriteAttributeValue("", 852, Url.Content("~/"), 852, 18, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 870, "assets/images/icons/profile.png", 870, 31, true);
            EndWriteAttribute();
            WriteLiteral(" class=\"avatar-xl rounded-circle\"");
            BeginWriteAttribute("alt", " alt=\"", 935, "\"", 941, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                        </div>
                        <h5 class=""font-size-16 mb-1 mt-3 font-weight-bold"">ชื่อ - นามสกุล</h5>
                        <h5 class=""font-size-16 mb-1 mt-3"">{{Profiles.EmployeeData.FirstName}} {{Profiles.EmployeeData.LastName}}</h5>
                        <p class=""text-muted mb-0"">{{Profiles.EmployeeData.FirstNameEn}} {{Profiles.EmployeeData.LastNameEn}}</p>
                        <h5 class=""font-size-16 mb-1 mt-3 font-weight-bold"">เบอร์โทรศัพท์</h5>
                        <h5 class=""font-size-16 mb-1 mt-3"">{{Profiles.EmployeeData.MobilePhone}}</h5>
                        <h5 class=""font-size-16 mb-1 mt-3 font-weight-bold"">อีเมล</h5>
                        <h5 class=""font-size-16 mb-1 mt-3"">{{Profiles.EmployeeData.Email}}</h5>
                        <h5 class=""font-size-16 mb-1 mt-3 font-weight-bold"">ตำแหน่ง</h5>
                        <h5 class=""font-size-16 mb-1 mt-3"" ng-repeat=""val in Profiles.PermissionData"">{{val.Name}}</h5>
");
            WriteLiteral(@"                    </div>
                </div>
            </div>
        </div>
        <div class=""col-xl-8"">
            <div class=""card"">
                <div class=""card-body card-form"">
                    <div class=""row"">
                        <div class=""col-md-6"">
                            <h4 class=""card-title mt-2 font-weight-bold h4-flex"">ข้อมูลโปรไฟล์</h4>
                        </div>
                        <div class=""col-md-6 justify-content-end text-right"">
                            <button type=""button"" class=""btn btn-outline-info waves-effect px-3 mx-3"" ng-click=""OnClickChange()"">เปลี่ยนรหัสผ่าน</button>
                            <button type=""button"" class=""btn btn-primary waves-effect px-4 mx-3"" ng-click=""OnClickSave()"">บันทึกข้อมูล</button>
                        </div>
                    </div>
                    <hr />
                    <div class=""row row-form"">
                        <div class=""col-md-4 "">
                            <h4 class");
            WriteLiteral(@"=""card-title mb-2 font-weight-bold h4-flex""><i data-v-4e8aa93a="""" class=""color-circle""></i>ข้อมูลทั่วไป</h4>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=""กรุณาระบุชื่อ"" ng-model=""Profiles.EmployeeData.FirstName"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">ชื่อ ( TH )</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=""กรุณาระบุนามสกุล"" ng-model=""Profiles.EmployeeData.LastName"" />
          ");
            WriteLiteral(@"                      <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">นามสกุล ( TH )</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>
                    </div>
                    <div class=""row row-form"">
                        <div class=""col-md-4"">
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=""กรุณาระบุชื่อ"" ng-model=""Profiles.EmployeeData.FirstNameEn"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">ชื่อ ( EN )</label>
                                <label class=""form-element-required"" for=""name"">* </label>
              ");
            WriteLiteral(@"              </div>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=""กรุณาระบุนามสกุล"" ng-model=""Profiles.EmployeeData.LastNameEn"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">นามสกุล ( EN )</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>
                    </div>
                    <div class=""row row-form"">
                        <div class=""col-md-4"">
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=");
            WriteLiteral(@"""กรุณาระบุเบอร์โทรศัพท์"" ng-model=""Profiles.EmployeeData.MobilePhone"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">เบอร์โทรศัพท์</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=""กรุณาระบุอีเมล"" ng-model=""Profiles.EmployeeData.Email"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">อีเมล</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>
                    </div>
  ");
            WriteLiteral(@"                  <div class=""row row-form"">
                        <div class=""col-md-4"">
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""input"" placeholder=""กรุณาระบุเลขเสียภาษี"" ng-model=""Profiles.EmployeeData.CitizenId"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">เลขที่บัตรประชาชน</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input"">
                                <div id=""inputreceivechaque-popup"" class=""input-group-date date datepicker no-border"">
                                    <input type=""text"" clas");
            WriteLiteral(@"s=""form-element-input input-group-addon"" onkeydown=""return false"" ng-model=""Profiles.EmployeeData.RegisterDate"">
                                    <div class=""form-element-bar""></div>
                                    <label class=""form-element-label"" for=""name"">วันที่เริ่มต้นทำงาน</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div class=""row row-form"">
                        <div class=""col-md-4 "">
                            <h4 class=""card-title mb-2 font-weight-bold h4-flex""><i data-v-4e8aa93a="""" class=""color-circle""></i>ลายเซ็น</h4>
                        </div>
                        <div class=""col-md-8 "">
                            <input id=""product_thumnail"" type=""file"" ngf-select=""UploadFiles($files)""
                                   data-max-file-size=""3M"" data-allowed-file-extensions=""jpg png jpeg"" />
                        </div>");
            WriteLiteral(@"
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- container-fluid -->
<!-- sample modal content -->
<div id=""ModalChangePassword"" class=""modal fade"" tabindex=""-1"" role=""dialog""
     aria-labelledby=""myModalLabel"" aria-hidden=""true"" data-bs-backdrop=""static"" data-bs-keyboard=""false"" tabindex=""-1"">
    <div class=""modal-dialog modal-dialog-scrollable "">
        <div class=""modal-content modal-sm"">
            <div class=""modal-header"">
                <h2 class=""modal-title mt-0"" id=""myModalLabel"">
                    เปลี่ยนรหัสผ่าน
                </h2>
                <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal""
                        aria-label=""Close""></button>
            </div>
            <div class=""modal-body"">
                <div class=""row py-2"">
                    <div class=""col-md-12"">
                        <div class=""form-input"">
                            <input id=""pass"" class=""form-elem");
            WriteLiteral(@"ent-input"" type=""password"" autocomplete=""off"" placeholder=""กรุณาระบุรหัสผ่านปัจจุบัน"" ng-model=""ChangePassword.Password"" />
                            <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">รหัสผ่านปัจจุบัน</label>
                            <label class=""form-element-required"" for=""name"">* </label>
                        </div>
                    </div>
                </div>
                <div class=""row py-2"">
                    <div class=""col-lg-12 pl-0"">
                        <div class=""form-input"">
                            <input id=""passnew"" class=""form-element-input"" type=""password"" autocomplete=""off"" placeholder=""กรุณาระบุรหัสผ่านใหม่"" ng-model=""ChangePassword.NewPassword "" />
                            <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">รหัสผ่านใหม่</label>
                            <label class=""form-element-required"" for=""na");
            WriteLiteral(@"me"">* </label>
                        </div>
                    </div>
                </div>
                <div class=""row py-2"">
                    <div class=""col-lg-12 pl-0"">
                        <div class=""form-input"">
                            <input id=""passnew1"" class=""form-element-input"" type=""password"" autocomplete=""off"" placeholder=""กรุณาระบุยืนยันรหัสผ่านใหม่"" ng-model=""ChangePassword.ConfirmNewPassword"" />
                            <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">ยืนยันรหัสผ่านใหม่</label>
                            <label class=""form-element-required"" for=""name"">* </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-light waves-effect px-5 py-2"" data-bs-dismiss=""modal"">ยกเลิก</button>
                <button type=""button"" class=""btn btn-primar");
            WriteLiteral("y waves-effect waves-light px-5 py-2\" ng-click=\"OnClickSavePassword()\">ยืนยัน</button>\r\n            </div>\r\n        </div><!-- /.modal-content -->\r\n    </div><!-- /.modal-dialog -->\r\n</div>\r\n<!-- /.modal -->\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
