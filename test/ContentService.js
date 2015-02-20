function TextOutput(content) {
  this.content = content;
  
  this.setMimeType = function (mimeType) {
    this.mimeType = mimeType;
  };
}

module.exports = {
  createTextOutput: function (content) {
    return new TextOutput(content);
  },
  MimeType: {
    JSON: 'json',
    XML: 'xml'
  }
};