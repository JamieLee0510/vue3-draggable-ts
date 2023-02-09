<template>
    <div @dragover.prevent.stop="onDragOver">
        <!-- <transition-group name="draggable-item-list"> -->
        <transition-group name="draggable-item-list">
            <DraggableItemComponent
                v-for="(item, index) in items"
                :key="item[keyName]"
                :item="item"
                :containerId="id"
                :position="index"
                :keyName="keyName"
                @itemDragOver="onItemDragOver"
                @dragenter.prevent
            >
                <slot name="item" :item="item"></slot>
            </DraggableItemComponent>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { toRefs, toRef, defineComponent, ref, watch } from 'vue'
import DraggableItemComponent from './DraggableItem.vue'
import { useDraggableContainer } from '../composables/draggable'
export default defineComponent({
    name: 'Draggable',
    components: {
        DraggableItemComponent,
    },
    props: {
        modelValue: Array,
        keyName: String,
    },
    setup(props, context) {
        const { modelValue } = toRefs(props)
        const { id, items, onDragOver, onItemDragOver } = useDraggableContainer(
            modelValue,
            props.keyName,
            context,
        )
        console.log(`in Container, items:${items.value}`)
        watch(
            () => props.modelValue,
            value => {
                console.log('----wathc modelValue changed in ContainerComponent:', value)
            },
            { deep: true },
        )
        return { id, items, onDragOver, onItemDragOver }
    },
})
</script>
