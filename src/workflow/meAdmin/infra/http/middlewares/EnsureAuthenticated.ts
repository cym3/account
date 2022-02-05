import { verify } from 'jsonwebtoken'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../../core/infra/Middleware'
import { forbidden } from '../../../../../core/infra/HttpErrorResponse'
import { ok } from '../../../../../core/infra/HttpSuccessResponse'

export const ensureAuthenticatedMiddleware: Middleware = (httpRequest, httpBody) => {
  const bearerHeader = httpRequest.headers.authorization

  const httpResponse = pipe(
    E.tryCatch(
      () => {
        if (!bearerHeader) throw new Error('Oops! Acesso recusado')

        const accessToken = bearerHeader.split(' ')[1]

        if (!accessToken) throw new Error('Oops! Acesso recusado')

        return accessToken
      },
      (err) => forbidden(err as Error)
    ),
    E.chain(accessToken => {
      return E.tryCatch(
        () => {
          const decoded = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)

          return ok({ ...httpBody, userId: decoded.sub })
        },
        (_err) => forbidden(new Error('Oops! Acesso recusado'))
      )
    }),
    TE.fromEither
  )

  return httpResponse
}
