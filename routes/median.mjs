import { Router } from "express"
import { querySchema } from "./nums.query.schema.mjs"
import { validateQueryMiddleware } from "./validate.middleware.mjs"
import { prepareResponseMiddleware } from "./result.response.middleware.mjs"

/**
 * 
 * @param {number[]} nums 
 */
export function median(nums) {
  nums.sort((a, b) => a - b)
  return nums[Math.floor(nums.length / 2)]
}

export const router = Router()

router.get('/', validateQueryMiddleware(querySchema), (req, res, next) => {
  const { nums } = req.zodQuery
  res.result = {
    operation: 'median',
    value: median(nums) 
  }
  next(null)
}, prepareResponseMiddleware)