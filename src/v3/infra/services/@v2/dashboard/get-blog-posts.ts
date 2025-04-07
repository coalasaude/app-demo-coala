import { BlogPostModel } from '@/v3/domain/@v2/dashboard/blog-post.model'

import apiRequest from '../../api'

import { DashBoardRoutes } from './dashboard.routes'

type GetBlogPostResponse = BlogPostModel[]

export async function getBlogPost() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: DashBoardRoutes.GET_BLOG_POSTS,
  })) as GetBlogPostResponse

  return data.map((post) => new BlogPostModel(post))
}
