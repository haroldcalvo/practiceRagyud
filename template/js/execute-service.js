

if (sessionStorage.getItem("user_logged_url") === null && sessionStorage.getItem("subs_details") === null) {
  $('.page-loader__spin').remove();
  $('.main-content').children().children().children().remove();
  $('.main-content').children().children().append(`<br><h1>Access Denied 🙅</h1><br><p>Please take note that you are not authorized to visit this URL.</p><label><a href="../login/login.html" style="color:#007bff">Log-in</a></label>`);
}

let unique_application_user_id,approving_officer, host;

//$('.table-load-approving').hide();

userLoggedDetails(function (uld) {
  let userData = JSON.parse(uld);
  if (userData.application_user_details !== undefined) {
    unique_application_user_id = userData.application_user_details.app_user_id;
    approving_officer = userData.application_user_details.approving_officer;

    if (approving_officer > 0) {
      //$('.table-load-approving').show();
    } else {
      //$('.table-load-approving').remove();
    }

  }
});

function user_logged_url() {
  return sessionStorage.getItem("user_logged_url");
}
function deployment() {
  return false;
}

if (deployment()) {
  host = window.location.origin;
} else {
  host = `http://localhost:8888`;
}

function userLoggedDetails(callback) {

  var url = user_logged_url();
  
  if (url != null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Request succeeded
                callback(this.responseText); // Pass the response to the callback function
            } else {
                // Request failed
                callback(null); // Pass null to indicate failure
            }
        }
    };
  }
}

function subscribersDetails(in_jsonObject) {

  url = host+"/Credentials-API/subscribersDetails/service/post/user-credentials";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send(JSON.stringify(in_jsonObject));
  xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
          if (this.status == 200) {
              // Request succeeded
              sessionStorage.setItem("user_logged_url", this.responseText);
          } else {
              // Request failed
          }
      }
  };

}

function subscriberID() {

  let subs_id = $('#subscriber-id').val();

  if (typeof subs_id !== "undefined") {
    subs_id = subs_id;
  } else {
    subs_id = new URL(user_logged_url()).searchParams.get('subscriber_id');
  }

  return subs_id;
}

function subscriberUserID() {

  const urlString = user_logged_url();
  const url = new URL(urlString);
  const subs_user_id = url.searchParams.get('subscriber_user_id');

  return subs_user_id;
}

