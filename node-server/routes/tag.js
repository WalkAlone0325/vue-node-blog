const router = require('koa-router')({
  prefix: '/admin/api'
})

const Tag = require('../models/Tag')
const Article = require('../models/Article')
// 增
router.post('/tag', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Tag(ctx.request.body).save()
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
router.delete('/tag/:id', async ctx => {
  const data = await Tag.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/tag/:id', async ctx => {
  const data = await Tag.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/tag', async ctx => {
  const res = await Tag.find()
  const arr = [
    { '$unwind': "$tags" },
    { '$group': { "_id": "$tags", "count": { '$sum': 1 } } }
  ]
  const article_num_list = await Article.aggregate(arr);
  // console.log(ctx)
  ctx.body = {
    code: 200,
    msg: '获取标签列表成功！',
    data: {
      tags_list: res,
      article_num_list
    }
  }
})


// // 资源详情数据
// router.get('/tag/:id', async (req, res) => {
//   const tag = await Tag.findById(ctx.params.id)
//   ctx.body = tag
// })

module.exports = router