export const getOrderBy = (orderBy?: string, direction?: 'asc' | 'desc') => {
  if (!orderBy) return orderBy

  if (direction === 'desc') {
    return `-${orderBy}`
  }

  return orderBy
}
