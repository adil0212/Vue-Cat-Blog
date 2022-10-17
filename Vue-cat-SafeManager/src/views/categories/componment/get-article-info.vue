<!-- @Project Name: vue-cat-carps -->
<!-- @author：阿地力 -->
<!-- @Creation Time: 2022/10/18 -->
<!-- @File Name: get-article-info -->
<template>
  <section class='lk-add-pop'>
    <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px" :key="isAdd">
      <mk-get-row>
        <el-form-item label='博客内容' prop='title'></el-form-item>
      </mk-get-row>
      <mk-get-row>
        <el-form-item label="博文标题" prop="article_title">
          <el-input clearable v-model.trim="form.article_title" size="mini" style="width: 600px" type="textarea"
                    :rows="2"
                    maxlength="200"
                    show-word-limit
                    placeholder="请输入博文标题"
          />
        </el-form-item>
      </mk-get-row>
      <mk-get-row>
        <el-form-item label="是否火热" prop="isHot">
          <el-switch v-model="form.isHot" active-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否顶置" prop="isTop">
          <el-switch v-model="form.isTop" active-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否推荐" prop="isRecommend">
          <el-switch v-model="form.isRecommend" active-color="#13ce66">
          </el-switch>
        </el-form-item>
      </mk-get-row>
    </el-form>
  </section>
</template>

<script>
import MkGetRow from '../../../components/mk-get-row'
export default {
  name: 'get-article-info',
  components: { MkGetRow },
  data() {
    return {
      form: {
        isPublish: true,
        activeName: 'md'
      }
    }
  }
}
</script>

<style scoped>

</style>
