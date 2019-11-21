const router = require('koa-router')({
  prefix: '/web/api'
})

const About = require('../../models/About')
const Article = require('../../models/Article')
const Project = require('../../models/Project')
const Record = require('../../models/Record')
const Skill = require('../../models/Skill')
const Tag = require('../../models/Tag')

router.get('/about', async ctx => {
  const res = await About.find()
  ctx.body = res
})

router.get('/project', async ctx => {
  const res = await Project.find()
  ctx.body = {
    code: 200,
    msg: '获取标签列表成功！',
    data: res
  }
})

// 文章详情数据
router.get('/article/:id', async ctx => {
  const article = await Article.findById(ctx.params.id).populate('tags')
  ctx.body = article
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

// 标签获取文章列表
router.get('/article', async ctx => {
  let { tag = '', page, size } = ctx.query
  page = Number(page) // 当前第几页
  size = Number(size) // 每页显示的记录条数
  try {
    let querys = {}
    querys.resource = { $in: 1 }
    // querys.page = 
    if (tag != '') {
      querys.tags = { $in: [tag] }
    }
    console.log(tag, page, size)
    const total = await Article.countDocuments({ resource: { $in: 1 } })
    const res = await Article.find(querys).populate({
      path: 'tags',
      select: "_id tag desc"
    }).skip((page - 1) * size).limit(size)
    //是否还有更多
    const hasMore = total - (page - 1) * size > size ? true : false
    ctx.body = {
      code: 200,
      msg: '查询成功！',
      article: res,
      total,
      hasMore
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '获取文章失败！'
    }
  }
})

// 获取归档列表
router.get('/archives', async ctx => {
  const archiveList = await Article.find({ 'resource': { $in: 1 } }, {
    title: true,
    created: true,
    updated: true
  }).sort({ 'created': '-1' })
  ctx.body = {
    code: 200,
    msg: '归档列表查询成功',
    archiveList
  }
})

module.exports = router