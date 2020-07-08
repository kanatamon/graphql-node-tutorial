const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
    link: async (parent, { id }, context) => {
      return context.prisma.link.findOne({
        where: { id: +id },
      })
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })

      return newLink
    },
    updateLink: async (parent, args, context) => {
      const { id, ...rest } = args
      const link = await context.prisma.link.update({
        where: { id: +id },
        data: { ...rest },
      })

      return link
    },
    deleteLink: async (parent, { id }, context) => {
      const link = await context.prisma.link.delete({
        where: { id: +id },
      })

      return link
    },
  },
  /*
  The argument `parent` below is the result of the previous resolver execution
  , which in this case `feed` in `Query` above is the previous resolver,
  the result of the previous resovler is `links`.
  On the other hand `parent` is a particular item of `links`
  */
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
