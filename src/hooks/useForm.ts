/**
 * 表单
 * @param initForm 初始化表单数据
 * @param config 表单配置 { rules:{} }
 */
export function useForm(initForm, config = null) {
    const _init = () => {
        if (["[object Object]", "object Array"].includes(Object.prototype.toString.call(initForm))) {
            return initForm
        } else if (Object.prototype.toString.call(initForm) === "[object Function]") {
            return initForm()
        }
    }

    const formModel = ref(_init())
    const formRef = ref()

    const _initRules = () => {
        if (config?.rules) {
            return config.rules
        } else {
            return {}
        }
    }
    const rules = ref(_initRules())

    /**
     * 表单提交
     * @param callback 回调函数
     */
    const submit = async (callback) => {
        await formRef.value?.validate((valid, fields) => {
            if (valid) {
                callback()
            }
        })
    }

    /**
     * 重置表单设置
     */
    const reset = () => {
        formModel.value = _init();
        formRef.value?.resetFields()
    }

    return {
        formModel,
        formRef,
        rules,

        submit,
        reset
    }
}