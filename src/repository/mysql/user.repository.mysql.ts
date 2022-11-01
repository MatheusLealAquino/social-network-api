import { Repository } from 'typeorm'

import { AppDataSource } from '../../data-source'
import { User } from '../../entity/user.entity'

export default class UserRepositoryMysql {
  userRepository: Repository<User>

  constructor () {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async findOne (id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id })
  }

  async findOneByEmail (email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email })
  }

  async save (user: User): Promise<User> {
    return await this.userRepository.save(user)
  }

  async update (user: User): Promise<User> {
    await this.userRepository.update(user.id, user)
    return await this.userRepository.findOneBy({ id: user.id })
  }
}
