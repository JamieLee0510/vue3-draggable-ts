<template>
    <div
        draggable="true"
        @transitionStart="transitionStart"
        @transitionEnd="transitionEnd"
        @dragover.prevent.stop="onDragOver"
        @dragstart.stop="onDragStart"
        @dragend.stop="onDragEnd"
        @dragenter.prevent
        ref="draggableItemEl"
        :class="{ isDragging }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, ref } from 'vue'
import { useDraggableItem } from '../hook/draggable'

export default defineComponent({
    name: 'DraggableItem',
    props: {
        item: Object,
        position: Number,
        keyName: String,
        containerId: Number,
        group: {
            type: String,
            require: false,
        },
    },
    setup(props, context) {
        const { item, position, containerId, group } = toRefs(props)

        const {
            draggableItemEl,
            isDragging,
            onDragStart,
            onDragOver,
            onDragEnd,
            transitionStart,
            transitionEnd,
        } = useDraggableItem(item, props.keyName, position, containerId, context, group)

        return {
            draggableItemEl,
            isDragging,
            onDragStart,
            onDragOver,
            onDragEnd,
            transitionStart,
            transitionEnd,
        }
    },
})
</script>

<style scoped>
.isDragging {
    opacity: 0.4;
}
</style>
