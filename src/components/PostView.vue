<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">게시글</a>
        <button class="btn-outline-light-blue" @click="goBack">뒤로</button>
      </div>
    </nav>
    <div>
      <h4>제목: {{ post.title }}</h4>
      <h4>내용: {{ post.content }}</h4>
<!--      {{replies}}-->
    </div>

    <div v-if="owner">
      <button class="btn-outline-light-blue right" @click="goPostEdit">수정</button>
    </div>

    <table class="table table-bordered">
      <tr>
        <th>작성자</th>
        <th>댓글</th>
<!--        <th>작성 시간</th>-->
      </tr>
      <tr v-for="(reply,i) in replies" :key="i">
        <td>{{reply.student.name}}</td>
        <td>{{reply.content}}</td>
<!--        <td>{{reply.time}}</td>-->
      </tr>
    </table>

    <form class="form-group fixed-bottom">
      <div>
        <label>댓글 작성</label>
        <textarea class="form-control" v-model="comment" id="comment-content" rows="3"></textarea>
      </div>
      <button type="button" class="btn btn-primary" id="comment-create-btn" @click="createReply">작성</button>
    </form>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'writeView',
  data() {
    return {
      fbCollection: 'board',
      id: this.$route.params.id,
      studentInfo: {},
      post: [],
      owner: false,
      replies: [],
      comment: '',
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      this.getData()
      this.getReplyList()
      this.getLoginData()
    },
    getReplyList() {
      const self = this;
      const db = firebase.firestore();
      db.collection("reply")
          .where("board_id","==",self.id)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id
              self.replies.push(_data)
              // let myTimeDate = new Date(replie.time.seconds *1000)
              // console.log(myTimeDate)
            });

          })
    },
    createReply() {
      const self = this;
      const db = firebase.firestore();
      const now = new Date();
      const _data = {
        board_id: self.id,
        content: self.comment,
        reply_uid: this.$store.state.user.uid,
        time: now,
        student: {
          age: self.studentInfo.age,
          class: self.studentInfo.class,
          email: self.studentInfo.email,
          gender: self.studentInfo.gender,
          level: self.studentInfo.level,
          name: self.studentInfo.name,
          phone: self.studentInfo.phone,
        }
        // time:
      }
      db.collection("reply")
          .doc()
          .set(_data, {merge: true} )
          .then(() => {
            alert("댓글작성 완료!")
            self.$router.push('/studentHome')
          })
    },
    getData() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.id)
          .get()
          .then((snapshot) => {
            self.post = snapshot.data();
            if (this.$store.state.user.uid === self.post.uid) {
              self.owner = true
            }
          })
    },
    getLoginData() {
      const self = this;
      const db = firebase.firestore();
      db.collection("student")
          .doc(this.$store.state.user.uid)
          .get()
          .then((snapshot) => {
            self.studentInfo = snapshot.data();
          })
    },

    goBack() {
      const self = this;
      self.$router.push('studentHome')
    },
    goPostEdit() {
      const self = this;
      self.$router.push({name:'postEdit', params:{id: self.id}})
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