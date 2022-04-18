import { createRouter, createWebHistory, Router } from 'vue-router'


const characters = () => import('../views/characters/index.vue')
const character = () => import('../views/character/index.vue')
const blacklist = () => import('../views/blacklist/index.vue')
const routes = [
  {
    path: '/characters',
    name: 'characters',
    component: characters,

  },

  {
    path: '/blacklist',
    name: 'blacklist',
    component: blacklist,

  },
  {
    path: '/character/:id?',
    name: 'character',
    component: character,

  },

  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'characters' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
