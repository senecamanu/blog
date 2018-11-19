<template>
  <div id="app">
    <NavbarComponent 
    @isloginnavbar="loginchanger" 
    @islogoutnavbar="logoutchanger"
    :islogin="islogin"/>
    <router-view @isloginsignin="loginchanger" />
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import { VueEditor } from 'vue2-editor'

export default {
  name: 'app',
  data() {
    return {
      islogin: false
    }
  },
  components: {
    NavbarComponent
  },
  methods: {
    loginchanger() {
      this.islogin = true
    },
    logoutchanger() {
      this.islogin = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
