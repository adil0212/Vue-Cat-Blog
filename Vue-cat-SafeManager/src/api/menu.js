import request from './request'

export const menuList = () => {
  return request({
    url: '/menus'
  })
}

export const currentPagelist = (currentPage) => {
  return request({
    url: `/blogs?currentPage=${currentPage}`
  })
}
