# GrapeCity Documents Data Viewer

A full-featured JavaScript Data viewer that comes with [GrapeCity Documents for Excel](https://www.grapecity.com/documents-api-excel).

__GrapeCity Documents Data Viewer__ (__GcDocs Data Viewer__, __GcDataViewer__) is a fast, modern JavaScript-based data viewer that runs in all major browsers. It can load and preview any data-related document such as Excel, CSV, SSJSON, etc.

The viewer can be used as a cross-platform solution to view data documents on Windows, MAC, Linux, iOS, and Android devices.
GcDataViewer is included in [GrapeCity Documents for Excel (GcExcel)](https://www.grapecity.com/documents-api-excel) - a feature-rich cross-platform SpreadSheet API library for .NET Core and Java.

GcDataViewer provides a rich client side JavaScript object model, see https://www.grapecity.com/documents-api-dataviewer/api for the client API documentation.

Product highlights:

- Works in all modern browsers, including Edge, Chrome, FireFox, Opera, Safari
- Works with frameworks such as React, Preact, Angular
- Allows opening data files from local disks
- Supports data document formats including XLSX, SSJSON, CSV
- ...and more.

## See it in action

- Go to [GrapeCity Documents Data Viewer demos](https://www.grapecity.com/documents-api-dataviewer/demos/)
  to explore the various features of GcDataViewer.
  The demo site allows you to modify the demo code and immediately see the effect of your changes.
  
## Installation

### To install the latest release version:

```sh
npm install @grapecity/gcdataviewer
```

### To install from the zip archive:

Go to https://www.grapecity.com/documents-api-dataviewer and follow the directions on that page to get the GcDataViewer package, your 30-day evaluation, and deployment license key.
The license key will allow you to develop and deploy your application to a test server.
Unzip the viewer distribution files (list below) to an appropriate location accessible from the web page where the viewer will live.

Viewer zip includes the following files:

- README.&#8203;md (this file)
- gcdataviewer.js
- package.json
- index.html (sample page)
- index.d.ts (typeScript declaration file)
- Theme files:
  - themes/dark.css
  - themes/dark-yellow.css
  - themes/gc-blue.css
  - themes/light.css
  - themes/light-blue.css
  - themes/viewer.css
- docs/index.html(api doc)

## Documentation

Online documentation is available [here](https://www.grapecity.com/documents-api-dataviewer/docs/online/overview).

## Licensing

GrapeCity Documents Data Viewer is a commercially licensed product. Please [visit this page](https://www.grapecity.com/documents-api/licensing) for details.

## Getting more help

GrapeCity Documents Data Viewer is distributed as part of GrapeCity Documents for Excel.
You can ask any questions about the viewer, or report bugs using the
[Documents for Excel public forum](https://www.grapecity.com/forums/documents-excel) or [Documents for Excel Java public forum](https://www.grapecity.com/forums/documents-excel-java).

## More details on using the viewer

### Adding the viewer to an HTML page:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <!-- Limit content scaling to ensure that the viewer zooms correctly on mobile devices: -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#000000" />
    <title>GrapeCity Documents Data Viewer</title>
    <script type="text/javascript" src="gcdataviewer.js"></script>
    <script>
        function loadDataViewer(selector) {
            var viewer = new GcDataViewer(selector);
        }
    </script>
    <style>
        #root { height:100%}
    </style>
  </head>
  <body onload="loadDataViewer('#root')">
    <div id="root"></div>
  </body>
</html>
```

### How to license the viewer:

Set the GcDataViewer Deployment key to the GcDataViewer.LicenseKey property before you create and initialize GcDataViewer.
This must precede the code that references the js files.

```javascript
  // Add your license
  GcDataViewer.LicenseKey = 'xxx';
  // Add your code
  const viewer = new GcDataViewer("#viewer1");
```
### Using the viewer in frameworks such as React, Preact, Angular etc.

Add a reference to the viewer script.

```HTML
<body>
  <script type="text/javascript" src="gcdataviewer.js"></script>
  ...
```

Add the placeholder to your App template, e.g.:

```HTML
<section id="dataviewer"></section>
```

Render the viewer:

```javascript
let viewer = new GcDataViewer('section#dataviewer');
```
---
_The End._