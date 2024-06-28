import Joi from 'joi'


export const signupSchema = Joi.object({
  FirstName: Joi.string().required().max(50).message('O campo "Nome" pode ter no máximo {{#limit}} caracteres'),
  LastName: Joi.string().required().max(50).message('O campo "Sobrenome" pode ter no máximo {{#limit}} caracteres'),
  User: Joi.string().required().max(30).message('O campo "Usuário" pode ter no máximo {{#limit}} caracteres'),
  Email: Joi.string().email({tlds: { allow: false }}).required().max(100).message('O campo "Email" pode ter no máximo {{#limit}} caracteres'),
  Password: Joi.string().required()
    .max(50).message('O campo "Senha" pode ter no máximo {{#}} caracteres')
    .min(6).message('O campo "Senha" precisa ter no mínimo {{#limit}} caracteres'),
})

export const loginSchema = Joi.object({
  UserOrEmail: Joi.string().required(),
  Password: Joi.string().required()
  .max(50).message('O campo "Senha" pode ter no máximo {{#}} caracteres')
  .min(6).message('O campo "Senha" precisa ter no mínimo {{#limit}} caracteres'),
})