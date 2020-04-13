import * as functions from 'firebase-functions';
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './src/App'

import express from 'express'

const app  = express()

app.get('*.js', (req, res, next) => {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    next();
  });

app.get('**', (req, res) => {
    const html = renderToString(<App />)
    // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200', 'Content-Encoding', 'brotli')
    res.send(html)
})

export let ssrapp =  functions.https.onRequest(app)