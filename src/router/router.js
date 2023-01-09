import Vue from 'vue'
import Router from 'vue-router'
import {firebase} from "@/firebase/firebaseConfig";
import "firebase/auth";
import store from "../store";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/Login'),
    },
    {
      path: '/newPost',
      name: 'newPost',
      component: () => import('../components/NewPost'),
    },
    {
      path: '/postEdit',
      name: 'postEdit',
      component: () => import('../components/PostEdit'),
    },
    {
      path: '/postView',
      name: 'postView',
      component: () => import('../components/PostView.vue'),

    },
    {
      path: '/studentRegister',
      name: 'studentRegister',
      component: () => import('../components/StudentRegister'),

    },
    {
      path: '/teacherRegister',
      name: 'teacherRegister',
      component: () => import('../components/TeacherRegister'),

    },
    {
      path: '/studentHome',
      name: 'studentHome',
      component: () => import('../components/StudentHome'),

    },
    {
      path: '/teacherHome',
      name: 'teacherHome',
      component: () => import('../components/TeacherHome'),

    },
    {
      path: '/StudentPlus',
      name: 'StudentPlus',
      component: () => import('../components/StudentPlus.vue'),

    },
    {
      path: '/studentEdit',
      name: 'studentEdit',
      component: () => import('../components/StudentEdit'),

    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../components/Detail'),

    },
    {
      path: '/allStudent',
      name: 'allStudent',
      component: () => import('../components/AllStudent'),

    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../components/Edit'),

    },
    {
      path: '/classA',
      name: 'classA',
      component: () => import('../components/ClassA'),

    },
    {
      path: '/classB',
      name: 'classB',
      component: () => import('../components/ClassB'),

    },
    {
      path: '/classC',
      name: 'classC',
      component: () => import('../components/ClassC'),

    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home'),
    },
    // {
    //   path: '/',
    //   name: 'root',
    //   component: () => import('../views/Home'),
    // },

  ]
})

const makeTitle = (title) =>
    title ? `${title} | KoROM Database` : "KoROM Database";

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = makeTitle(to.meta.title);
  });
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(async (user) => {

    // let _isAdmin = '';
    // let _isMaster = '';

    await store.dispatch('getUser', user)
        .then(() => {
          if (user) {
            console.log(user)
            console.log('user', store.state.user)
            // _isAdmin = store.state.claims.isAdmin
            // console.log('isAdmin : ', _isAdmin)
            // _isMaster = store.state.claims.isMaster
            // console.log('isMaster : ', _isMaster)
          } else {
            console.log('없다.')
          }
        })


    const firebaseCurrentUser = firebase.auth().currentUser
    console.log(firebaseCurrentUser)


    if (store.state.firebaseLoaded)
      next()
  })
});


export default router

