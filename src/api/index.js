import * as userApi from './userApi'
import * as accessToken from './apiKey'
import * as quotesApi from './quotesApi'
import * as giphiesApi from './giphiesApi'
import * as ocr from './ocr'
import * as pk from './pakistan/pakistan'

const api = {
  user: userApi,
  accessToken: accessToken,
  quotes: quotesApi,
  giphies: giphiesApi,
  ocr: ocr,
  pk: pk
}

export default api
