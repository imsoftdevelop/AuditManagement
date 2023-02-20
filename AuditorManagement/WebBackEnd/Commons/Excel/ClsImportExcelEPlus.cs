using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using OfficeOpenXml;
using System.Reflection;
using static WebBackEnd.Commons.Excel.AttibuteInfo;

namespace WebBackEnd.Commons.Excel
{
    public class ClsImportExcelEPlus
    {
        private string _FileExcel;
        public string FileExcel
        {
            get { return _FileExcel; }
            set { _FileExcel = value; }
        }

        private string _NameSheets;
        public string NameSheets
        {
            get { return _NameSheets; }
            set { _NameSheets = value; }
        }

        /// <summary>
        /// Check File Excel HasFile
        /// </summary>
        /// <returns></returns>
        public bool ExistsFile()
        {
            if (!string.IsNullOrEmpty(_FileExcel))
            {
                FileInfo File = new FileInfo(_FileExcel);
                if (File.Exists)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public bool InitailChec()
        {
            if (ExistsFile())
            {
                //ConvertXlsToXlsx();
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// Import Excel File to List
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="List"></param>
        /// <returns></returns>
        public bool ImportToList<T>(ref List<T> List) where T : class
        {
            try
            {
                if (InitailChec())
                {
                    FileInfo File = new FileInfo(_FileExcel);
                    using (ExcelPackage pk = new ExcelPackage(File))
                    {
                        ExcelWorksheet ws;
                        if (!string.IsNullOrEmpty(_NameSheets))
                        {
                            ws = pk.Workbook.Worksheets[_NameSheets];
                        }
                        else
                        {
                            ws = pk.Workbook.Worksheets.FirstOrDefault();
                        }
                        ExcelCellAddress StrtEx = ws.Dimension.Start;
                        ExcelCellAddress EndEx = ws.Dimension.End;
                        AttibuteInfo AuttibuteClass = new AttibuteInfo();
                        for (var rowNum = 2; rowNum <= ws.Dimension.End.Row; rowNum++)
                        {
                            var wsRow = ws.Cells[rowNum, 1, rowNum, ws.Dimension.End.Column];
                            T t;
                            t = Activator.CreateInstance<T>();
                            System.Reflection.PropertyInfo[] info = t.GetType().GetProperties();
                            foreach (var cell in wsRow)
                            {
                                try
                                {
                                    foreach (System.Reflection.PropertyInfo obj in info)
                                    {
                                        if (AuttibuteClass.GetAttibiteInfo(obj) == ws.Cells[1, cell.Start.Column].Text)
                                        {
                                            obj.SetValue(t, Convert.ChangeType(cell.Text, obj.PropertyType), null);
                                        }
                                    }
                                }
                                catch
                                {
                                    continue;
                                }
                            }
                            List.Add(t);
                        }
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// GetSheet Excel File
        /// </summary>
        /// <returns></returns>
        public List<String> GetSheetExcel()
        {
            try
            {
                if (InitailChec())
                {
                    FileInfo File = new FileInfo(_FileExcel);
                    List<String> List = new List<string>();
                    using (ExcelPackage pk = new ExcelPackage(File))
                    {
                        ExcelWorkbook wb = pk.Workbook;
                        foreach (var sheet in wb.Worksheets)
                        {
                            List.Add(sheet.Name);
                        }
                    }
                    return List;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
    }

    public class AttibuteInfo
    {
        /// <summary>
        /// Class Attribute
        /// </summary>
        internal class Column : System.Attribute
        {
            public string Name { get; set; }
        }

        public string GetAttibiteInfo(PropertyInfo info)
        {
            string Auttibutename = string.Empty;
            object[] obj = info.GetCustomAttributes(true);
            foreach (object itemobj in obj)
            {
                if (itemobj.GetType() == typeof(Column))
                {
                    Column tmp = itemobj as Column;
                    Auttibutename = string.IsNullOrEmpty(tmp.Name) ? string.Empty : tmp.Name;
                }
            }
            if (String.IsNullOrEmpty(Auttibutename))
            {
                return info.Name;
            }
            else
            {
                return Auttibutename;
            }
        }
    }

    public class importtrialbalance
    {
        [Column(Name = "A/C code")]
        public string accountno { get; set; }
        [Column(Name = "A/C name")]
        public string accountname { get; set; }
        [Column(Name = "Current Yr")]
        public string amount { get; set; }
        [Column(Name = "W/P No")]
        public string fsgroupcode { get; set; }
        public string iserror { get; set; }
        public string error { get; set; }
    }

    public class importprevioustrialbalance
    {
        [Column(Name = "A/C code")]
        public string accountno { get; set; }
        [Column(Name = "A/C name")]
        public string accountname { get; set; }
        [Column(Name = "Previous Yr")]
        public string amount { get; set; }
        public string iserror { get; set; }
        public string error { get; set; }
    }

    public class titleimporttrialbalance
    {
        public int total { get; set; }
        public int success { get; set; }
        public int error { get; set; }
    }
}
