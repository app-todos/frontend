import { createRouter, createWebHistory } from 'vue-router'
import PrimaryView from '@/views/PrimaryView'

const routes = [
  {
    path: '/',
    name: 'PrimaryView',
    component: PrimaryView,
    children: [
      {
        path: '',
        name: 'PrimaryWelcomeView',
        component: () => import( '@/views/PrimaryWelcomeView' )
      },
      {
        path: 'login',
        name: 'PrimaryLoginView',
        component: () => import( '@/views/PrimaryLoginView' )
      },
      {
        path: 'registration',
        name: 'PrimaryRegistrationView',
        component: () => import( '@/views/PrimaryRegistrationView' )
      }
    ]
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: () => import( '@/views/ProfileView' ),
    children: [
      {
        path: '',
        name: 'ProfileMainView',
        component: () => import( '@/views/ProfileMainView' )
      },
      {
        path: 'todo',
        name: 'ProfileTodoView',
        component: () => import( '@/views/ProfileTodoView' )
      }
    ]
  },
      {
        path: '/:pathMatch(.*)',
        name: 'NotFoundView',
        component: () => import( '../views/NotFoundView' )
      }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
