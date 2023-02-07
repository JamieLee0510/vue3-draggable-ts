<template>
    <div @dragover.prevent.stop="onDragOver">
        <transition-group name="draggable-item-list">
            <DraggableItemComponent
                v-for="(item, index) in items"
                :key="item.id"
                :item="item"
                :containerId="id"
                :position="index"
                @itemDragOver="onItemDragOver"
                @dragenter.prevent
            >
                <slot name="item" :item="item.data"></slot>
            </DraggableItemComponent>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, ref } from 'vue'
import DraggableItemComponent from './DraggableItem.vue'
import { DraggableItem } from '../types/draggable-item.interface'
import { useDraggableContainer } from '../composables/draggable'
import { getIdGenerator } from '../utils/id-generator'
import { toDraggableItems } from '../utils/to-draggable-items'
import { changeArrayOrder } from '../utils/change-order'
export default defineComponent({
    name: 'Draggable',
    components: {
        DraggableItemComponent,
    },
    props: {
        modelValue: Array,
        transition: {
            default: '0',
            type: String,
        },
    },
    setup(props, context) {
        const { modelValue } = toRefs(props)
        const { id, items, onDragOver, onItemDragOver } = useDraggableContainer(modelValue, context)
        const containerIdGenerator = getIdGenerator()

        // // dissturcture  useDraggableContainer(modelValue, context)
        // const id = containerIdGenerator()
        // const items = ref<Array<DraggableItem>>(toDraggableItems(modelValue.value))
        // const transitioning = ref(false)
        // const itemCurrentlyDragging = ref<DraggableItem | null>(null)
        // const containerIdCurrentlyDraggedOver = ref<number>(null)
        // const onDragOver = () => {
        //     if (
        //         transitioning.value ||
        //         !itemCurrentlyDragging.value ||
        //         containerIdCurrentlyDraggedOver.value === id
        //     ) {
        //         return
        //     }

        //     if (items.value.length > 0) {
        //         return
        //     }

        //     containerIdCurrentlyDraggedOver.value = id
        //     items.value = [itemCurrentlyDragging.value]
        // }
        // const onItemDragOver = ({ position }: { position: number }) => {
        //     if (transitioning || !itemCurrentlyDragging.value) {
        //         return
        //     }
        //     items.value = changeArrayOrder(items.value, itemCurrentlyDragging.value, position)
        // }

        return { id, items, onDragOver, onItemDragOver }
    },
    computed: {
        transitionStyle() {
            return `transform ${this.transition}ms`
        },
    },
})
</script>

<style scoped>
.draggable-item-list-move {
    transition: v-bind(transitionStyle);
}
</style>
