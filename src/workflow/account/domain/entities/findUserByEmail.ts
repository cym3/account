import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/HttpErrorResponse';
import { prisma } from "../../infra/prisma/client";
import { FindUserByEmail } from '../contracts/FindUserByEmail';

 
export const findUserByEmail: FindUserByEmail =  (email) => {

  const user =  TE.tryCatch(
    async () => {

      return await prisma.users.findUnique({
        where: { email },
      }) 
    },

    (err) => {
      console.log(err)
      return fail(new Error('A sua conta não foi encontrada. Por favor contacte suporte'))
    }
  )
  
  return user
}