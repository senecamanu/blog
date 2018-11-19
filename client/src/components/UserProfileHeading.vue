<template>
  <div class="container userheading">
    <div class="row">
      <!-- Personal information -->
      <div class="col-6 offset-2" style="">
        <h4 class="text-left">
          {{ name }}
          <br>

          <!-- Ini nanti diisi description -->
          <small class="text-muted">Student of all.</small> 
        </h4>
        
      </div>

      <div class="col-2">
        <div class='img-round'>

          <!-- Ini nanti display picture usernya langusng -->
          <img src='http://lorempixel.com/output/cats-q-c-640-640-5.jpg' class="circleImage">
        </div>
      </div>

      <div class="col-8 offset-2 userheading">
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },

  data() {
    return {
      name: '',
      description: '',
      articles: [],

    }
  },
  methods: {
  },
  watch: {
  },
  mounted() {
    // this.name = localStorage.getItem('name')
    axios({
      method: 'get',
      url: 'http://localhost:4000/user/' + this.$route.params.userId
    })
      .then(result => {
        this.name = result.data.firstName + ' ' + result.data.lastName
        this.description = 'blank'
        this.articles = result.data.articles
      })
  }
}
</script> 

<style>
.img-round {
  position: relative;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.img-round > img {
  position: absolute;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  margin-left: -50%;
}

.userheading {
  margin-top: 40px;
}
</style>