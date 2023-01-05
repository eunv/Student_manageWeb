<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Class</a>
        <!--        <a class="nav-link active" aria-current="page" href="#" @click = "goHome">학생정보조회</a>-->
      </div>
    </nav>


    <button type="button" class="btn btn-danger" @click = "goA">A</button>
    <button type="button" class="btn btn-primary" @click = "goB" >B</button>
    <button type="button" class="btn btn-mdb-color" @click = "goC">C</button>

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

    // goHome() {
    //   const self = this;
    //   self.$router.push({name: 'home'})
    // },
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

  },

}
</script>

<style>

</style>