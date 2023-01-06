<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">게시글 수정</a>
      </div>
    </nav>

    <button class="btn-outline-amber right" @click="goBack(post.board.uid)">취소</button>
    <button class="btn-outline-green right" @click="confirm(post.board.uid)">확인</button>

    <div>제목: <input type="text" v-model="post.title"></div>
    <div>제목: <input type="text" v-model="post.content"></div>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'postEdit',
  data() {
    return {
      fbCollection: 'student',
      id: this.$route.params.id,
      post : {},
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
    },
    confirm() {
      const self = this;
      const db = firebase.firestore();

      const _data = {
        name: self.student.name,
        gender: self.student.gender,
        phone: self.student.phone,
        age: self.student.age,
        class: self.student.class
      }
      db.collection(self.fbCollection)
          .doc(self.id)
          .set(_data, {merge: true} )
          .then(() => {
            self.$router.push({name: 'detail', params:{id: self.id}})
          })
      db.collection("board")
          .where("uid","==","self.id")
          .get()
          .then(() =>{

          })
    },
    goBack(value) {
      const self = this;
      self.$router.push({name:'writeView',params: {id:value}})
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