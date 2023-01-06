<template>
  <div class="home">
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">학생추가</a>
        <router-link to="/teacherHome">Home</router-link>
      </div>
    </nav>
    <div class= 'right'>
      <button class = "btn-outline-light-blue " @click="goA">뒤로</button>
    </div>

    <div>
      <table class = "table table-bordered">
        <tr>
          <th>-</th>
          <th>이름</th>
          <th>나이</th>
          <th>성별</th>
          <th>메일</th>
          <th>phone</th>
        </tr>

        <tr v-for = "row in rows" :key="row.id">
          <td>
            <button type="button" class="btn-outline-light-blue" @click = "gotoDetail(row.id)">Info</button>
          </td>
          <td>{{ row.name }}</td>
          <td>{{ row.age }}</td>
          <td>{{ row.gender }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.phone }}</td>
        </tr>
      </table>
    </div>

    <p></p>

  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'studentPlus',
  data() {
    return {
      fbCollection: 'student',
      rows : [],
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      this.getDatalist()
    },

    getDatalist() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .where("class",'==','')
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
    goA() {
      const self = this;
      self.$router.push({name: 'classA'})
    },
    gotoDetail(value) {
      const self = this;
      self.$router.push({name: 'detail', params:{id: value}})
    },
  },

}

</script>

<style>
.right {
  float: right;
  padding:8px;
}

</style>