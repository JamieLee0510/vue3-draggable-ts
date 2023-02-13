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
                :group="group"
            >
                <slot name="item" :item="item"></slot>
            </DraggableItemComponent>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, defineProps, PropType } from 'vue'
import DraggableItemComponent from './DraggableItem.vue'
import { useDraggableContainer } from '../hook/draggable'

export default defineComponent({
    name: 'Draggable',
    components: {
        DraggableItemComponent,
    },
    props: {
        modelValue: {
            type: Array,
            require: true,
        },
        keyName: {
            type: String,
            require: true,
        },
        group: {
            type: String,
            require: false,
        },
        limitation: {
            type: Function,
            require: false,
        },
    },
    setup(props, context) {
        const { modelValue } = toRefs(props)
        const { id, items, onDragOver, onItemDragOver } = useDraggableContainer(
            modelValue,
            props.keyName,
            context,
            props.group,
            props.limitation as (list: Array<any>) => boolean,
        )

        return { id, items, onDragOver, onItemDragOver }
    },
})
</script>
