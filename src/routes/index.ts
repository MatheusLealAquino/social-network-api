import * as express from 'express'

import UserRepositoryMysql from '../repository/mysql/user.repository.mysql'

import UserRoute from './user/user.route'

const router = express.Router()

const userRepositoryMysql = new UserRepositoryMysql()

router.use('/user', new UserRoute({
  userRepository: userRepositoryMysql
}).defineRoutes())

export default router
