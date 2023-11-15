/**
 * GcDocs Data Viewer control.
 */
export declare class GcDataViewer {
    /**
     * GcDocs Data Viewer constructor.
     * @param element root container element or selector pattern used to select the root container element.
     */
	constructor(element: HTMLElement | string);
    
	/**
     * Use this method to close and release resources occupied by the GcDataViewer.
     */
	dispose(): void;
	
	/**
     * Product license key.
     * @example
     *  ```
     *<script>
     *  // Add your license
     *  GcDataViewer.LicenseKey = 'XXX';
     *  // Add your code
     *  const viewer = new GcDataViewer("#viewer");
     *</script>
     *```
     */
    static LicenseKey: string;
	
	/**
     * Gets the viewer instance using the host element or host element selector
     * @example
     * ```javascript
     * var viewer = GcDataViewer.findControl("#root");
     * ```
     * @param selector
     */
    static findControl(selector: string | HTMLElement): GcDataViewer | undefined;
	
	/**
     * Open data file.
     * @param file The data file.
     * @param fileType The type of the imported data file.
     * @param openOptions The options for import data file.
     * @example
     * ```javascript
     * viewer.openFile("Documents/HelloWorld.xlsx", FileType.XLSX, {loadHiddenSheets: true});
     * ```
     */
    openFile(file: Blob, fileType: FileType, openOptions?: XlsxOpenOptions | SSJsonOpenOptions | CsvOpenOptions): void;
}
/**
 * The file type.
 */
export declare enum FileType {
	/**
     * XLSX. 
     */
    XLSX = "XLSX",
	/**
     * SSJSON. 
     */
    SSJSON = "SSJSON",
	/**
     * CSV. 
     */
    CSV = "CSV"
}
 
 /**
 * Options to open the XLSX file.
 **/
 export type XlsxOpenOptions = {
     /**
     * Optional. Whether to show the hidden and very hidden sheets in XLSX file. The default value is false.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {showHiddenSheets: true});
     * ```
     **/
     showHiddenSheets? : boolean;
 
     /**
     * Optional. Whether to show the hidden rows in XLSX file. The default value is false.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {showHiddenRows: true});
     * ```
     **/
     showHiddenRows? : boolean;
 
     /**
     * Optional. Whether to show the hidden columns in XLSX file. The default value is false.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {showHiddenColumns: true});
     * ```
     **/
     showHiddenColumns? : boolean;
 
     /**
     * Optional. Whether to show the filters in XLSX file. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {showFilters: false});
     * ```
     **/
     showFilters? : boolean;
 
     /**
     * Optional. Whether to show the row groups when loading a XLSX file. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {keepRowGroups: false});
     * ```
     **/
     keepRowGroups? : boolean;
 
     /**
     * Optional. Whether to show the column groups when loading a XLSX file. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {keepColumnGroups: false});
     * ```
     **/
     keepColumnGroups? : boolean;
 
     /**
     * Optional. For decrypting password-protected XLSX file.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.xlsx', FileType.XLSX, {password: "123"});
     * ```
     **/
     password? : string;
 };
 
 /**
 * Options to open the SSJSON file.
 **/
 export type SSJsonOpenOptions = {
     /**
     * Optional. Whether to show the hidden and very hidden sheets in SSJSON file. The default value is false.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.ssjson', FileType.SSJSON, {showHiddenSheets: true});
     * ```
     **/
     showHiddenSheets? : boolean;
 
     /**
     * Optional. Whether to show the hidden rows in SSJSON file. The default value is false.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.ssjson', FileType.SSJSON, {showHiddenRows: true});
     * ```
     **/
     showHiddenRows? : boolean;
 
     /**
     * Optional. Whether to show the hidden columns in SSJSON file. The default value is false.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.ssjson', FileType.SSJSON, {showHiddenColumns: true});
     * ```
     **/
     showHiddenColumns? : boolean;
 
     /**
     * Optional. Whether to show the filters in SSJSON file. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.ssjson', FileType.SSJSON, {showFilters: false});
     * ```
     **/
     showFilters? : boolean;
 
     /**
     * Optional. Whether to show the row groups when loading a SSJSON file. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.ssjson', FileType.SSJSON, {keepRowGroups: false});
     * ```
     **/
     keepRowGroups? : boolean;
 
     /**
     * Optional. Whether to show the column groups when loading a SSJSON file. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.ssjson', FileType.SSJSON, {keepColumnGroups: false});
     * ```
     **/
     keepColumnGroups? : boolean;
 };

 /**
* Options to open the CSV file. 
**/
export type CsvOpenOptions = {
     /**
     * Optional. Column separator for CSV file. The default value is ','.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.CSV', FileType.CSV, {columnSeparator: ','});
     * ```
     **/
     columnSeparator? : string;
 
     /**
     * Optional. Row separator for CSV file. The default value is '\\r\\n'.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.CSV', FileType.CSV, {rowSeparator: '\\r\\n'});
     * ```
     **/
     rowSeparator? : string;
 
     /**
     * Optional. Encoding for CSV file. The default value is 'UTF-8'.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.CSV', FileType.CSV, {encoding: 'ANSI'});
     * ```
     **/
     encoding? : string;
 
     /**
     * Optional. Whether the column data in the CSV file has a header. The default value is true.
     * @example
     * ```javascript
     * viewer.openFile('Documents/HelloWorld.CSV', FileType.CSV, {columnHasHeader: false});
     * ```
     **/
     columnHasHeader? : boolean;
 };
