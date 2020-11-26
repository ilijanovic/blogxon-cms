import { eventEmitter } from '../subscribers/blog'
import { Request, Response, NextFunction } from "express"


export function getUserInfo(req: Request, res: Response, next: NextFunction): void {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  eventEmitter.emit('set_ip', { ip })
  return next()
}
