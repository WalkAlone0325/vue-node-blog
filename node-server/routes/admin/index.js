module.exports = app => {
  const article = require('./article')
  const user = require('./user')
  const tag = require('./tag')
  const page = require('./page')
  const project = require('./project')
  const record = require('./record')
  const skill = require('./skill')
  const friendlink = require('./friendlink')
  const tools = require('./tools')


  app.use(user.routes(), user.allowedMethods())
  app.use(article.routes(), article.allowedMethods())
  app.use(page.routes(), page.allowedMethods())
  app.use(project.routes(), project.allowedMethods())
  app.use(record.routes(), record.allowedMethods())
  app.use(skill.routes(), skill.allowedMethods())
  app.use(tag.routes(), tag.allowedMethods())
  app.use(friendlink.routes(), friendlink.allowedMethods())
  app.use(tools.routes(), tools.allowedMethods())
}