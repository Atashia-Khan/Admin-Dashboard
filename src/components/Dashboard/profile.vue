<template>
  <div>
    <section class="m-0 g-0">
      <div class="container-fluid">
        <div class="user-header-bar">
          <h4 class="user-name-header">Welcome, {{ getSigninUser.name }}!</h4>
        </div>
        <hr>

        <!-- user's detail cards -->
        <div id="row-1" class="row">
          <!-- user intro and about me card  -->
          <div class="col-lg-4 col-sm-12 col-12">
            <div class="card">
              <div id="image-card" class="card-body text-center">
                <img src="@/assets/avatar.png" alt="avatar" class="img-fluid w-75">
                <h4 class="my-3">{{ getSigninUser.name }}</h4>
                <p class="text-muted mb-1">Full Stack Developer</p>
              </div>
            </div>
            <div class="card">
              <div id="user-details" class="card-body">
                <div class="row">
                  <div class="col-lg-6 col-sm-6 col-6">
                    <h6 class="mb-0 fw-bold">Name</h6>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-6">
                    <p class="text-muted mb-0">{{ getSigninUser.name }}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-lg-6 col-sm-6 col-6">
                    <h6 class="mb-0 fw-bold">Email</h6>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-6">
                    <p class="text-muted mb-0">{{ getSigninUser.email }}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-lg-6 col-sm-6 col-6">
                    <h6 class="mb-0 fw-bold">Password</h6>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-6">
                    <p class="text-muted mb-0">{{ getSigninUser.password }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- user details, skills, edit cards -->
          <div class="col-lg-8 col-sm-12 col-12">
            <div class="card">
              <div id="about-me" class="card-body p-0">
                <h4 class="content-heading">About Me</h4>
                <p class="about-me-content">
                  I'm a passionate Full Stack Developer who loves to turn ideas into reality through code.
                  My journey in the world of software engineering has been driven by an insatiable curiosity
                  to create meaningful solutions that address real-world challenges. With a keen eye for detail
                  and a penchant for problem-solving, I find joy in crafting both the frontend and backend
                  components of applications, weaving them into cohesive and user-friendly experiences.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="card mb-md-0">
                  <div class="user-skills card-body">
                    <h4 class="content-heading">Technical Skills</h4>
                    <div>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">HTML/CSS</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Vue.js</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">SQL</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Python</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Ruby on Rails</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Node.js</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">React</button>
                    </div>
                    <hr>
                    <h4 class="content-heading">Soft Skills</h4>
                    <div class="mb-1">
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Adaptability</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Leadership</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Creativity</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Problem-Solving</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Critical Thinking</button>
                      <button type="button" class="btn btn-small btn-outline-dark m-1">Teamwork</button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="edit-user-details-column" class="col-md-6">
                <div id="edit-user-details" class="card mb-0">
                  <div class="card-body">
                    <h4 class="content-heading">Edit Profile Info</h4>
                    <div>
                      <input type="text" v-model.lazy="editFirstName" placeholder="First name">
                      <input type="text" v-model.lazy="editLastName" placeholder="Last name">
                      <input type="password" v-model.lazy="oldPassword" placeholder="Old Password">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <input type="password" v-model.lazy="newPassword" placeholder="New Password">
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <input type="password" v-model.lazy="confirmPassword" placeholder="Confirm Password">
                        </div>
                      </div>
                      <button type="submit" class="edit-btn btn btn-small btn-outline-dark m-1"
                        @click="editUserInfo">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      editFirstName: '',
      editLastName: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  computed: {
    validFirstName() {
      const namePattern = /^[a-zA-Z]+$/;
      return namePattern.test(this.editFirstName);
    },
    validLastName() {
      const namePattern = /^[a-zA-Z]+$/;
      return namePattern.test(this.editLastName);
    },
    isOldPassword() {
      return this.newPassword === this.getSigninUser.password;
    },
    isNewPassword() {
      return this.newPassword.length >= 8;
    },
    isConfirmPassword() {
      return this.confirmPassword === this.newPassword;
    },
    ...mapGetters([
      'getAllUsers',
    ]),
    ...mapGetters([
      'getSigninUser',
    ]),
  },

  methods: {
    editUserInfo() {
      if (!this.validFirstName || !this.validLastName) {
        alert("Invalid field(s).");
      } else if (this.isNewPassword && !this.isOldPassword && this.isConfirmPassword) {
        const updatedLoginUser = {
          firstName: this.editFirstName,
          lastName: this.editLastName,
          email: this.getSigninUser.email,
          password: this.newPassword,
        }
        // dispatch the login user and update in all users array
        this.getAllUsers.forEach((element, index) => {
          if (element.email === this.getSigninUser.email)
            this.$store.dispatch('updateUsers', {
              index: index,
              updatedLoginUser: updatedLoginUser
            });
        });

        this.$store.dispatch('setSigninUser', updatedLoginUser);
        alert("Password changed successfully.");
      }
      else if (this.isOldPassword) {
        alert("Old password cannot be your new password...")
      }
      else if (!this.isConfirmPassword) {
        alert("Confirm password incorrect...")
      }
    },
  },
}
</script>

