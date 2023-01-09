import httpStatusCodes from 'http-status-codes'

import { generateCookie } from '../utils/encryptionUtils'

import IController from '../types/IController'

import { User } from '../entity/user.entity'

import UserService from '../services/user.service'
import apiResponse from '../utils/apiResponse'

export default class UserController {
  private readonly userService: UserService

  constructor ({ userRepository }) {
    this.userService = new UserService({ userRepository })
  }

  async signup (req, res): Promise<IController> {
    try {
      const {
        email,
        birthday,
        firstName,
        lastName,
        gender,
        password,
        relationshipStatus
      } = req.body

      const user = new User()

      user.birthday = birthday
      user.email = email
      user.firstName = firstName
      user.lastName = lastName
      user.gender = gender
      user.password = password
      user.relationshipStatus = relationshipStatus

      const outputUser = await this.userService.createUser(user)

      const responseUser = {
        email: outputUser.email,
        message: 'User created successfully'
      }

      return apiResponse.result(res, responseUser, httpStatusCodes.OK)
    } catch (err) {
      if (err.message === 'Email already created') {
        return apiResponse.error({
          res,
          status: httpStatusCodes.INTERNAL_SERVER_ERROR,
          error: 'Email already created',
          internalError: err
        })
      }

      return apiResponse.error({
        res,
        status: httpStatusCodes.BAD_REQUEST,
        error: 'Unable to create user',
        internalError: err
      })
    }
  }

  async login (req, res): Promise<IController> {
    try {
      const {
        email,
        password
      } = req.body

      const outputUser = await this.userService.login({
        email,
        password
      })

      if (outputUser) {
        const cookie = await generateCookie({ key: 'user', value: outputUser.id })
        return apiResponse.result(
          res,
          {
            token: cookie,
            userId: outputUser.id
          },
          httpStatusCodes.OK,
          cookie
        )
      } else {
        return apiResponse.error({
          res,
          status: httpStatusCodes.UNAUTHORIZED,
          error: 'Check credentials and retry'
        })
      }
    } catch (err) {
      return apiResponse.error({
        res,
        status: httpStatusCodes.BAD_REQUEST,
        error: 'Unable to make login, try again later',
        internalError: err
      })
    }
  }
}
