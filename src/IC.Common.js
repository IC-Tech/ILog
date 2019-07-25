/* Copyright © Imesh Chamara 2019 */
function loadRoot() {
  var str = document.URL;
  var pos = 0;
  var ind = str.indexOf('/', pos);
  while (ind < str.length && ind >= 0) {
    pos = ind + 1;
    if (str.substr(ind - 1, 1) != ':' && str.substr(ind - 1, 1) != '/') {
      str = str.substr(0, ind) + '/';
      ind = -1;
    }
    else  {ind = str.indexOf('/', pos);}
  }
  return str;
}
function ReloadError(e, f) {
  return IC_Common.emptyValue(f) ? f : alert
}
const IC_Common = {
  rootURL: loadRoot(),
  emptyValue: (v) => v == undefined ? null : v,
  XHR: (url, call, err) => {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open('GET', url + ((url.indexOf('?') >= 0 ? '&' : '?') + 't=' + new Date().getTime()))
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status != 0) {
        if(xhr.response) {
          try {
            call(JSON.parse(xhr.response))
          } catch(e) {
            ReloadError('Server response error. (EC: 0xA2 >>> ' + e + ' <)', err)
          }
        }
        else
          ReloadError('Server response error. (EC: 0xA1)', err)
      }
    }
    xhr.onerror = function (e) {
      if(e.target.status == 0)
        ReloadError("The Webpage can't connect to the server. Try again in a few moments.", err)
      else console.log(e)
    }
    xhr.send(null)
  },
  arrayReciver: function(v, ar) {
    if(typeof v == 'number')
      return v;
    for(var i =0; i< ar.length; i++)
      if(ar[i] == v)
        return i;
    return -1;
  }
};
exports.IC_Common = IC_Common;
