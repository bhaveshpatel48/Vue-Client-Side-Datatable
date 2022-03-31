<template v-cloak>
  <div id="nav">
    <router-link :to="{name : 'HomePage'}">Celebrate</router-link>
    <router-link :to="{name : 'DataTable'}">DataTable</router-link>
    <router-link :to="{name : 'AddData'}">Add Data</router-link>
  </div>
  <router-view />

</template>

<script crossorigin="anonymous">
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
  
  },
  setup()
  {
    const title = ref("Client Side Datatable");
    const isDataTableView = ref(false);
    return {
      title
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  padding: 10px 40px 0px 40px;
}
[v-cloak] {
  display: none
}
#nav{
  padding: 30px;
}

#nav a {
  font-weight: bold;
  columns: blue;
  padding: 20px;
}

</style>
