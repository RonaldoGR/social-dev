import Joi from 'joi'
import {withIronSessionApiRoute} from 'iron-session/next'

import createHandler from '../../../lib/middlewares/nextconnect'
import validate from '../../../lib/middlewares/validation'
import { login } from "../../../modules/user/user.service"
import { IronConfig } from '../../../lib/middlewares/ironSession' 

const loginSchema = Joi.object({
  UserOrEmail: Joi.string().required(),
  Password: Joi.string().required()
})

const handler = createHandler()

handler.post(validate({ body: loginSchema }), async (req,res) => {
  try {
    const user = await login(req.body)
    req.session.user = {
      id: user._id,
      User: user.User
    }
    await req.session.save()
    res.send({ok: true})
  } catch (err){
    console.error(err)
    throw err
  }
})

export default withIronSessionApiRoute(handler, IronConfig)