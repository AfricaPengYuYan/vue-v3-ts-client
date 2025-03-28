<script setup lang="ts">
import { useForm } from '@/hooks/useForm.ts'
import { useRouter } from 'vue-router'

const $router = useRouter()

interface LoginForm {
    account: string
    password: string
    checked: boolean
}

const { formModel, formRef, submit } = useForm<LoginForm>({
    account: '',
    password: '',
    checked: false,
})

function handleSubmit() {
    submit(() => {
        $router.push('/')
    })
}
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <el-form ref="formRef" label-position="top" :model="formModel">
                <el-form-item label="账户">
                    <el-input v-model="formModel.account" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formModel.password" />
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formModel.checked">
                        记住我
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <v-button class="w-full" type="primary" :click="handleSubmit">
                        登 录
                    </v-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
