<script setup lang="ts">
import {useForm} from '@/hooks/useForm.ts'
import {useRouter} from "vue-router";

const $router = useRouter()

const {formModel, formRef, submit} = useForm({
  account: "",
  password: ""
});

const handleSubmit = () => {
  submit(() => {
    $router.push("/")
  })
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="@/assets/images/mark.svg" alt=""/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录您的账户</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <el-form label-position="top" ref="formRef" :model="formModel">
        <el-form-item label="账户">
          <el-input v-model="formModel.account"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formModel.password"/>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" @click="handleSubmit" type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>