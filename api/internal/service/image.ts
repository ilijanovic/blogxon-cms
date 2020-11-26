import sharp, { Sharp } from 'sharp'
import { config } from '../../../config'
import { utilsService } from './utils'

import { CompressImageInterface } from "../../../types"
class ImageService {
  public async convertToWebp(path: string, name: string): Promise<string> {
    let file: Buffer = await sharp(path)
      .webp({
        quality: config.image_compression,
      })
      .resize({
        width: config.thumbnail_sizes.width,
        height: config.thumbnail_sizes.height,
      })
      .toBuffer()
    let [filename]: string[] = name.split('.')
    let webpPath = config.images_webp_path + '/' + filename + '.webp'
    await utilsService.writeFile('./static' + webpPath, file)
    return webpPath
  }

  public async compressImage({
    path,
    compression = config.image_compression,
    width = config.thumbnail_sizes.width,
    height = config.thumbnail_sizes.height,
  }: CompressImageInterface): Promise<Sharp> {
    return sharp(path).resize({ width, height }).png({ quality: compression })
  }


}

export const imageService: ImageService = new ImageService();


