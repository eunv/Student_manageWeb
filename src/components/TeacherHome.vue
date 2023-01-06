<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Teacher</a>
        <button class = "btn-outline-light-blue" @click="logout">로그아웃</button>
        <!--        <a class="nav-link active" aria-current="page" href="#" @click = "goHome">학생정보조회</a>-->
      </div>
    </nav>


    <button type="button" class="btn btn-danger" @click = "goA">A</button>
    <button type="button" class="btn btn-primary" @click = "goB" >B</button>
    <button type="button" class="btn btn-mdb-color" @click = "goC">C</button>
    <button type="button" class="btn btn-mdb-color" @click = "AllStudent">전체학생조회</button>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'detail',
  data() {
    return {
      fbCollection: 'users',
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
    logout() {
      firebase.auth().signOut()
      this.$router.push('/')
    },
    goA() {
      const self = this;
      self.$router.push({name: 'classA'})

    },
    goB() {
      const self = this;
      self.$router.push({name: 'classB'})

    },
    goC() {
      const self = this;
      self.$router.push({name: 'classC'})

    },
    AllStudent() {
      const self = this;
      self.$router.push({name: 'allStudent'})
    }

  },

}
</script>

<style>

</style>