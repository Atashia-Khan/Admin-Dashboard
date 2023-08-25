<template>
  <div>
    <div id="sidebar-toggle" :class="['sidebar', 'w3-bar-block', { 'sidebar_small': isSidebarSmall }]">
      <button class="toggle-button" @click="toggleSidebar">
        <!-- ✥ ☰ -->
        <span class="menu-icon">✥</span>
      </button>
      <h3 id="menu-heading" class="w3-bar-item text-uppercase">Menu</h3>

      <div class="navigation" v-for="(item, index) in navigationItems" :key="index">
        <router-link tag="a" :to="item.path" class="nav-items w3-bar-item" style="width:100%">
          <i class="nav-icon" :class="item.icon"></i>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </div>

      <!-- sign out button -->
      <div class="me-2">
        <a class="signout-btn w3-bar-item" @click="signOut">
          Sign Out
          <i class="fa-solid fa-right-from-bracket ms-1"></i>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  data() {
    return {
      isSidebarSmall: false,
      navigationItems: [
        {
          path: "/users",
          name: "users",
          label: "Users",
          icon: "fas fa-users",
        },
        {
          path: "/profile",
          name: "profile",
          label: "Profile",
          icon: "fa-regular fa-id-card",
        },
        {
          path: "/student",
          name: "student",
          label: "Student",
          icon: "fas fa-graduation-cap",
        },
        {
          path: "/teacher",
          name: "teacher",
          label: "Teacher",
          icon: "fas fa-chalkboard-teacher",
        }
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarSmall = !this.isSidebarSmall;
    },
    signOut() {
      this.$store.dispatch('signoutUser');
      this.$store.dispatch('clearChatHistory');
      this.$router.push('/signin');
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 25%;
  color: white;
  transition: 1s ease;
  background-image: url("@/assets/side-image-panel.jpg");
  background-size: cover;
  background-position: center;
}

.sidebar_small {
  width: 10%;
}

button {
  display: none;
  position: absolute;
  border: none;
  height: 3rem;
  width: 3rem;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, .3);
  left: 90%;
  top: 2rem;
  transform: translateX(-50%);
  cursor: pointer;
}

#menu-heading {
  padding: 0.6rem 0.2rem;
  text-align: left !important;
  font-size: 2rem;
  font-weight: 600;
  color: white;
  border-bottom: 1px solid white;
}

.navigation {
  background-color: #164080c3;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  border-radius: 1rem;
}

.navigation:hover {
  background-color: #2658a2c3;
}

.navigation:active {
  background-color: #2658a2c3;
}

.nav-items {
  color: white;
  text-decoration: none;
  margin: 0.6rem 0 !important;
  text-align: left !important;
}

.nav-label {
  font-weight: 400;
  font-size: 1.2rem;
  vertical-align: middle !important;
  margin-left: 1rem !important;
}

.nav-icon {
  width: 1rem;
  font-size: larger;
  margin-left: 1.2rem;
  text-align: left !important;
  vertical-align: middle;
}

/* sign out button */


.signout-btn {
  cursor: pointer;
  text-decoration: none;
  background-color: #0C134F;
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 5rem;
  /* position: fixed; */
  /* bottom: 0; */
  /* left: 12rem; */
  width: 32%;
  float: right;
  text-align: center;
  margin-top: 90%;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 0.4rem 0.0625rem #0c27f2;
  font-weight: bold;
}


.signout-btn:hover {
  background-color: #101865;
  box-shadow: 0 0 0.5rem 0.0625rem #0c27f2;
}

/* media queries */
@media screen and (max-width: 770px) {
  .sidebar {
    width: 0%;
    background-image: none !important;

    .navigation,
    #menu-heading {
      overflow: hidden;
    }
  }

  .sidebar_small {
    background-image: none !important;
    background-color: #081932 !important;
    width: 40%;
    box-shadow: 0px 1px 6px 5px rgba(0, 0, 0, .3);
  }

  .navigation:first-child {
    margin-top: 5rem !important;
  }

  .navigation {
    background-color: transparent;
  }

  .nav-icon {
    margin-left: 0.3rem;
  }

  #menu-heading {
    font-size: 12px;
  }

  button {
    background-color: #081932 !important;
    color: white;
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    transform: rotate(-45deg);
  }

  button>.menu-icon {
    transform: rotate(45deg) !important;
    vertical-align: middle;
  }
  .signout-btn{
    width: 90%;
    box-shadow: none;
    margin-top: 90%;
  }
}
</style>
