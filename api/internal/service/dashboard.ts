import Email from '../model/email'
import Subscription from '../model/subscription'
import Blog from '../model/blog'

import { BlogInterface, DashboardCountInterface } from "../../../types"

class DashboardService {
  public async getDashboardOverviewData(): Promise<DashboardCountInterface> {
    let [emails, subscriptions, blogs] = await Promise.all([
      Email.find().countDocuments(),
      Subscription.find().countDocuments(),
      Blog.find().countDocuments(),
    ])
    return {
      emails,
      subscriptions,
      blogs,
    }
  }
  public async getStatistics(): Promise<{ likes: number, views: number }> {
    let blogs = await Blog.find({}, { views: 1, likes: 1 }).exec()
    return blogs.reduce((a, v) => {
      a.likes += v.likes
      a.views += v.views
      return a
    }, { likes: 0, views: 0 })
  }

  public async getViewsChartData(): Promise<ViewsChartInterface> {
    let blogs = await Blog.find({}, { views: 1, title: 1 }).exec()
    return blogs.reduce((a: ViewsChartInterface, v: BlogInterface) => {
      a.data.push(v.views);
      a.labels.push(v.title)
      return a
    }, { data: [], labels: [] })
  }
}

interface ViewsChartInterface {
  labels: string[], data: number[]
}

export const dashboardService: DashboardService = new DashboardService()

