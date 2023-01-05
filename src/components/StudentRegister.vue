<template>
  <div>
    <h4>회원가입</h4>
    메일 :<input type="text " v-model="curuser.email"><br>
    PW :<input type="text " v-model="curuser.pw"><br>
    <br><h4>회원정보</h4>
    phone :<input type="text " v-model="curuser.phone"><br>
    이름 :<input type="text " v-model="curuser.name"><br>
    나이 :<input type="text " v-model="curuser.age"><br>
    성별 :<input type="text " v-model="curuser.gender"><br>
    반  :<input type="text " v-model="curuser.class"><br>
    <button @click="regist">등록</button>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'singUp',
  data() {
    return {
      fbCollection: 'student',
      curuser: {
        pw: '',
        phone: '',
        name: '',
        age: '',
        gender: '',
        email: '',
        class: '',
      },
    }
  },
  methods: {

    regist() {
      const self = this;
      const db = firebase.firestore();
      firebase.auth().createUserWithEmailAndPassword(self.curuser.email, self.curuser.pw)
          .then((userCredential) => {
            alert('회원가입 완료')
            let user = userCredential.user

            const currentUser = {
              uid:userCredential.user.uid,
            }
            db.collection(self.fbCollection)
                .doc(currentUser.uid)
                .set({
                  level:'1',
                  email:self.curuser.email,
                  phone:self.curuser.phone,
                  name:self.curuser.name,
                  age:self.curuser.age,
                  gender:self.curuser.gender,
                  class:self.curuser.class,
                })
            console.log(currentUser.uid)

            user.updateProfile({displayName: '1'})
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