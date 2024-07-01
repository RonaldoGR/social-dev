import Joi from "joi" // biblioteca de validação de dados

export const createPostSchema = Joi.object ({
  text: Joi.string().required().max(256)
})