<template>
  <div class="bg-lavender">
    <div class="container">
      <div class="px-2">
        <nav class="py-2">
          <div class="d-flex justify-content-between mx-n2">
            <div class="px-2">
              <ul class="mx-n2 d-flex">
                <li
                  v-for="(link, idx) of linkList"
                  v-bind:key="idx"
                >
                  <router-link class="px-2 d-inline-block link"
                    v-bind:to="link.path"
                    v-bind:class="{ 'link_active': link.path === $route.path }"
                  >
                    <span>{{ link.title }}</span>
                  </router-link>
                </li>
              </ul>
            </div>

            <div class="px-2">
              <a class="link" href="/"
                v-on:click.prevent="onClickLogout"
              >
                <span>Выйти</span>
              </a>
              <!-- <router-link class="px-2 d-inline-block link" to="/">Выйти</router-link> -->
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  
  <router-view/>
</template>

<script>
  import { auth } from '@/store'

  const linkList = [
    { path: '/profile', title: 'Главная' },
    { path: '/profile/todo', title: 'Задачи' }
  ]

  export default {
    setup() {
      return { auth }
    },

    data() { return {
      linkList
    } },

    methods: {
      onClickLogout() {
        this.auth = null
        localStorage.removeItem( 'auth' )
        this.$router.push( '/' )
      } 
    },

    mounted() {
      if ( !this.auth ) this.$router.push( '/' )
    }
  }
</script>