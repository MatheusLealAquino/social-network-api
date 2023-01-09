import { User } from '../../entity/user.entity'

import IUserRepository from '../../types/repository/IUserRepository'

export default class userRepositoryMemory implements IUserRepository {
  userRepository: User[]

  constructor () {
    this.userRepository = []
  }

  async findOne (id: number): Promise<User | null> {
    return this.userRepository.find(user => user.id === id)
  }

  async findOneByEmail (email: string): Promise<User | null> {
    return this.userRepository.find(user => user.email === email)
  }

  async save (user: User): Promise<User> {
    user.id = new Date().getTime()
    user.createdAt = new Date()
    user.updatedAt = new Date()

    this.userRepository.push(user)
    return user
  }

  async update (user: User): Promise<User> {
    const foundUser = this.userRepository.findIndex(userFind => userFind.id === user.id)
    this.userRepository[foundUser] = user
    return user
  }
}
