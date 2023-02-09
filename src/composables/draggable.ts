import { ref, onMounted, onUpdated, watch, SetupContext, Ref, nextTick } from 'vue'
import { changeArrayOrder } from '../utils/change-order_demo'
import { getIdGenerator } from '../utils/id-generator'
import { throttle } from '../utils/throttle'

let itemCurrentlyDragging = ref<any>(null)
let containerIdCurrentlyDraggedOver = ref<number | null>(null)
let transitioning = false
const containerIdGenerator = getIdGenerator()

const useDraggableContainer = <T>(
    originalItems: Ref<Array<T>>,
    keyName: string,
    context: SetupContext,
) => {
    const id = containerIdGenerator()

    //const items = ref<Array<DraggableItem>>(toDraggableItems(originalItems.value))

    const items = ref<Array<T>>(JSON.parse(JSON.stringify(originalItems.value)))

    // update items while props.list changed
    watch(
        () => originalItems,
        newValue => {
            console.log('---watch originalItems.value in hook')
            items.value = JSON.parse(JSON.stringify(newValue.value))
        },
        { deep: true },
    )

    // update v-model when dropped
    watch(itemCurrentlyDragging, () => {
        if (itemCurrentlyDragging.value) {
            return
        }
        context.emit('update:modelValue', JSON.parse(JSON.stringify(items.value)))
    })
    // case when an item is being dragged to another container
    watch(containerIdCurrentlyDraggedOver, () => {
        if (containerIdCurrentlyDraggedOver.value === id) {
            return
        }
        items.value = items.value.filter(
            item => item[keyName] !== itemCurrentlyDragging.value![keyName],
        )
    })

    // when an item is moved to an empty container
    const onDragOver = () => {
        if (
            transitioning ||
            !itemCurrentlyDragging.value ||
            containerIdCurrentlyDraggedOver.value === id
        ) {
            return
        }

        if (items.value.length > 0) {
            return
        }

        containerIdCurrentlyDraggedOver.value = id
        items.value = [itemCurrentlyDragging.value]
    }
    // handle event emitted from draggableItem
    const onItemDragOver = ({ position }: { position: number }) => {
        if (transitioning || !itemCurrentlyDragging.value) {
            return
        }

        items.value = changeArrayOrder(items.value, itemCurrentlyDragging.value, position, keyName)
    }

    return {
        id,
        items,
        onDragOver,
        onItemDragOver,
    }
}

const useDraggableItem = <T>(
    item: Ref<T>,
    keyName: string,
    position: Ref<number>,
    containerId: Ref<number>,
    context: SetupContext,
) => {
    const draggableItemEl = ref<Element | null>(null)
    const isDragging = ref(false)

    if (
        itemCurrentlyDragging.value &&
        item.value[keyName] === itemCurrentlyDragging.value[keyName]
    ) {
        isDragging.value = true
    } else {
        isDragging.value = false
    }

    const middleY = ref<number | null>(null)

    onMounted(async () => {
        if (draggableItemEl.value) {
            const box = draggableItemEl.value.getBoundingClientRect()
            middleY.value = box.top + box.height / 2
        }
    })

    onUpdated(() => {
        if (draggableItemEl.value) {
            const box = draggableItemEl.value!.getBoundingClientRect()
            middleY.value = box.top + box.height / 2
        }
    })

    const onDragStart = () => {
        itemCurrentlyDragging.value = item.value
        containerIdCurrentlyDraggedOver.value = containerId.value
        isDragging.value = true
    }

    const onDragEnd = () => {
        itemCurrentlyDragging.value = null
    }

    const onDragOver = throttle((e: DragEvent) => {
        if (item.value[keyName] === itemCurrentlyDragging.value[keyName]) {
            return
        }

        if (containerIdCurrentlyDraggedOver.value !== containerId.value) {
            containerIdCurrentlyDraggedOver.value = containerId.value
        }

        const offset = middleY.value! - e.clientY

        context.emit('itemDragOver', {
            position: offset > 0 ? position.value : position.value + 1,
        })
    }, 50)

    const transitionStart = () => {
        transitioning = true
    }

    const transitionEnd = () => {
        transitioning = false
    }

    watch(itemCurrentlyDragging, () => {
        if (itemCurrentlyDragging.value) {
            return
        }
        isDragging.value = false
    })

    return {
        draggableItemEl,
        isDragging,
        onDragStart,
        onDragOver,
        onDragEnd,
        transitionStart,
        transitionEnd,
    }
}

export { useDraggableContainer, useDraggableItem }
