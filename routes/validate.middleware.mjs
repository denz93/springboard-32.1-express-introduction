import {z} from 'zod'

/**
* 
* @param {z} schema 
* @returns 
*/
export function validateQueryMiddleware(schema) {
 return (req, res, next) => {
   try {
     const query = schema.parse(req.query)
     req.zodQuery = query
     next(null)
   } catch (err) {
     res.status(400).json(err)
     // next(null)
   }
 }
}