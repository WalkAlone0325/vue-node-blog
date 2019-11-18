const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
require('./db/config')(app)


const article = require('./routes/article')
const user = require('./routes/user')
const tag = require('./routes/tag')
const page = require('./routes/page')
const record = require('./routes/record')
const skill = require('./routes/skill')

const web = require('./routes/web/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

app.use(
    views(__dirname + '/views', {
        extension: 'ejs'
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())
app.use(page.routes(), page.allowedMethods())
app.use(record.routes(), record.allowedMethods())
app.use(skill.routes(), skill.allowedMethods())
app.use(web.routes(), web.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app