import UserService from './user.service'
import UserRepositoryMemory from '../repository/memory/user.repository.memory'

describe('createUser', () => {
  test('when receive correctly data then save', async () => {
    const userRepositoryMemory = new UserRepositoryMemory()

    const userService = new UserService({
      userRepository: userRepositoryMemory
    })

    const user = await userService.createUser({
      birthday: new Date(),
      email: 'matheusleal.a@gmail.com',
      firstName: 'Matheus',
      lastName: 'Leal',
      gender: 'male',
      password: '12346',
      relationshipStatus: 'married'
    })

    expect(user.id).toBeDefined()
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
  })
})
