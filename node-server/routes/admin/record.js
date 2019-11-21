const router = require('koa-router')({
  prefix: '/admin/api'
})

const Record = require('../../models/Record')
// 增
router.post('/record', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Record(ctx.request.body).save()
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
router.delete('/record/:id', async ctx => {
  const data = await Record.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/record/:id', async ctx => {
  const data = await Record.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查

router.get('/record', async ctx => {
  const total = await Record.countDocuments() // 收录总数
  const reqParam = ctx.query
  const page = Number(reqParam.page) // 当前第几页
  const size = Number(reqParam.size) // 每页显示的记录条数
  console.log(ctx.query.page, ctx.query.size)
  // 显示符合前端分页请求的列表查询
  const res = await Record.find().skip((page - 1) * size).limit(size)
  //是否还有更多
  const hasMore = total - (page - 1) * size > size ? true : false
  ctx.response.type = 'application/json'
  //返回给前端
  ctx.body = { hasMore: hasMore, record: res, total: total }
})


module.exports = router