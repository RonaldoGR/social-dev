
import Joi from 'joi'

import createHandler from '../../../lib/middlewares/nextconnect'

import validate from '../../../lib/middlewares/validation'

import { signupUser } from "../../../modules/user/user.service"

const postSchema = Joi.object({
    FirstName: Joi.string().required().max(50),
    LastName: Joi.string().required().max(50),
    User: Joi.string().required().max(30),
    Email: Joi.string().email().required().max(100),
    Password: Joi.string().required().max(50).min(6),
})

const signup = createHandler()

  signup.post(validate({body: postSchema}), async (req, res) => {
    try {
      const user = await signupUser(req.body)
      res.status(201).json({user})
    }
    catch (err){
      console.error(err)
      throw err
    }
  })


export default signup