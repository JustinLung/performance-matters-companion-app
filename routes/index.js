const express = require('express')
const {
  getAllPages,
  getAllFaq,
  getAllSections,
  getAllTips,
  getTipById,
} = require('../modules/api')
const router = express.Router()

router

  .get('/', (req, res) => {
    Promise.all([
      getAllPages(),
      getAllSections(),
      getAllTips(),
      getAllFaq(),
    ]).then((data) => {
      const [pages, sections, tips, questions] = data
      const groupBy = (items, key) =>
        items.reduce(
          (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
          }),
          {}
        )
      const categories = Object.entries(groupBy(questions, 'faq_category_id'))
      res.render('index', {
        sections,
        questions,
        pages,
        categories,
        tips,
      })
    })
  })

  .get('/detail', (req, res) => {
    const id = req.body.id
    getTipById(id).then((data) => {
      res.render('detail', { data: data.data[0] })
    })
  })

module.exports = router
