import bcrypt from 'bcrypt';
import { HashPassword } from '../domain/contracts/HashPassword';


export const hashPassword: HashPassword = async (password) => {

  const salt = await bcrypt.genSalt(10)
  const  hash = await bcrypt.hash(password, salt)

  return hash
}
