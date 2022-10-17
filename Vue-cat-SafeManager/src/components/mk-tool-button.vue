<!-- @Project Name: vue-cat-carps -->
<!-- @author：阿地力 -->
<!-- @Creation Time: 2022/10/18 -->
<!-- @File Name: mk-tool-button -->
<template>
  <el-button-group>
    <slot name="first"></slot>
    <el-button @click="$emit('view')" type="primary" size="mini"
               v-if="!disView ">
      {{ viewText }}
    </el-button>
    <el-button @click="$emit('edit')" type="primary" size="mini"
               v-if="!disEdit ">
      {{ editText }}
    </el-button>
    <el-button @click="$emit('delete')" type="primary" size="mini"
               v-if="!disDelete">
      {{ deleteText }}
    </el-button>
    <slot></slot>
  </el-button-group>
</template>

<script>
export default {
  name: 'mk-tool-button',
  props: {
    disView: {
      type: Boolean,
      default() {
        return false
      }
    },
    disEdit: {
      type: Boolean,
      default() {
        return false
      }
    },
    disDelete: {
      type: Boolean,
      default() {
        return false
      }
    },
    viewText: {
      type: String,
      default() {
        return '查看'
      }
    },
    editText: {
      type: String,
      default() {
        return '修改'
      }
    },
    deleteText: {
      type: String,
      default() {
        return '删除'
      }
    }

  },
  created() {
  },
  data() {
    return {
      menuCode: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