// AES Encryption

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(p,h){var i={},l=i.lib={},r=l.Base=function(){function a(){}return{extend:function(e){a.prototype=this;var c=new a;e&&c.mixIn(e);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),o=l.WordArray=r.extend({init:function(a,e){a=
  this.words=a||[];this.sigBytes=e!=h?e:4*a.length},toString:function(a){return(a||s).stringify(this)},concat:function(a){var e=this.words,c=a.words,b=this.sigBytes,a=a.sigBytes;this.clamp();if(b%4)for(var d=0;d<a;d++)e[b+d>>>2]|=(c[d>>>2]>>>24-8*(d%4)&255)<<24-8*((b+d)%4);else if(65535<c.length)for(d=0;d<a;d+=4)e[b+d>>>2]=c[d>>>2];else e.push.apply(e,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,e=this.sigBytes;a[e>>>2]&=4294967295<<32-8*(e%4);a.length=p.ceil(e/4)},clone:function(){var a=
  r.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var e=[],c=0;c<a;c+=4)e.push(4294967296*p.random()|0);return o.create(e,a)}}),m=i.enc={},s=m.Hex={stringify:function(a){for(var e=a.words,a=a.sigBytes,c=[],b=0;b<a;b++){var d=e[b>>>2]>>>24-8*(b%4)&255;c.push((d>>>4).toString(16));c.push((d&15).toString(16))}return c.join("")},parse:function(a){for(var e=a.length,c=[],b=0;b<e;b+=2)c[b>>>3]|=parseInt(a.substr(b,2),16)<<24-4*(b%8);return o.create(c,e/2)}},n=m.Latin1={stringify:function(a){for(var e=
  a.words,a=a.sigBytes,c=[],b=0;b<a;b++)c.push(String.fromCharCode(e[b>>>2]>>>24-8*(b%4)&255));return c.join("")},parse:function(a){for(var e=a.length,c=[],b=0;b<e;b++)c[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return o.create(c,e)}},k=m.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(e){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},f=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=o.create();
  this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var e=this._data,c=e.words,b=e.sigBytes,d=this.blockSize,q=b/(4*d),q=a?p.ceil(q):p.max((q|0)-this._minBufferSize,0),a=q*d,b=p.min(4*a,b);if(a){for(var j=0;j<a;j+=d)this._doProcessBlock(c,j);j=c.splice(0,a);e.sigBytes-=b}return o.create(j,b)},clone:function(){var a=r.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=f.extend({init:function(){this.reset()},
  reset:function(){f.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=f.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(e,c){return a.create(c).finalize(e)}},_createHmacHelper:function(a){return function(e,c){return g.HMAC.create(a,c).finalize(e)}}});var g=i.algo={};return i}(Math);
  (function(){var p=CryptoJS,h=p.lib.WordArray;p.enc.Base64={stringify:function(i){var l=i.words,h=i.sigBytes,o=this._map;i.clamp();for(var i=[],m=0;m<h;m+=3)for(var s=(l[m>>>2]>>>24-8*(m%4)&255)<<16|(l[m+1>>>2]>>>24-8*((m+1)%4)&255)<<8|l[m+2>>>2]>>>24-8*((m+2)%4)&255,n=0;4>n&&m+0.75*n<h;n++)i.push(o.charAt(s>>>6*(3-n)&63));if(l=o.charAt(64))for(;i.length%4;)i.push(l);return i.join("")},parse:function(i){var i=i.replace(/\s/g,""),l=i.length,r=this._map,o=r.charAt(64);o&&(o=i.indexOf(o),-1!=o&&(l=o));
  for(var o=[],m=0,s=0;s<l;s++)if(s%4){var n=r.indexOf(i.charAt(s-1))<<2*(s%4),k=r.indexOf(i.charAt(s))>>>6-2*(s%4);o[m>>>2]|=(n|k)<<24-8*(m%4);m++}return h.create(o,m)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
  (function(p){function h(f,g,a,e,c,b,d){f=f+(g&a|~g&e)+c+d;return(f<<b|f>>>32-b)+g}function i(f,g,a,e,c,b,d){f=f+(g&e|a&~e)+c+d;return(f<<b|f>>>32-b)+g}function l(f,g,a,e,c,b,d){f=f+(g^a^e)+c+d;return(f<<b|f>>>32-b)+g}function r(f,g,a,e,c,b,d){f=f+(a^(g|~e))+c+d;return(f<<b|f>>>32-b)+g}var o=CryptoJS,m=o.lib,s=m.WordArray,m=m.Hasher,n=o.algo,k=[];(function(){for(var f=0;64>f;f++)k[f]=4294967296*p.abs(p.sin(f+1))|0})();n=n.MD5=m.extend({_doReset:function(){this._hash=s.create([1732584193,4023233417,
  2562383102,271733878])},_doProcessBlock:function(f,g){for(var a=0;16>a;a++){var e=g+a,c=f[e];f[e]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360}for(var e=this._hash.words,c=e[0],b=e[1],d=e[2],q=e[3],a=0;64>a;a+=4)16>a?(c=h(c,b,d,q,f[g+a],7,k[a]),q=h(q,c,b,d,f[g+a+1],12,k[a+1]),d=h(d,q,c,b,f[g+a+2],17,k[a+2]),b=h(b,d,q,c,f[g+a+3],22,k[a+3])):32>a?(c=i(c,b,d,q,f[g+(a+1)%16],5,k[a]),q=i(q,c,b,d,f[g+(a+6)%16],9,k[a+1]),d=i(d,q,c,b,f[g+(a+11)%16],14,k[a+2]),b=i(b,d,q,c,f[g+a%16],20,k[a+3])):48>a?(c=
  l(c,b,d,q,f[g+(3*a+5)%16],4,k[a]),q=l(q,c,b,d,f[g+(3*a+8)%16],11,k[a+1]),d=l(d,q,c,b,f[g+(3*a+11)%16],16,k[a+2]),b=l(b,d,q,c,f[g+(3*a+14)%16],23,k[a+3])):(c=r(c,b,d,q,f[g+3*a%16],6,k[a]),q=r(q,c,b,d,f[g+(3*a+7)%16],10,k[a+1]),d=r(d,q,c,b,f[g+(3*a+14)%16],15,k[a+2]),b=r(b,d,q,c,f[g+(3*a+5)%16],21,k[a+3]));e[0]=e[0]+c|0;e[1]=e[1]+b|0;e[2]=e[2]+d|0;e[3]=e[3]+q|0},_doFinalize:function(){var f=this._data,g=f.words,a=8*this._nDataBytes,e=8*f.sigBytes;g[e>>>5]|=128<<24-e%32;g[(e+64>>>9<<4)+14]=(a<<8|a>>>
  24)&16711935|(a<<24|a>>>8)&4278255360;f.sigBytes=4*(g.length+1);this._process();f=this._hash.words;for(g=0;4>g;g++)a=f[g],f[g]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360}});o.MD5=m._createHelper(n);o.HmacMD5=m._createHmacHelper(n)})(Math);
  (function(){var p=CryptoJS,h=p.lib,i=h.Base,l=h.WordArray,h=p.algo,r=h.EvpKDF=i.extend({cfg:i.extend({keySize:4,hasher:h.MD5,iterations:1}),init:function(i){this.cfg=this.cfg.extend(i)},compute:function(i,m){for(var h=this.cfg,n=h.hasher.create(),k=l.create(),f=k.words,g=h.keySize,h=h.iterations;f.length<g;){a&&n.update(a);var a=n.update(i).finalize(m);n.reset();for(var e=1;e<h;e++)a=n.finalize(a),n.reset();k.concat(a)}k.sigBytes=4*g;return k}});p.EvpKDF=function(i,l,h){return r.create(h).compute(i,
  l)}})();
  CryptoJS.lib.Cipher||function(p){var h=CryptoJS,i=h.lib,l=i.Base,r=i.WordArray,o=i.BufferedBlockAlgorithm,m=h.enc.Base64,s=h.algo.EvpKDF,n=i.Cipher=o.extend({cfg:l.extend(),createEncryptor:function(b,d){return this.create(this._ENC_XFORM_MODE,b,d)},createDecryptor:function(b,d){return this.create(this._DEC_XFORM_MODE,b,d)},init:function(b,d,a){this.cfg=this.cfg.extend(a);this._xformMode=b;this._key=d;this.reset()},reset:function(){o.reset.call(this);this._doReset()},process:function(b){this._append(b);return this._process()},
  finalize:function(b){b&&this._append(b);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){return function(b){return{encrypt:function(a,q,j){return("string"==typeof q?c:e).encrypt(b,a,q,j)},decrypt:function(a,q,j){return("string"==typeof q?c:e).decrypt(b,a,q,j)}}}}()});i.StreamCipher=n.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var k=h.mode={},f=i.BlockCipherMode=l.extend({createEncryptor:function(b,a){return this.Encryptor.create(b,
  a)},createDecryptor:function(b,a){return this.Decryptor.create(b,a)},init:function(b,a){this._cipher=b;this._iv=a}}),k=k.CBC=function(){function b(b,a,d){var c=this._iv;c?this._iv=p:c=this._prevBlock;for(var e=0;e<d;e++)b[a+e]^=c[e]}var a=f.extend();a.Encryptor=a.extend({processBlock:function(a,d){var c=this._cipher,e=c.blockSize;b.call(this,a,d,e);c.encryptBlock(a,d);this._prevBlock=a.slice(d,d+e)}});a.Decryptor=a.extend({processBlock:function(a,d){var c=this._cipher,e=c.blockSize,f=a.slice(d,d+
  e);c.decryptBlock(a,d);b.call(this,a,d,e);this._prevBlock=f}});return a}(),g=(h.pad={}).Pkcs7={pad:function(b,a){for(var c=4*a,c=c-b.sigBytes%c,e=c<<24|c<<16|c<<8|c,f=[],g=0;g<c;g+=4)f.push(e);c=r.create(f,c);b.concat(c)},unpad:function(b){b.sigBytes-=b.words[b.sigBytes-1>>>2]&255}};i.BlockCipher=n.extend({cfg:n.cfg.extend({mode:k,padding:g}),reset:function(){n.reset.call(this);var b=this.cfg,a=b.iv,b=b.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=b.createEncryptor;else c=b.createDecryptor,
  this._minBufferSize=1;this._mode=c.call(b,this,a&&a.words)},_doProcessBlock:function(b,a){this._mode.processBlock(b,a)},_doFinalize:function(){var b=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){b.pad(this._data,this.blockSize);var a=this._process(!0)}else a=this._process(!0),b.unpad(a);return a},blockSize:4});var a=i.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),k=(h.format={}).OpenSSL={stringify:function(a){var d=
  a.ciphertext,a=a.salt,d=(a?r.create([1398893684,1701076831]).concat(a).concat(d):d).toString(m);return d=d.replace(/(.{64})/g,"$1\n")},parse:function(b){var b=m.parse(b),d=b.words;if(1398893684==d[0]&&1701076831==d[1]){var c=r.create(d.slice(2,4));d.splice(0,4);b.sigBytes-=16}return a.create({ciphertext:b,salt:c})}},e=i.SerializableCipher=l.extend({cfg:l.extend({format:k}),encrypt:function(b,d,c,e){var e=this.cfg.extend(e),f=b.createEncryptor(c,e),d=f.finalize(d),f=f.cfg;return a.create({ciphertext:d,
  key:c,iv:f.iv,algorithm:b,mode:f.mode,padding:f.padding,blockSize:b.blockSize,formatter:e.format})},decrypt:function(a,c,e,f){f=this.cfg.extend(f);c=this._parse(c,f.format);return a.createDecryptor(e,f).finalize(c.ciphertext)},_parse:function(a,c){return"string"==typeof a?c.parse(a):a}}),h=(h.kdf={}).OpenSSL={compute:function(b,c,e,f){f||(f=r.random(8));b=s.create({keySize:c+e}).compute(b,f);e=r.create(b.words.slice(c),4*e);b.sigBytes=4*c;return a.create({key:b,iv:e,salt:f})}},c=i.PasswordBasedCipher=
  e.extend({cfg:e.cfg.extend({kdf:h}),encrypt:function(a,c,f,j){j=this.cfg.extend(j);f=j.kdf.compute(f,a.keySize,a.ivSize);j.iv=f.iv;a=e.encrypt.call(this,a,c,f.key,j);a.mixIn(f);return a},decrypt:function(a,c,f,j){j=this.cfg.extend(j);c=this._parse(c,j.format);f=j.kdf.compute(f,a.keySize,a.ivSize,c.salt);j.iv=f.iv;return e.decrypt.call(this,a,c,f.key,j)}})}();
  (function(){var p=CryptoJS,h=p.lib.BlockCipher,i=p.algo,l=[],r=[],o=[],m=[],s=[],n=[],k=[],f=[],g=[],a=[];(function(){for(var c=[],b=0;256>b;b++)c[b]=128>b?b<<1:b<<1^283;for(var d=0,e=0,b=0;256>b;b++){var j=e^e<<1^e<<2^e<<3^e<<4,j=j>>>8^j&255^99;l[d]=j;r[j]=d;var i=c[d],h=c[i],p=c[h],t=257*c[j]^16843008*j;o[d]=t<<24|t>>>8;m[d]=t<<16|t>>>16;s[d]=t<<8|t>>>24;n[d]=t;t=16843009*p^65537*h^257*i^16843008*d;k[j]=t<<24|t>>>8;f[j]=t<<16|t>>>16;g[j]=t<<8|t>>>24;a[j]=t;d?(d=i^c[c[c[p^i]]],e^=c[c[e]]):d=e=1}})();
  var e=[0,1,2,4,8,16,32,64,128,27,54],i=i.AES=h.extend({_doReset:function(){for(var c=this._key,b=c.words,d=c.sigBytes/4,c=4*((this._nRounds=d+6)+1),i=this._keySchedule=[],j=0;j<c;j++)if(j<d)i[j]=b[j];else{var h=i[j-1];j%d?6<d&&4==j%d&&(h=l[h>>>24]<<24|l[h>>>16&255]<<16|l[h>>>8&255]<<8|l[h&255]):(h=h<<8|h>>>24,h=l[h>>>24]<<24|l[h>>>16&255]<<16|l[h>>>8&255]<<8|l[h&255],h^=e[j/d|0]<<24);i[j]=i[j-d]^h}b=this._invKeySchedule=[];for(d=0;d<c;d++)j=c-d,h=d%4?i[j]:i[j-4],b[d]=4>d||4>=j?h:k[l[h>>>24]]^f[l[h>>>
  16&255]]^g[l[h>>>8&255]]^a[l[h&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,o,m,s,n,l)},decryptBlock:function(c,b){var d=c[b+1];c[b+1]=c[b+3];c[b+3]=d;this._doCryptBlock(c,b,this._invKeySchedule,k,f,g,a,r);d=c[b+1];c[b+1]=c[b+3];c[b+3]=d},_doCryptBlock:function(a,b,d,e,f,h,i,g){for(var l=this._nRounds,k=a[b]^d[0],m=a[b+1]^d[1],o=a[b+2]^d[2],n=a[b+3]^d[3],p=4,r=1;r<l;r++)var s=e[k>>>24]^f[m>>>16&255]^h[o>>>8&255]^i[n&255]^d[p++],u=e[m>>>24]^f[o>>>16&255]^h[n>>>8&255]^
  i[k&255]^d[p++],v=e[o>>>24]^f[n>>>16&255]^h[k>>>8&255]^i[m&255]^d[p++],n=e[n>>>24]^f[k>>>16&255]^h[m>>>8&255]^i[o&255]^d[p++],k=s,m=u,o=v;s=(g[k>>>24]<<24|g[m>>>16&255]<<16|g[o>>>8&255]<<8|g[n&255])^d[p++];u=(g[m>>>24]<<24|g[o>>>16&255]<<16|g[n>>>8&255]<<8|g[k&255])^d[p++];v=(g[o>>>24]<<24|g[n>>>16&255]<<16|g[k>>>8&255]<<8|g[m&255])^d[p++];n=(g[n>>>24]<<24|g[k>>>16&255]<<16|g[m>>>8&255]<<8|g[o&255])^d[p++];a[b]=s;a[b+1]=u;a[b+2]=v;a[b+3]=n},keySize:8});p.AES=h._createHelper(i)})();

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(g,i){var f={},b=f.lib={},m=b.Base=function(){function a(){}return{extend:function(e){a.prototype=this;var c=new a;e&&c.mixIn(e);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),l=b.WordArray=m.extend({init:function(a,e){a=
  this.words=a||[];this.sigBytes=e!=i?e:4*a.length},toString:function(a){return(a||d).stringify(this)},concat:function(a){var e=this.words,c=a.words,o=this.sigBytes,a=a.sigBytes;this.clamp();if(o%4)for(var b=0;b<a;b++)e[o+b>>>2]|=(c[b>>>2]>>>24-8*(b%4)&255)<<24-8*((o+b)%4);else if(65535<c.length)for(b=0;b<a;b+=4)e[o+b>>>2]=c[b>>>2];else e.push.apply(e,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,e=this.sigBytes;a[e>>>2]&=4294967295<<32-8*(e%4);a.length=g.ceil(e/4)},clone:function(){var a=
  m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var e=[],c=0;c<a;c+=4)e.push(4294967296*g.random()|0);return l.create(e,a)}}),n=f.enc={},d=n.Hex={stringify:function(a){for(var e=a.words,a=a.sigBytes,c=[],b=0;b<a;b++){var d=e[b>>>2]>>>24-8*(b%4)&255;c.push((d>>>4).toString(16));c.push((d&15).toString(16))}return c.join("")},parse:function(a){for(var e=a.length,c=[],b=0;b<e;b+=2)c[b>>>3]|=parseInt(a.substr(b,2),16)<<24-4*(b%8);return l.create(c,e/2)}},j=n.Latin1={stringify:function(a){for(var e=
  a.words,a=a.sigBytes,b=[],d=0;d<a;d++)b.push(String.fromCharCode(e[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return l.create(c,b)}},k=n.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},h=b.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=l.create();
  this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,j=this.blockSize,h=d/(4*j),h=a?g.ceil(h):g.max((h|0)-this._minBufferSize,0),a=h*j,d=g.min(4*a,d);if(a){for(var f=0;f<a;f+=j)this._doProcessBlock(c,f);f=c.splice(0,a);b.sigBytes-=d}return l.create(f,d)},clone:function(){var a=m.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});b.Hasher=h.extend({init:function(){this.reset()},
  reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=h.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return u.HMAC.create(a,c).finalize(b)}}});var u=f.algo={};return f}(Math);
  (function(){var g=CryptoJS,i=g.lib,f=i.WordArray,i=i.Hasher,b=[],m=g.algo.SHA1=i.extend({_doReset:function(){this._hash=f.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var d=this._hash.words,j=d[0],k=d[1],h=d[2],g=d[3],a=d[4],e=0;80>e;e++){if(16>e)b[e]=f[n+e]|0;else{var c=b[e-3]^b[e-8]^b[e-14]^b[e-16];b[e]=c<<1|c>>>31}c=(j<<5|j>>>27)+a+b[e];c=20>e?c+((k&h|~k&g)+1518500249):40>e?c+((k^h^g)+1859775393):60>e?c+((k&h|k&g|h&g)-1894007588):c+((k^h^g)-
  899497514);a=g;g=h;h=k<<30|k>>>2;k=j;j=c}d[0]=d[0]+j|0;d[1]=d[1]+k|0;d[2]=d[2]+h|0;d[3]=d[3]+g|0;d[4]=d[4]+a|0},_doFinalize:function(){var b=this._data,f=b.words,d=8*this._nDataBytes,j=8*b.sigBytes;f[j>>>5]|=128<<24-j%32;f[(j+64>>>9<<4)+15]=d;b.sigBytes=4*f.length;this._process()}});g.SHA1=i._createHelper(m);g.HmacSHA1=i._createHmacHelper(m)})();
  (function(){var g=CryptoJS,i=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(f,b){f=this._hasher=f.create();"string"==typeof b&&(b=i.parse(b));var g=f.blockSize,l=4*g;b.sigBytes>l&&(b=f.finalize(b));for(var n=this._oKey=b.clone(),d=this._iKey=b.clone(),j=n.words,k=d.words,h=0;h<g;h++)j[h]^=1549556828,k[h]^=909522486;n.sigBytes=d.sigBytes=l;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var b=
  this._hasher,f=b.finalize(f);b.reset();return b.finalize(this._oKey.clone().concat(f))}})})();
  (function(){var g=CryptoJS,i=g.lib,f=i.Base,b=i.WordArray,i=g.algo,m=i.HMAC,l=i.PBKDF2=f.extend({cfg:f.extend({keySize:4,hasher:i.SHA1,iterations:1}),init:function(b){this.cfg=this.cfg.extend(b)},compute:function(f,d){for(var g=this.cfg,k=m.create(g.hasher,f),h=b.create(),i=b.create([1]),a=h.words,e=i.words,c=g.keySize,g=g.iterations;a.length<c;){var l=k.update(d).finalize(i);k.reset();for(var q=l.words,t=q.length,r=l,s=1;s<g;s++){r=k.finalize(r);k.reset();for(var v=r.words,p=0;p<t;p++)q[p]^=v[p]}h.concat(l);
  e[0]++}h.sigBytes=4*c;return h}});g.PBKDF2=function(b,d,f){return l.create(f).compute(b,d)}})();

var AesUtil = function(keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
}

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
  
// AES Encryption - END

const crypto_properties = {
  iterationCount : 1000,
  keySize : 128,
  corporate : "litecloudcorporation"
};

function advance_encryption(plaintext_in) {

  var iterationCount, keySize, corporate, keyone, keytwo, aesUtil, ciphertext;

  iterationCount = crypto_properties.iterationCount;
  keySize = crypto_properties.keySize;
  corporate = crypto_properties.corporate;

  keyone = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  keytwo = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  
  aesUtil = new AesUtil(keySize, iterationCount);
  ciphertext = aesUtil.encrypt(keytwo, keyone, corporate, plaintext_in);

  const adv_enc_out = {
    ciphertext : ciphertext,
    keyone : keyone,
    keytwo : keytwo
  };

  return JSON.stringify(adv_enc_out);
}

function advance_decryption(adv_enc_in) {

  var iterationCount, keySize, corporate, ciphertext, keyone, keytwo, aesUtil, plaintext;

  iterationCount = crypto_properties.iterationCount;
  keySize = crypto_properties.keySize;
  corporate = crypto_properties.corporate;

  adv_enc_in = JSON.parse(adv_enc_in);

  ciphertext = adv_enc_in.ciphertext;
  keyone = adv_enc_in.keyone;
  keytwo = adv_enc_in.keytwo;

  aesUtil = new AesUtil(keySize, iterationCount);
  plaintext = aesUtil.decrypt(keytwo, keyone, corporate, ciphertext);

  return JSON.parse(plaintext);
}

function executeService(jsonObjExecuteService, callback) {

  var subs_id;
  var module = jsonObjExecuteService.module_given;
  var path_email = jsonObjExecuteService.path_email;

  if (module.includes("Subscriber-API") || module.includes("Login-API")) {
    subs_id = 0;
  } else {
    subs_id = subscriberID();
  }
  
  jsonObjExecuteService ["subscriber_id_given"] = subs_id; //given json element do not remove
  if (typeof path_email === "undefined") {
    path_email = "";
  }

  delete jsonObjExecuteService.module_given;
  delete jsonObjExecuteService.path_email;

  var iterationCount = 1000;
  var keySize = 128;
  var corporate = "litecloudcorporation";
  var plaintext = JSON.stringify(jsonObjExecuteService);
  
  var keyone = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  var keytwo = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  
  var aesUtil = new AesUtil(keySize, iterationCount);
  var ciphertext = aesUtil.encrypt(keytwo, keyone, corporate, plaintext);

  //var orgtext = aesUtil.decrypt(keytwo, keyone, corporate, ciphertext);

  var serviceResponse;
  var url = host+`/${module}/service/${path_email}${corporate}/aes`;
  var params = {
    ciphertext: ciphertext,
    keyone: keyone,
    keytwo: keytwo,
    iterationCount: iterationCount,
    keySize: keySize
  };

  // Convert the parameters object to URL-encoded form data
  var formData = new URLSearchParams(params);

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the request type and URL
  xhr.open('GET', url + '?' + formData.toString(), true);

  // Set up an event listener to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // Check if the request is complete
      if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
        serviceResponse = JSON.parse(xhr.responseText);
      } else {

      }
      callback(serviceResponse);
    }
  };

  // Send the request
  xhr.send();

}


