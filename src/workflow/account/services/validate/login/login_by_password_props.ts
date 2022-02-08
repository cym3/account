import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { UserLoggerByPasswordPropsCodec } from '@account/domain/requiredFields/Users/loging_by_password_props'
import { UserLoggerByPasswordPropsValidate } from '@account/services/validate/contracts/Login/login_by_password_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const userLoggerByPasswordPropsValidate: UserLoggerByPasswordPropsValidate = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Email e senha estão em falta')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      UserLoggerByPasswordPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}
