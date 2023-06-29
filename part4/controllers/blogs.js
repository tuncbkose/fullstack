const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) =>{
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) =>{
    const blog = await Blog.findById(request.params.id)
    if (blog){
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const user = await User.findById("649d162d7b838dd2c4f5f43a")
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true })
    response.json(updatedBlog)
})

module.exports = blogRouter
