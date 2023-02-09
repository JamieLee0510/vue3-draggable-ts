# vue3-draggable-ts

list-based drag&drop component for vue 3.x, with no dependencies. This repo is base on the repo [vue3-draggable](https://www.npmjs.com/package/vue3-draggable), and could reactive while modify the list size (like push, pop,...etc).

This repo is for privatly use currently. Will push to public NPM once reaching version 1.0.0.

<!-- ![vue3-drag2](https://user-images.githubusercontent.com/59331444/104086030-774ce700-5297-11eb-9f5a-211bd4b7c01f.gif) -->

# Features

-   support v-model
-   support transition
-   customizable draggable component

Nested useage is currently not supported

# Installation

```
npm i vue3-draggable-ts
```

# Try Sample

```bash
git clone https://github.com/LiDingYu0510/vur3-draggable-ts.git

npm i
npm run serve
```

# Usage

import component:

```javascript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Draggable from 'vue3-draggable-ts'

createApp(App)
    .use(Draggable)
    .mount('#app')
```

template:

```vue
<draggable v-model="items" keyName="id">
    <template v-slot:item="{item}">
        <!-- example -->
        <div>
            {{item.title}}
        </div>
        <!-- or your own template -->
    </template>
</draggable>

const items = [{id:1,title:"Item 1"},{id:2,title:"Item 2"},{id:3,title:"Item 3"}]
```

This componet is implemented based on [v-slot](https://v3.vuejs.org/guide/component-slots.html#slots)

### Props

| Name       | Required | Type   | Description                              |
| :--------- | :------- | :----- | :--------------------------------------- |
| modelValue | REQUIRED | ARRAY  | v-model value, items to be bound         |
| keyName    | REQUIRED | STRING | One unique Object member to be v-for key |

# TODO

-   Generate index.d.ts auto by rollup.
-   Add function as optional prop, in order to trigger event while onDragStart, onDragEnd,...etc.
