import Draggable from './components/DraggableContainer.vue'
import { App } from 'vue'

// 定义 install 函数类型
declare type PluginInstallFunction = (app: App, ...options: any[]) => any

Draggable.install = (app: App) => {
    app.component(Draggable.name, Draggable)
}

// const install: PluginInstallFunction = (app: App) => {
//     app.component(Draggable.name, Draggable)
// }

export default Draggable
