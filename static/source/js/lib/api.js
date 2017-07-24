const apiEndpoint = '/api'
const endpoints = {
  api: 'api',
  articles: 'articles'
}

const fetchArticleBySlug = (slug) => {
  return fetch(`/${endpoints.api}/${endpoints.articles}/${slug}`)
    .then((response) => response.json())
    .catch((e) => e)
}

const fetchArticleSummaries = () => {
  return fetch(`/${endpoints.api}/${endpoints.articles}`)
    .then((response) => response.json())
    .catch((e) => e)
}

const API = {
  fetchArticleBySlug: fetchArticleBySlug,
  fetchArticleSummaries: fetchArticleSummaries
}

export default API