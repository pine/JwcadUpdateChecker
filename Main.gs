var SPRED_SHEET_ID = '11RVG5h2iAa1r3z9OFFUvDJBrdV5HMkCuhLBAEsqhzlk';

var DOWNLOAD_URL = 'http://www.jwcad.net/download.htm';

var DOWNLOAD_LINK_REGEX = /href=\"(http:\/\/www\.jwcad\.net\/download\/[^\"]+\.exe)\"/;
var VERSION_REGEX = /(\d)(\d+)(\w?)/;

/**
 * GET /?format='json'|'xml'
 */
function doGet(e) {
  return entryPoint(e, 'get');
}

function entryPoint(e, method) {
  var format = e.parameter.format || 'json';
  var info = getInfo();
  
  // エラーログを記載
  if (info.errMsg) {
    insertRow([new Date(), info.errMsg]);
  }
  
  return render(info, format);
}

function getInfo() {
  var downloadInfo = getDownloadInfo();
  if (!downloadInfo.url) {
    return downloadInfo;
  }
  
  return getVersionInfo(downloadInfo.url);
}

function getDownloadInfo() {
  var url = DOWNLOAD_URL;
  
  if (!url) {
    return { errMsg: 'Can\'t find download URL' };
  }
  
  var response = UrlFetchApp.fetch(url);
  var code = response.getResponseCode();
  var content = response.getContentText();

  // HTTP ステータスコードが 200 である場合、成功
  if (code !== 200) {
    return { errMsg: 'Can\'t fetch Opera website' }; // 失敗
  }
  
  // ダウンロード先 URL を探す
  var matches = content.match(DOWNLOAD_LINK_REGEX);
  
  if (!matches) {
    return { errMsg: 'Can\'t find a download link' }; // 失敗
  }
  
  var url = matches[1];
  url = url.replace(/&amp;/g, '&');
  
  return { url: url  };
}

function getVersionInfo(url) {
  var matches = url.match(VERSION_REGEX);
  
  if (!matches) {
    return { errMsg: 'Can\'t find version string in ' + url };
  }
  
  var major = matches[1];
  var minor = matches[2];
  var release = '0';
  
  if (matches[3]) {
    release = matches[3].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }
  
  return {
    version: major + '.' + minor + '.' + release,
    downloadUrl: url
  };
}

function insertRow(rowContents) {
  try {
    var ss = SpreadsheetApp.openById(SPRED_SHEET_ID);
    var sheet = ss.getActiveSheet();
    
    sheet.appendRow(rowContents);
    
    return null;
  }
  catch (e) {
    return e;
  }
}

function render(data, format) {
  
  if (!('errMsg' in data)) {
    data.errMsg = null;
  }
  
  data.isSucceeded = !data.errMsg;
  
  if (format === 'xml') {
    return createXmlOutput(data);
  }
  
  return createJsonOutput(data);
}

function createJsonOutput(data) {
  var mime = ContentService.MimeType.JSON;
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(mime);
  
  return output;
}

function createXmlOutput(data) { 
  var mime = ContentService.MimeType.XML;
  var output = ContentService.createTextOutput(xmlStringify(data));
  output.setMimeType(mime);
  
  return output;
}
