<template>
  <div>
    <div>제목: <input type="text" v-model="post.title"></div>
    <div>내용: <input type="text" v-model="post.content"></div>
    <button class="btn-outline-amber right" @click="goBack">취소</button>
    <button class="btn-outline-green right" @click="confirm">게시</button>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'newPost',
  data() {
    return {
      fbCollection: 'board',
      studentInfo: {},
      post : {
        title: '',
        content: '',
        uid: '',
        student: {
          age: '',
          class: '',
          email: '',
          gender: '',
          level: '',
          name: '',
          phone: '',
        },
      }
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
      db.collection("student")
          .doc(this.$store.state.user.uid)
          .get()
          .then((snapshot) => {
            self.studentInfo = snapshot.data();
          })
    },
    confirm() {
      const self = this;
      const db = firebase.firestore();

      const _data = {
        title: self.post.title,
        content: self.post.content,
        uid: this.$store.state.user.uid,
        student: {
          age: self.studentInfo.age,
          class: self.studentInfo.class,
          email: self.studentInfo.email,
          gender: self.studentInfo.gender,
          level: self.studentInfo.level,
          name: self.studentInfo.name,
          phone: self.studentInfo.phone,
        }
      }
      db.collection(self.fbCollection)
          .doc()
          .set(_data, {merge: true} )
          .then(() => {
            self.$router.push('/studentHome')
          })
    },
    goBack() {
      const self = this;
      self.$router.push('/studentHome')
    },
  }


}
</script>

<style>

</style>