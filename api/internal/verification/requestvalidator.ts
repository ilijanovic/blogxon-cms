import { Request, Response, NextFunction } from "express"
import { Multer } from "multer"
import { utilsService } from "../service/utils"
import { InputInterface, PostUploadInterface } from "../../../types"

class Validator {
  public adminGenerateValidator(req: Request, res: Response, next: NextFunction): Response | void {
    let { password, passwordConfirm, email }: InputInterface = req.body

    if (!password || !passwordConfirm || !email) {
      return res.status(400).json({
        message: `Missing parameters. Email missing: ${!email}, Password missing: ${!password}, PasswordConfirm missing: ${!passwordConfirm}`,
      })
    }
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords are not equal' })
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password too short. Minimum 8 chars' })
    }
    next()
  }
  public postUploadValidator(req: Request, res: Response, next: NextFunction): void | Response {
    let { thumbnail, title, description, keywords, structuredData, content }: PostUploadInterface = req.body
    if (typeof keywords !== "string") {
      return res.status(400).json({ message: "Invalid keywords" })
    }

    if (!title) {
      return res.status(404).json({ message: "Title is missing" })
    }
    if (!description) {
      return res.status(404).json({ message: "Description is missing" })
    }
    if (!structuredData) {
      return res.status(404).json({ message: "Structured data is missing" })
    }
    if (!utilsService.checkTitle(title)) {
      return res.status(400).json({ message: "Invalid title" })
    }
    if (!utilsService.checkDescription(description)) {
      return res.status(400).json({ message: "Invalid description" })
    }
    if (!utilsService.checkStructuredData(structuredData)) {
      return res.status(400).json({ message: "Invalid structured data" })
    }
    if (!utilsService.checkContent(content)) {
      return res.status(400).json({ message: "Invalid content" })
    }

    next()
  }
  public emailValidator(req: Request, res: Response, next: NextFunction): Response | void {
    let { email }: { email: string } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Please enter a email adress' })
    }
    let test = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email
    )
    if (!test) {
      return res.status(400).json({ message: 'E-Mail is not valid' })
    }
    return next()
  }

}

export const validator: Validator = new Validator()

