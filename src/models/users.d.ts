export interface User {
  userName: string;
}

export interface NewUser extends User {
  password: string;
}

export interface UserAccount extends User {
  _id: string;
  hashedPassword: string;
}
