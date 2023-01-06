<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Student</a>
        <button class = "btn-outline-light-blue" @click="logout">로그아웃</button>
        <!--        <a class="nav-link active" aria-current="page" href="#" @click = "goHome">학생정보조회</a>-->
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
      <tr v-for = "(row,i) in rows" :key="row.id">
        <td>{{i}}</td>
        <td>{{ row.class}}</td>
        <td>{{ row.name }}</td>
        <td>{{ posts.title }}</td>
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
      rows : [],
      posts : [],
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods:{
    init() {
      this.getDatalist()
    },

    getDatalist() {
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
      logout() {
        firebase.auth().signOut()
        this.$router.push('/')
      },
  },
}

</script>

<style>

</style>