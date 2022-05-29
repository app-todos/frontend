<template>
  <router-view/>
</template>

<script>
  import { auth } from '@/store'  

  export default {
    setup() {
      return { auth }
    },

    mounted() {
      const data = localStorage.getItem( 'auth' )
      const auth = data ? JSON.parse( data ) : null
      this.auth = auth
      auth ? this.$router.push( '/profile' ) : this.$router.push( '/' )
    }
  }
</script>

<style lang="scss">
  @import "@/style";
</style>