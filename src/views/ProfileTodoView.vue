<template>
  <div class="container">
    <div class="px-2">
      <div class="py-6">
        <h2 class="mb-2">Добавить задачу:</h2>

        <form class="mb-4"
          @submit.prevent="submit"
        >
          <input class="d-block w-100 mb-2" type="text" placeholder="Название"
            v-model="title"
          >

          <textarea class="d-block w-100 mb-2 resize-vertical textarea" placeholder="Описание"
            v-model="description"
          ></textarea>

          <button type="submit">Добавить</button>
        </form>

        <h2 class="mb-2">Задачи:</h2>

        <ul class="mb-2 mx-n2 d-flex">
          <li class="px-2"
            v-for="category of categoryList"
            v-bind:key="category.id"
          >
            <div class="filter-card"
              v-bind:class="{ 'bg-lavender': category.key === ( categorySelected && categorySelected.key ) }"
              v-on:click="categorySelected = category"
            >
              <span>{{ category.title }}</span>
            </div>
          </li>
        </ul>

        <div class="mb-4 bg-lavender todo-card"
          v-for="todo of filteredTodoList"
          v-bind:key="todo.id"
        >
          <div class="d-flex mx-n2">
            <div class="px-2">
              <input type="checkbox"
                v-bind:checked="todo.completed"
                v-on:click.prevent="onTodoCompletedToggle( todo )"
              >
            </div>
            <div class="px-2">
              <h2 class="mb-2">{{ todo.title }}</h2>
            </div>
          </div>
          <p class="mb-2 todo-card__description"
            v-bind:title="todo.description"
          >
            <span>{{ todo.description || '-' }}</span>
          </p>
          <p class="todo-card__created">{{ new Date( todo.created_at ).toLocaleString( 'ru' ) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { auth } from '@/store'

  import axios from '@/axios'

  export default {
    setup() {
      return { auth }
    },

    data() { return {
      todoList: [],
      title: '',
      description: '',
      categoryList: [
        { id: 1, key: 'current', title: 'Текущие' },
        { id: 2, key: 'completed', title: 'Выполненные' },
        { id: 3, key: 'all', title: 'Все' }
      ],
      categorySelected: null
    } },

    methods: {
      async submit() {
        const options = { params: { 'user_id': this.auth[ 'user_id' ], token: this.auth.token } }
        const body = { title: this.title, description: this.description }
        const response = await axios.post( '/todo', body, options )
        const todo = response.data
        this.todoList.unshift( todo )
      },

      async onTodoCompletedToggle( todo ) {
        const options = { params: { 'user_id': this.auth[ 'user_id' ], token: this.auth.token } }
        const body = { ...todo, completed: !todo.completed }
        const response = await axios.patch( `/todo/${ todo.id }`, body, options )
        console.log( this.todoList.find( el => el.id === todo.id ).completed = response.data.completed )
      }
    },

    computed: {
      filteredTodoList() {
        let todoList
        if ( !this.categorySelected ) todoList = this.todoList
        else if ( this.categorySelected.key === 'current' ) todoList = this.todoList.filter( el => !el.completed )
        else if ( this.categorySelected.key === 'completed' ) todoList = this.todoList.filter( el => el.completed )
        else todoList = this.todoList
        return todoList.sort( ( a, b ) => new Date( b.created_at ) - new Date( a.created_at ) )
      }
    },

    async mounted() {
      this.categorySelected = this.categoryList.find( el => el.key === 'current' ) || null

      const options = { params: { 'user_id': this.auth[ 'user_id' ], token: this.auth.token } }
      const response = await axios.get( '/todo', options )
      this.todoList = response.data
    }
  }
</script>

<style scoped lang="scss">
  .todo-card {
    padding: 5px;
    border-radius: 5px;

    &__description {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

    &__created {
      text-align: right;
      opacity: .5;
    }
  }

  .filter-card {
    padding: 5px 10px;
    border-radius: 15px;
    border: 1px solid lavender;
    cursor: pointer;
  }
</style>