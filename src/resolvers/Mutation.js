const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context, info) {
  const userId = getUserId(context)

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  })

  return newLink
}

async function updateLink(parent, args, context, info) {
  const { id, ...rest } = args
  const link = await context.prisma.link.update({
    where: { id: +id },
    data: { ...rest },
  })

  return link
}

async function deleteLink(parent, { id }, context, info) {
  const link = await context.prisma.link.delete({
    where: { id: +id },
  })

  return link
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    password,
    user,
    token,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    user,
    token,
  }
}

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
}
