#pragma checksum "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Organizations\DocumentList.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "563a268856ac5bf7d67a8570352184408a2dc648"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Organizations_DocumentList), @"mvc.1.0.view", @"/Views/Organizations/DocumentList.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"563a268856ac5bf7d67a8570352184408a2dc648", @"/Views/Organizations/DocumentList.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ead68448a78493b9f1b96ab94b1b134c0b39571e", @"/Views/_ViewImports.cshtml")]
    public class Views_Organizations_DocumentList : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("text-muted"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("display:none"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "10", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "22", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "50", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "100", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 1 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Organizations\DocumentList.cshtml"
  
    Layout = null;

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div class=""container-fluid"" data-ng-init=""init()"">

    <div class=""row"">
        <div class=""col-sm-12"">
            <div class=""page-title-box"">
                <h4>เอกสาร</h4>
                <ol class=""breadcrumb m-0"">
                    <li class=""breadcrumb-item""><a href=""javascript: void(0);"">เอกสาร</a></li>
                    <li class=""breadcrumb-item""><a href=""javascript: void(0);"">ภาพรวมทั้งหมด</a></li>
                </ol>
            </div>
        </div>
    </div>

    <div class=""row"">

        <div class=""col-xl-12"">
            <div class=""card"">
                <div class=""card-body card-body-table"">
                    <div class=""row"">
                        <div class=""col-md-6"">
                            <h4 class=""card-title mb-3"">
                                <span class=""badge-table""><i class=""mdi mdi-playlist-minus mx-2""></i></span>
                                ตารางข้อมูลเอกสาร
                            </h4>
                        </div>
 ");
            WriteLiteral(@"                       <div class=""col-md-6"">
                            <div class=""d-flex flex-wrap  justify-content-end"">
                                <button type=""button"" class=""btn btn-primary waves-effect waves-light px-3 dropdown-toggle  mx-2 py-2"" ng-click=""OnClickAdd()"">
                                    <i class=""mdi mdi-file-upload mx-2""></i> อัพโหลดเอกสาร
                                </button>
                                <button type=""button"" class=""btn btn-outline-secondary waves-effect mx-2 py-2 px-3"" ng-click=""OnClickAddDocumentType()"">
                                    <i class=""mdi mdi-plus mx-2""></i> เพิ่มหมวดหมู่เอกสาร
                                </button>
                                <button type=""button"" class=""btn btn-outline-secondary waves-effect mx-2 py-2 px-3"" data-bs-toggle=""collapse"" href=""#collapseExample"" aria-expanded=""false"" aria-controls=""collapseExample"">
                                    <i class=""mdi mdi-filter-menu-outline mx-2""></i>ค้นหาข");
            WriteLiteral(@"ั้นสูง
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class=""row py-2 collapse"" id=""collapseExample"">
                        <div class=""col-md-4"">
                            <h4 class=""card-title mb-3"">
                                <span class=""badge-filter""><i class=""mdi mdi-filter mx-2""></i></span>
                                ค้นหาขั้นสูง
                            </h4>
                        </div>
                        <div class=""col-md-8"">
                            <div class=""row justify-content-end px-3"">
                                <div class=""col-lg-4 pl-0"">
                                    <div class=""form-input "">
                                        <select class=""dropdown2 form-control"" select2 id=""exampleFormControlSelect31"" ng-options=""item as item.Name for item in Parameter.DocumentStyle""
                      ");
            WriteLiteral("                          ng-model=\"Search.SelectStyle\">\r\n                                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc6489008", async() => {
                WriteLiteral("ทั้งหมด");
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
                                        <select class=""dropdown2 form-control"" select2 id=""exampleFormControlSelect31"" ng-options=""item as item.Name for item in Parameter.DocumentType""
                                                ng-model=""Search.SelectType"">
                                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc64811338", async() => {
                WriteLiteral("ทั้งหมด");
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
                                <div class=""col-lg-4 pl-0"">
                                    <div class=""form-input "">
                                        <select class=""dropdown2 form-control"" select2 id=""exampleFormControlSelect31"" ng-options=""item as item.Name for item in Parameter.Customer""
                                                ng-model=""Search.SelectCustomer"">
                                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc64813669", async() => {
                WriteLiteral("ทั้งหมด");
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
                        </div>
                        <div class=""col-md-4"">
                            <h4 class=""card-title mb-3"">
                            </h4>
                        </div>
                        <div class=""col-md-8"">
                            <div class=""row justify-content-end px-3"">
                                <div class=""col-lg-4 pl-0"">
                                    <div class=""form-input"">
                                        <div id=""input-search-start"" class=""input-group-date date datepicker no-border"">
                                            <input type=""text"" class=""form-element-input form-element-input-show input-group-addon"" ng-model=""Search.InputDateStart"" onkeydown=""r");
            WriteLiteral(@"eturn false"">
                                            <div class=""form-element-bar""></div>
                                            <label class=""form-element-label"" for=""name"">วันที่บันทึกเริ่มต้น</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""col-lg-4 pl-0"">
                                    <div class=""form-input"">
                                        <div id=""input-search-end"" class=""input-group-date date datepicker no-border"">
                                            <input type=""text"" class=""form-element-input form-element-input-show input-group-addon"" ng-model=""Search.InputDateEnd"" onkeydown=""return false"">
                                            <div class=""form-element-bar""></div>
                                            <label class=""form-element-label"" for=""name"">วันที่บันทึกสิ้นสุด</label>
                                        </d");
            WriteLiteral(@"iv>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div class=""row py-2"">
                        <div class=""col-md-6"">
                            <h4 class=""card-title mb-3"">
                                <span class=""badge-filter""><i class=""mdi mdi-layers-search mx-2""></i></span>
                                ค้นหา
                            </h4>
                        </div>
                        <div class=""col-md-6 "">
                            <div class=""row justify-content-end px-3"">
                                <div class=""col-md-7 gap-3 d-flex"">
                                    <div class=""input-group"">
                                        <div class=""input-group-text""><i class=""mdi mdi-information"" data-bs-toggle=""tooltip"" data-bs-placement=""left"" title=""เลขที่ , ชื่อเอกสาร""></i></div");
            WriteLiteral(@">
                                        <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""พิมพ์เพื่อค้นหา..."" ng-model=""Search.InputFilter"">
                                    </div>
                                    <button type=""button"" class=""btn-dbd waves-effect "" ng-click=""OnClickFilter()""><i class=""mdi mdi-magnify me-1""></i>ค้นหา</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""table-rep-plugin"">
                        <div class=""table-responsive mb-0"" data-pattern=""priority-columns"">
                            <table id=""tech-companies-1"" class=""table-data  table-striped"">
                                <thead>
                                    <tr class=""headerRow"">
                                        <th></th>
                                        <th width=""5%"">เลขที่</th>
                                        <th width=""1");
            WriteLiteral(@"5%"">ชื่อลูกค้า</th>
                                        <th width=""8%"">รูปแบบเอกสาร</th>
                                        <th width=""15%"">ประเภทเอกสาร</th>
                                        <th width=""15%"">ชื่อเอกสาร</th>
                                        <th width=""8%"">ขนาดเอกสาร</th>
                                        <th width=""10%"">วันที่เอกสาร</th>
                                        <th class=""text-center"">เพิ่มเติม</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat=""values in Table | offset: currentPage*itemsPerPage | limitTo: itemsPerPage  "">
                                        <th>{{values.Seq}}</th>
                                        <td ng-click=""OnClickTable(values)"" width=""50px""><span class=""text-link"">{{values.DocumentListCode}}</span></td>
                                        <td>{{values.CustomerName}}</td>
    ");
            WriteLiteral(@"                                    <td>{{values.DocumentStyleName}}</td>
                                        <td>{{values.DocumentTypeName}}</td>
                                        <td ng-click=""OnClickView(values)"">
                                            <i class=""mdi mdi-search-web""></i>
                                            <span ng-show=""values.DocumentStyleId == 'DS001'"" class=""text-link font-size-16"">{{values.NameFile}}</span>
                                            <span ng-show=""values.DocumentStyleId == 'DS002'"" class=""text-link font-size-16"">{{values.LinkPath}}</span>
                                        </td>
                                        <td>
                                            <span ng-show=""values.DocumentStyleId == 'DS001'"" class=""font-size-16"">{{values.Size | number : 2 }} MB.</span>
                                            <span ng-show=""values.DocumentStyleId == 'DS002'"" class=""font-size-16"">-</span>
                                 ");
            WriteLiteral(@"       </td>
                                        <td>{{values.CreatedOn}}</td>
                                        <td class=""text-center"">
                                            <button type=""button"" class=""btn btn-outline-dark waves-effect waves-light px-3 py-1 dropdown-toggle font-size-15""
                                                    data-bs-toggle=""dropdown"" aria-haspopup=""true"" aria-expanded=""false"">
                                                ตัวเลือก <i class=""mdi mdi-chevron-down""></i>
                                            </button>

                                            <div class=""dropdown-menu"" aria-labelledby=""btnGroupVerticalDrop1""");
            BeginWriteAttribute("style", " style=\"", 11647, "\"", 11655, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                                <a class=""dropdown-item font-size-15 cursor-pointer "" ng-click=""OnClickTable(values)""><i class=""mdi mdi-circle-edit-outline""></i> แก้ไข</a>
                                                <a class=""dropdown-item font-size-15 a-status-danger  cursor-pointer"" ng-click=""OnClickDelete(values)""> <i class=""mdi mdi-delete-circle-outline""></i> ลบ</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody ng-show=""Table == undefined || Table.length == 0"">
                                    <tr class=""text-center "">
                                        <td colspan=""8"" class=""empty"">
                                            <img");
            BeginWriteAttribute("src", " src=\"", 12512, "\"", 12569, 2);
#nullable restore
#line 179 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Organizations\DocumentList.cshtml"
WriteAttributeValue("", 12518, Url.Content("~/"), 12518, 18, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 12536, "assets/images/icons/icon-list.png", 12536, 33, true);
            EndWriteAttribute();
            WriteLiteral(@" width=""60"" class=""d-block m-auto"">
                                            ไม่พบรายการ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <div class=""d-flex justify-content-end"">
                                <div data-v-e8100c36="""" class=""numberShow"">
                                    <p class=""mr-2 mx-2 mb-0 font-size-16"">แสดง</p>
                                    <select class=""day form-control form-select form-select-sm"" style=""width: auto;"" ng-change=""OnClickChangePageTotal()"" ng-model=""itemsPerPage"">
                                        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc64824826", async() => {
                WriteLiteral("10");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_3.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                                        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc64826022", async() => {
                WriteLiteral("20");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                                        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc64827218", async() => {
                WriteLiteral("50");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_5.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                                        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "563a268856ac5bf7d67a8570352184408a2dc64828414", async() => {
                WriteLiteral("100");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_6.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                                    </select>
                                    <div data-v-76901dc6="""" class=""selectInputDropdown noLabel"" style=""width: 100%;"">
                                        <p class=""mr-2 mx-2 mb-0 font-size-16"">รายการ</p>
                                    </div>
                                </div>
                                <div data-v-e8100c36="""" class=""page-data"">
                                    <div data-v-e8100c36="""" class=""prevArrow"" ng-class=""prevPageDisabled()"" ng-click=""prevPage()"">
                                        <i data-v-e8100c36="""" class=""fa fa-chevron-left""></i>
                                    </div>
                                    <p data-v-e8100c36="""" class=""mr-2 mx-2 mb-0 font-size-16"">หน้า</p>
                                    <select class=""day form-control form-select form-select-sm"" style=""width: auto;"" ng-options=""item as item.name for item in retpage"" ng-model=""changePages"" ng-change=""setPage(item)"">
");
            WriteLiteral(@"                                    </select>
                                    <div data-v-e8100c36="""" class=""nextArrow"" ng-class=""nextPageDisabled()"" ng-click=""nextPage()"">
                                        <i data-v-e8100c36="""" class=""fa fa-chevron-right""></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- container-fluid -->
</div>

<!-- DocumentType -->
<div id=""ModalAdd"" class=""modal fade"" tabindex=""-1"" role=""dialog""
     aria-labelledby=""myModalLabel"" aria-hidden=""true"" data-bs-backdrop=""static"" data-bs-keyboard=""false"" tabindex=""-1"">
    <div class=""modal-dialog  modal-dialog-scrollable"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h2 class=""modal-title mt-0"" id=""myModalLabel"">
                    {{TableAddType.Action}}ข้อมูล C");
            WriteLiteral(@"ompany Document
                </h2>
                <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal""
                        aria-label=""Close""></button>
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
          ");
            WriteLiteral(@"                  <input id=""name"" class=""form-element-input form-element-input-show"" type=""input"" placeholder=""กรุณาระบุรหัส"" ng-model=""TableAddType.Code"" />
                            <div class=""form-element-bar""></div>
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
                            <input id=""name"" class=""form-element-input form-element-input-show"" type=""text"" placeholder=""กรุณาระบุชื่อ (TH)"" ng-model=""TableAddType.N");
            WriteLiteral(@"ame"" />
                            <div class=""form-element-bar""></div>
                            <label class=""form-element-label"" for=""name"">ชื่อข้อมูล (TH)</label>
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
                <button type=""bu");
            WriteLiteral(@"tton"" class=""btn btn-light waves-effect px-5 py-2"" data-bs-dismiss=""modal"">ยกเลิก</button>
                <div class=""btn-group"">
                    <button type=""button"" class=""btn btn-primary  waves-effect waves-light px-3 py-2 aksorn f-1-2"" ng-click=""OnClickSaveDocumentType()"">บันทึกเอกสาร</button>
                    <button type=""button"" class=""btn btn-primary   waves-effect waves-light px-2 py-1 dropdown-toggle dropdown-toggle-split"" data-bs-toggle=""dropdown"" aria-haspopup=""true"" aria-expanded=""false"">
                        <i class=""mdi mdi-chevron-down""></i>
                    </button>
                    <div class=""dropdown-menu"" aria-labelledby=""btnGroupVerticalDrop1""");
            BeginWriteAttribute("style", " style=\"", 19505, "\"", 19513, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                        <a class=""dropdown-item cursor-pointer"" ng-click=""OnClickSaveDocumentType('new')"">บันทึก และทำรายการใหม่</a>
                        <a class=""dropdown-item cursor-pointer"" ng-click=""OnClickSaveDocumentType('close')"">บันทึก และปิดหน้าต่าง</a>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div id=""ModalConfirm"" class=""modal fade"" tabindex=""-1"" role=""dialog""
     aria-labelledby=""myModalLabel"" aria-hidden=""true"" data-bs-backdrop=""static"" data-bs-keyboard=""false"" tabindex=""-1"">
    <div class=""modal-dialog  modal-dialog-scrollable"">
        <div class=""modal-content modal-sm"">
            <div class=""modal-header"">
                <h2 class=""modal-title mt-0"" id=""myModalLabel"">
                    ยืนยันทำรายการ
                </h2>
                <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal""
                        aria-label=""Clos");
            WriteLiteral(@"e""></button>

            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-md-12"">
                        <h3 class=""card-title mt-2 font-size-16 font-weight-bold"">ยืนยันทำรายการลบข้อมูล รหัส : {{TableAdd.DocumentListCode}}</h3>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-light waves-effect px-5 py-2"" data-bs-dismiss=""modal"">ยกเลิก</button>
                <button type=""button"" class=""btn btn-primary waves-effect waves-light px-5 py-2"" ng-click=""OnClickConfirm()"">
                    ยืนยัน
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->");
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
