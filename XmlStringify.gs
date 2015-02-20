var xmlStringify = (function() {
  var XML_DEC = '<?xml version="1.0" encoding="utf-8"?>';
  
  function xmlStringify(data) {
    return XML_DEC + wrapTag(getRootTagName(data), createXmlNode(data));
  }
  
  function createXmlNode(data) {
    if (typeof data === 'string') return data;
    if (typeof data === 'number') return data.toString();
    if (data === true) return '<true />';
    if (data === false) return '<false />';
    if (data === null) return '<null />';
    
    var node = '';
    
    for (var key in data) if (data.hasOwnProperty(key)) {
      node += wrapTag(key, createXmlNode(data[key]));
    }
    
    return node;
  }
  
  function getRootTagName(data) {
    return 'object';
  }
  
  function wrapTag(tagName, text) {
    return '<' + tagName + '>' + text + '</' + tagName + '>';
  }
  
  return xmlStringify;
})();