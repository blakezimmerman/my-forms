export interface NewUser {
  userName: string;
  password: string;
}

export interface UserAccount {
  _id: string;
  userName: string;
  hashedPassword: string;
}
