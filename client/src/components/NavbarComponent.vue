<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <a class="navbar-brand font-weight-bold" href="/">Large</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Moves component in the right away hitting the Logo -->
      <ul class="navbar-nav mr-auto">
      </ul>

      <router-link to="/signin">
        <button v-if="!islogin" class="btn my-2 my-sm-0 text-success" id="button-push-right">Sign in</button>
      </router-link>

      <router-link to="/signup">
        <button v-if="!islogin" class="btn btn-outline-success my-2 my-sm-0" type="submit">Get started</button>
      </router-link>


      <router-link :to="{ path: '/' + id }">
        <button v-if="islogin" class="btn my-2 my-sm-0">{{ name }}</button>
      </router-link>
      
      <router-link to="/new">
        <button v-if="islogin" class="btn text-success my-2 my-sm-0">New Article</button>
      </router-link>

      <button v-if="islogin" class="btn btn-outline-success my-2 my-sm-0" @click="signoutnavbar">Sign out</button>
    </div>
  </nav>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NavbarComponent',
  props: ['islogin'],
  data() {
    return {
      name: '',
      id: '',
      route: ''
    }
  },
  methods: {
    checkToken() {
      if (localStorage.getItem('access_token') === null) {
        this.islogin = false
        } else {
        this.islogin = true
        this.name = localStorage.getItem('name')
        this.id = localStorage.getItem('id')
        this.$emit('isloginnavbar')
      }
    },
    signoutnavbar() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      this.$emit('islogoutnavbar')
    },
    getUserName() {

    }
  },
  mounted: function() {
    this.checkToken(),
    this.route = this.$router.currentRoute.path
  },
  watch: {
    'this.$router' (to, from) {}
  }
}
</script>
