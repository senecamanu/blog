<template>
  <div class="container commentcontainer">
    <div class="card text-left">
      <div class="card-body">
        
          <div class="row">
            <div class="col-6">
              <router-link :to="{ path: '/' + comment.userId._id }">
              <h6 class="card-title">
                {{ comment.userId.firstName }} {{ comment.userId.lastName }}
                <br>
                <small class="text-muted">{{ new Date(comment.timestamp).getDate() }}/{{ new Date(comment.timestamp).getMonth() }}/{{ new Date(comment.timestamp).getFullYear() }}</small>
              </h6>
              </router-link>
            </div>

            <div class="col-6">
              <button 
                v-if="comment.userId._id === userId"
                class="btn btn-outline-danger float-right"
                @click="deleteComment(comment._id)"
              >Delete</button>
            </div>
          </div>
        
        <p class="card-text">
          <span v-html="comment.comment"></span>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['comment'],
  data() {
    return {
      userId: ''
    }
  },
  methods: {
    deleteComment(val) {
      console.log(val)
      axios.delete(
        'http://localhost:4000/comment',
        { data: {id: val}}
      )
        .then(result => this.$emit('deleteComment'))
        .catch(err => console.log(err))
    }
  },
  mounted() {
    this.userId = localStorage.getItem('id')
  }
  
}
</script>

<style>
.commentcontainer {
  margin-bottom: 2%;
}
</style>
