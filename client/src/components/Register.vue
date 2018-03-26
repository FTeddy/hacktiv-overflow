<template lang="html">
  <div class="has-text-left">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name..." v-model="userData.name">
      </div>
      <p class="help is-danger">{{warningName}}</p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email..." v-model="userData.email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
      <p class="help is-danger">{{warningEmail}}</p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password..." v-model="userData.password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        <p class="help is-danger">{{warningPassword}}</p>
      </p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" v-on:click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      userData: {
        name: '',
        email: '',
        password: ''
      },
      warningName: '',
      warningEmail: '',
      warningPassword: ''
    }
  },
  methods: {
    register () {
      let error = false
      let emailRegex = RegExp(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/)
      if (this.userData.name === '') {
        this.warningName = 'Please enter your name.'
        error = true
      } else {
        this.warningName = ''
      }
      if (!emailRegex.test(this.userData.email)) {
        this.warningEmail = 'Please enter your email.'
        error = true
      } else {
        this.warningEmail = ''
      }
      if (this.userData.password.length < 8) {
        this.warningPassword = 'Please enter at least 8 characters or longer.'
        error = true
      } else {
        this.warningPassword = ''
      }
      if (error !== true) {
        this.$emit('register', this.userData)
      }
    }
  }
}
</script>

<style lang="css">
</style>
