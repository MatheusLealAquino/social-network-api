import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';

export class UserRepository {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  save(user: User) {
    return this.userRepository.save(user);
  }

  async update(user: User) {
    return this.userRepository.update(user.id, user);
  }
}
