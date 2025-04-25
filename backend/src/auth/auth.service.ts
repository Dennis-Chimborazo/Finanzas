import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }
  async login(email: string, userUid: string) {
    let user = await this.userService.findOneUid(userUid);
    if (!user) {
      throw new NotFoundException("This user does not exist, please register");
    }
    return user;
  }
  async register(userUid: string, email: string, createPersonDTO: CreatePersonDto) {
    return await this.userService.create(userUid, email,createPersonDTO)

  }

}