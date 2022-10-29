import { User } from '../entity/user.entity'
import IUserRepository from '../types/repository/IUserRepository'

import { generateHash } from '../utils/encryptionUtils'

export default class UserService {
  userRepository: IUserRepository

  constructor ({ userRepository }) {
    this.userRepository = userRepository
  }

  async createUser ({
    firstName,
    lastName,
    email,
    password,
    gender,
    relationshipStatus,
    birthday
  }: Omit<User, 'createdAt' | 'updatedAt' | 'id'>): Promise<User> {
    const user = new User()

    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = generateHash({ password })
    user.gender = gender
    user.relationshipStatus = relationshipStatus
    user.birthday = birthday
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return await this.userRepository.save(user)
  }
}
