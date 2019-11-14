const router = require('koa-router')({
  prefix: '/admin/api'
})

const Menu = require('../models/Menu')
// 增
router.post('/menu', async (ctx, next) => {
  try {
    const res = await new Menu(ctx.request.body).save()
    if (res) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        res
      }
    }
    return
  } catch (err) {
    console.log(err)
  }
  ctx.body = {
    code: 500,
    msg: '添加失败'
  }
})

// 删
router.delete('/menu/:id', async ctx => {
  const data = await Menu.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/menu/:id', async ctx => {
  const data = await Menu.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/menu', async ctx => {
  const menu = await Menu.find(ctx.request.body)
  // console.log(ctx)
  ctx.body = menu
})

// // 资源详情数据
// router.get('/:id', async (req, res) => {
//   const model = await req.Model.findById(req.params.id)
//   res.send(model)
// })

// // 服务端校验中间件
// const jwt = require('jsonwebtoken')
// async (ctx, next) => {
//   const token = String(ctx.request.headers.authorization).split(' ').pop()
//   // 此处前面定义过的JWT_SECRET
//   const { id } = jwt.verify(token, JWT_SECRET)
//   ctx.request.user = await AdminUser.findById(id)

//   await next()
// }

module.exports = router