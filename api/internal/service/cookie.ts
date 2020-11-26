import { config } from '../../../config'
import { Response, Request, request } from "express"

class CookieService {
  /**
   *
   * Adds an HTTP-only cookie to the response header
   *
   * @param {Object} res - Response object
   * @param {String} token - JSON web token
   * @param {Number | null} expiration - Sets the expiration time manually
   */

  public setCookie(res: Response, token: string, expiration: undefined | number = undefined) {
    let { cookieName, tokenExpiration } = config
    res.cookie(cookieName, token, {
      httpOnly: true,
      maxAge: expiration === undefined ? tokenExpiration : expiration,
    })
  }

  /**
   *
   * Extracts the token out of the cookie in the header if available
   *
   * @param {Object} req - Request Object
   */

  public getTokenFromCookie(req: Request): string | null {
    let { cookieName } = config
    let cookieString = req.headers.cookie
    if (!cookieString) return null
    let keyValueEntrie = cookieString
      .split(';')
      .map((keyValue: string) => keyValue.split('=').map((val) => val.trim()))
      .find(([name]) => name === cookieName)
    if (!keyValueEntrie) return null
    return keyValueEntrie[1]
  }

  public eraseCookie(name: string, res: Response): void {
    res.cookie(name, "", {
      maxAge: 0
    })
  }

}


export const cookieService: CookieService = new CookieService()