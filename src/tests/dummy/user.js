/* eslint-disable camelcase */
class User {
  constructor() {
    this.user = {
      email: 'usher@gmail.com',
      first_name: 'Emmanuel',
      last_name: 'Chinazom',
      password: 'ushermankellyy',
    };

    this.invalidUser = {
      email: 'invalid@gmail.com',
      first_name: 'Emmanuel',
      last_name: 'Chinazom',
      password: 'invalid',
    };
  }
}
export default User;
