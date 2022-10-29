import { User } from '../../entity/user.entity'

export default interface IUserRepository {
  save: (user: User) => Promise<User>
  findOne: (id: number) => Promise<User | null>
  findOneByEmail: (email: string) => Promise<User | null>
  update: (user: User) => Promise<User>
}
