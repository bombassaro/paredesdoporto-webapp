import BaseService from '../../../service/base_session';
class Service extends BaseService {
  prfx = "api"
  async login(body) {
    const dest = `${this.prfx}/root/u/login`
    const rslt = await this.post(
      body,
      dest
    );
    return rslt;
  }
  async verify(body) {
    const dest = `${this.prfx}/root/u/data`
    const rslt = await this.post(
      body,
      dest
    );
    return rslt;
  }
}
export default new Service();