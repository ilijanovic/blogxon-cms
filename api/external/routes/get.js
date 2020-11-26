import { Router } from 'express'
import { blogService } from '../blogxon'

let router = Router()

// Write your custom GET REST API endpoints here
// Demo API endpoint for getting 1 blog
router.get('/:slug', async (req, res) => {
  let blog = await blogService.findBlogBySlug(req.params.slug)

  res.status(200).json(blog)
})

export default router
