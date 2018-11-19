<template>
  <div class="SignIn">
    <SignForm @isloginform="isloginsignin"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignForm from '@/components/SignForm.vue'

export default {
  name: 'SignIn',
  components: {
    SignForm
  },
  methods: {
    isloginsignin() {
      this.$emit('isloginsignin')
    }
  }
};
</script>
