import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/userStore'
// @ts-ignore

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory()
})

router.beforeEach((to, prev, next) => {
  const userStore = useUserStore()
  if(to.path === '/login' && userStore.isLoggedIn) return router.push('/')
  if(!to.meta.requiresAuth) return next()
  if(userStore.isLoggedIn) return next()
  
  router.push('/login');
});

app.use(pinia)
app.use(router)
app.mount(document.body)
