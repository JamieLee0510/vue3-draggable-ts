<template>
    <div class="container">
        <div class="left">
            <!-- Draggable container -->
            <transition-group name="draggable-item-list">
                <DraggableItemComponent
                    v-for="(item, index) in demoItems"
                    :key="item['title']"
                    :item="item"
                    :containerId="id"
                    :position="index"
                    :keyName="'title'"
                    @itemDragOver="onItemDragOver"
                    @dragenter.prevent
                >
                    <template #item>
                        <div class="draggable-item">{{ item.title }}</div>
                    </template>
                </DraggableItemComponent>
            </transition-group>
            <pre>{{ JSON.stringify(items1, undefined, 4) }}</pre>
        </div>
        <div class="right">
            <button @click="add">add</button>
        </div>
        <!-- <div class="right">
            <transition-group name="draggable-item-list">
                <DraggableItemComponent
                    v-for="(item, index) in items2"
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

            <pre>{{ JSON.stringify(items2, undefined, 4) }}</pre>
        </div> -->
        <div>
            <ul v-for="(num, index) in checkList" :key="index">
                <li>{{ num }}</li>
            </ul>
            <button @click="addtoCheckList">add to checklist</button>
            <button @click="modifyCheckList">modifyCheckList</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated, watch } from 'vue'
import Draggable from './components/DraggableContainer.vue'
import { DraggableItem } from './types/draggable-item.interface'
import { changeArrayOrder } from './utils/change-order'
import { getIdGenerator } from './utils/id-generator'
import { toDraggableItems, toOriginalArray } from './utils/to-draggable-items'
import DraggableItemComponent from './components/DraggableItemDemo.vue'
import { useDraggableContainer } from './composables/draggableDemo'
export default defineComponent({
    name: 'Sample',
    components: {
        DraggableItemComponent,
    },
    setup(props, context) {
        const items1 = ref(
            Array(5)
                .fill({})
                .map((_, index) => ({ title: `Item ${index + 1}` })),
        )
        const items2 = ref([])
        // id:for draggabe container id
        const updateData = (data: any[]) => {
            items1.value = data
        }
        const { id, items: demoItems, onDragOver, onItemDragOver } = useDraggableContainer(
            items1,
            'title',
            context,
            updateData,
        )
        const add = () => {
            const current = items1.value.length + 1
            items1.value.push({ title: `Item ${current}` })
        }

        const checkList = ref([1, 2, 3, 4, 5])
        const addtoCheckList = () => {
            checkList.value.push(Math.round(Math.random()))
        }
        const modifyCheckList = () => {
            const currLen = checkList.value.length
            checkList.value = new Array(currLen).fill(Math.round(Math.random()))
        }

        watch(
            () => checkList.value,
            newValue => {
                console.log('watch checkList changed!')
            },
            { deep: true },
        )
        onUpdated(() => {
            console.log('updated while checkList changed!')
        })

        return {
            items1,
            demoItems,
            id,
            items2,
            onDragOver,
            onItemDragOver,
            add,
            checkList,
            addtoCheckList,
            modifyCheckList,
        }
    },
})
</script>

<style>
.draggable-item-list-move {
    transition: 300ms;
}
.container {
    width: 800px;
    display: flex;
    flex-direction: row;
}
body {
    display: flex;
    padding-top: 100px;
    justify-content: center;
}
.draggable-item {
    display: flex;
    justify-content: center;
    background-color: lightblue;
    box-shadow: 0px 2px 5px #aaa;
    margin: 1%;
    padding: 1%;
}
.drop-zone {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 3px 5px #aaa;
    margin: 30px;
    padding: 10px;
    width: 400px;
    height: 200px;
}
pre {
    background-color: #eee;
    margin: 30px;
    padding: 10px;
    width: 400px;
    min-height: 200px;
}
</style>
