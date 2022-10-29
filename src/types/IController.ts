import { Response } from 'express'
import IRequest from './IRequest'

export default interface IController {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  (req: IRequest, res: Response): void
};
