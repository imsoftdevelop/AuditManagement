using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;
using WebBackEnd.Config;

namespace WebBackEnd.Commons.RDService
{

    //var tmp = RDVatResult.Get("", "ไทยประกันชีวิต");
    //var a = tmp.Count;

    public class RDVatResult
    {
        // private static string RDURL = @"https://rdws.rd.go.th/Servicerd3/vatservicerd3.asmx";


        public string NID { get; set; }
        public string BranchNumber { get; set; }

        public string BranchTitle { get; set; }

        public string BranchName { get; set; }
        public string RoomNumber { get; set; }
        public string FloorNumber { get; set; }

        public string VallageName { get; set; }

        public string HouseNumber { get; set; }

        public string MooNumber { get; set; }

        public string StreetName { get; set; }

        public string ThumbolName { get; set; }

        public string AmphurName { get; set; }

        public string ProvinceName { get; set; }

        public string PostCode { get; set; }

        public string CompanyName { get { return BranchTitle + " " + BranchName; } }
        public string BranchNo { get { return BranchNumber.PadLeft(5, '0'); } }
        public string BranchNoName { get { return BranchNumber == "0" ? "สำนักงานใหญ่" : ""; } }
        public string Address
        {
            get
            {
                return HouseNumber + " " +
                      (!string.IsNullOrEmpty(MooNumber) ? "หมู่" + MooNumber + " " : "") +
                      (!string.IsNullOrEmpty(StreetName) ? "ถนน" + StreetName + " " : "") +
                      (!string.IsNullOrEmpty(ThumbolName) ? (ProvinceName.Contains("กรุงเทพ") ? "เขต" : "ตำบล") + ThumbolName + " " : "") +
                      (!string.IsNullOrEmpty(AmphurName) ? (ProvinceName.Contains("กรุงเทพ") ? "แขวง" : "อำเภอ") + AmphurName + " " : "") +
                      (!string.IsNullOrEmpty(ProvinceName) ? ProvinceName + " " : "") +
                      (!string.IsNullOrEmpty(PostCode) ? PostCode + " " : "");
            }
        }



        public static List<RDVatResult> Get(string NID, string Name)
        {
            List<RDVatResult> result = null;
            var _config = ApiConfigureServices.ConfigureAppSetting();


            BasicHttpBinding basicHttpBinding = new BasicHttpBinding(BasicHttpSecurityMode.Transport);
            basicHttpBinding.Security.Transport.ClientCredentialType = HttpClientCredentialType.None;


            EndpointAddress endpoint = new EndpointAddress(_config["RDService:vatPath"]);
            //  EndpointAddress endpoint = new EndpointAddress(RDURL);


            // wsRD.vatserviceRD3SoapClient c = new wsRD.vatserviceRD3SoapClient(basicHttpBinding, endpoint);
            wsRD.vatserviceRD3SoapClient vatServiceClient = new wsRD.vatserviceRD3SoapClient();
            vatServiceClient.ClientCredentials.ServiceCertificate.SslCertificateAuthentication = new System.ServiceModel.Security.X509ServiceCertificateAuthentication();
            vatServiceClient.ClientCredentials.ServiceCertificate.SslCertificateAuthentication.CertificateValidationMode = System.ServiceModel.Security.X509CertificateValidationMode.None;

            if (!string.IsNullOrEmpty(NID))
                Name = string.Empty;

            Task<wsRD.ServiceResponse> RDResponse = vatServiceClient.ServiceAsync("anonymous", "anonymous", NID, Name, 0, 0, 0);


            var RDResult = RDResponse.Result;


            if (RDResult.Body.ServiceResult != null)
            {
                int numberOfRecord = RDResult.Body.ServiceResult.vNID.Count;

                var tmpR = RDResult.Body.ServiceResult;
                result = new List<RDVatResult>();

                for (int i = 0; i < numberOfRecord; i++)
                {
                    //if (tmpR.vBranchNumber[i].ToString() == "0")
                    //{
                    var tmp = new RDVatResult()
                    {
                        AmphurName = tmpR.vAmphur[i].ToString(),
                        BranchName = tmpR.vBranchName[i].ToString(),
                        BranchNumber = tmpR.vBranchNumber[i].ToString(),
                        BranchTitle = tmpR.vBranchTitleName[i].ToString(),
                        FloorNumber = tmpR.vFloorNumber[i].ToString(),
                        HouseNumber = tmpR.vHouseNumber[i].ToString(),
                        MooNumber = tmpR.vMooNumber[i].ToString(),
                        NID = tmpR.vNID[i].ToString(),
                        PostCode = tmpR.vPostCode[i].ToString(),
                        ProvinceName = tmpR.vProvince[i].ToString(),
                        RoomNumber = tmpR.vRoomNumber[i].ToString(),
                        StreetName = tmpR.vStreetName[i].ToString(),
                        ThumbolName = tmpR.vThambol[i].ToString(),
                        VallageName = tmpR.vVillageName[i].ToString()
                    };
                    result.Add(tmp);
                    //}
                }
            }

            return result;

        }
    }
}
