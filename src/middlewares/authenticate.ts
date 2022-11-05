import express from 'express'
import httpStatusCodes from 'http-status-codes'

import IRequest from '../types/IRequest'
import IController from '../types/IController'
import apiResponse from '../utils/apiResponse'

import { verifyCookie } from '../utils/encryptionUtils'

import UserService from '../services/user.service'

export default class Authenticate {
  private readonly userService: UserService

  constructor ({ userRepository }) {
    this.userService = new UserService({ userRepository })
  }

  async verify (
    req: IRequest,
    res: express.Response,
    next: express.NextFunction
  ): Promise<IController> {
    try {
      const authorizationHeader = req.headers.authorization.replace('Bearer ', '')
      if (!authorizationHeader) {
        return apiResponse.error({
          res,
          status: httpStatusCodes.UNAUTHORIZED
        })
      }

      const decoded = await verifyCookie({ token: authorizationHeader })
      if (!decoded) {
        return apiResponse.error({
          res,
          status: httpStatusCodes.UNAUTHORIZED
        })
      }

      const user = await this.userService.findById(
        decoded.data.user
      )
      if (!user) {
        return apiResponse.error({
          res,
          status: httpStatusCodes.UNAUTHORIZED
        })
      }

      req.user = user

      next()
    } catch (err) {
      return apiResponse.error({
        res,
        status: httpStatusCodes.UNAUTHORIZED,
        internalError: err
      })
    }
  }
}
