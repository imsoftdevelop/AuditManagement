#pragma checksum "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Home\IndexOffice.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f97a6d689e6f2d5493f59cd2d95d0afc688fabba"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_IndexOffice), @"mvc.1.0.view", @"/Views/Home/IndexOffice.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f97a6d689e6f2d5493f59cd2d95d0afc688fabba", @"/Views/Home/IndexOffice.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ead68448a78493b9f1b96ab94b1b134c0b39571e", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_IndexOffice : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "E:\IM-Soft\_ระบบจัดการบัญชี Source Code\Auditor Source Code\AuditorManagement\WebBackEnd\Views\Home\IndexOffice.cshtml"
  
    Layout = "_LayoutOffice";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div class=""container-fluid"">

    <div class=""row"">
        <div class=""col-xl-3 col-sm-6"">
            <div class=""card mini-stat bg-primary"">
                <div class=""card-body mini-stat-img"">
                    <div class=""mini-stat-icon"">
                        <i class=""mdi mdi-cube-outline float-end""></i>
                    </div>
                    <div class=""text-white"">
                        <h6 class=""text-uppercase mb-3 font-size-16 text-white"">Orders</h6>
                        <h2 class=""mb-4 text-white"">1,587</h2>
                        <span class=""badge bg-info""> +11% </span> <span class=""ms-2"">From previous period</span>
                    </div>
                </div>
            </div>
        </div>
        <div class=""col-xl-3 col-sm-6"">
            <div class=""card mini-stat bg-primary"">
                <div class=""card-body mini-stat-img"">
                    <div class=""mini-stat-icon"">
                        <i class=""mdi mdi-buffer float-end""></i>");
            WriteLiteral(@"
                    </div>
                    <div class=""text-white"">
                        <h6 class=""text-uppercase mb-3 font-size-16 text-white"">Revenue</h6>
                        <h2 class=""mb-4 text-white"">$46,782</h2>
                        <span class=""badge bg-danger""> -29% </span> <span class=""ms-2"">From previous period</span>
                    </div>
                </div>
            </div>
        </div>
        <div class=""col-xl-3 col-sm-6"">
            <div class=""card mini-stat bg-primary"">
                <div class=""card-body mini-stat-img"">
                    <div class=""mini-stat-icon"">
                        <i class=""mdi mdi-tag-text-outline float-end""></i>
                    </div>
                    <div class=""text-white"">
                        <h6 class=""text-uppercase mb-3 font-size-16 text-white"">Average Price</h6>
                        <h2 class=""mb-4 text-white"">$15.9</h2>
                        <span class=""badge bg-warning""> 0% </span> <span");
            WriteLiteral(@" class=""ms-2"">From previous period</span>
                    </div>
                </div>
            </div>
        </div>
        <div class=""col-xl-3 col-sm-6"">
            <div class=""card mini-stat bg-primary"">
                <div class=""card-body mini-stat-img"">
                    <div class=""mini-stat-icon"">
                        <i class=""mdi mdi-briefcase-check float-end""></i>
                    </div>
                    <div class=""text-white"">
                        <h6 class=""text-uppercase mb-3 font-size-16 text-white"">Product Sold</h6>
                        <h2 class=""mb-4 text-white"">1890</h2>
                        <span class=""badge bg-info""> +89% </span> <span class=""ms-2"">From previous period</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class=""row"">

        <div class=""col-xl-3"">
            <div class=""card"">
                <div class=""card-body"">
               ");
            WriteLiteral(@"     <h4 class=""card-title mb-4"">Monthly Earnings</h4>

                    <div class=""row text-center mt-4"">
                        <div class=""col-6"">
                            <h5 class=""font-size-20"">$56241</h5>
                            <p class=""text-muted"">Marketplace</p>
                        </div>
                        <div class=""col-6"">
                            <h5 class=""font-size-20"">$23651</h5>
                            <p class=""text-muted"">Total Income</p>
                        </div>
                    </div>

                    <div id=""morris-donut-example"" data-colors='[""#f0f1f4"",""--bs-primary"",""--bs-info""]' class=""morris-charts morris-charts-height"" dir=""ltr""></div>
                </div>
            </div>
        </div>

        <div class=""col-xl-6"">
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card-title mb-4"">Email Sent</h4>

                    <div class=""row text-center mt-4"">
    ");
            WriteLiteral(@"                    <div class=""col-4"">
                            <h5 class=""font-size-20"">$ 89425</h5>
                            <p class=""text-muted"">Marketplace</p>
                        </div>
                        <div class=""col-4"">
                            <h5 class=""font-size-20"">$ 56210</h5>
                            <p class=""text-muted"">Total Income</p>
                        </div>
                        <div class=""col-4"">
                            <h5 class=""font-size-20"">$ 8974</h5>
                            <p class=""text-muted"">Last Month</p>
                        </div>
                    </div>

                    <div id=""morris-area-example"" data-colors='[""#f0f1f4"",""--bs-primary"",""--bs-info""]' class=""morris-charts morris-charts-height"" dir=""ltr""></div>
                </div>
            </div>
        </div>

        <div class=""col-xl-3"">
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card");
            WriteLiteral(@"-title mb-4"">Monthly Earnings</h4>

                    <div class=""row text-center mt-4"">
                        <div class=""col-6"">
                            <h5 class=""font-size-20"">$ 2548</h5>
                            <p class=""text-muted"">Marketplace</p>
                        </div>
                        <div class=""col-6"">
                            <h5 class=""font-size-20"">$ 6985</h5>
                            <p class=""text-muted"">Total Income</p>
                        </div>
                    </div>

                    <div id=""morris-bar-stacked"" data-colors='[""--bs-info"",""#f0f1f4""]' class=""morris-charts morris-charts-height"" dir=""ltr""></div>
                </div>
            </div>
        </div>

    </div>
    <!-- end row -->

    <div class=""row"">

        <div class=""col-xl-4 col-lg-6"">
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card-title mb-3"">Inbox</h4>
                    <div class=""in");
            WriteLiteral(@"box-wid"">
                        <a href=""#"" class=""text-dark"">
                            <div class=""inbox-item"">
                                <div class=""inbox-item-img float-start me-3""><img src=""assets/images/users/user-1.jpg"" class=""avatar-sm rounded-circle""");
            BeginWriteAttribute("alt", " alt=\"", 6454, "\"", 6460, 0);
            EndWriteAttribute();
            WriteLiteral(@"></div>
                                <h6 class=""inbox-item-author mb-1 font-size-16"">Misty</h6>
                                <p class=""inbox-item-text text-muted mb-0"">Hey! there I'm available...</p>
                                <p class=""inbox-item-date text-muted"">13:40 PM</p>
                            </div>
                        </a>
                        <a href=""#"" class=""text-dark"">
                            <div class=""inbox-item"">
                                <div class=""inbox-item-img float-start me-3""><img src=""assets/images/users/user-2.jpg"" class=""avatar-sm rounded-circle""");
            BeginWriteAttribute("alt", " alt=\"", 7081, "\"", 7087, 0);
            EndWriteAttribute();
            WriteLiteral(@"></div>
                                <h6 class=""inbox-item-author mb-1 font-size-16"">Melissa</h6>
                                <p class=""inbox-item-text text-muted mb-0"">I've finished it! See you so...</p>
                                <p class=""inbox-item-date text-muted"">13:34 PM</p>
                            </div>
                        </a>
                        <a href=""#"" class=""text-dark"">
                            <div class=""inbox-item"">
                                <div class=""inbox-item-img float-start me-3""><img src=""assets/images/users/user-3.jpg"" class=""avatar-sm rounded-circle""");
            BeginWriteAttribute("alt", " alt=\"", 7714, "\"", 7720, 0);
            EndWriteAttribute();
            WriteLiteral(@"></div>
                                <h6 class=""inbox-item-author mb-1 font-size-16"">Dwayne</h6>
                                <p class=""inbox-item-text text-muted mb-0"">This theme is awesome!</p>
                                <p class=""inbox-item-date text-muted"">13:17 PM</p>
                            </div>
                        </a>
                        <a href=""#"" class=""text-dark"">
                            <div class=""inbox-item"">
                                <div class=""inbox-item-img float-start me-3""><img src=""assets/images/users/user-4.jpg"" class=""avatar-sm rounded-circle""");
            BeginWriteAttribute("alt", " alt=\"", 8337, "\"", 8343, 0);
            EndWriteAttribute();
            WriteLiteral(@"></div>
                                <h6 class=""inbox-item-author mb-1 font-size-16"">Martin</h6>
                                <p class=""inbox-item-text text-muted mb-0"">Nice to meet you</p>
                                <p class=""inbox-item-date text-muted"">12:20 PM</p>
                            </div>
                        </a>
                        <a href=""#"" class=""text-dark"">
                            <div class=""inbox-item"">
                                <div class=""inbox-item-img float-start me-3""><img src=""assets/images/users/user-5.jpg"" class=""avatar-sm rounded-circle""");
            BeginWriteAttribute("alt", " alt=\"", 8954, "\"", 8960, 0);
            EndWriteAttribute();
            WriteLiteral(@"></div>
                                <h6 class=""inbox-item-author mb-1 font-size-16"">Vincent</h6>
                                <p class=""inbox-item-text text-muted mb-0"">Hey! there I'm available...</p>
                                <p class=""inbox-item-date text-muted"">11:47 AM</p>
                            </div>
                        </a>

                        <a href=""#"" class=""text-dark"">
                            <div class=""inbox-item"">
                                <div class=""inbox-item-img float-start me-3""><img src=""assets/images/users/user-6.jpg"" class=""avatar-sm rounded-circle""");
            BeginWriteAttribute("alt", " alt=\"", 9585, "\"", 9591, 0);
            EndWriteAttribute();
            WriteLiteral(@"></div>
                                <h6 class=""inbox-item-author mb-1 font-size-16"">Robert Chappa</h6>
                                <p class=""inbox-item-text text-muted mb-0"">Hey! there I'm available...</p>
                                <p class=""inbox-item-date text-muted"">10:12 AM</p>
                            </div>
                        </a>

                    </div>
                </div>
            </div>

        </div>
        <div class=""col-xl-4 col-lg-6"">
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card-title mb-4"">Recent Activity Feed</h4>

                    <ol class=""activity-feed mb-0"">
                        <li class=""feed-item"">
                            <div class=""feed-item-list"">
                                <span class=""date"">Jun 25</span>
                                <span class=""activity-text"">Responded to need “Volunteer Activities”</span>
                            </div>
    ");
            WriteLiteral(@"                    </li>
                        <li class=""feed-item"">
                            <div class=""feed-item-list"">
                                <span class=""date"">Jun 24</span>
                                <span class=""activity-text"">Added an interest “Volunteer Activities”</span>
                            </div>
                        </li>
                        <li class=""feed-item"">
                            <div class=""feed-item-list"">
                                <span class=""date"">Jun 23</span>
                                <span class=""activity-text"">Joined the group “Boardsmanship Forum”</span>
                            </div>
                        </li>
                        <li class=""feed-item"">
                            <div class=""feed-item-list"">
                                <span class=""date"">Jun 21</span>
                                <span class=""activity-text"">Responded to need “In-Kind Opportunity”</span>
                       ");
            WriteLiteral(@"     </div>
                        </li>
                    </ol>

                    <div class=""text-center"">
                        <a href=""#"" class=""btn btn-sm btn-primary"">Load More</a>
                    </div>
                </div>
            </div>

        </div>
        <div class=""col-xl-4"">
            <div class=""card widget-user"">
                <div class=""widget-user-desc p-4 text-center bg-primary position-relative"">
                    <i class=""fas fa-quote-left h2 text-white-50""></i>
                    <p class=""text-white mb-0"">The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe the same vocabulary. The languages only in their grammar.</p>
                </div>
                <div class=""p-4"">
                    <div class=""float-start mt-2 me-3"">
                        <img src=""assets/images/users/user-2.jpg""");
            BeginWriteAttribute("alt", " alt=\"", 12594, "\"", 12600, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""rounded-circle avatar-sm"">
                    </div>
                    <h6 class=""mb-1 font-size-16 mt-2"">Marie Minnick</h6>
                    <p class=""text-muted mb-0"">Marketing Manager</p>
                </div>
            </div>
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card-title mb-4"">Yearly Sales</h4>
                    <div class=""row"">
                        <div class=""col-md-4"">
                            <div>
                                <h3>52,345</h3>
                                <p class=""text-muted"">The languages only differ grammar</p>
                                <a href=""#"" class=""text-primary"">Learn more <i class=""mdi mdi-chevron-double-right""></i></a>
                            </div>
                        </div>
                        <div class=""col-md-8 text-end"">
                            <div id=""sparkline"" data-colors='[""--bs-primary""]'></div>
                        </div");
            WriteLiteral(@">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- end row -->

    <div class=""row"">
        <div class=""col-xl-6"">
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card-title mb-4"">Latest Transactions</h4>

                    <div class=""table-responsive"">
                        <table class=""table align-middle table-centered table-vertical table-nowrap"">

                            <tbody>
                                <tr>
                                    <td>
                                        <img src=""assets/images/users/user-2.jpg"" alt=""user-image"" class=""avatar-xs rounded-circle me-2"" /> Herbert C. Patton
                                    </td>
                                    <td><i class=""mdi mdi-checkbox-blank-circle text-success""></i> Confirm</td>
                                    <td>
                                        $14,584
           ");
            WriteLiteral(@"                             <p class=""m-0 text-muted font-size-14"">Amount</p>
                                    </td>
                                    <td>
                                        5/12/2016
                                        <p class=""m-0 text-muted font-size-14"">Date</p>
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <img src=""assets/images/users/user-3.jpg"" alt=""user-image"" class=""avatar-xs rounded-circle me-2"" /> Mathias N. Klausen
                                    </td>
                                    <td><i class=""mdi mdi-checkbox-blank-circle text-warning""></i> Waiting payment</td>
           ");
            WriteLiteral(@"                         <td>
                                        $8,541
                                        <p class=""m-0 text-muted font-size-14"">Amount</p>
                                    </td>
                                    <td>
                                        10/11/2016
                                        <p class=""m-0 text-muted font-size-14"">Date</p>
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <img src=""assets/images/users/user-4.jpg"" alt=""user-image"" class=""avatar-xs rounded-circle me-2"" /> Nikolaj S. Henriksen
                                    </td>
                                    <td");
            WriteLiteral(@"><i class=""mdi mdi-checkbox-blank-circle text-success""></i> Confirm</td>
                                    <td>
                                        $954
                                        <p class=""m-0 text-muted font-size-14"">Amount</p>
                                    </td>
                                    <td>
                                        8/11/2016
                                        <p class=""m-0 text-muted font-size-14"">Date</p>
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <img src=""assets/images/users/user-5.jpg"" alt=""user-image"" class=""avatar-xs rounded-circle me-2"" /> Lasse C. Overgaard
  ");
            WriteLiteral(@"                                  </td>
                                    <td><i class=""mdi mdi-checkbox-blank-circle text-danger""></i> Payment expired</td>
                                    <td>
                                        $44,584
                                        <p class=""m-0 text-muted font-size-14"">Amount</p>
                                    </td>
                                    <td>
                                        7/11/2016
                                        <p class=""m-0 text-muted font-size-14"">Date</p>
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <img src=""assets/images/users/us");
            WriteLiteral(@"er-6.jpg"" alt=""user-image"" class=""avatar-xs rounded-circle me-2"" /> Kasper S. Jessen
                                    </td>
                                    <td><i class=""mdi mdi-checkbox-blank-circle text-success""></i> Confirm</td>
                                    <td>
                                        $8,844
                                        <p class=""m-0 text-muted font-size-14"">Amount</p>
                                    </td>
                                    <td>
                                        1/11/2016
                                        <p class=""m-0 text-muted font-size-14"">Date</p>
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
");
            WriteLiteral(@"                    </div>
                </div>
            </div>
        </div>

        <div class=""col-xl-6"">
            <div class=""card"">
                <div class=""card-body"">
                    <h4 class=""card-title mb-4"">Latest Orders</h4>

                    <div class=""table-responsive"">
                        <table class=""table align-middle table-centered table-vertical table-nowrap mb-1"">

                            <tbody>
                                <tr>
                                    <td>#12354781</td>
                                    <td>
                                        <img src=""assets/images/users/user-1.jpg"" alt=""user-image"" class=""avatar-xs me-2 rounded-circle"" /> Riverston Glass Chair
                                    </td>
                                    <td><span class=""badge rounded-pill bg-success"">Delivered</span></td>
                                    <td>
                                        $185
                       ");
            WriteLiteral(@"             </td>
                                    <td>
                                        5/12/2016
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>#52140300</td>
                                    <td>
                                        <img src=""assets/images/users/user-2.jpg"" alt=""user-image"" class=""avatar-xs me-2 rounded-circle"" /> Shine Company Catalina
                                    </td>
                                    <td><span class=""badge rounded-pill bg-success"">Delivered</span></td>
                                    <td>
                                        $1,024
                                    </td>
                        ");
            WriteLiteral(@"            <td>
                                        5/12/2016
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>#96254137</td>
                                    <td>
                                        <img src=""assets/images/users/user-3.jpg"" alt=""user-image"" class=""avatar-xs me-2 rounded-circle"" /> Trex Outdoor Furniture Cape
                                    </td>
                                    <td><span class=""badge rounded-pill bg-danger"">Cancel</span></td>
                                    <td>
                                        $657
                                    </td>
                                    <td>
                           ");
            WriteLiteral(@"             5/12/2016
                                    </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>#12365474</td>
                                    <td>
                                        <img src=""assets/images/users/user-4.jpg"" alt=""user-image"" class=""avatar-xs me-2 rounded-circle"" /> Oasis Bathroom Teak Corner
                                    </td>
                                    <td><span class=""badge rounded-pill bg-warning"">Shipped</span></td>
                                    <td>
                                        $8451
                                    </td>
                                    <td>
                                        5/12/2016
                   ");
            WriteLiteral(@"                 </td>
                                    <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>#85214796</td>
                                    <td>
                                        <img src=""assets/images/users/user-5.jpg"" alt=""user-image"" class=""avatar-xs me-2 rounded-circle"" /> BeoPlay Speaker
                                    </td>
                                    <td><span class=""badge rounded-pill bg-success"">Delivered</span></td>
                                    <td>
                                        $584
                                    </td>
                                    <td>
                                        5/12/2016
                                    </td>
                             ");
            WriteLiteral(@"       <td>
                                        <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#12354781</td>
                                    <td>
                                        <img src=""assets/images/users/user-6.jpg"" alt=""user-image"" class=""avatar-xs me-2 rounded-circle"" /> Riverston Glass Chair
                                    </td>
                                    <td><span class=""badge rounded-pill bg-success"">Delivered</span></td>
                                    <td>
                                        $185
                                    </td>
                                    <td>
                                        5/12/2016
                                    </td>
                                    <td>
                                    ");
            WriteLiteral(@"    <button type=""button"" class=""btn btn-secondary btn-sm waves-effect waves-light"">Edit</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->

</div> <!-- container-fluid -->");
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
