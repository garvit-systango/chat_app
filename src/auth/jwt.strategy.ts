import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `db47c62198ef671c352ff197fd23673f37da36c54e6ab71c7b0748e9d0ca7c40`,
    });
  }

  async validate(payload: any) {
    // This becomes available as `req.user` in protected routes
    return { userId: payload.sub, email: payload.email };
  }
}