function executeServiceImgPost(jsonObjExecuteService, callback) {

  var subs_id;
  var module = jsonObjExecuteService.module_given;
  var path_email = jsonObjExecuteService.path_email;
  
  if (module.includes("Subscriber-API") || module.includes("Login-API")) {
    subs_id = 0;
  } else {
    subs_id = subscriberID();
  }

  jsonObjExecuteService ["subscriber_id_given"] = subs_id; //given json element do not remove
  if (typeof path_email === "undefined") {
    path_email = "";
  }
  
  var key = "huge_data_save";
  var huge_data_save = jsonObjExecuteService[key];

  var formDataObject = {};
  formDataObject [key] = huge_data_save;

  delete jsonObjExecuteService.module_given;
  delete jsonObjExecuteService.path_email;
  delete jsonObjExecuteService.huge_data_save;

  var iterationCount = 1000;
  var keySize = 128;
  var corporate = "litecloudcorporation";
  var plaintext = JSON.stringify(jsonObjExecuteService);

  var keyone = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  var keytwo = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  
  var aesUtil = new AesUtil(keySize, iterationCount);
  var ciphertext = aesUtil.encrypt(keytwo, keyone, corporate, plaintext);

  //var orgtext = aesUtil.decrypt(keytwo, keyone, corporate, ciphertext);

  var serviceResponse;
  var url = host+`/${module}/service/${path_email}${corporate}/aes`;
  var params = {
    ciphertext: ciphertext,
    keyone: keyone,
    keytwo: keytwo,
    iterationCount: iterationCount,
    keySize: keySize
  };

  // Convert the parameters object to URL-encoded form data
  var formData = new URLSearchParams(params);

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the request type and URL
  xhr.open('POST', url + '?' + formData.toString(), true);

  // Set up an event listener to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // Check if the request is complete
      if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
        serviceResponse = JSON.parse(xhr.responseText);
      } else {

      }
      callback(serviceResponse);
    }
  };

  // Send the request
  xhr.send(JSON.stringify(formDataObject));

}

