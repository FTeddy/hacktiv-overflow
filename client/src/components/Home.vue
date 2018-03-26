<template lang="html">
  <div class="">
    <section class="hero is-medium is-bold is-light">
      <div class="hero-body">
        <div v-show="jwt === ''" class="container login-box has-text-centered">
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
              <div class="level-item">
                <button class="button is-info" v-on:click="postModal">Register</button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="jwt !== ''" class="container">
          <button class="button" v-on:click="logout">Logout</button>
        </div>
      </div>
    </section>

    <div :class="registerClass">
      <div class="modal-background" v-on:click="postModalOff"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Registration</p>
          <button class="delete" aria-label="close" v-on:click="postModalOff"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <Register @register="submitRegist"></Register>
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-on:click="postModalOff">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Register from '@/components/Register'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    Register
  },
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      },
      registerClass: 'modal',
      registStatus: ''
    }
  },
  computed: {
    ...mapState([
      'jwt', 'userId'
    ])
  },
  methods: {
    postModal () {
      this.registerClass = 'modal is-active'
    },
    postModalOff () {
      this.registerClass = 'modal'
    },
    login () {
      this.baseAxios.post('users/signin', this.loginData)
        .then(serverRes => {
          console.log(serverRes)
          const cred = serverRes.data
          this.$store.dispatch('loginCredAct', cred)
          this.resetFields()
        })
    },
    logout () {
      const cred = {
        token: '',
        userId: ''
      }
      this.$store.dispatch('loginCredAct', cred)
      this.resetFields()
    },
    submitRegist (payload) {
      console.log(payload)
      this.postModalOff()
      this.baseAxios.post('users/signup', payload)
        .then(serverRes => {
          console.log(serverRes)
          // this.registStatus = serverRes.
        })
    },
    resetFields () {
      this.loginData.email = ''
      this.loginData.password = ''
    }
  }
}
</script>

<style lang="css">
.login-box {
  max-width: 500px;
}
</style>
