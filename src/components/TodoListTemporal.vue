<template>
  <h1>Список дел</h1>

  <form
    @submit.prevent="submit"
  >
    <input type="text" placeholder="Название"
      v-model="title"
    >
    <input type="text" placeholder="Описание"
      v-model="description"
    >
    <button type="submit">Добавить</button>
  </form>

  <div
    v-for="todo of todoList"
    v-bind:key="todo.id"
  >
    <span>{{ todo }}</span>
  </div>
</template>

<script>
  import { onMounted,  ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { auth } from '@/store'

  import axiosInstanse from '@/axios'

  export default {
    setup() {
      const router = useRouter()

      onMounted( () => {
        if ( !auth.value ) router.push( { path: '/login' } )
      } )

      const todoList = ref( [] )

      onMounted( async () => {
        const options = { params: { 'user_id': auth.value[ 'user_id' ], token: auth.value.token } }
        const response = await axiosInstanse.get( '/todo', options )
        todoList.value = response.data
      } )

      const title = ref( '' )
      const description = ref( '' )

      const submit = async () => {
        const options = { params: { 'user_id': auth.value[ 'user_id' ], token: auth.value.token } }
        const body = { title: title.value, description: description.value }
        const response = await axiosInstanse.post( '/todo', body, options )
        const todo = response.data
        todoList.value.unshift( todo )
      }
      
      return { todoList, title, description, submit }
    }
  }
</script>