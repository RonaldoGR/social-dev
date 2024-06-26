import { hashPassword, comparePassword } from "../../utils/bcrypt"
import User from './user.model'

export const signupUser = async (body) => {
  try {
    const user = {
      ...body,
      Password: hashPassword(body.Password)
    }
   const dbUser = await User.create(user) 
   return dbUser
  } catch (err) {
    throw err
  }
}

export const login = async (body) => {
try {
    const user = await User.findOne({
      $or: [
        {Email: body.UserOrEmail },
        { User: body.UserOrEmail}
      ]
    })

    if(!user) throw new Error ('not_found')
      const passwordIsCorrect = comparePassword(body.Password, user.Password)
    if(!passwordIsCorrect) throw new Error ('incorrect password')  

    return user
  } catch (err){
    throw err
  }
}