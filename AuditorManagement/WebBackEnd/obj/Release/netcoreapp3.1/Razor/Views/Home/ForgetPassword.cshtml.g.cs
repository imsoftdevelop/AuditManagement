#pragma checksum "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Home\ForgetPassword.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "69e86295bd51316c71d0fd0d73822facfc94e95c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_ForgetPassword), @"mvc.1.0.view", @"/Views/Home/ForgetPassword.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"69e86295bd51316c71d0fd0d73822facfc94e95c", @"/Views/Home/ForgetPassword.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ead68448a78493b9f1b96ab94b1b134c0b39571e", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_ForgetPassword : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal mt-4"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Home\ForgetPassword.cshtml"
  
    Layout = null;

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<!-- Begin page -->
<div class=""account-pages my-5 pt-sm-3"" data-ng-init=""init()"">
    <div class=""container"">
        <div class=""row justify-content-center"">
            <div class=""col-md-10 col-lg-8 col-xl-7"">
                <div class=""card overflow-hidden rounded-4"">
                    <div class=""card-body pt-0 rounded-4"">

                        <div class=""mb-3 row mt-4"">
                            <div class=""col-md-1"">
                            </div>
                            <div class=""col-10 text-left justify-content-end"">
                                <a ui-sref=""login"" class=""text-search font-size-14""><i class=""mdi mdi-less-than""></i>ย้อนกลับ</a>
                            </div>
                            <div class=""col-md-1"">
                            </div>
                        </div>

                        <h3 class=""text-center mt-5 mb-4"">
                            <a href=""index.html"" class=""d-block auth-logo"">
                                <i");
            WriteLiteral("mg");
            BeginWriteAttribute("src", " src=\"", 1053, "\"", 1105, 2);
#nullable restore
#line 24 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Home\ForgetPassword.cshtml"
WriteAttributeValue("", 1059, Url.Content("~/"), 1059, 18, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1077, "assets/images/logo-light.png", 1077, 28, true);
            EndWriteAttribute();
            BeginWriteAttribute("alt", " alt=\"", 1106, "\"", 1112, 0);
            EndWriteAttribute();
            WriteLiteral(" height=\"60\" class=\"auth-logo-dark\">\r\n                                <img");
            BeginWriteAttribute("src", " src=\"", 1187, "\"", 1239, 2);
#nullable restore
#line 25 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Home\ForgetPassword.cshtml"
WriteAttributeValue("", 1193, Url.Content("~/"), 1193, 18, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1211, "assets/images/logo-light.png", 1211, 28, true);
            EndWriteAttribute();
            BeginWriteAttribute("alt", " alt=\"", 1240, "\"", 1246, 0);
            EndWriteAttribute();
            WriteLiteral(@" height=""30"" class=""auth-logo-light"">
                            </a>
                        </h3>

                        <div class=""p-3"">
                            <h2 class=""text-muted font-size-24 mb-1 text-center"">กำหนดรหัสผ่านใหม่</h2>
                            <p class=""text-muted text-center font-size-16"">ลิงก์สำหรับการกำหนดรหัสผ่านใหม่จะถูกส่งไปยังอีเมลที่คุณใช้สมัคร<p>
                                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "69e86295bd51316c71d0fd0d73822facfc94e95c6771", async() => {
                WriteLiteral(@"
                                    <div class=""row row-form"">
                                        <div class=""col-md-1"">
                                        </div>
                                        <div class=""col-lg-10 pl-0"">
                                            <div class=""form-input"">
                                                <input id=""name"" class=""form-element-input form-element-input-show"" type=""email"" placeholder=""กรุณากรอกอีเมล ( exmaple@mail.com )"" ng-model=""ForgetPassword.Email"" />
                                                <div class=""form-element-bar""></div>
                                                <label class=""form-element-label font-weight-bold"" for=""name"">อีเมล</label>
                                                <label class=""form-element-required"" for=""name"">* </label>
                                            </div>
                                        </div>
                                        <div class=""col-md-1"">
        ");
                WriteLiteral(@"                                </div>
                                    </div>

                                    <div class=""mb-3 row mt-4"">
                                        <div class=""col-md-1"">
                                        </div>
                                        <div class=""col-md-10"">
                                            <div class=""d-grid"">
                                                <button type=""button"" class=""btn btn-primary btn-lg waves-effect waves-light"" ng-click=""OnClickConfirm()"">ยืนยันเพื่อส่งอีเมลเปลี่ยนรหัสผ่าน</button>
                                            </div>
                                        </div>
                                        <div class=""col-md-1"">
                                        </div>
                                    </div>
                                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- END layout-wrapper -->\r\n");
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