<style scoped>
* {
  background-color: #f6f6f7;
  color: #0C134F !important;
}

.user-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: context-menu;
}

.user-name-header {
  color: #0C134F !important;
  text-align: left !important;
  padding-top: 0.5rem;
  cursor: context-menu;
}

/* sign out button */
#btn-signout {
  font-weight: 700;
  width: 12%;
  border-radius: 1rem;
  color: #0C134F !important;
  border: 1px solid #6c75cd;
  background-color: #fb9d9d;
  box-shadow: 0 0 0.4rem 0.0625rem #aed1fe;
  padding: 0.3rem 0.5rem;
}

#btn-signout:hover {
  background-color: #fab8b8;
  border: 1px solid #fe2f2f;
  box-shadow: 0 0 0.4rem 0.0625rem #fa7373;
}

.content-heading {
  text-align: left;
  font-weight: bold;
}

/* CARD */
.card-body {
  border-radius: 20px;
}

.card {
  margin-bottom: 1rem !important;
  border-radius: 20px;
  border: 1px solid #aed1fe;
  box-shadow: 0 0 0.4rem 0.0625rem #aed1fe;
}

/* profile image card */
#image-card,
#image-card>* {
  background-color: #fb9d9d;
}

/* user details */
#user-details,
#user-details * {
  color: #0C134F !important;
  background-color: #fccba5;
}

#user-details {
  >div>div>h5 {
    text-align: left;
  }
}

/* about me card */
#about-me {
  color: #0C134F !important;
  padding: 1rem !important;
}

.about-me-content {
  text-align: left;
  font-size: 14px;
}

#about-me,
#about-me>* {
  color: #0C134F !important;
  background-color: #f8de90;
}

.user-skills,
.user-skills * {
  text-align: left;
  background-color: #aec3fe;
}

.user-skills>div>button {
  border-radius: 15px;
  font-size: 12px;
  padding: 0.2rem 0.5rem;
  cursor: context-menu;

}

.user-skills>div>button:hover {
  background-color: transparent;
  cursor: context-menu;
}

/* edit input fields */
#edit-user-details,
#edit-user-details * {
  background-color: #F5EAEA;
}

#edit-user-details>div>div>input {
  width: 100%;
  border-radius: 0.8rem;
  border: 1px solid #6c75cd;
  margin: 0.38rem 0;
  padding: 0.5rem 0.5rem;
}



#edit-user-details > div > div > input:hover {
  box-shadow: 0 0 0.4rem 0.0625rem #f8b9da;
}

#edit-user-details > div > div > input:focus {
  box-shadow: 0 0 0.4rem 0.0625rem #fba6d2;
  outline: none;
}
/* style the new and confirm password */
#edit-user-details>div>div>div>div>input {
  width: 100%;
  border-radius: 0.8rem;
  border: 1px solid #6c75cd;
  margin: 0.38rem 0;
  padding: 0.5rem 0.5rem;
}
#edit-user-details>div>div>div>div>input:hover {
  box-shadow: 0 0 0.4rem 0.0625rem #f8b9da;
}

#edit-user-details>div>div>div>div>input:focus {
  box-shadow: 0 0 0.4rem 0.0625rem #fba6d2;
  outline: none;
}
/* style the edit button */
#edit-user-details > div > div > button {
  width: 23%;
  float: right;
  border-radius: 1.5rem;
  border: 1px solid #6c75cd;
  background-color: #fb9d9d;
  padding: 0.32rem 0.7rem;
}

#edit-user-details > div > div > button:hover {
  opacity: 0.9;
}


/* media queries */
@media screen and (max-width: 770px) {
  #btn-signout {
    font-size: 8px;
    width: 18%;
  }

  #image-card {
    > img {
      width: 20% !important;
    }

    > h4 {
      font-size: 2rem !important;
    }

    > p {
      font-size: 1rem !important;
    }
  }

  #about-me {
    > h4 {
      font-size: 1.4rem !important;
    }

    > p {
      font-size: 0.9rem !important;
    }
  }

  #user-details {

    > div > div > h6 {
      font-size: 1.3rem !important;
    }

    > div > div > p {
      font-size: 1rem !important;
    }
  }

  .user-skills {
    >.content-heading {
      font-size: 1.3rem !important;
    }

    > div > button {
      font-size: 0.8rem !important;
    }

  }

  #edit-user-details>div {
    > h4 {
      font-size: 1.3rem !important;

    }

    > div > button {
      width: 40% !important;
      font-size: 14px !important;
    }

    > div > input::placeholder {
      font-size: 10px !important;
    }
  }
}
</style>