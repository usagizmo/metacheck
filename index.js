const fs = require('fs')
const path = require('path')
const base64 = require('base-64')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
require('dotenv').config()
const { basicAuth, urlList } = require('./settings')

global.Headers = fetch.Headers

const LOG_DIR = 'logs'

const formatDate = (date) => {
  const z2 = (num) => ('0' + num).slice(-2)
  const Y = date.getFullYear()
  const m = z2(date.getMonth() + 1)
  const d = z2(date.getDate())
  const H = z2(date.getHours())
  const i = z2(date.getMinutes())
  const s = z2(date.getSeconds())
  return `${Y}-${m}-${d} ${H}:${i}:${s}`
}

const state = {
  filePath: path.join(LOG_DIR, formatDate(new Date()) + '.txt'),
  urlList,
}

const headers = new Headers(
  basicAuth
    ? {
        Authorization: 'Basic ' + base64.encode(process.env.USERNAME + ':' + process.env.PASSWORD),
      }
    : {}
)

const utils = {
  log: (state, text) => {
    fs.appendFileSync(state.filePath, `${text}\n`)
    console.log(text)
  },
  to32: (text) => `${text}                                `.slice(0, 32),
  logContent: (state, $, sel) => utils.log(state, `${utils.to32(sel)} ${$(sel).text()}`),
  logLink: (state, $, rel) => {
    const sel = `link[rel="${rel}"]`
    utils.log(state, `${utils.to32(sel)} ${$(sel).attr('href')}`)
  },
  logMeta: (state, $, attr, prop) => {
    const sel = `meta[${attr}="${prop}"]`
    utils.log(state, `${utils.to32(sel)} ${$(sel).attr('content')}`)
  },
  logMetaInfo: (state, $) => {
    utils.logLink(state, $, 'canonical')
    utils.logMeta(state, $, 'name', 'robots')
    utils.logContent(state, $, 'head title')
    utils.logMeta(state, $, 'property', 'og:site_name')
    utils.logMeta(state, $, 'property', 'og:title')
    utils.logMeta(state, $, 'name', 'twitter:title')
    utils.logMeta(state, $, 'name', 'description')
    utils.logMeta(state, $, 'property', 'og:description')
    utils.logMeta(state, $, 'name', 'twitter:description')
    utils.logMeta(state, $, 'property', 'og:url')
    utils.logMeta(state, $, 'property', 'og:image')
    utils.logMeta(state, $, 'name', 'twitter:image')
    utils.logMeta(state, $, 'property', 'og:type')
    utils.logMeta(state, $, 'name', 'twitter:card')
    utils.logMeta(state, $, 'name', 'twitter:site')
    utils.logMeta(state, $, 'name', 'twitter:creator')
  },
  logPageMetaInfo: async (state, url) => {
    const res = await fetch(url, {
      method: 'get',
      headers,
    })
    const data = await res.text()
    const $ = cheerio.load(data)
    utils.log(state, '■ ' + url)
    utils.logMetaInfo(state, $)
    utils.log(state, '') // new line
  },
}

;(async () => {
  for (let i = 0; i < state.urlList.length; i++) {
    const url = state.urlList[i]
    await utils.logPageMetaInfo(state, url)
  }
})()
