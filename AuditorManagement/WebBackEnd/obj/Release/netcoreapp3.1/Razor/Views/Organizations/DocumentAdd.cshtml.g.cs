#pragma checksum "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Organizations\DocumentAdd.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "21d1e30e85f17af48786c7f01ecb389e93849e63"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Organizations_DocumentAdd), @"mvc.1.0.view", @"/Views/Organizations/DocumentAdd.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"21d1e30e85f17af48786c7f01ecb389e93849e63", @"/Views/Organizations/DocumentAdd.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ead68448a78493b9f1b96ab94b1b134c0b39571e", @"/Views/_ViewImports.cshtml")]
    public class Views_Organizations_DocumentAdd : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("text-muted"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("display:none"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Organizations\DocumentAdd.cshtml"
  
    Layout = null;

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div class=""container-fluid"" data-ng-init=""initAdd()"">

    <div class=""row"">
        <div class=""col-sm-9"">
            <div class=""page-title-box"">
                <h4>อัพโหลดเอกสาร</h4>
                <ol class=""breadcrumb m-0"">
                    <li class=""breadcrumb-item""><a href=""javascript: void(0);"">เอกสาร</a></li>
                    <li class=""breadcrumb-item""><a href=""javascript: void(0);"">อัพโหลดเอกสาร</a></li>
                </ol>
            </div>
        </div>
        <div class=""col-lg-3 pl-0 text-right"">
            <button type=""button"" class=""btn btn-outline-secondary waves-effect mx-2 py-2 px-3 mt-3"" ng-click=""OnClickAddDocumentType()"">
                <i class=""mdi mdi-plus mx-2""></i> เพิ่มหมวดหมู่เอกสาร
            </button>
        </div>
    </div>

    <div class=""row"">

        <div class=""col-xl-12"">
            <div class=""card "">
                <div class=""card-body card-form"">

                    <div class=""row"">
                        <div cla");
            WriteLiteral(@"ss=""col-md-9"">
                            <h2 class=""card-title mb-2"">ข้อมูลเอกสาร</h2>
                        </div>
                        
                        <div class=""col-lg-3 pl-0"">
                            <div class=""form-input"">
                                <input id=""name"" class=""form-element-input"" type=""text"" placeholder=""กรุณาระบุรหัส"" ng-model=""TableAdd.DocumentListCode"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">รหัสเอกสาร</label>
                                <label class=""form-element-required"" for=""name"">* </label>
                            </div>
                        </div>

                        <!-- end col -->
                    </div>
                    <hr />
                    <div class=""row row-form"">
                        <div class=""col-md-4"">
                            <h4 class=""card-title mb-2 font-weight-bold h4-flex""><i data");
            WriteLiteral(@"-v-4e8aa93a="""" class=""color-circle""></i>ข้อมูลลูกค้า</h4>
                        </div>
                        <div class=""col-lg-8 pl-0"">
                            <div class=""form-input "">
                                <select select2 class=""dropdown2 form-control"" id=""exampleFormControlSelect21"" ng-options=""item as item.CustomerCode + ' - ' + item.Name for item in Parameter.Customer""
                                        ng-model=""TableAdd.SelectCustomer"" ng-disabled=""TableAdd.DocumentListId != undefined"">
                                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "21d1e30e85f17af48786c7f01ecb389e93849e637231", async() => {
                WriteLiteral("กรุณาเลือก");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            BeginWriteTagHelperAttribute();
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __tagHelperExecutionContext.AddHtmlAttribute("selected", Html.Raw(__tagHelperStringValueBuffer), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.Minimized);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                                </select>
                                <label class=""form-element-dropdown"" for=""name"">ลูกค้า</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class=""row row-form"">
                        <div class=""col-md-4"">
                            <h4 class=""card-title mb-2 font-weight-bold h4-flex""><i data-v-4e8aa93a="""" class=""color-circle""></i>ข้อมูลเเอกสาร</h4>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input "">
                                <select select2 class=""dropdown2 form-control"" id=""exampleFormControlSelect2"" ng-options=""item as item.Name for item in Parameter.DocumentStyle""
                                        ng-model=""TableAdd.SelectDocumentStyle"" ng-disabled=""TableAdd.DocumentListId != undefined"">
                                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "21d1e30e85f17af48786c7f01ecb389e93849e639892", async() => {
                WriteLiteral("กรุณาเลือก");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            BeginWriteTagHelperAttribute();
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __tagHelperExecutionContext.AddHtmlAttribute("selected", Html.Raw(__tagHelperStringValueBuffer), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.Minimized);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                                </select>
                                <label class=""form-element-dropdown"" for=""name"">รูปแบบเอกสาร</label>
                            </div>
                        </div>
                        <div class=""col-lg-4 pl-0"">
                            <div class=""form-input "">
                                <select select2 class=""dropdown2 form-control"" id=""exampleFormControlSelect2"" ng-options=""item as item.Name for item in Parameter.DocumentType""
                                        ng-model=""TableAdd.SelectDocumentType"">
                                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "21d1e30e85f17af48786c7f01ecb389e93849e6312162", async() => {
                WriteLiteral("กรุณาเลือก");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            BeginWriteTagHelperAttribute();
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __tagHelperExecutionContext.AddHtmlAttribute("selected", Html.Raw(__tagHelperStringValueBuffer), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.Minimized);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                                </select>
                                <label class=""form-element-dropdown"" for=""name"">ประเภทเอกสาร</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class=""row  row-form "" ng-show=""TableAdd.SelectDocumentStyle.Code == 'DS001' || TableAdd.SelectDocumentStyle == undefined"">
                        <div class=""col-md-4"">
                            <h4 class=""card-title mb-2 font-weight-bold h4-flex""><i class=""color-circle""></i>อัพโหลด</h4>
                        </div>
                        <div class=""col-lg-8 pl-0"">
                            <input id=""product_thumnail"" type=""file"" ngf-select=""UploadFiles($files)""
                                   data-max-file-size=""3M"" data-allowed-file-extensions=""jpg png jpeg pdf xlsx xls"" ng-disabled=""TableAdd.DocumentListId != undefined"" />
                        </div>
                    </div>
             ");
            WriteLiteral(@"       <div class=""row  row-form "" ng-show=""TableAdd.SelectDocumentStyle.Code == 'DS002'"">
                        <div class=""col-md-4"">
                            <h4 class=""card-title mb-2 font-weight-bold h4-flex""><i class=""color-circle""></i>แหล่งที่มาข้อมูล</h4>
                        </div>
                        <div class=""col-lg-8 pl-0"">
                            <div class=""form-input"">
                                <input class=""form-element-input"" type=""url"" placeholder=""example* ( https://example.com )"" ng-model=""TableAdd.LinkPath"" />
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"">ลิ้งค์</label>
                                <label class=""form-element-required"">* </label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class=""row row-form "">
                        <div class=""col-md-4"">
  ");
            WriteLiteral(@"                          <h4 class=""card-title mb-2 font-weight-bold h4-flex""><i class=""color-circle""></i>หมายเหตุ</h4>
                        </div>
                        <div class=""col-lg-8 pl-0"">
                            <div class=""form-input"">
                                <textarea rows=""5"" id=""name"" class=""form-element-input form-element-input-textarea"" type=""text"" placeholder=""กรุณาระบุหมายเหตุ"" ng-model=""TableAdd.Remark""></textarea>
                                <div class=""form-element-bar""></div>
                                <label class=""form-element-label"" for=""name"">หมายเหตุ (ถ้ามี)</label>
                            </div>
                        </div>
                    </div>
                    <div class=""row mt-5"">
                        <div class=""col-md-12"">
                            <div class=""d-flex flex-wrap gap-3 justify-content-end"">
                                <button type=""button"" class=""btn btn-light waves-effect px-5 py-2"" ui-sref=""office-");
            WriteLiteral(@"documentlist"">ยกเลิก</button>
                                <div class=""btn-group"">
                                    <button type=""button"" class=""btn btn-primary  waves-effect waves-light px-3 py-2 aksorn f-1-2"" ng-click=""OnClickSave()"">บันทึกเอกสาร</button>
                                    <button type=""button"" class=""btn btn-primary   waves-effect waves-light px-2 py-1 dropdown-toggle dropdown-toggle-split"" data-bs-toggle=""dropdown"" aria-haspopup=""true"" aria-expanded=""false"">
                                        <i class=""mdi mdi-chevron-down""></i>
                                    </button>
                                    <div class=""dropdown-menu"" aria-labelledby=""btnGroupVerticalDrop1""");
            BeginWriteAttribute("style", " style=\"", 8302, "\"", 8310, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                        <a class=""dropdown-item cursor-pointer"" ng-click=""OnClickSave('back')"">บันทึก และย้อนกลับ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- DocumentType -->
<div id=""ModalAdd"" class=""modal fade"" tabindex=""-1"" role=""dialog""
     aria-labelledby=""myModalLabel"" aria-hidden=""true"" data-bs-backdrop=""static"" data-bs-keyboard=""false"" tabindex=""-1"">
    <div class=""modal-dialog  modal-dialog-scrollable"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h2 class=""modal-title mt-0"" id=""myModalLabel"">
                    {{TableAddType.Action}}ข้อมูล Company Document
                </h2>
                <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal""
                        aria-label=""Close");
            WriteLiteral(@"""></button>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-md-6"">
                        <h4 class=""card-title mt-2 font-size-16 font-weight-bold"">รายละเอียดข้อมูล</h4>
                    </div>
                    <div class=""col-md-2"">
                        <div class=""form-check form-switch form-switch-md mb-3"" dir=""ltr"">
                            <input type=""checkbox"" class=""form-check-input"" id=""customSwitchsizemd"" ng-model=""TableAddType.IsActive"">
                            <label class=""form-check-label mt-1"" for=""customSwitchsizemd"">ใช้งาน</label>
                        </div>
                    </div>
                    <div class=""col-md-4 d-flex flex-wrap  justify-content-end"">
                        <div class=""form-input"">
                            <input id=""name"" class=""form-element-input form-element-input-show"" type=""input"" placeholder=""กรุณาระบุรหัส"" ng-model=""TableAddType.Code"" />
  ");
            WriteLiteral(@"                          <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">รหัส</label>
                            <label class=""form-element-required"" for=""name"">* </label>
                        </div>
                    </div>
                </div>
                <div class=""row"">
                    <div class=""col-md-6"">
                        <h3 class=""card-title mt-2 font-size-16 font-weight-bold"">ข้อมูล FS Group</h3>
                    </div>
                </div>
                <div class=""row py-2"">
                    <div class=""col-lg-6 pl-0"">
                        <div class=""form-input"">
                            <input id=""name"" class=""form-element-input form-element-input-show"" type=""text"" placeholder=""กรุณาระบุชื่อ (TH)"" ng-model=""TableAddType.Name"" />
                            <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">ชื่อข้อมูล (TH");
            WriteLiteral(@")</label>
                            <label class=""form-element-required"" for=""name"">* </label>
                        </div>
                    </div>
                    <div class=""col-lg-6 pl-0"">
                        <div class=""form-input"">
                            <input id=""name"" class=""form-element-input form-element-input-show"" type=""text"" placeholder=""กรุณาระบุชื่อ (EN)"" ng-model=""TableAddType.NameEn"" />
                            <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">ชื่อข้อมูล (EN)</label>
                            <label class=""form-element-required"" for=""name"">* </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-light waves-effect px-5 py-2"" data-bs-dismiss=""modal"">ยกเลิก</button>
                <div class=""btn-group"">
                    <button t");
            WriteLiteral(@"ype=""button"" class=""btn btn-primary  waves-effect waves-light px-3 py-2 aksorn f-1-2"" ng-click=""OnClickSaveDocumentType()"">บันทึกเอกสาร</button>
                    <button type=""button"" class=""btn btn-primary   waves-effect waves-light px-2 py-1 dropdown-toggle dropdown-toggle-split"" data-bs-toggle=""dropdown"" aria-haspopup=""true"" aria-expanded=""false"">
                        <i class=""mdi mdi-chevron-down""></i>
                    </button>
                    <div class=""dropdown-menu"" aria-labelledby=""btnGroupVerticalDrop1""");
            BeginWriteAttribute("style", " style=\"", 12944, "\"", 12952, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                        <a class=""dropdown-item cursor-pointer"" ng-click=""OnClickSaveDocumentType('new')"">บันทึก และทำรายการใหม่</a>
                        <a class=""dropdown-item cursor-pointer"" ng-click=""OnClickSaveDocumentType('close')"">บันทึก และปิดหน้าต่าง</a>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->");
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