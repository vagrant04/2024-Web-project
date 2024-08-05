import { Provide } from '@midwayjs/core';
import { data } from '../controller/home.controller';

@Provide()
export class UserService {
  async getUser(id: any) {
    return data.users.find(user => user.id === id);
  }
  async handleLogin(email: string, password: string): Promise<string> {
    const user = data.users.find(
      user => user.email === email && user.password === password
    );
    if (user) {
      return JSON.stringify(user);
    } else {
      return 'Invalid email or password';
    }
  }
}
