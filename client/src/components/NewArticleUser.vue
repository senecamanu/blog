<template>
  <div class="container" id="newArticle">
    <div class="row">
      <div class="col-4">
        <h4 class="text-left">
          {{ name }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      name: '',
      condition: '',
      route: ''
    }
  },

  methods: {
  },
  mounted() {
    this.name = localStorage.getItem('name')
    this.route = this.$router.currentRoute.path
    console.log(this.route)
  }
}
</script> 

<style>
#newArticle {
  margin-top: 40px;
  margin-bottom: 40px;
}
.pubish {
  margin-top: 20px;
}
</style>