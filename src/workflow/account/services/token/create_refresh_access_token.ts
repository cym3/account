import { sign } from 'jsonwebtoken'
import { CreateRefreshAccessToken } from '@account/services/token/contracts/create_refresh_access_token'

export const createRefreshAccessToken: CreateRefreshAccessToken = ({ id, userId }) => {
  return sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      subject: userId,
      expiresIn: '24h'
    }
  )
}
