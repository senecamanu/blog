<template>
  <div class="UserArticleDetail">
    <div class="container">

      <!-- Edit -->
      <div v-if="editSection">
        <NewArticleUser/>
        <NewArticleEditor 
          :titleProps="titleProps" 
          :headingProps="headingProps" 
          :htmlContentEditorProps="htmlContentEditorProps"
          :editingState="editingState"
          />
      </div>


      <!-- Title and heading -->
      <div class="row" v-if="!editSection">
        <div class="col-6">
          <h3 class="text-left article-title">{{ title }}
            <br>
            <hr>
              <small class="text-muted">{{ heading }}</small>
            <br>
            <router-link :to="{ path: $route.path + '/edit' }">
              <button v-if="editable" class="btn btn-outline-primary edit-button" @click="editSectionButtonTrigger">Edit</button>
            </router-link>
            <br>
            <br>
            <button v-if="editable" class="btn btn-outline-danger delete-button" @click="deleteArticle()">Delete</button>
          </h3>

        </div>

        <!-- Image -->
        <div class="col-6" id="thumbnailimage">
          <img class="articlethumbnail" :src="image" />
        </div>

        <div class="col-12">
          <div class="container article-content">
            <span v-html="content" class="text-left"></span>
          </div>
        </div>

        <div v-if="isLogin" class="col-12">
          <h4 class="text-left" id="newArticleHeader">A comment,
            <small class="text-muted">the way individuals revise and discuss.</small>
            <br>
            <button type="button" class="btn btn-outline-primary publish" @click="publishComment">Publish</button>
          </h4>
          <VuEditor @VuEditorContent="VuEditorContent" :vueEditorId="vueEditorId"/>
        </div>

        <div class="col-6" :key="index" v-for="(comment, index) in comments">
          <CommentComponent :comment="comment" @deleteComment="getArticle"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import UserProfileHeading from '@/components/UserProfileHeading.vue'
import VuEditor from '@/components/VueEditor.vue'
import CommentComponent from '@/components/CommentComponent.vue'
import NewArticleEditor from '@/components/NewArticleEditor.vue'
import NewArticleUser from '@/components/NewArticleUser.vue'

export default {
  name: 'NewArticle',
  components: {
    VuEditor,
    CommentComponent,
    NewArticleEditor,
    NewArticleUser
  },
  data() {
    return {
      content: '',
      title: '',
      heading: '',
      image: '',
      vueEditorId: 'contentEditorSmall',
      htmlContentEditor: '',
      articleId: '',
      comments: [],
      editable: false,
      editSection: false,
      htmlContentEditorProps: '',
      headingProps: '',
      titleProps: '',
      editingState: true,
      isLogin: false
    }
  },
  methods: {
    getArticle() {
      axios({
        method: 'get',
        url: `http://localhost:4000/article/${this.$router.currentRoute.path.split('/')[2]}`
      })
        .then(result => {
          this.content = result.data.content
          this.heading = result.data.heading
          this.image = result.data.image
          this.title = result.data.title
          this.comments = result.data.comments
          this.articleId = result.data._id

          console.log(`thisarticleId: ${this.articleId}`)

          console.log(result.data.userId)
          console.log(localStorage.getItem('id'))

          result.data.userId === localStorage.getItem('id') ?
          this.editable = true :
          this.editable = false
        })
        .catch(err => console.log(err))
    },

    VuEditorContent(val) {
      this.htmlContentEditorProps = val
      console.log(this.htmlContentEditorProps)
    },

    publishComment() {
      const userId = localStorage.getItem('id'),
            articleId = this.$route.params.articleId

      axios({
        method: 'post',
        url: 'http://localhost:4000/comment',
        headers: {
          access_token: `bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          userId: userId,
          articleId: articleId,
          comment: this.htmlContentEditor,
          timestamp: new Date()
        }
      })
        .then(result => {
          this.getArticle()
        })
        .catch(err => console.log(err))
    },
    editSectionButtonTrigger() {
      console.log(`ini konten`, this.content)
      this.htmlContentEditorProps = this.content
      this.headingProps = this.heading
      this.titleProps = this.title
    },
    deleteArticle() {
      console.log(`ye masuk`)
      console.log(this.$route.params.articleId)
      axios.delete('http://localhost:4000/article/' + this.$route.params.articleId, (err, response) => {
        err ? console.log(`ini error`, err) : console.log(`ini response`, response)
      })
    }
  },
  mounted() {
    // pertama taro sini, kedua taro di watch
    console.log(this.$route.params.edit)
    this.$route.params.edit ? this.editSection = true : this.editSection = false
    this.getArticle()

    localStorage.getItem('id') === this.$route.params.userId ? editable = true : editable = false
    localStorage.getItem('id') ? this.isLogin = true : this.isLogin = false
  },
  watch: {
    '$route': function(n, o) {
      this.$route.params.edit ? this.editSection = true : this.editSection = false
    }
  }
};
</script>

<style>
.articlethumbnail {
  width: 100%;
}

#thumbnailimage {
  padding: 0;
}

.article-content {
  font-size: 1.2em;
  margin-top: 8%;
  margin-bottom: 5%;
}

.UserArticleDetail {
  margin-top: 3%;
}

.article-title {
  margin-bottom: 5%;
}

#newArticleHeader {
  margin-bottom: 2%;
}

.publish {
  margin-top: 20px;
  margin-bottom: 50px;
}

.edit-button {
  margin-top: 4%;
}
</style>