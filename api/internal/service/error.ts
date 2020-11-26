import fs from 'fs'

class ErrorService {
  public writeErrorLog(err: any, routeHandler: string): Promise<any> {
    let path: string = './error.log'
    let date: Date = new Date()
    return new Promise((res) => {
      if (fs.existsSync(path)) {
        fs.appendFile(
          path,
          `\n ${err} | Time: ${date.toISOString()} | Appeard in:  ${routeHandler} \n`,
          res
        )
      } else {
        fs.writeFile(path, err, res)
      }
    })
  }

}


export const errorService: ErrorService = new ErrorService()