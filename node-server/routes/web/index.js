const router = require('koa-router')({
  prefix: '/web/api'
})

const About = require('../../models/About')
const Article = require('../../models/Article')
const Menu = require('../../models/Menu')
const Record = require('../../models/Record')
const Skill = require('../../models/Skill')
const Tag = require('../../models/Tag')

router.get('/about', async ctx => {
  const res = await About.find()
  ctx.body = res
})

router.get('/article', async ctx => {
  const total = await Article.countDocuments() // 文章总数
  const reqParam = ctx.query
  const page = Number(reqParam.page) // 当前第几页
  const size = Number(reqParam.size) // 每页显示的记录条数
  console.log(ctx.query.page, ctx.query.size)
  // 显示符合前端分页请求的列表查询
  const res = await Article.find({ 'resource': { $in: 1 } }).populate('tags').skip((page - 1) * size).limit(size)
  //是否还有更多
  const hasMore = total - (page - 1) * size > size ? true : false
  ctx.response.type = 'application/json'
  //返回给前端
  ctx.body = { hasMore: hasMore, article: res, total: total }
})

// 文章详情数据
router.get('/article/:id', async ctx => {
  const article = await Article.findById(ctx.params.id).populate('tags')
  ctx.body = article
})

router.get('/menu', async ctx => {
  const menus = await Menu.find(ctx.request.body)
  // console.log(ctx)
  ctx.body = menus
})

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

router.get('/skill', async ctx => {
  const skills = await Skill.find(ctx.request.body)
  ctx.body = skills
})

router.get('/tag', async ctx => {
  const res = await Tag.find()
  let arr = [
    { '$unwind': "$tags" },
    { $match: { resource: 1 } },
    { '$group': { "_id": "$tags", "count": { '$sum': 1 } } }
  ]

  let num_list = await Article.aggregate(arr);
  ctx.body = {
    code: 200,
    msg: '获取标签列表成功！',
    data: res,
    data: {
      tag_lists: res,
      num_list
    }
  }
})

// router.get('/tag', async ctx => {
//   const tag = await Tag.find(ctx.request.body)
//   ctx.body = tag
// })

module.exports = router