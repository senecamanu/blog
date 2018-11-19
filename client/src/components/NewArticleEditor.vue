<template>
  <div class="container">
    <h4 class="text-left" id="newArticleHeader">New article,
      <small class="text-muted">go tell the world your story.</small>
      <br>
      <button type="button" class="btn btn-outline-primary publish" @click="publishArticle">Publish</button>
    </h4>

    <form>
      <div class="form-group">
        <input class="form-control form-control-lg" type="text" placeholder="Title" v-model="titleProps">
      </div>
      <div class="form-group">
        <input class="form-control form-control-lg" type="text" placeholder="Heading" v-model="headingProps">
      </div>
      <div class="form-group">
        <input type="file" class="form-control-file" id="exampleFormControlFile1" ref="newArticleImage">
      </div>
    </form>
    <!-- <vue-editor id="contentEditor" :editorToolbar="contentToolbar" v-model="htmlContentEditor"></vue-editor> -->
    <VuEditor :htmlContentEditorProps="htmlContentEditorProps" @VuEditorContent="VuEditorContent" :vueEditorId="vueEditorId"/>
  </div>
</template>

<script>
// import { VueEditor } from 'vue2-editor';
import VuEditor from '@/components/VueEditor.vue';
import axios from 'axios';
import Router from 'vue-router';

export default {
  props: ['titleProps', 'headingProps', 'htmlContentEditorProps', 'editingState'],
  components: {
    VuEditor
  },

  data() {
    return {
      title: '',
      heading: '',
      htmlContentEditor: '',
      vueEditorId: 'contentEditor'
      }
  },
  methods: {
    publishArticle() {
      if (this.editingState) {
        // console.log(Boolean(this.$refs.newArticleImage.files[0]))
        if (!this.$refs.newArticleImage.files[0]) {
          // console.log(this.$route.params.articleId)
          axios({
              method: 'put',
              url: 'http://localhost:4000/article/' + this.$route.params.articleId,
              headers: {
                access_token: `bearer ${localStorage.getItem('access_token')}`
              },
              data: {
                title: this.titleProps,
                heading: this.headingProps,
                content: this.htmlContentEditorProps
              }
            })
              .then(data => console.log(data))
              .catch(err => console.log(err))
        } else {
          let formData = new FormData()
            formData.append("image", this.$refs.newArticleImage.files[0]);
      
            const thisThis = this
      
            axios.post('http://coffea-upload.senecamanu.com/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(result => {
                const imageLink = result.data.link
      
                axios({
                  method: 'put',
                  url: 'http://localhost:4000/article/' + this.$route.params.articleId,
                  headers: {
                    access_token: `bearer ${localStorage.getItem('access_token')}`
                  },
                  data: {
                    title: this.titleProps,
                    heading: this.headingProps,
                    content: this.htmlContentEditorProps,
                    image: imageLink
                  }
                })
                  .then(data => console.log(data))
                  .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
        }
      } else {
        console.log(`ini konten dari artikel langsung:`, this.htmlContentEditorProps)
        let formData = new FormData()
        formData.append("image", this.$refs.newArticleImage.files[0]);
  
        const thisThis = this
  
        axios.post('http://coffea-upload.senecamanu.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(result => {
            const imageLink = result.data.link
  
            console.log(`ini data-data yang dikirim ke luar`)

            axios({
              method: 'post',
              url: 'http://localhost:4000/article',
              headers: {
                access_token: `bearer ${localStorage.getItem('access_token')}`
              },
              data: {
                title: this.titleProps,
                heading: this.headingProps,
                content: this.htmlContentEditorProps,
                image: imageLink,
                comments: [],
                slaps: [],
                createdAt: new Date()
              }
            })
              .then(data => console.log(data))
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      }
    },

    VuEditorContent(val) {
      this.htmlContentEditorProps = val
      console.log(`ini isinya`, this.htmlContentEditorProps)
    }
  },
  watch: {
  },
  mounted() {
    if (localStorage.getItem('access_token') === null) {
      this.$router.push('/')
    } else {
    }

    this.title = this.titleProps
    this.heading = this.headingProps
    this.htmlContentEditor = this.htmlContentEditorProps
  }
}
</script> 

<style>
#titleEditor {
  height: 50px;
  margin-bottom: 14%;
}

#contentEditor {
  height: 60vh;
  margin-bottom: 50px;
}

#newArticleHeader {
  margin-bottom: 2%;
}

.publish {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>