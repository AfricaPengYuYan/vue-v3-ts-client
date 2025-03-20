import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'

interface FormConfigType {
    rules?: FormRules
}

/**
 * 表单Hook
 * @param initForm 初始化表单数据
 * @param config 表单配置 { rules:{} }
 */
export function useForm<T extends Record<string, any>>(initForm: T | (() => T), config?: FormConfigType) {
    const _init = (): T => {
        if (typeof initForm === 'function') {
            return initForm()
        }
        return initForm
    }

    const formModel = ref<T>(_init())
    const formRef = ref<FormInstance>()
    const rules = ref(config?.rules ?? {})

    /**
     * 表单提交
     * @param callback 回调函数
     */
    const submit = async (callback: () => any) => {
        if (!formRef.value)
            return
        await formRef.value.validate((valid) => {
            if (valid) {
                callback()
            }
        })
    }

    /**
     * 重置表单设置
     */
    const reset = () => {
        formModel.value = _init()
        formRef.value?.resetFields()
    }

    return {
        formModel,
        formRef,
        rules,
        submit,
        reset,
    }
}
