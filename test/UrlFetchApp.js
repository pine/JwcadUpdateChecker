var _ = require('lodash');
var sync = require('synchronize');
var request = require('request');

sync(request, 'get');

var cache = {};

module.exports = {
  fetch: function (url, params) {
    params = params || {};
    params.headers = _.extend({
      'User-Agent': 'request'
    }, params.headers);
    
    if ('followRedirects' in params) {
      params.followRedirect = params.followRedirects;
    }
    
    if (cache[url]) {
      var res = cache[url];
    }
    
    else {
      var res = request.get(url, params);
      cache[url] = res;
    }
    
    return {
      getContentText: function () {
        if (res.statusCode !== 200) {
          console.error(res.body);
        }
        
        return res.body;
      },
      getResponseCode: function () { return res.statusCode; },
      getHeaders: function () {
        res.headers.Location = res.headers.location;
        return res.headers;
      }
    };
  }
};