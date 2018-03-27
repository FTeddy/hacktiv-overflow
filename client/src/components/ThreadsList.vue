<template lang="html">
  <div class="section">
    <div class="container">
      <!-- questions -->
      <div class="thread-short" v-for="(thread, index) in threads" :key="index">
        <article class="media">
          <figure class="media-left has-text-centered">
            <p class="level-item"></p>
            <p class="level-item">
              {{thread.threadVoteId.length}}
            </p>
            <p class="level-item">Votes</p>
          </figure>
          <div class="media-content is-vertical-center">
            <div class="content">
              <p>
                <strong>
                  <router-link :to="{ name: 'Thread', params: {threadId: thread._id} }" class="navbar-item">
                    {{thread.question}}
                  </router-link>
                </strong>
              </p>
            </div>

          </div>
          <div class="media-right">
            <p class="level-item"></p>
            <div class="level-item">
              {{thread.answerId.length}}
            </div>
            <div class="level-item">
              <p>Answers</p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="mb-1">

    </div>
    <div class="container">
      <div class="form-center">
        <div class="field">
          <label class="label">Question</label>
          <input v-model="newData.question" class="input" type="text" placeholder="Ask away!">
        </div>
        <div class="field">
          <label class="label">Description</label>
          <textarea v-model="newData.desc" class="textarea" placeholder="Describe your problem..."></textarea>
        </div>
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <a class="button is-primary" v-on:click="newThread">
              Submit
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'ThreadsList',
  data () {
    return {
      newData: {
        question: '',
        desc: ''
      },
      threads: ''
    }
  },
  created () {
    this.getThreads()
    this.localData()
  },
  computed: {
    ...mapState([
      'jwt', 'userId'
    ])
  },
  methods: {
    localData () {
      if (localStorage.getItem('jwttoken') === null) {
        return
      }
      let cred = {
        token: localStorage.getItem('jwttoken'),
        userId: localStorage.getItem('userId')
      }
      this.$store.dispatch('loginCredAct', cred)
    },
    newThread () {
      if (!localStorage.getItem('jwttoken')) {
        return this.$router.push({ path: `/` })
      } else {
        this.baseAxios.post(`thread/new/${this.userId}`, this.newData, {headers: {token: this.jwt}})
          .then(serverRes => {
            console.log(serverRes)
            this.getThreads()
          })
      }
    },
    getThreads () {
      this.baseAxios.get('thread/')
        .then(serverRes => {
          this.threads = serverRes.data.threads
        })
    },
    setCurrent (data) {
      this.$store.dispatch('threadCurrentAct', data)
    }
  }
}
</script>

<style lang="css">
.mb-1 {
  margin-bottom: 1em;
}
.form-center {
  max-width: 600px;
  margin: 0 auto;
}
.thread-short {
  max-width: 600px;
  margin: 0 auto;
}
.is-vertical-center {
  height: 100%;
  margin: auto 0;
}
</style>
