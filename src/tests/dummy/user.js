/* eslint-disable camelcase */
class User {
  constructor() {
    this.admin = {
      email: 'usher@gmail.com',
      first_name: 'Emmanuel',
      last_name: 'Chinazom',
      password: 'ushermankellyy',
      is_admin: true,
    };

    this.invalidUser = {
      email: 'invalid@gmail.com',
      first_name: 'Emmanuel',
      last_name: 'Chinazom',
      password: 'invalid',
    };

    this.admin1 = {
      email: 'admin1@gmail.com',
      first_name: 'admin1',
      last_name: 'admin1',
      password: 'admin1password',
      is_admin: true,
    };

    this.user = {
      email: 'user@gmail.com',
      first_name: 'user',
      last_name: 'user',
      password: 'userpassword',
    };
  }
}
export default User;
