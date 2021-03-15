import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    const users = await User.all()

    return users
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return {
        error: 'User not found.',
      }
    }

    return user
  }

  public async store({ request }: HttpContextContract) {
    const user = new User()
    const body = request.post()

    user.name = body.name
    user.email = body.email
    user.password_hash = body.password_hash

    await user.save()

    return user
  }

  public async update({ request }: HttpContextContract) {
    const body = request.post()

    const user = await User.find(body.id)

    if (!user) {
      return {
        error: 'User not found.',
      }
    }

    if (body.name) user.name = body.name
    if (body.email) user.email = body.email
    if (body.password_hash) user.password_hash = body.password_hash

    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return {
        error: 'User not found.',
      }
    }

    await user.delete()
  }
}
