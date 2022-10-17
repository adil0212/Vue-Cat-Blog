<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ $t(`menus.${it.path}`) }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import variables from '@/styles/variables.scss'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/blog')
const menusList = ref([
  {
    id: 1,
    path: 'blog',
    order: 1,
    authName: '客户端管理',
    children: [
      {
        authName: '博文管理',
        children: [],
        id: 110,
        order: null,
        path: 'blog'
      }
    ]
  },
  {
    id: 2,
    path: 'users',
    order: 1,
    authName: '系统管理',
    children: [
      {
        authName: '用户管理',
        children: [],
        id: 120,
        order: null,
        path: 'users'
      }
    ]
  }
])

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
</script>

<style lang="scss" scoped></style>
