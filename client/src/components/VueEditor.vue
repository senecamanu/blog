<template>
  <vue-editor 
    :id="vueEditorId" 
    :editorToolbar="contentToolbar" 
    v-model="htmlContentEditorProps"
  >
  </vue-editor>  
  <!-- <vue-editor id="contentEditor" :editorToolbar="contentToolbar" v-model="htmlContentEditor"></vue-editor>   -->
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'VuEditor',
  props: ['vueEditorId', 'title', 'heading', 'content', 'htmlContentEditorProps'],
  components: {
    VueEditor
  },
  data() {
    return  {
      htmlContentEditor: '',
      contentToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['image', 'code-block']
      ]
    }
  },
  watch: {
    htmlContentEditor(n, o) {
      n ? this.$emit('VuEditorContent', n) : null
    }
  },
  mounted() {
    console.log(this.title)
    console.log(this.heading)
    console.log(this.content)
  }
}
</script>

<style>
#contentEditor {
  height: 60vh;
  margin-bottom: 50px;
}

#contentEditorSmall {
  height: 15vh;
  margin-bottom: 50px;
}
</style>
