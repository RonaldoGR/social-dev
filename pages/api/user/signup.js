import Joi from 'joi'
import {withIronSessionApiRoute} from 'iron-session/next'
import { IronConfig } from '../../../lib/middlewares/ironSession' 

import createHandler from '../../../lib/middlewares/nextconnect'
import validate from '../../../lib/middlewares/validation'
import { signupUser } from "../../../modules/user/user.service"
import { signupSchema } from '../../../modules/user/user.schema'



const signup = createHandler()

  signup.post(validate({body: signupSchema}), async (req, res) => {
    try {
      const user = await signupUser(req.body)
      req.session.user = {
        id: user._id,
        User: user.User
      }
      await req.session.save()
      res.status(201).json({ok: true})
    }
    catch (err){
      console.error(err)
      throw err
    }
  })


export default withIronSessionApiRoute(signup, IronConfig)