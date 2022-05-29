<template>
  <div class="container">
    <div class="px-2">
      <div class="py-6">
        <h1 class="mb-4">Авторизация</h1>

        <form class="d-inline-block"
          v-on:submit.prevent="onSubmitLogin"
        >
          <label class="d-block mb-2">
            <p>Логин:</p>
            <input type="text"
              v-model="username"
            >
          </label>
          
          <label class="d-block mb-4">
            <p>Пароль:</p>
            <input type="password"
              v-model="password"
            >
          </label>

          <div>
            <button class="w-100" type="submit"
              v-bind:disabled="isSubmitting"
            >Войти</button>
          </div>
        </form>
      </div>
    </div>    
  </div>
</template>

<script>
  import Requests from '@/requests'
  import { auth } from '@/store'
  
  export default {
    setup() {
      return { auth }
    },

    data() { return {
      username: '',
      password: '',
      isSubmitting: false
    } },

    methods: {
      async onSubmitLogin() {
        if ( !this.username ) { return alert( 'Логин - обязательное поле!' ) }
        if ( !this.password ) { return alert( 'Пароль - обязательное поле!' ) }

        this.isSubmitting = true
        const body = {
          username: this.username,
          password: this.password
        }
        try {
          const response = await Requests.login( body )
          const auth = response.data
          this.auth = auth
          localStorage.setItem( 'auth', JSON.stringify( auth ) )
          this.$router.push( '/profile' )
        } catch {
          alert( 'Произошла ошибка при запросе на сервер' )
        }
        this.isSubmitting = false
      }
    }
  }
</script>