function executeServiceImage(jsonObjExecuteService, callback) {

  var subs_id = subscriberID();

  jsonObjExecuteService ["subscriber_id_given"] = subs_id; //given json element do not remove
  var module = jsonObjExecuteService.module_given;
  var path_email = jsonObjExecuteService.path_email;
  if (typeof path_email === "undefined") {
    path_email = "";
  }
  delete jsonObjExecuteService.module_given;
  delete jsonObjExecuteService.path_email;

  var iterationCount = 1000;
  var keySize = 128;
  var corporate = "litecloudcorporation";
  var plaintext = JSON.stringify(jsonObjExecuteService);

  var keyone = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  var keytwo = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  
  var aesUtil = new AesUtil(keySize, iterationCount);
  var ciphertext = aesUtil.encrypt(keytwo, keyone, corporate, plaintext);

  //var orgtext = aesUtil.decrypt(keytwo, keyone, corporate, ciphertext);

  var serviceResponse;
  var url = host+`/${module}/service/${path_email}${corporate}/aes_image`;
  var params = {
    ciphertext: ciphertext,
    keyone: keyone,
    keytwo: keytwo,
    iterationCount: iterationCount,
    keySize: keySize
  };

  // Convert the parameters object to URL-encoded form data
  var formData = new URLSearchParams(params);

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the request type and URL
  xhr.open('GET', url + '?' + formData.toString(), true);

  // Set up an event listener to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // Check if the request is complete
      if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
        serviceResponse = xhr.responseText;
      } else {

      }
      callback(serviceResponse);
    }
  };

  // Send the request
  xhr.send();

}

