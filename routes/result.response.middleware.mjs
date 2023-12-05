import { response, request } from "express"
import fs from 'node:fs'
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {(err: any) => void} next 
 * @returns 
 */
export function prepareResponseMiddleware(req, res, next) {
  const isSave = req.zodQuery.save
  if (isSave) {
    fs.writeFileSync('results.json', JSON.stringify(res.result))
    res.result['timestamp'] = Date.now()
  }
  const accept = req.header('accept') || ''

  if (accept.includes('text/html')) {
    return res.render('operation_response', res.result)
  }
  res.json({response: res.result})
}