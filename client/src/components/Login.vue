<template>
  <div>
    <h1>Login</h1>
    <input type="email" name="email" placeholder="Email or Username" v-model="email">
    <input type="password" name="password" placeholder="Password" v-model="password">
    <button @click="register">Login</button>
    <div class="error" v-html="error"></div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
