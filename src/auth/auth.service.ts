import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from 'src/users/schema/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
    private jwtAuthService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;

    const plainToHash = await hash(password, 10);

    userObject = { ...userObject, password: plainToHash };

    return this.userModel.create(userObject);
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;

    const findUser = await this.userModel.findOne({ email });

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser._id, name: findUser.name };

    const token = await this.jwtAuthService.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }
}
