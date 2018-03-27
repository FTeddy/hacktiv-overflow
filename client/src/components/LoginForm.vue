<template lang="html">
  <div class="">
    <div class="hero-body">
      <div class="container login-box has-text-centered">
        <h1 class="title">Hacktiv-Overfl0w</h1>
        <p class="subtitle">Please Login</p>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="loginData.email" class="input" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="loginData.password" class="input" type="password" placeholder="Password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="field">
                <p class="control">
                  <button class="button is-success" v-on:click="login">
                    Login
                  </button>
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
export default {
  name: 'LoginForm',
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {

    }
  }
}
</script>

<style lang="css">
</style>
