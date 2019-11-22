const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const serve = require('koa-static-server')
// const history = require('connect-history-api-fallback')
require('./db/config')(app)

const web = require('./routes/web/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/web'))
app.use(require('koa-static')(__dirname + '/admin'))
// app.use(serve({ rootDir: 'admin', rootPath: '/admin' }))
// app.use(serve({ rootDir: 'web', rootPath: '/' }))
app.use(cors())
// app.use(history({
//     rewrites: [
//         { from: /^\/wap\/.*$/, to: '/index.html' }//这个是正确方式
//     ]
// }));

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
require('./routes/admin/index')(app)
app.use(web.routes(), web.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app