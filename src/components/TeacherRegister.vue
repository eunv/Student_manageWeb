<template>
  <div>
    <h4>회원가입</h4>
    메일 :<input type="text" v-model="curUser.email"><br>
    PW :<input type="password" v-model="curUser.pw"><br>
    <br><h4>회원정보</h4>
    phone :<input type="text" v-model="curUser.phone"><br>
    이름 :<input type="text" v-model="curUser.name"><br>
    나이 :<input type="text" v-model="curUser.age"><br>
    성별 :<input type="text" v-model="curUser.gender"><br>
    <button class = "btn-outline-light-blue" @click="regist">등록</button>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'singUp',
  data() {
    return {
      fbCollection: 'teacher',
      curUser: {
        pw: '',
        phone: '',
        name: '',
        age: '',
        gender: '',
        email: '',
      },
    }
  },
  methods: {

    regist() {
      const self = this;
      const db = firebase.firestore();
      firebase.auth().createUserWithEmailAndPassword(self.curUser.email, self.curUser.pw)
          .then((userCredential) => {
            alert('회원가입 완료')
            let user = userCredential.user

            const currentUser = {
              uid:userCredential.user.uid,
            }
            db.collection(self.fbCollection)
                .doc(currentUser.uid)
                .set({
                  level:'0',
                  email:self.curUser.email,
                  phone:self.curUser.phone,
                  name:self.curUser.name,
                  age:self.curUser.age,
                  gender:self.curUser.gender,
                })
            console.log(currentUser.uid)

            user.updateProfile({displayName: '0'})
            firebase.auth().signOut()
            self.$router.push('/')
          })
          .catch((error) => {
            alert(error)
          })


    },

  },

}

</script>

<style>


</style>