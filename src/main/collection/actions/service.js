import BaseService from '../../../service/base';

class Service extends BaseService {

  prefix = "api"

  async postsByCollections(filters) {
    const url = `${this.prefix}/post/filter`
    const result = await this.post(filters, url);
    return result;
  }
  
  async collectionsFromRoot(filters) {
    const url = `${this.prefix}/root`
    const result = await this.post(filters, url);
    return result;
  }
  async deleteCollection(id) {
    const url = `${this.prefix}/collection/${id}`
    const result = await this.remove(id, url);
    return result;
  }
  async saveCollection(filters) {
    const url = `${this.prefix}/collection`
    const result = await this.post(filters, url);
    return result;
  }
  
  async loadData(filters) {
    const url = `${this.prefix}/post`
    const result = await this.get(
      filters,
      url
    );
    return result;
  }

  async saveData(data) {
    const url = `${this.prefix}/post`
    const result = await this.post(
      data,
      url
    );
    return result;
  }

  async updateData(id, data) {
    const url = `${this.prefix}/post/${id}`
    const result = await this.update(
      data,
      url
    );
    return result;
  }

  async removeData(id) {
    const url = `${this.prefix}/post/${id}`
    const result = await this.remove(
      id,
      url
    );
    return result;
  }

}

export default new Service();