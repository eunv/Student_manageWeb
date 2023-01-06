<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Student</a>
        <button class = "btn-outline-light-blue" @click="logout">로그아웃</button>
      </div>
    </nav>

    <table class = "table table-bordered">
      <tr>
        <th>글 번호</th>
        <th>반</th>
        <th>이름</th>
        <th>제목</th>
        <th>-</th>
      </tr>
      <tr v-for = "(author,i) in authors" :key="i">
        <td>{{i}}</td>
        <td>{{ author.class}}</td>
        <td>{{ author.name }}</td>
        <td>{{ author.board.title }}</td>
        <td>
          <button class = "btn-outline-dark">글보기</button>
        </td>


      </tr>
    </table>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name:'studentHome',
  components: {

  },
  data() {
    return {
      fbCollection: 'board',
      authors : [],
      posts : [],
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods:{
    init() {
      this.getPostlist()
      this.getDataList()
    },

    getPostlist() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id
              self.posts.push(_data);
            });
          })
    },
    getDataList() {
      const self = this;
      const db = firebase.firestore();
      db.collection("student")
          .where("board", "!=","")
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id
              self.authors.push(_data);
            });
          })

    },
      logout() {
        firebase.auth().signOut()
        this.$router.push('/')
      },
  },
}

</script>

<style>

</style>