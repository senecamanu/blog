<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active text-dark" href="#">Articles</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-muted" href="#">Slaps</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-muted" href="#">Saves</a>
          </li>
        </ul>
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
      condition: '',
      route: '',
      articles: []
    }
  },

  methods: {
    getAllArticles() {
      axios({
        method: 'get',
        // url: `http://localhost:4000/user/${localStorage.getItem('id')}`
        url: `http://localhost:4000/user/${this.$route.params.userId}`
      })
        .then(result => {
          this.articles = result.data.articles
          this.$emit('ArticlesFromUserProfileData', this.articles)
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getAllArticles()
  }
}
</script> 

<style>
</style>