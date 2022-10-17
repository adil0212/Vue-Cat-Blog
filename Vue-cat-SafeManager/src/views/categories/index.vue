<template>
  <section class='data-list-box'>
    <mk-search-form :model="query" v-if="permBtn.queryButton" @search="goPage(1)">
      <el-form-item class="inline-item" prop="article_title">
        <el-input
          v-model.trim="query.params.article_title" @clear="goPage(1)" @keyup.enter="goPage(1)"
          clearable placeholder="输入博文标题搜索"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item class="inline-item" prop="isPublish">
        <el-select
          v-model.trim="query.params.isPublish" @change="goPage(1)"
          clearable placeholder="选择发布状态搜索"
          size="mini"
        >
          <el-option
            label="已完成"
            :value="1">
          </el-option>
          <el-option
            label="未完成"
            :value="0">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="inline-item" prop="isRecommend">
        <el-select
          v-model.trim="query.params.isRecommend" @change="goPage(1)"
          clearable placeholder="选择是否推荐搜索"
          size="mini"
        >
          <el-option
            label="是"
            :value="true">
          </el-option>
          <el-option
            label="否"
            :value="false">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="inline-item" prop="isHot">
        <el-select
          v-model.trim="query.params.isHot" @change="goPage(1)"
          clearable placeholder="选择是否火热搜索"
          size="mini"
        >
          <el-option
            label="是"
            :value="true">
          </el-option>
          <el-option
            label="否"
            :value="false">
          </el-option>
        </el-select>
      </el-form-item>
    </mk-search-form>
    <div class='table-operate'>
      <table-field-filter :fields="fields" @showChange="updataKey +=1"></table-field-filter>
      <mk-table-button
        dis-delete
        :dis-add='!permBtn.createButton'
        @add='goEdit'
      >
        <el-button size='mini' :icon="UploadFilled" @click="exportEcx">导出</el-button>
      </mk-table-button>
    </div>
    <mk-el-table @sort="sortChange" :datas="datas" :key="updataKey" :height="tableHeight"
                 :loadingText="loading.text"
                 :loading="loading.list">
      <template v-for="field in fields">
        <template v-if="field.show">
          <el-table-column v-if="field.key==='checkBox'" :key='field.id' :align="field.align" type="selection"></el-table-column>
          <el-table-column
            v-else-if="field.key==='toolButton'"
            :align="field.align"
            :label="field.name"
            :width="field.width"
            :fixed="field.fixed"
            :key='field.id'>
            <template v-slot='scope'>
              <mk-tool-button
                :dis-delete="!permBtn.deleteButton"
                :dis-edit="!permBtn.updateButton"
                @edit="goEdit(scope.row)"
                @view="goView(scope.row)"
                @delete="goDelete(scope.row)">
              </mk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key==='isHot'" :align="field.align"
                           :sortable="field.enableSort?'custom':false" :label="field.name"
                           :width="field.width" :fixed="field.fixed" :key='field.id'>
            <template>
              <el-tag v-if="scope.row.isHot">是</el-tag>
              <el-tag v-else type="warning">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isRecommend'" :align="field.align"
                           :sortable="field.enableSort?'custom':false" :label="field.name"
                           :width="field.width" :fixed="field.fixed" :key='field.id'>
            <template>
              <el-tag v-if="!scope.row.isRecommend">否</el-tag>
              <el-tag v-else type="success">是</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isPublish'" :align="field.align"
                           :sortable="field.enableSort?'custom':false" :label="field.name"
                           :width="field.width" :fixed="field.fixed" :key='field.id'>
            <template>
              <el-tag v-if="scope.row.isPublish" type="success">已发布</el-tag>
              <el-tag v-else type="info">未发布</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :key='field.id'
            v-else
            show-overflow-tooltip
            :prop="field.key"
            :align="field.align"
            :label="field.name"
            :width="field.width"
            :sortable="field.enableSort?'custom':false"
            :fixed="field.fixed"
          ></el-table-column>
        </template>
      </template>

    </mk-el-table>
    <mk-pagination
      :current-page="query.offset"
      :page-size="query.limit"
      :data-size="temp.dataSize"
      @go="goPage"
      @changePageSize="changePageSize"
      />
  </section>
  <get-article-info v-if="show.edit" :update-data="updateData" @close="close" />
  <view-articles-info v-if="show.view" :view-data="viewData" @close="close" />
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<script>
import MkSearchForm from '../../components/mk-search-form'
import MkTableButton from '../../components/mk-table-button'
import TableFieldFilter from '../../components/table-field-filter'
import MkElTable from '../../components/mk-el-table'
import MkPagination from '../../components/mk-pagination'
import GetArticleInfo from './componment/get-article-info'
import MkToolButton from '../../components/mk-tool-button'
import ViewArticlesInfo from './componment/view-article-info'

