/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Response } from 'express'
import httpStatusCodes from 'http-status-codes'

export interface IOverrideRequest {
  code: number
  message: string
  positive: string
  negative: string
}

export interface ICookie {
  key: string
  value: string
}

export default class ApiResponse {
  static result: any = (
    res: Response,
    data: object,
    status: number = 200,
    cookie: ICookie = null
  ) => {
    if (cookie) {
      res.cookie(cookie.key, cookie.value)
    }

    return res.status(status).json({
      data,
      success: true
    })
  }

  static error: any = ({
    res,
    status = 400,
    error = httpStatusCodes.getStatusText(status),
    override = null,
    internalError = null
  }: {
    res: Response
    status: number
    error: string
    override: IOverrideRequest
    internalError: Error
  }) => {
    if (internalError) {
      console.error(internalError)
    }

    return res.status(status).json({
      override,
      error: {
        message: error
      },
      success: false
    })
  }

  static setCookie: any = (res: Response, key: string, value: string) => {
    return res.cookie(key, value)
  }
}