function executeServiceApplication(jsonObjExecuteService, callback) {

  var subs_id = subscriberID();

  jsonObjExecuteService ["subscriber_id_given"] = subs_id; //given json element do not remove
  var module = jsonObjExecuteService.module_given;
  var path_email = jsonObjExecuteService.path_email;
  if (typeof path_email === "undefined") {
    path_email = "";
  }
  delete jsonObjExecuteService.module_given;
  delete jsonObjExecuteService.path_email;

  var iterationCount = 1000;
  var keySize = 128;
  var corporate = "litecloudcorporation";
  var plaintext = JSON.stringify(jsonObjExecuteService);

  var keyone = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  var keytwo = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  
  var aesUtil = new AesUtil(keySize, iterationCount);
  var ciphertext = aesUtil.encrypt(keytwo, keyone, corporate, plaintext);

  //var orgtext = aesUtil.decrypt(keytwo, keyone, corporate, ciphertext);

  var serviceResponse;
  var url = host+`/${module}/service/${path_email}${corporate}/verify`;
  var params = {
    ciphertext: ciphertext,
    keyone: keyone,
    keytwo: keytwo,
    iterationCount: iterationCount,
    keySize: keySize
  };

  // Convert the parameters object to URL-encoded form data
  var formData = new URLSearchParams(params);

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the request type and URL
  xhr.open('GET', url + '?' + formData.toString(), true);

  // Set up an event listener to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // Check if the request is complete
      if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
        serviceResponse = JSON.parse(xhr.responseText);
      } else {

      }
      callback(serviceResponse);
    }
  };

  // Send the request
  xhr.send();

}

