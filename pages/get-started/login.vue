<template>
  <form class="form-container" @submit.prevent="login">
    <div class="form-input">
      <label for="email">Email</label>
      <input v-model="user.email" type="email" id="email" name="email" />
    </div>
    <div class="form-input">
      <label for="password">Password</label>
      <input v-model="user.password" type="password" id="password" name="password" />
    </div>

    <div class="form-actions form-login">
      <button type="submit">Login</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errorOccured: false,
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      if (this.user.email === '' || this.user.password === '') {
        this.errorOccured = true
        this.errorMessage = 'Please provide both email and password'
        this.$toast.open({
          type: 'error',
          message: this.errorMessage,
          position: 'top-right',
          duration: 1500
        })
        return false
      }
      const response = await this.$store.dispatch('login', this.user)
      if (response.data.error) {
        this.errorOccured = true
        this.errorMessage = response.data.message
        this.$toast.open({
          type: 'error',
          message: this.errorMessage,
          position: 'top-right',
          duration: 1500
        })
        return false
      } else {
        const { user, jwtToken } = response.data.payload
        this.$store.commit('setUser', { user, jwtToken })
        this.$toast.open({
          type: 'success',
          message: 'Login successful. Redirecting...',
          position: 'top-right',
          duration: 1500
        })

        setTimeout(() => {
          this.$router.push('/app')
        }, 1600)
      }
    }
  }
}
</script>
