import { z } from 'zod';

export const querySchema = z.object({
  nums: z.string({required_error: 'nums is required'})
    .min(1, 'nums is required')
    .transform((val) => val.split(',').map(n => Number.isNaN(Number(n)) ? n : Number(n)))
    .pipe(z.array(z.number({ errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_type) {
        return {
          message: `${ctx.data} is not a number`,
        }
      }
      return {message: ctx.defaultError}
    }}))),
  save: z.string().transform((val) => val.toLocaleLowerCase() === 'true').pipe(z.boolean({coerce: true})).optional()
})

