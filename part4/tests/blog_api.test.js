const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const helper = require('./test_helper')

const api = supertest(app)

// In the example, this is beforeEach, but I think this is fine
beforeAll(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property exists', async () => {
  const result = await api
      .get('/api/blogs')
      .expect(200)

  // check that the first blog has `id` field defined
  expect(result.body[0].id).toBeDefined()
})

test('POST works properly', async () => {
  const newBlog = {
    title: "A blog",
    author: "Blogger",
    url: "blog.com",
    likes: 4
  }
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length+1)
})

describe('Properties', () => {
  test('`likes` defaults to 0', async () => {
    const blogWithNoLikes = {
      title: "Nobody likes me",
      author: "I'm sad",
      url: "sad.com",
    }
    await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .expect(201)
    const blogs = await helper.blogsInDb()
    expect(blogs.at(-1).likes).toEqual(0)
  })

  test('`title` and `url` are required', async () => {
    const noTitle = {
      author: "Aut Hor",
      url: "blog.com",
    }
    const noUrl = {
      title: "Title",
      author: "Aut Hor",
    }
    await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400)
  }, 100000)
})

afterAll(async () => {
  await mongoose.connection.close()
})