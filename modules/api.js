const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const baseUrl = 'https://mijnhva.api.fdnd.nl/v1'

async function getAllPages() {
  return await fetchJson(`${baseUrl}/page`)
}

async function getPage(slug) {
  return await fetchJson(`${baseUrl}/page/slug/${slug}`)
}

async function getAllFaq() {
  return await fetchJson(`${baseUrl}/faq`)
}

async function getAllSections() {
  return await fetchJson(`${baseUrl}/section`)
}

async function getAllTips() {
  return await fetchJson(`${baseUrl}/tip`)
}

async function getTipById(id) {
  return await fetchJson(`${baseUrl}/tip/${id}`)
}

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((json) => json.data)
    .catch((error) => error)
}

module.exports = {
  getAllPages,
  getPage,
  getAllFaq,
  getAllSections,
  getAllTips,
  getTipById,
}
