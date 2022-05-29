<template>
  <div class="container">
    <div class="px-2">
      <div class="py-6">
        <h1 class="mb-4">Регистрация</h1>

        <form class="d-inline-block"
          v-on:submit.prevent="onSubmitRegistration"
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
          
          <label class="d-block mb-4">
            <p>Повторите пароль:</p>
            <input type="password"
              v-model="passwordRepeat"
            >
          </label>

          <div>
            <button class="w-100" type="submit"
              v-bind:disabled="isSubmitting"
            >Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>    
  </div>
</template>

<script>
  import Requests from '@/requests'
  
  export default {
    data() { return {
      username: '',
      password: '',
      passwordRepeat: '',
      isSubmitting: false
    } },

    methods: {
      async onSubmitRegistration() {
        if ( !this.username ) { return alert( 'Логин - обязательное поле!' ) }
        if ( !this.password ) { return alert( 'Пароль - обязательное поле!' ) }
        if ( !this.passwordRepeat ) { return alert( 'Повтор пароля - обязательное поле!' ) }
        if ( !( this.password === this.passwordRepeat ) ) { return alert( 'Пароль и повтор пароля должны совпадать!' ) }

        this.isSubmitting = true
        const body = {
          username: this.username,
          password: this.password
        }
        try {
          await Requests.register( body )
          this.$router.push( '/login' )
        } catch {
          alert( 'Произошла ошибка при запросе на сервер' )
        }
        this.isSubmitting = false
      }
    }
  }
</script>