import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import signup from "@/components/signup.vue";
import signin from "@/components/signin.vue";
import register from "@/components/registration.vue";
import dashboard from "@/components/Dashboard/dashboard.vue";
import users from "@/components/Dashboard/users.vue";
import profile from "@/components/Dashboard/profile.vue";
import student from "@/components/Dashboard/student.vue";
import teacher from "@/components/Dashboard/teacher.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);

/*
get all signed up users arrray from state and check whether users exists or not. 
if users dont exist dont let them route to to somewhere else
*/

const signupNavGuard = (to, from, next) => {
  const allUsers = store.getters.getAllUsers;

  if (Array.isArray(allUsers) && allUsers.length > 0) {
    next();
  } else {
    next("/signup");
  }
};

/*
get signed in user object from state and check whether someone has logged in or not. 
if signed in user dont exist dont let them route to somewhere else
 */
const signinNavGuard = (to, from, next) => {
  const signinUser = store.getters.getSigninUser;
  
  if (Object.keys(signinUser).length !== 0) {
    next();
  } else {
    next("/signin");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },
  {
    path: "/signin",
    name: "signin",
    component: signin,
    beforeEnter: signupNavGuard,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    beforeEnter: signinNavGuard,
    children: [
      {
        path: "/users",
        name: "users",
        component: users,
        beforeEnter: signinNavGuard,
      },
      {
        path: "/profile",
        name: "profile",
        component: profile,
        beforeEnter: signinNavGuard,
      },
      {
        path: "/student",
        name: "student",
        component: student,
        beforeEnter: signinNavGuard,
      },
      {
        path: "/teacher",
        name: "teacher",
        component: teacher,
        beforeEnter: signinNavGuard,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;



