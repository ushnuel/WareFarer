import chai from 'chai';

class Utils {
  constructor(server) {
    this.server = server;
  }

  async postUser(route, user, haveToken = true) {
    const res = await chai
      .request(this.server)
      .post(route)
      .send(user);

    if (haveToken) {
      this.token = res.body.data.token;
    }
    return res;
  }

  async post(route, obj, token = this.token) {
    return chai
      .request(this.server)
      .post(route)
      .auth(token, { type: 'bearer' })
      .send(obj);
  }

  async get(route, obj, token = this.token) {
    const res = await chai
      .request(this.server)
      .get(route)
      .auth(token, { type: 'bearer' })
      .query(obj);

    return res;
  }
}

export default Utils;
