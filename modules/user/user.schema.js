import Joi from 'joi'


export const signupSchema = Joi.object({
  FirstName: Joi.string().required().max(50),
  LastName: Joi.string().required().max(50),
  User: Joi.string().required().max(30),
  Email: Joi.string().email({tlds: { allow: false }}).required().max(100),
  Password: Joi.string().required().max(50).min(6),
})