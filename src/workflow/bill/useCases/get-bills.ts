import { getBillsDB } from '@bill/domain/entities/get-bills'
import { getBillsService } from '@bill/services/get-bills'
import { getBillsPropsValidator } from '@bill/services/validate/get-bills'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getBillsUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const data = { userId }

  const httpResponse = pipe(
    data,
    getBillsPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getBillsService(getBillsDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
