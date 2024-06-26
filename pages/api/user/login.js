import {withIronSessionApiRoute} from 'iron-session/next'

import createHandler from '../../../lib/middlewares/nextConnect'
import validate from '../../../lib/middlewares/validation'
import { login } from "../../../modules/user/user.service"
import { IronConfig } from '../../../lib/middlewares/ironSession' 
import { loginSchema } from '../../../modules/user/user.schema'


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
    return res.status(400).send(err.message)
  }
})

export default withIronSessionApiRoute(handler, IronConfig)