//$('.main-content').children().children().children().children().children().hide();

// Function to check if a specific URL exists in the JSON data
function isURLExists(jsonData, urlToFind) {
  for (const grouping of jsonData) {
    const functionalities = grouping.list_of_functionalities;
    for (const functionality of functionalities) {
      if (functionality.url.includes(urlToFind)) {
        return true; // URL exists
      }
    }
  }
  return false; // URL does not exist
}

function getLastPathSegment(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const pathSegments = pathname.split('/').filter(segment => segment.trim() !== '');

  if (pathSegments.length > 0) {
    return pathSegments[pathSegments.length - 1];
  } else {
    return null; // If there are no path segments
  }
}

function functionalitiesInspector(in_jsonData) {
  // Using window.location.href
  const currentURL = window.location.href;
  const lastPathSegment = getLastPathSegment(currentURL);

  if (lastPathSegment != 'index.html') {
      // Check if "request-payable-adjustments.html" exists in the JSON data
      const urlToCheck = lastPathSegment;
      const exists = isURLExists(in_jsonData, urlToCheck);

      if (!exists) {
        $('.main-content').children().children().children().children().children().remove();
        $('.main-content').children().children().children().children().append('<br><h1>Access Denied 🙅</h1><br><p>Please take note that you are not authorized to visit this URL.</p>');
      } else {
        $('.main-content').children().children().children().children().children().show();
      }
  } else {
    $('.main-content').children().children().children().children().children().show();
  }
}