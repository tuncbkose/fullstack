const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) =>{
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) =>{
    const blog = await Blog.findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
    if (blog){
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user.id
    })
    const user = request.user
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if ( blog && blog.user.toString() !== request.user.id ) {
        return response.status(403).json({ error: "user doesn't own this note"})
    }

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true })
        .populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
})

module.exports = blogRouter