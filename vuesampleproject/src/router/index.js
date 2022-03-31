import {createRouter , createWebHistory} from 'vue-router'

// Import the components
import HelloWorld from '../views/HelloWorld.vue'
import DatatableC from '../components/DatatableC.vue'
import LoginForm from '../components/LoginForm.vue'

const routes = [
    {
        path : '',
        name : 'HomePage',
        component : HelloWorld
    },
    {
        path : '/datatable',
        name : 'DataTable',
        component : DatatableC
    },
    {
        path : '/adddata',
        name : 'AddData',
        component : LoginForm
    }
]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
})

export default router;