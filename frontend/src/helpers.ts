export const buildFilters = (pagination: any, filters: any, sorter: any) => {
  const sorterCopy = {...sorter}
  const paginationCopy = {...pagination}
  sorterCopy.order = sorter.order === 'ascend' ? 'asc' : 'desc'
  sorterCopy.field = sorter.columnKey
  paginationCopy.page = pagination.current
  paginationCopy.size = pagination.pageSize
  return {sorterCopy, paginationCopy, filters }
}
