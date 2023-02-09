<template>
    <div class="container">
        <div class="left">
            <DraggableItemContainer v-model="items1" keyName="title" class="drop-zone">
                <template v-slot:item="{ item }">
                    <div class="draggable-item">{{ item.title }}</div>
                </template>
            </DraggableItemContainer>
            <!-- Draggable container -->

            <pre>{{ JSON.stringify(items1, undefined, 4) }}</pre>
        </div>
        <div class="right">
            <DraggableItemContainer v-model="items2" keyName="title" class="drop-zone">
                <template v-slot:item="{ item }">
                    <div class="draggable-item">{{ item.title }}</div>
                </template>
            </DraggableItemContainer>
            <pre>{{ JSON.stringify(items2, undefined, 4) }}</pre>
            <button @click="add">add</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated, watch, reactive } from 'vue'
import DraggableItemContainer from './components/DraggableContainer.vue'
export default defineComponent({
    name: 'Sample',
    components: {
        // DraggableItemComponent,
        DraggableItemContainer,
    },
    setup() {
        const items1 = ref(
            Array(5)
                .fill({})
                .map((_, index) => ({ title: `Item ${index + 1}` })),
        )
        const items2 = ref([])
        // id:for draggabe container id

        // const { id, items: demoItems, onDragOver, onItemDragOver } = useDraggableContainer(
        //     items1,
        //     'title',
        //     context,
        //     updateData,
        // )

        const add = () => {
            const current = items1.value.length + 1
            items1.value.push({ title: `Item ${current}` })
        }

        return {
            items1,
            items2,
            add,
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
