import {isString} from 'lodash';
//
class BaseApi {
  get url() {
    // let _url = "http://7598e60e.ngrok.io";
    // let _url = "http://192.168.2.3:4042";
    // let _url = "http://www.xprog.com.br:4043"
    let _url = "http://www.xprog.com.br:4044"
    return _url;
  }
  async fetch(url, options = {}) {
    const requestOp = {...options};
    requestOp.headers = options.headers || {};
    requestOp.headers['Content-Type'] = 'application/json';

    if(!options.hasOwnProperty('skipAuth')) {
      options.skipAuth = false;
    }
    // if(!options.skipAuth){
      // requestOp.headers.Authorization = await this.getToken();
    // }
    const apiurl = this.url

    // console.log("Fetch ", `${apiurl}/${url}`);

    if (options.body && !isString(options.body)) requestOp.body = JSON.stringify(options.body);
    const res = options.local ? await fetch(url, requestOp) : await fetch(`${apiurl}/${url}`, requestOp);

    if (res.ok) {
      return this.tryJson(res);
    }

    const body = await this.tryJson(res);
    const {status, statusText} = res;
    const result = {status, statusText, body};
    // console.error('Http Error:', result); 
    return result;
  }

  async tryJson(res) {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (ex) {
      return text;
    }
  }

  get(url) {
    return this.fetch(url);
  }

  post(url, body) {
    return this.fetch(url, {method: 'POST', body});
  }

  put(url, body) {
    return this.fetch(url, {method: 'PUT', body});
  }

  patch(url, body) {
    return this.fetch(url, {method: 'PATCH', body});
  }

  remove(url, body) {
    return this.fetch(url, {method: 'DELETE', body});
  }


}

export default new BaseApi();