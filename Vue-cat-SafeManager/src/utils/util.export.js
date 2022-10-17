// @Project Name: vue-cat-carps
// @author：阿地力
// @Creation Time: 2022/10/18
// @File Name: util.export
export const exportExecl = (_this, columnsData = [], data, title = `${new Date().toLocaleDateString()}`, header = '表格数据') => {
  const columns = []
  for (const column of columnsData) {
    const obj = {
      label: column.name,
      prop: column.key
    }
    columns.push(obj)
  }
  _this.$export.excel({
    columns,
    data,
    header,
    title: new Date().toLocaleDateString() + '*' + title
  }).then((res) => {
    // ...可选回调
  })
}
