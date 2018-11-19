<template>
  <div class="container article-push">
    <div class="row">
      <div class="col-8 offset-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-left">{{ list.title }}</h5>
            <p class="card-text text-left">{{ list.heading }}</p>
          </div>

          <router-link :to="{ path: userId + '/' + list._id }">
            <a>
              <img class="card-img-top" :src="list.image" alt="Card image cap">
            </a>
          </router-link>

          <div class="row">
            <div class="col-6">
              <div class="card-body">
                <p class="card-text text-left">
                  <a href="#">
                    Share?
                  </a>
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="card-body">
                <p class="card-text text-right">
                  <a href="#" class="">
                    Save
                  </a>
                  <!-- ? Ga make sense dia bisa slap tapi belom baca. Palingan save aja -->
                  <!-- <a href="#">
                    Slap
                  </a> -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },

  props: ["list"],

  data() {
    return {
      userId: ''
    }
  },

  methods: {
  },

  mounted() {
    this.userId = this.list.userId
  }
}
</script> 

<style>
.article-push {
  margin-top: 40px;
}

.link-right {
  margin-right: 10%;
}
</style>