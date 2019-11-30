const router = require('koa-router')({
  prefix: '/admin/api'
})

const Toollink = require('../../models/Toollink')
// 增
router.post('/toollink', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Toollink(ctx.request.body).save()
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
router.delete('/toollink/:id', async ctx => {
  const data = await Toollink.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/toollink/:id', async ctx => {
  const data = await Toollink.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/toollink', async ctx => {
  const toollink = await Toollink.find(ctx.request.body)
  ctx.body = toollink
})

module.exports = router