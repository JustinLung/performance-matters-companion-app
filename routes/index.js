const express = require('express')
const {
  getAllPages,
  getAllFaq,
  getAllSections,
  getAllTips,
} = require('../modules/api')
const router = express.Router()

router.get('/', (req, res) => {
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
    const categories = Object.entries(groupBy(questions, 'faq_ca  tegory_id'))
    res.render('index', {
      sections,
      questions,
      pages,
      categories,
      tips,
    })
  })
})

module.exports = router
