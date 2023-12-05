import { Router } from "express"
import { querySchema } from "./nums.query.schema.mjs"
import { validateQueryMiddleware } from "./validate.middleware.mjs"
import { prepareResponseMiddleware } from "./result.response.middleware.mjs"

/**
 * 
 * @param {number[]} nums 
 */
export function mostFrequent(nums) {
  const map = new Map()
  let maxFreq = 1
  let maxNum = nums[0]
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1)
    } else {
      map.set(num, 1)
    }
    if (map.get(num) > maxFreq) {
      maxFreq = map.get(num)
      maxNum = num
    }
  }
  return maxNum
}

export const router = Router()

router.get('/', validateQueryMiddleware(querySchema), (req, res, next) => {
  res.result = {
    operation: 'mode',
    value: mostFrequent(req.zodQuery.nums)
  }
  next(null)
}, prepareResponseMiddleware)

