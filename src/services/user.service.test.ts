import { AppDataSource } from '../data-source'

import UserRepositoryMysql from '../repository/mysql/user.repository.mysql'

import { User } from '../entity/user.entity'

import UserService from './user.service'

let userRepositoryMysql: UserRepositoryMysql
beforeAll(async () => {
  await AppDataSource.initialize()
  userRepositoryMysql = new UserRepositoryMysql()
})

afterAll(async () => {
  const userRepository = AppDataSource.getRepository(User)
  await userRepository.clear()
  await AppDataSource.destroy()
})

describe('createUser', () => {
  test('when receive correctly data then save', async () => {
    const userService = new UserService({
      userRepository: userRepositoryMysql
    })

    const user = new User()

    user.birthday = new Date()
    user.email = 'matheusleal.a@gmail.com'
    user.firstName = 'Matheus'
    user.lastName = 'Leal'
    user.gender = 'male'
    user.password = '123456'
    user.relationshipStatus = 'married'

    const output = await userService.createUser(user)

    expect(output.id).toBeDefined()
    expect(output.createdAt).toBeDefined()
    expect(output.updatedAt).toBeDefined()
  })
})
