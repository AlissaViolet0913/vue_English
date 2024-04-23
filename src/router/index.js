import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/pages/Home.vue';
import Practice from '@/components/pages/Practice.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/practice', 
    name: 'Practice', 
    component: Practice
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
