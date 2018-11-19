<template>
  <div class="home">
    <ArticleCard 
        :list="list"
        :key="index" 
        v-for="(list, index) in articlesList"
      />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import ArticleCard from '@/components/ArticleCard.vue'

export default {
  name: 'home',
  components: {
    ArticleCard
  },
  data() {
    return {
      articlesList: []
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/article'
    })
      .then(result => {
        this.articlesList = result.data.reverse()
        console.log(this.articlesList)
      })
      .catch(err => console.log(err))

  }
};
</script>
