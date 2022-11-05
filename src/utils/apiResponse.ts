/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Response } from 'express'
import httpStatusCodes from 'http-status-codes'

export interface ICookie {
  key: string
  value: string
}

export default class ApiResponse {
  static result: any = (
    res: Response,
    data: object,
    status: number = 200
  ) => {
    return res.status(status).json({
      data,
      success: true
    })
  }

  static error: any = ({
    res,
    status = 400,
    error = httpStatusCodes.getStatusText(status),
    internalError = null
  }: {
    res: Response
    status: number
    error: string
    internalError: Error
  }) => {
    if (internalError) {
      console.error(internalError)
    }

    return res.status(status).json({
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
