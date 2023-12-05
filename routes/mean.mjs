import { Router } from "express";
import { querySchema } from "./nums.query.schema.mjs";
import { validateQueryMiddleware } from "./validate.middleware.mjs";
import { prepareResponseMiddleware } from "./result.response.middleware.mjs";
export const router = Router();


router.get('/',validateQueryMiddleware(querySchema), (req, res, next) => {
  res.result ={
    operation: 'mean',
    value: mean(req.zodQuery.nums)
  }
  next(null)
}, prepareResponseMiddleware)

/**
 * 
 * @param {number[]} nums 
 * @returns 
 */
export function mean(nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length
} 