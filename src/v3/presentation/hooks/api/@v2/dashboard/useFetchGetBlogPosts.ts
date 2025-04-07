import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getBlogPost } from '@/v3/infra/services/@v2/dashboard/get-blog-posts'

import { useFetch } from '../@shared/useFetch'

export const useFetchGetBlogPosts = () => {
  const { data, ...rest } = useFetch({
    queryFn: () => getBlogPost(),
    queryKey: [QueryKeyEnum.DASHBOARD_GET_BLOG_POST],
  })

  return {
    data,
    ...rest,
  }
}
