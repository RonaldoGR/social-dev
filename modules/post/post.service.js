import Post from './post.modul'

export const createPost = async (body, user) => {
  return await Post.create({
    text: body.text,
    createdDate: new Date(),
    createdBy: user.id
  })
}

export const getPosts = async (limit = 10) => {
  return await Post.find().populate('createdBy', 'User').sort({createdDate: -1}).limit(limit)
}