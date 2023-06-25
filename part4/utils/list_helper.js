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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
