const logger = require('./logger')
const jwt = require("jsonwebtoken");
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" })
  }

  next(error)
}

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null
  if (authorization && authorization.startsWith('Bearer ')) {
    token =  authorization.replace('Bearer ', '')
  }
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token === null){
    return response.status(401).json({ error: 'token not provided' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
  request.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
