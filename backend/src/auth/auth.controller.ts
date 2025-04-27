import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.email,req.userUid);
  }
  @Post('/register')
  register(@Request() req,@Body() createPersonDTO:CreatePersonDto) {
    console.log(createPersonDTO);
    console.log(req);
    return this.authService.register(req.userUid,req.email,createPersonDTO);
  }


}
