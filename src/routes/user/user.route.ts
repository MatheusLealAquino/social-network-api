import express, { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import UserController from '../../controllers/user.controller'

export default class UserRouter {
  userController: UserController
  router: Router

  constructor ({ userRepository }) {
    this.userController = new UserController({
      userRepository
    })

    this.router = express.Router()
  }

  defineRoutes (): Router {
    this.registerRoute()
    this.loginRoute()

    return this.router
  }

  private registerRoute (): void {
    this.router.post(
      '/register',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          birthday: Joi.date().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          gender: Joi.string().valid('male', 'female').required(),
          relationshipStatus: Joi.string().valid(
            'single', 'in_a_relationship', 'married', 'widower', 'widow'
          ).required(),
          password: Joi.string().min(6).max(32).required()
        }
      }),
      async (req, res) => (await this.userController.signup(req, res))
    )
  }

  private loginRoute (): void {
    this.router.post(
      '/login',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }),
      async (req, res) => (await this.userController.login(req, res))
    )
  }
}
