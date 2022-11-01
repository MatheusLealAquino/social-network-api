import { AppDataSource } from '../data-source'

import UserRepositoryMysql from '../repository/mysql/user.repository.mysql'

import { User } from '../entity/user.entity'

import UserController from './user.controllers'

const res = {
  cookie: () => ({}),
  status: () => ({
    json: (data) => (data)
  })
}

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

describe('Signup user', () => {
  test('when all data is correct then create user', async () => {
    const userController = new UserController({ userRepository: userRepositoryMysql })

    const body = {
      birthday: new Date(),
      email: 'matheusleal.a@gmail.com',
      firstName: 'Matheus',
      lastName: 'Leal',
      gender: 'male',
      password: '123456',
      relationshipStatus: 'married'
    }

    const output = await userController.signup({ body }, res)

    expect(output?.data?.message).toBe('User created successfully')
    expect(output?.success).toBeTruthy()
  })

  test('when enum isnt correct then get error', async () => {
    const userController = new UserController({ userRepository: userRepositoryMysql })

    const body = {
      birthday: new Date(),
      email: 'matheusleal.a@gmail.com',
      firstName: 'Matheus',
      lastName: 'Leal',
      gender: 'homem',
      password: '123456',
      relationshipStatus: 'married'
    }

    const output = await userController.signup({ body }, res)

    expect(output?.success).toBeFalsy()
  })
})

describe('Login user', () => {
  test('when all data is correct then generate token for user', async () => {
    const userController = new UserController({ userRepository: userRepositoryMysql })

    const bodySignup = {
      birthday: new Date(),
      email: 'matheusleal.a@gmail.com',
      firstName: 'Matheus',
      lastName: 'Leal',
      gender: 'male',
      password: '123456',
      relationshipStatus: 'married'
    }

    await userController.signup({ body: bodySignup }, res)

    const bodyLogin = {
      email: 'matheusleal.a@gmail.com',
      password: '123456'
    }

    const output = await userController.login({ body: bodyLogin }, res)

    expect(output?.data?.token).toBeDefined()
    expect(output?.success).toBeTruthy()
  })
})
