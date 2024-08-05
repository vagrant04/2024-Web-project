/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  email: string;
  password: string;
}
