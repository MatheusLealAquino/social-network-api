import request from 'supertest'

import { AppDataSource } from '../../data-source'

import { User } from '../../entity/user.entity'

import app from '../../../app'

beforeAll(async () => {
  await AppDataSource.initialize()
})

afterEach(async () => {
  const userRepository = AppDataSource.getRepository(User)
  await userRepository.clear()
})

afterAll(async () => {
  await AppDataSource.destroy()
})

describe('Register user', () => {
  test('when body is invalid then return error', async () => {
    const { body, status } = await request(app).post('/v1/user/register')

    expect(status).toBe(400)
    expect(body.success).toBeFalsy()
    expect(body.details).toBe('"email" is required')
    expect(body.message).toBe('Bad Request')
  })

  test('when body is valid then create user', async () => {
    const { status, body } = await request(app)
      .post('/v1/user/register')
      .send({
        birthday: new Date(),
        email: 'matheusleal.a@gmail.com',
        firstName: 'Matheus',
        lastName: 'Leal',
        gender: 'male',
        password: '123456',
        relationshipStatus: 'married'
      })

    expect(status).toBe(200)
    expect(body.success).toBeTruthy()
    expect(body.data.message).toBe('User created successfully')
  })

  test('when user is already created then throw error', async () => {
    const bodyRequest = {
      birthday: new Date(),
      email: 'matheusleal.a@gmail.com',
      firstName: 'Matheus',
      lastName: 'Leal',
      gender: 'male',
      password: '123456',
      relationshipStatus: 'married'
    }

    await request(app)
      .post('/v1/user/register')
      .send(bodyRequest)

    const { status, body } = await request(app)
      .post('/v1/user/register')
      .send(bodyRequest)

    expect(status).toBe(500)
    expect(body.success).toBeFalsy()
    expect(body.error.message).toBe('Email already created')
  })
})

describe('Login user', () => {
  test('when body is invalid then return error', async () => {
    const { body, status } = await request(app).post('/v1/user/login')

    expect(status).toBe(400)
    expect(body.success).toBeFalsy()
    expect(body.details).toBe('"email" is required')
    expect(body.message).toBe('Bad Request')
  })

  test('when body is valid then return token', async () => {
    await request(app)
      .post('/v1/user/register')
      .send({
        birthday: new Date(),
        email: 'matheusleal.a@gmail.com',
        firstName: 'Matheus',
        lastName: 'Leal',
        gender: 'male',
        password: '123456',
        relationshipStatus: 'married'
      })

    const { status, body } = await request(app)
      .post('/v1/user/login')
      .send({
        email: 'matheusleal.a@gmail.com',
        password: '123456'
      })

    expect(status).toBe(200)
    expect(body.success).toBeTruthy()
    expect(body.data.token).toBeDefined()
  })
})
