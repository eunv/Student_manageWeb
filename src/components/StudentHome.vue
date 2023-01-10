<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Student</a>
        <div>
          <input type="text" v-model="searchKeyword" placeholder="Search" aria-label="Search">
          <button class="btn-outline-green" @click="search">Search</button>
        </div>
        <button class="btn-outline-light-blue" @click="logout">로그아웃</button>
      </div>
    </nav>
    <paginatedList :posts="posts"></paginatedList>
<!--    <table class="table table-bordered">-->
<!--      <tr>-->
<!--        <th>글 번호</th>-->
<!--        <th>반</th>-->
<!--        <th>이름</th>-->
<!--        <th>제목</th>-->
<!--        <th>-</th>-->
<!--      </tr>-->
<!--      <tr v-for="(post,i) in posts" :key="i">-->
<!--        <td>{{ i+1 }}</td>-->
<!--        <td>{{ post.student.class }}</td>-->
<!--        <td>{{ post.student.name }}</td>-->
<!--        <td>{{ post.title }}</td>-->
<!--        <td>-->
<!--          <button class="btn-outline-dark" @click="seePost(post.id)">글보기</button>-->
<!--        </td>-->
<!--      </tr>-->
<!--    </table>-->
    <button class="btn-outline-mdb-color right" @click="createPost">글 작성</button>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";
import PaginatedList from "@/components/PaginatedList.vue";

export default {
  name: 'studentHome',
  components: {
    PaginatedList
  },
  data() {
    return {
      fbCollection: 'board',
      authors: [],
      posts: [],
      searchKeyword: '',
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      this.getPostList()

    },
    getPostList() {
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
              self.posts.push(_data)
            });
          })
    },
    search() {
      const self = this;
      self.posts.splice(0)
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .where("title", "==", self.searchKeyword)
          .get()
          .then((querySnapshot) => {
            if(self.searchKeyword == ""){
              self.getPostList()
            }
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id
              self.posts.push(_data)

            });
          })
    },
    seePost(value) {
      const self = this
      self.$router.push({name: 'postView', params: {id: value}})
    },
    createPost() {
      const self = this;
      self.$router.push('/newPost')
    },
    logout() {
      firebase.auth().signOut()
      this.$router.push('/')
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