import { exportExecl } from '../../utils/util.export'
import { currentPagelist } from '../../api/menu'
export default {
  components: { MkTableButton, MkSearchForm, TableFieldFilter, MkElTable, MkPagination, GetArticleInfo, MkToolButton, ViewArticlesInfo },
  data() {
    return {
      show: {
        edit: false,
        view: false
      },
      updateData: {},
      viewData: {},
      tableHeight: 580,
      // 查询条件
      query: {
        params: {},
        limit: 15, // 每页显示条数
        offset: 1, // 页码
        sort: {
          prop: 'createdAt',
          order: 'desc'
        }
      },
      // 返回数据列表
      datas: [],
      temp: {
        // 数据总调数
        dataSize: 0,
        // 当前选中的id
        id: '',
        //
        item: []
      },
      // 加载中效果
      loading: {
        list: false,
        text: '加载中'
      },
      permBtn: {
        createButton: true,
        queryButton: true,
        deleteButton: false,
        updateButton: false
      },
      fields: [
        { key: 'checkBox', name: '全选按钮', show: true, enableSort: false, fixed: false },
        { key: 'title', name: '博文名称', show: true, align: 'center', enableSort: false, fixed: false },
        { key: 'content', name: '博文类型', show: true, align: 'center', enableSort: false, fixed: false },
        { key: 'status', name: '是否火热', show: true, align: 'center', enableSort: false, fixed: false },
        { key: 'viewsCount', name: '浏览人数', show: true, align: 'center', enableSort: true, fixed: false },
        { key: 'commentsCount', name: '评论数', show: true, align: 'center', enableSort: true, fixed: false },
        { key: 'created', name: '创建时间', show: true, align: 'center', width: '', enableSort: true, fixed: false },
        { key: 'toolButton', name: '操作', show: true, align: 'center', width: '220', enableSort: false, fixed: 'right' }
      ]
    }
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    }
  },
  mounted() {
    this.getDataList()
    this.getWinHeight()
  },
  methods: {
    // 导出
    exportEcx() {
      exportExecl(this, this.fields, this.datas, '博文列表', new Date().toLocaleDateString() + '导出的博文列表')
    },
    // 获取窗口高度
    getWinHeight() {
      const that = this
      this.heightL = window.innerHeight - 320
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 320
      })
    },
    // 数据请求
    getDataList() {
      try {
        this.loading.list = true
        currentPagelist(1).then(res => {
          console.log(res.data)
          const datas = res.data.records || []
          this.datas = datas
          this.temp.dataSize = res.data.size
          this.loading.list = false
        })
      } catch (err) {
        this.$message.error('数据加载失败')
        this.loading.list = false
      }
    },
    goDelete(data) {
      this.$toast.confirm('此操作将永久删除该博文, 是否继续?').then(() => {
        (data.id).then(res => {
          this.$toast.success('删除成功')
          this.getDataList()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    goTypeData(row) {
      this.show.edit = true
      this.dictType = row
    },
    close() {
      this.show.edit = false
      this.show.view = false
      this.getDataList()
    },
    // 跳转页面
    goPage(pageNum) {
      this.query.offset = pageNum
    },
    // 改变每页数据量
    changePageSize(size) {
      this.query.limit = size
      this.query.offset = 1
      this.getDataList()
    },
    // 添加编辑
    goEdit(data, type) {
      this.updateData = data
      this.show.edit = true
    },
    // 排序
    sortChange(row) {
      this.query.sort.order = row.order === 'ascending' ? 'asc' : 'desc'
      this.query.sort.prop = row.prop
      this.getDataList()
    },
    // 跳转到查看详情
    goView(data) {
      this.viewData = data
      this.show.view = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
