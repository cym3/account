import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { RefreshTokenSchema, ServiceSchema, UserSchema } from '../../infra/prisma/schemas'

interface User extends UserSchema {
  services: ServiceSchema
}

interface RefreshToken extends RefreshTokenSchema {
  user: User
}

export type CreateRefreshTokenDB = (userId: UUID) => TE.TaskEither<HttpErrorResponse, RefreshToken>