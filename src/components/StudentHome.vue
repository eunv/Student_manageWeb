<template>
<div>
  <h2>Hi student</h2>
  <button @click="logout">로그아웃</button>
</div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name:'studentHome',
  methods:{
      logout() {
        firebase.auth().signOut()
        this.$router.push('/')
      },
  },
}

</script>

<style>

</style>