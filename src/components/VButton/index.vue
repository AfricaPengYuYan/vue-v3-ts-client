<script lang="tsx">
import { ElButton } from 'element-plus'
import { defineComponent, h } from 'vue'

type VButtonProps = { click?: (e: MouseEvent) => void } & typeof ElButton.props

export default defineComponent({
    name: 'VButton',
    props: {
        ...ElButton.props,
        click: {
            type: Function as PropType<(e: MouseEvent) => void>,
            default: undefined,
        },
    },
    setup(props: VButtonProps, { emit, slots, attrs }) {
        const loading = ref(false)
        const handleClick = async (e: MouseEvent) => {
            loading.value = true
            // 调用父组件传入的click函数
            if (props.click) {
                await props.click(e)
            }
        }

        return () => h(ElButton, {
            ...props,
            ...attrs,
            loading: loading.value,
            onClick: handleClick,
        }, slots)
    },
})
</script>
