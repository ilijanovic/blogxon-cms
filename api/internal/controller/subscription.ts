import { subscriptionService } from '../service/subscription'
import { errorService } from '../service/error'
import { Response, Request, NextFunction } from "express"
import { NotificationInterface, SubscriptionInterface } from "../../../types"
import { utilsService } from '../service/utils'


class SubscriptionController {
  public async subscribeHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let subscription: SubscriptionInterface = req.body.subscription
    try {
      await subscriptionService.subscribe(subscription)
      return res.status(200).json({ message: 'User subscribed' })
    } catch (err) {
      await errorService.writeErrorLog(err, "subscribeHandler")
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
  public async sendNotificationHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let notification: NotificationInterface = req.body.notification
    try {
      await subscriptionService.sendNotification(notification)
      return res.status(200).json("Notification was sended")
    } catch (err) {
      await errorService.writeErrorLog(err, "sendNotificationHandler")
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
  public async getBadgesHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let badges = await subscriptionService.getBadges()
      return res.status(200).json(badges)

    } catch (err) {
      await errorService.writeErrorLog(err, "getBadgesHandler")
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
  public async uploadBadgeHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let badgePath = req.file.path.replace("static", "")
    try {
      await subscriptionService.saveBadge(badgePath)
      return res.status(200).json("Saved badge")
    } catch (err) {
      await errorService.writeErrorLog(err, "uploadBadgeHandler")
      return res.status(500).json({ message: "Something went wrong" })
    }
  }

  public async deleteBadgeHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { _id } = req.body
    try {
      let badge = await subscriptionService.findBadgeById(_id)

      if (!badge) {
        return res.status(404).json({ message: "Cannot find badge" })
      }
      let { path } = badge

      await subscriptionService.deleteBadgeById(_id)
      await utilsService.deleteFile("static" + path)
      return res.status(200).json("Badge deleted")
    } catch (err) {
      await errorService.writeErrorLog(err, "deleteBadgeHandler")
      return res.status(500).json({ message: "Something went wrong" })
    }
  }

}

export const subscriptionController: SubscriptionController = new SubscriptionController()

