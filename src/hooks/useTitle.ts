import { useAppStoreWithOut } from '@/store/modules/app'
import { isString } from '@/utils/is'
import { ref, watch } from 'vue'

export function useTitle(newTitle?: string) {
    const appStore = useAppStoreWithOut()

    const title = ref(
        newTitle ? `${appStore.getTitle} - ${newTitle}` : appStore.getTitle,
    )

    watch(title, (n, o) => {
        if (isString(n) && n !== o && document) {
            document.title = n
        }
    }, { immediate: true })

    return title
}
