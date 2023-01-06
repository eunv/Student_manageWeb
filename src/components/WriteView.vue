<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">게시글</a>
        <button class="btn-outline-light-blue" @click="goBack">뒤로</button>
      </div>
    </nav>
    <div v-if="post.board != null">
      <h4>제목: {{ post.board.title }}</h4>
      <h4>내용: {{ post.board.content }}</h4>

    </div>

    <div v-if="owner">
      <button class="btn-outline-light-blue right" @click="goPostEdit(post.board.uid)">수정</button>
    </div>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'writeView',
  data() {
    return {
      fbCollection: 'student',
      id: this.$route.params.id,
      post: {},
      owner: false,
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      this.getData()
    },
    getData() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.id)
          .get()
          .then((snapshot) => {
            self.post = snapshot.data();
          })
      if (this.$store.state.user.uid === self.id) {
        self.owner = true
      }
    },
    goBack() {
      const self = this;
      self.$router.push('studentHome')
    },
    goPostEdit(value) {
      const self = this;
      self.$router.push({name:'postEdit', params:{id: value}})
    },
  },
}

</script>

<style>
.right {
  float: right;
  margin: 10px;
}

</style>