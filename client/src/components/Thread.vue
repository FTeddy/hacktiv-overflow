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
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-sort-up"></i></span>
        </a>
        {{voteThread}}
        <a class="level-item">
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
    <div class="container ml-1 divider" v-for="(answer, index) in answers" :key="index">

      <article class="media bordering">
        <figure class="media-left has-text-centered">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-sort-up"></i></span>
          </a>
          {{answer.answerVoteId.length}}
          <a class="level-item">
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
    <div class="container divider divider-b">

      <div class="">
        <div class="field">
          <label class="label">Anwer question</label>
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
      return this.thread.threadVoteId.length
    }
  },
  methods: {
    getThread () {
      console.log(this.$route.params.threadId)
      this.baseAxios.get(`thread/${this.$route.params.threadId}`)
        .then(serverRes => {
          this.thread = serverRes.data.thread
        })
    },
    getAnswer () {
      console.log(this.$route.params.threadId)
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
</style>
