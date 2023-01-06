<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">학적사항 조회</a>
      </div>
    </nav>
    <h5> id: {{id}}</h5>
    <h5> 이름 : {{student.name}} </h5>
    <h5> 나이 : {{student.age}} </h5>
    <h5> 성별 : {{student.gender}} </h5>
    <h5> email : {{student.email}} </h5>
    <h5> phone : {{student.phone}} </h5>
    <h5> class: {{student.class}} </h5>

    <button type="button" class="btn btn-danger" @click = 'delInfo'>삭제</button>
    <button type="button" class="btn btn-primary" @click = 'goEdit'>수정</button>
    <button type="button" class="btn btn-mdb-color" @click = 'goBack'>닫기</button>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'detail',
  data() {
    return {
      fbCollection: 'student',
      id: this.$route.params.id,
      student: {},
    }
  },
  mounted() {
    const self = this;
    self.init();
  },

  methods : {

    init() {
      const self = this;
      self.getData();
    },
    getData() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.id)
          .get()
          .then((snapshot) => {
            self.student = snapshot.data();
          })
    },
    delInfo() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.id)
          .delete()
          .then(() => {
            self.$router.push('/allStudent')
          })

    },

    goBack() {
      const self = this;
      self.$router.push({name: 'allStudent'})
    },
    goEdit() {
      const self = this;
      self.$router.push({name: 'edit', params:{id: self.id}})
    },


  },

}
</script>

<style>

</style>