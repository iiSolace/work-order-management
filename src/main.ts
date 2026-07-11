import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button, Form, Input, Table } from 'ant-design-vue'
import App from '@/App.vue'
import router from '@/router'
import 'ant-design-vue/dist/reset.css'
import '@/styles/global.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Form)
app.use(Input)
app.use(Table)
app.mount('#app')
