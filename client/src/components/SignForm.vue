<template>
  <div class="container vertical-center">
    <div class="row justify-content-center">
      <div class="col-md-6 col-md-offset-3">
        <form v-on:submit.prevent="onSubmit">
          <div class="form-group" v-if="route === '/signup'">
            <label for="exampleInputEmail1">First Name</label>
            <input type="text" class="form-control" placeholder="Enter first name" v-model="signFirstName">
          </div>
          <div class="form-group" v-if="route === '/signup'">
            <label for="exampleInputEmail1">Last Name</label>
            <input type="text" class="form-control" placeholder="Enter last name" v-model="signLastName">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" placeholder="Enter email" v-model="signEmail">
            <small v-if="route === '/signup'" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  v-model="signPassword">
          </div>
          <button v-if="route === '/signup'" type="button" class="btn btn-outline-primary" @click.prevent="signUpSubmit()">Submit</button>
          <button v-if="route === '/signin'" type="button" class="btn btn-outline-primary" @click.prevent="signInSubmit()">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SignUpForm',
  data() {
    return{
      signFirstName: '',
      signLastName: '',
      signEmail: '',
      signPassword: '',
      route: null
    }
  },
  methods: {
    signUpSubmit: function() {
      this.$http({
        method: 'post',
        url: 'http://localhost:4000/user',
        data: {
          firstName: this.signFirstName,
          lastName: this.signLastName,
          email: this.signEmail,
          password: this.signPassword
        }
      })
        .then(result => {
          console.log(result.data)
        })
        .catch(err => console.log(err))
    },

    signInSubmit: function() {
      this.$http({
        method: 'post',
        url: 'http://localhost:4000/user/signin',
        data: {
          email: this.signEmail,
          password: this.signPassword
        }
      })
        .then(result => {
          localStorage.setItem('access_token', result.data.jwt)
          localStorage.setItem('name', result.data.name)
          localStorage.setItem('id', result.data.id)
          this.$emit('isloginform')
        })
        .catch(err => console.log(err))
    }
  },
  mounted: function() {
    this.route = this.$router.currentRoute.path
  }
}
</script>

<style>
.vertical-center {
  min-height: 100%;
  min-height: 100vh;
  align-items: center;
}
</style>
