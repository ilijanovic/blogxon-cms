import bcrypt from 'bcrypt'
import { config } from '../../../config'


class PasswordService {
  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, config.saltRounds)
  }

  public comparePasswords(password: string, hash: string): Promise<Boolean> {
    return bcrypt.compare(password, hash)
  }

}


export const passwordService: PasswordService = new PasswordService()