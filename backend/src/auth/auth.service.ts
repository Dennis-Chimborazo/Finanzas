import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }
  async login(email: string, userUid: string) {
    let user = await this.userService.findOneUid(userUid);
    if (!user) {
      user = await this.userService.create(userUid, userUid)
    }
    return user;
  }
  async register(userUid: string, email: string) {
    return await this.userService.create(userUid, email)

  }

}