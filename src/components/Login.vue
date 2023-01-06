<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Login</a>
      </div>
  </nav>

    <div>
      <h3><b>Login</b></h3>
      <div>
        Id :<input type="email" v-model="email"><br>
        PW :<input type="password" v-model="password"><br>
      </div>
      <div>
        <button class = "btn-outline-light-blue" @click="login">로그인</button><p> </p>
      </div>
      <div>
        <router-link to="/studentRegister">학생회원가입</router-link> <br>
        <router-link to="/teacherRegister">선생회원가입</router-link>
<!--        <button class = "btn-outline-light-blue" @click="studentSignUp">학생회원가입</button>-->
<!--        <button class = "btn-outline-light-blue" @click="teacherSignUp">선생님회원가입</button>-->
      </div>

    </div>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password:'',
    }
  },
  methods: {
    login() {
      const self = this;

      firebase.auth().signInWithEmailAndPassword(self.email, self.password)
          .then(() => {
            alert('로그인 완료')
            this.loginCheck()

          })
          .catch((error) => {
            alert(error)
          })
    },
    loginCheck(){
      if(this.$store.state.user != null){
        if( this.$store.state.user.displayName === '0'){
          this.$router.push('teacherHome')
        }else if(this.$store.state.user.displayName === '1'){
          this.$router.push('studentHome')
        }
      }
    },
    studentSignUp() {
      const self = this;
      self.$router.push('studentRegister')
    },
    teacherSignUp() {
      const self = this;
      self.$router.push('TeacherRegister')
    },
  }

}

</script>

<style>


</style>