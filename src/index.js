const { GraphQLServer } = require('graphql-yoga')

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, { id }) => links.find((l) => l.id === id),
  },
  Mutation: {
    post: (_, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)

      return link
    },
    updateLink: (_, args) => {
      const { id, ...rest } = args
      const targetLink = links.find((l) => l.id === id)

      if (!targetLink) {
        throw Error(`The link with id of '${id}' is not exist!`)
      }

      const idx = links.indexOf(targetLink)
      links[idx] = {
        ...links[idx],
        ...rest,
      }

      return links[idx]
    },
    deleteLink: (_, args) => {
      const { id } = args
      const targetLink = links.find((l) => l.id === id)

      if (!targetLink) {
        throw Error(`The link with id of '${id}' is not exist!`)
      }

      const idx = links.indexOf(targetLink)
      links.splice(idx, 1)

      return targetLink
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
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
