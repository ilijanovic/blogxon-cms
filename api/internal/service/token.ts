import jwt, { VerifyErrors, decode } from 'jsonwebtoken'
import { Request } from 'express'
import { config } from '../../../config'

import { TokenInterface, TokenSignatureInterface } from "../../../types"
import { Error } from 'mongoose'
class TokenService {


  /**
 * Creates an JSON web token (JWT)
 *
 * @property {String} name - Name of the user
 * @property {String} _id - User ID
 * @returns {Promise} Resolves an JWT
 */


  public generateToken({ role, _id }: TokenInterface): Promise<string> {
    return new Promise((res: Function, rej: Function): void => {
      if (!process.env.PRIVATE_KEY) {
        throw "Private key is missing"
      }
      jwt.sign(
        { role, _id },
        process.env.PRIVATE_KEY,
        { expiresIn: config.tokenExpiration },
        (err: Error | null, token: string | undefined): void => {
          if (err) rej(err)
          res(token)
        }
      )
    })
  }

  /**
   * Verifys the token if its still valid
   *
   * @param {String} token - JWT as an string
   * @returns {Promise} - Resolves "true" if token is valid else "false"
   */

  public verifyToken(token: string): Promise<Boolean> {
    return new Promise((res) => {
      let key = process.env.PRIVATE_KEY?.toString()
      if (!key) throw "Private key is missing"
      jwt.verify(token, key, (err: VerifyErrors | null) => {
        if (err) res(false)
        res(true)
      })
    })
  }


  /**
   * Decodes the payload of the token
   *
   * @param {String} token - JWT as an string
   * @returns {Object} - Object with the decoded data of the token
   */
  public decode(token: string): TokenSignatureInterface {
    return <TokenSignatureInterface>decode(token)

  }



  /**
   * Extracts the token out of the authorization header
   *
   * @param {Object} req - Request object
   * @returns {String} - returns JWT
   */
  public getTokenFromHeader(req: Request): null | string {
    if (!req.headers.authorization) return null
    return req.headers.authorization.split(' ')[1]
  }

}



export const tokenService: TokenService = new TokenService()