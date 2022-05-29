<template>
  <div class="container">
    <div class="px-2">
      <div class="py-6">
        <h1 class="mb-2">Задачи</h1>
        <p>[ тут должны быть задачи / добавлю в дальнейшем ]</p>

        <todo-list-temporal/>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoListTemporal from '@/components/TodoListTemporal'

  export default {
    components: { TodoListTemporal }
  }
</script>