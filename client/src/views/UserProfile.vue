<template>
  <div class="UserProfile">
    <UserProfileHeading />
    <div v-if="!articleListHide">
      <UserProfileData @ArticlesFromUserProfileData="sendArticlesToArticlesCard"/>
      <ArticleCard 
        :list="list"
        :key="index" 
        v-for="(list, index) in articlesList"
      />
    </div>
    <router-view v-if="articleListHide" />
  </div>
</template>

<script>
// @ is an alias to /src
import UserProfileHeading from '@/components/UserProfileHeading.vue'
import UserProfileData from '@/components/UserProfileData.vue'
import ArticleCard from '@/components/ArticleCard.vue'

export default {
  name: 'UserProfile',
  components: {
    UserProfileHeading,
    UserProfileData,
    ArticleCard
  },
  data() {
    return {
      articlesList: [],
      articleListHide: false
    }
  },

  methods: {
    // test(data)
    sendArticlesToArticlesCard(val) {
      this.articlesList = val
    }
  },
  mounted() {
    if(this.$route.params.articleId) {
        this.articleListHide = true
      } else {
        this.articleListHide = false
      }
  },
  watch: {
    '$route' (to, from) {

      if(to.params.articleId) {
        this.articleListHide = true
      } else {
        this.articleListHide = false
      }
    }
  }
};
</script>