interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(data: UserData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}

export default User;
