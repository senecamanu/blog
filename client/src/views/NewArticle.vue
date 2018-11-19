<template>
  <div class="NewArticle">
    <NewArticleUser
      :titleProps="titleProps" 
      :headingProps="headingProps" 
      :htmlContentEditorProps="htmlContentEditorProps"/>
    <NewArticleEditor />

    <!-- Button for submitting article -->
  </div>
</template>

<script>
// @ is an alias to /src
import NewArticleEditor from '@/components/NewArticleEditor.vue'
import NewArticleUser from '@/components/NewArticleUser.vue'

export default {
  name: 'NewArticle',
  components: {
    NewArticleEditor,
    NewArticleUser
  },
  data() {
    return {
      htmlContentEditorProps: '',
      headingProps: '',
      titleProps: '',
    }
  }
};
</script>