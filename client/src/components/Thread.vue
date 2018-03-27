<template lang="html">
  <div class="thread-short">

    <!-- thread question title -->
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-left">
          <h1 class="title">
            {{thread.question}}
          </h1>
          <h2 class="subtitle">
            By {{thread.userId.name}}
          </h2>
        </div>
      </div>
    </section>

    <!-- thread desc -->
    <article class="media divider bordering">
      <figure class="media-left has-text-centered">
        <a class="level-item" v-on:click="voteUpThread(thread.threadVoteId)">
          <span class="icon is-small"><i class="fas fa-sort-up"></i></span>
        </a>
        {{voteThread}}
        <a class="level-item" v-on:click="voteDownThread(thread.threadVoteId)">
          <span class="icon is-small"><i class="fas fa-sort-down"></i></span>
        </a>
      </figure>
      <div class="media-content is-vertical-center">
        <div class="content">
          <p>
            {{thread.desc}}
          </p>
        </div>
      </div>
    </article>

    <!-- Answers -->
    <div class=" ml-1 divider" v-for="(answer, index) in answers" :key="index">

      <article class="media bordering">
        <figure class="media-left has-text-centered">
          <a class="level-item" v-on:click="voteUpAnswer(answer)">
            <span class="icon is-small"><i class="fas fa-sort-up"></i></span>
          </a>
          {{voteAnswer(answer)}}
          <a class="level-item" v-on:click="voteDownAnswer(answer)">
            <span class="icon is-small"><i class="fas fa-sort-down"></i></span>
          </a>
        </figure>
        <div class="media-content is-vertical-center">
          <div class="content">
            <p>
              {{answer.answer}}
            </p>
            <p>by {{answer.userId.name}}</p>
          </div>
        </div>
      </article>

    </div>
    <!-- new answer form -->
    <div class="container form-padding">

      <div class="">
        <div class="field">
          <label class="label">Answer question</label>
          <input v-model="newPost.answer" class="input" type="text" placeholder="Give your answer!">
        </div>
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <a class="button is-primary" v-on:click="newAnswer">
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
  name: 'Thread',
  data () {
    return {
      thread: {
        question: '',
        desc: '',
        userId: {
          name: ''
        },
        answerId: [],
        threadVoteId: []
      },
      newPost: {
        answer: ''
      },
      answers: ''
    }
  },
  created () {
    this.getThread()
    this.getAnswer()
  },
  computed: {
    ...mapState([
      'jwt', 'userId'
    ]),
    voteThread () {
      let total = 0
      this.thread.threadVoteId.forEach(vote => {
        total += vote.value
      })
      return total
    }
  },
  methods: {
    voteAnswer (answer) {
      let total = 0
      answer.answerVoteId.forEach(vote => {
        total += vote.value
      })
      // console.log(answer)
      // console.log(total)
      return total
    },
    getThread () {
      // console.log(this.$route.params.threadId)
      this.baseAxios.get(`thread/${this.$route.params.threadId}`)
        .then(serverRes => {
          this.thread = serverRes.data.thread
        })
    },
    getAnswer () {
      // console.log(this.$route.params.threadId)
      this.baseAxios.get(`answer/${this.$route.params.threadId}`)
        .then(serverRes => {
          this.answers = serverRes.data.answers
        })
    },
    newAnswer () {
      let answerData = {
        answer: this.newPost.answer
      }
      console.log(answerData)
      this.baseAxios.post(`answer/new/${this.$route.params.threadId}/${this.userId}`, answerData, {headers: {token: this.jwt}})
        .then(serverRes => {
          console.log(serverRes)
        })
    },
    voteUpThread (votes) {
      if (this.jwt === '') {
        return console.log('please log in')
      }
      console.log(votes)
      let ownVote = votes.filter(vote => vote.userId === this.userId)
      console.log(ownVote)

      if (ownVote.length > 0) {
        this.baseAxios.delete(`vote/thread/${this.$route.params.threadId}/${this.userId}`, {headers: {token: this.jwt}})
          .then(serverRes => {
            // console.log(serverRes)
            this.getThread()
          })
        return console.log('already voted')
      }

      this.baseAxios.post(`vote/thread/${this.$route.params.threadId}/${this.userId}/1`, {}, {headers: {token: this.jwt}})
        .then(serverRes => {
          // console.log(serverRes)
          this.getThread()
        })
    },
    voteDownThread (votes) {
      if (this.jwt === '') {
        return console.log('please log in')
      }
      let ownVote = votes.filter(vote => vote.userId === this.userId)

      if (ownVote.length > 0) {
        this.baseAxios.delete(`vote/thread/${this.$route.params.threadId}/${this.userId}`, {headers: {token: this.jwt}})
          .then(serverRes => {
            // console.log(serverRes)
            this.getThread()
          })
        return console.log('already voted')
      }

      this.baseAxios.post(`vote/thread/${this.$route.params.threadId}/${this.userId}/0`, {}, {headers: {token: this.jwt}})
        .then(serverRes => {
          // console.log(serverRes)
          this.getThread()
        })
    },
    voteUpAnswer (answer) {
      let answerId = answer._id
      let votes = answer.answerVoteId
      // let answerIndex = this.answers.findIndex(answer => answer._id === answerId)
      // console.log(this.answers[answerIndex].answerVoteId)
      // let answerVoteIndex = this.answers[answerIndex].answerVoteId.findIndex(vote => vote.userId === this.userId)
      // console.log(answerVoteIndex)
      if (this.jwt === '') {
        return console.log('please log in')
      }
      let ownVote = votes.filter(vote => vote.userId === this.userId)

      if (ownVote.length > 0) {
        this.baseAxios.delete(`vote/answer/${answerId}/${this.userId}`, {headers: {token: this.jwt}})
          .then(serverRes => {
            // console.log(serverRes)
            this.getAnswer()
            // this.answers[idx] = serverRes
            // this.answers[answerIndex].answerVoteId.splice(answerVoteIndex, 1, serverRes.data.threadVote)
          })
        return console.log('already voted')
      }

      this.baseAxios.post(`vote/answer/${answerId}/${this.userId}/1`, {}, {headers: {token: this.jwt}})
        .then(serverRes => {
          // console.log(serverRes)
          this.getAnswer()
        })
    },
    voteDownAnswer (answer) {
      let answerId = answer._id
      let votes = answer.answerVoteId
      if (this.jwt === '') {
        return console.log('please log in')
      }
      let ownVote = votes.filter(vote => vote.userId === this.userId)

      if (ownVote.length > 0) {
        this.baseAxios.delete(`vote/answer/${answerId}/${this.userId}`, {headers: {token: this.jwt}})
          .then(serverRes => {
            // console.log(serverRes)
            this.getAnswer()
          })
        return console.log('already voted')
      }

      this.baseAxios.post(`vote/answer/${answerId}/${this.userId}/0`, {}, {headers: {token: this.jwt}})
        .then(serverRes => {
          // console.log(serverRes)
          this.getAnswer()
        })
    }
  }
}
</script>

<style lang="css">
.thread-short {
  max-width: 600px;
  margin: 0 auto;
}
.is-vertical-center {
  height: 100%;
  margin: auto 0;
}
.ml-1 {
  margin-left: 2em;
}
.divider {
  margin-top: 1.5em;
}
.divider-b {
  margin-bottom: 1.5em;
}
.bordering {
  margin: 0 25px;
  padding: 15px;
  border: 2px solid #119fb5;
  border-radius: 5px;
}
.form-padding {
  margin: 1.5em 25px;
}
</style>
