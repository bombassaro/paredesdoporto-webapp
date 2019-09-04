import querystring from 'querystring';
import {isString} from 'lodash';
import api from './api_session';

class BaseService {
  api = api

  get(id, prefix = this.prefix) {
    if (id) {
      return api.get(`${prefix}/${id}`);
    }
    return api.get(prefix);
  }

  post(body, prefix = this.prefix) {
    return api.post(prefix, body);
  }

  search(params = {}, prefix = this.prefix) {
    const query = isString(params) ? params : querystring.stringify(params);
    return api.get(`${prefix}?${query}`);
  }

  update(data, url) {
    return api.put(`${url}`, data);
  }

  remove(id, prefix = this.prefix) {
    return api.remove(`${prefix}`);
  }
}

export default BaseService;