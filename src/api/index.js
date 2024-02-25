import * as userApi from './userApi'
import * as accessToken from './apiKey'
import * as quotesApi from './quotesApi'
import * as giphiesApi from './giphiesApi'
import * as ocr from './ocr'

const api = {
  user: userApi,
  accessToken: accessToken,
  quotes: quotesApi,
  giphies: giphiesApi,
  ocr: ocr
}

export default api
