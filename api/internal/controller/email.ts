import { adminService } from '../service/admin'
import { userService } from "../service/user"
import {
  emailService
} from '../service/email'
import { errorService } from '../service/error'
import { Request, Response, NextFunction } from "express"
import { SendMailInerface } from "../../../types"

class EmailController {
  public async addEmailHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { email } = req.body
    let exist: Boolean;
    try {
      exist = await emailService.emailExist(email)
    } catch (err) {
      await errorService.writeErrorLog(err, 'addEmailHandler')
      return res.status(500).json({ message: 'Something went wrong' })
    }
    if (!exist) {
      try {
        await emailService.addEmail(email)
      } catch (err) {
        await errorService.writeErrorLog(err, 'addEmailHandler')
        return res.status(500).json({ message: 'Something went wrong' })
      }
    } else {
      return res.status(409).json({ message: 'E-Mail already exist' })
    }
    return res.status(200).json({ message: 'Email added successfully' })
  }

  public async sendEmailHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { from, subject, text, html = '<p></p>' }: SendMailInerface = req.body
    try {
      await emailService.sendEmailAll({ from, subject, text, html })
      return res.status(200).json({ message: 'Email successufl sended' })
    } catch (err) {
      await errorService.writeErrorLog('error at sending email', 'sendEmailHandler')
      return res.status(500).json({ message: 'Email could not be sended' })
    }
  }

  public async getEmailsHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { userId } = res.locals
    let user = await userService.findUserById(userId)
    if (!user) return res.status(404).json({ message: "Cannot find user" })
    if (!adminService.isAdmin(user)) {
      return res.status(401).json({ message: 'You are not allowed to do that' })
    }
    let emails = await emailService.getEmails()
    return res.status(200).json(emails)
  }

  public async deleteEmailHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { id } = req.body
    if (!id) {
      return res.status(400).json({ message: 'Missing ID' })
    }
    try {
      await emailService.deleteEmailById(id)
      return res.status(200).json({ message: 'Email deleted' })
    } catch (err) {
      await errorService.writeErrorLog(err, 'deleteEmailHandler')
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }

}

export const emailController: EmailController = new EmailController()
