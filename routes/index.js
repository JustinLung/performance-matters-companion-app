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
    const tipId = req.query.id
    getTipById(tipId).then((tip_id) => {
      res.render('detail', { data: tip_id.data[0] })
    })
  })

module.exports = router
