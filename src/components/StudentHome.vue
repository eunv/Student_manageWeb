<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Student</a>
        <!--        <form class="d-flex" role="search">-->
        <input type="text" v-model="searchKeyword" placeholder="Search" aria-label="Search">
        <button class="btn-outline-green" @click="search">Search</button>
        <!--        </form>-->
        <button class="btn-outline-light-blue" @click="logout">로그아웃</button>
      </div>
    </nav>
    {{ searchKeyword }}
    <table class="table table-bordered">
      <tr>
        <th>글 번호</th>
        <th>반</th>
        <th>이름</th>
        <th>제목</th>
        <th>-</th>
      </tr>
      <tr v-for="(post,i) in posts" :key="i">
        <td>{{ i+1 }}</td>
        <td>{{ post.student.class }}</td>
        <td>{{ post.student.name }}</td>
        <td>{{ post.title }}</td>
        <td>
          <button class="btn-outline-dark" @click="seePost(post.id)">글보기</button>
        </td>
      </tr>
    </table>
    <button class="btn-outline-dark" @click="createPost">글 작성</button>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'studentHome',
  components: {},
  data() {
    return {
      fbCollection: 'board',
      authors: [],
      posts: [],
      searchKeyword: '',
      // pageNum: 0,
      // pageSize:5,
    }
  },
  // computed: {
  //   pageCount() {
  //     const listLeng = this.listArray.length;
  //     const listSize = this.pageSize;
  //     let page = Math.floor(listLeng / listSize);
  //     if (listLeng % listSize > 0) page += 1;
  //
  //     return page;
  //   },
  //
  //   paginatedData() {
  //     const start = this.pageNum * this.pageSize;
  //     const end = start + this.pageSize;
  //     return this.posts.slice(start, end);
  //   },
  // },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      this.getPostList()

    },
    // 페이지네이션 구현 페이지 넘기는 함수
    // nextPage() {
    //   this.pageNum += 1;
    // },
    // prevPage() {
    //   this.pageNum -= 1;
    // },
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

</style>