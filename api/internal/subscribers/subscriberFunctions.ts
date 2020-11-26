import Blog from '../model/blog'
import mongoose from "mongoose"
import { BlogInterface } from "../../../types"
class Subscriber {

  public addIpById(_id: string | mongoose.Types.ObjectId, ip: string): Promise<BlogInterface> {
    return Blog.updateOne(
      { _id },
      {
        $addToSet: {
          ips: ip,
        },
      }
    ).exec()
  }

  public addIpBySlug(slug: string, ip: string): Promise<BlogInterface> {

    return Blog.updateOne(
      { slug },
      {
        $addToSet: {
          ips: ip,
        },
      }
    ).exec()
  }

}

export const subscriber: Subscriber = new Subscriber()