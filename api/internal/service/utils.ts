import fs from 'fs'
import mongoose from 'mongoose'
import { config, constants } from '../../../config'


class UtilsService {
  public isEmptyObject(obj: Object): Boolean {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false
      }
    }
    return JSON.stringify(obj) === JSON.stringify({})
  }

  public deleteFile(path: string): Promise<string> {
    return new Promise((res, rej) => {
      fs.unlink(path, (err) => {
        if (err) rej(err)
        res('deleted')
      })
    })
  }


  public isMongoDBId(id: string | mongoose.Types.ObjectId): Boolean {
    return mongoose.Types.ObjectId.isValid(id)
  }

  public directoryExist(dir: string): Promise<Boolean> {
    return new Promise((res) => {
      fs.access(dir, (err) => {
        if (err) {
          res(false)
        } else {
          res(true)
        }
      })
    })
  }

  public createDirectory(path: string): Promise<Boolean> {
    return new Promise((res) => {
      fs.mkdir(path, { recursive: true }, function (err) {
        res(true)
      })
    })
  }

  public writeFile(path: string, data: string | Buffer): Promise<any> {
    return new Promise((res) => {
      fs.writeFile(path, data, res)
    })
  }

  public convertToSlug(text: string): string {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }

  public checkThumbnail(thumbnail: Express.Multer.File): Boolean {
    if (typeof thumbnail !== "object") {
      return false
    }
    let extension = thumbnail?.filename.split(".").reverse()[0]
    if (extension !== "png") {
      return false
    }
    return true
  }

  public checkTitle(title: string): Boolean {
    let maxTitleLength = config.title_length
    if (typeof title !== "string") {
      return false
    }
    if (title.length > maxTitleLength) {
      return false
    }
    return true
  }

  public checkDescription(description: string): Boolean {
    if (typeof description !== "string") {
      return false
    }
    let maxDescriptionLenght = config.description_length
    if (description.length > maxDescriptionLenght) {
      return false
    }
    return true
  }

  public checkStructuredData(structuredData: string): Boolean {
    if (typeof structuredData !== "string") {
      return false
    }
    if (!constants.structuredDataOptions.includes(structuredData)) {
      return false
    }
    return true
  }

  public checkContent(content: string): Boolean {
    let maxContentLength = config.content_length
    if (typeof content !== "string") {
      return false
    }
    if (content.length > maxContentLength) {
      return false
    }
    return true
  }
}

export const utilsService: UtilsService = new UtilsService()