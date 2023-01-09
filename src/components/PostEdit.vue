<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">게시글 수정</a>
      </div>
    </nav>
    <div>제목: <input type="text" v-model="post.title"></div>
    <div>내용: <input type="text" v-model="post.content"></div>
    <button class="btn-outline-amber right" @click="goBack">취소</button>
    <button class="btn-outline-green right" @click="confirm">확인</button>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'postEdit',
  data() {
    return {
      fbCollection: 'board',
      id: this.$route.params.id,
      post : {
        title: '',
        content: '',
      },
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      const self = this;
      self.getData()
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
    },
    confirm() {
      const self = this;
      const db = firebase.firestore();

      const _data = {
        title: self.post.title,
        content: self.post.content
      }
      db.collection(self.fbCollection)
          .doc(self.id)
          .set(_data, {merge: true} )
          .then(() => {
            self.$router.push({name: 'writeView', params:{id: self.id}})
          })
    },
    goBack() {
      const self = this;
      self.$router.push({name:'writeView',params: {id:self.id}})
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