const _ = require('lodash');

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const reducer = (acc, blog) => acc+blog.likes
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, blog, idx) =>
        blog.likes > acc.likes ? blog : acc
    return blogs.length === 0 ? null : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    const [ author, count] =  _(blogs)
        .countBy(blog=>blog.author)
        .entries()
        .maxBy(_.last)
    return {
        author: author,
        blogs: count
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    const f = (acc, val, key) => {
        const likes = totalLikes(val)
        if (likes > acc.likes){
            acc.likes = likes
            acc.author = key
        }
        return acc
    }
    const g = _.groupBy(blogs,blog=>blog.author)
    return _.transform(g, f, {
            author: "",
            likes: 0
        })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
