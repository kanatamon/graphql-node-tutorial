function info() {
  return `This is the API of a Hackernews Clone`
}

function feed(parent, args, context, info) {
  return context.prisma.link.findMany()
}

function link(parent, { id }, context) {
  return context.prisma.link.findOne({
    where: { id: +id },
  })
}

module.exports = {
  info,
  feed,
  link,
}
