module.exports = function download(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', cors(url), true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    callback(null, xhr.response);
  };

  xhr.onerror = function(e) {
    callback(status.response);
  };

  xhr.send(null);
};

function cors(url) {
  return 'http://cors.maxogden.com/' + url;
}
