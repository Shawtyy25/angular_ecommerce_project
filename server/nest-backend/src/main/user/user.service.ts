import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findByNameOrEmail(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [
        { name: username },
        { email: username },
      ],
    });

    return user || null;
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: {id} });
  }

  async userCount() {
    return await this.userRepository.count();
  }

}
