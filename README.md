Jwcad Update Checker
--------------------
[![Build Status](https://travis-ci.org/pine613/JwcadUpdateChecker.svg?branch=master)](https://travis-ci.org/pine613/JwcadUpdateChecker)
[![devDependency Status](https://david-dm.org/pine613/JwcadUpdateChecker/dev-status.svg)](https://david-dm.org/pine613/JwcadUpdateChecker#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/pine/JwcadUpdateChecker.svg)](https://greenkeeper.io/)

This is a Google Apps Script that get latest version of Jw_cad.

## Developing enviroment

- JavaScript
- Google Apps Script (Spreadsheet)

## API
### Endpoint

```
GET /?format=[output format]
```

### Parameters
Both parameters are optional.

- format: 'json' (default) or 'xml'

### Examples
This app runs in my spreadsheet.

- [format=json](https://script.google.com/macros/s/AKfycbza40t2BHjMOlYxI-Uq29o-_TE08WXLlWeKwVCmIcZdSwAs3txF/exec?format=json)
```json
{
  "isSucceeded": true,
  "errMsg": null,
  "version": "8.00.4",
  "downloadUrl": "http://www.jwcad.net/download/jww800d.exe"
}
```
- [format=xml](https://script.google.com/macros/s/AKfycbza40t2BHjMOlYxI-Uq29o-_TE08WXLlWeKwVCmIcZdSwAs3txF/exec?format=xml)
```xml
<?xml version="1.0" encoding="utf-8"?>
<object>
  <isSucceeded>
    <true/>
  </isSucceeded>
  <errMsg>
    <null/>
  </errMsg>
  <version>8.00.4</version>
  <downloadUrl>http://www.jwcad.net/download/jww800d.exe</downloadUrl>
</object>
```

### Tests
There are some tests written by [Vows](http://vowsjs.org/) and [Chai](http://vowsjs.org/). The tests use some mock that run on Node.js as Google Apps Script API.

```
$ npm install
$ npm test
```

### License
MIT License<br />
Copyright (C) 2014-2015 Pine Mizune