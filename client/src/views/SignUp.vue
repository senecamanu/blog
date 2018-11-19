<template>
  <div class="SignUp">
    <SignForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignForm from '@/components/SignForm.vue'

export default {
  name: 'SignUp',
  components: {
    SignForm
  },
};
</script>
