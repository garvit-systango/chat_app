import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

      async createUser(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = this.userRepository.create({ email, password: hashedPassword });
        return this.userRepository.save(user);
    }
    async findByEmail(email: string): Promise<User | undefined | null> {
      return this.userRepository.findOne({ where: { email } });
    }

}
