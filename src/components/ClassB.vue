<template>
  <div class="home">
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">class B</a>
        <router-link to="/teacherHome">Home</router-link>경
      </div>
    </nav>

    <table class = "table table-bordered">
      <tr>
        <th>class</th>
        <th>이름</th>
        <th>나이</th>
        <th>성별</th>
        <th>메일</th>
        <th>phone</th>

      </tr>
      <tr v-for = "row in rows" :key="row.id">
        <td>{{row.class}}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.age }}</td>
        <td>{{ row.gender }}</td>
        <td>{{ row.email }}</td>
        <td>{{ row.phone }}</td>
      </tr>
    </table>
    <p></p>

  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      fbCollection: 'users',
      rows : [],
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods : {
    init() {
      this.getDatalist()
    },

    getDatalist() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .where("class",'==','B')
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id
              self.rows.push(_data);
            });
          })
    },
    gotoHome() {
      // const self = this;
      this.$router.push({
        name: 'teacherHome',
        query: {
          username: this.username
        }
      }).catch();
    }


  },


}

</script>

<style>
home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*table {*/
/*  font-family: arial, sans-serif;*/
/*  border-collapse: collapse;*/
/*  width: 50%;*/
/*  margin : 100px;*/
/*}*/
/*td, th {*/
/*  border: 1px solid #dddddd;*/
/*  text-align: center;*/
/*  padding: 8px;*/
/*}*/

</style>