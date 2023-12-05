import { Router } from "express"
import { validateQueryMiddleware } from "./validate.middleware.mjs"
import { querySchema } from "./nums.query.schema.mjs"
import { prepareResponseMiddleware } from "./result.response.middleware.mjs"
import { mean } from "./mean.mjs" 
import { median } from "./median.mjs"
import { mostFrequent } from "./mode.mjs"
export const router = Router()

router.get('/', validateQueryMiddleware(querySchema), (req, res, next) => {
  const {nums} = req.zodQuery
  res.result = {
    operation: 'all',
    mean: mean(nums),
    median: median(nums),
    mode: mostFrequent(nums)
  }
  next(null)
}, prepareResponseMiddleware)