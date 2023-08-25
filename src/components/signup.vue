<template>
  <div>
    <div class="container-fluid p-0 m-0">
      <div class="row g-0">
        <!-- left image panel -->
        <div class="left-panel d-none d-md-flex col-md-4 col-lg-6 bg-image">
        </div>
        <!-- right form panel -->
        <div class="col-md-8 col-lg-6 signup-bg-image">
          <div class="signup d-flex align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="signup-heading mb-5">Create an account!</h3>
                  <!-- Sign Up Form -->
                  <form>
                    <!-- user name -->
                    <div class="mb-3 input-field">
                      <label for="name">Name<span class="text-danger">*</span></label>
                      <input type="name" class="form-control" id="name" placeholder="Enter first name (or first and second name)"
                        v-model.lazy="name" title="Please enter your correct name." required>
                    </div>
                    <!-- user email -->
                    <div class="mb-3 input-field">
                      <label for="email">Email<span class="text-danger">*</span></label>
                      <input type="email" class="form-control" id="email" placeholder="john@gmail.com"
                        v-model.lazy="email" title="Please enter your correct email." required>
                    </div>
                    <!-- user password -->
                    <div class="mb-3 input-field">
                      <label for="password">Password<span class="text-danger">*</span></label>
                      <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model.lazy="password" required>
                    </div>
                    <!-- confirm password -->
                    <div class="input-field">
                      <label for="confirm-password">Confirm Password<span class="text-danger">*</span></label>
                      <input type="password" class="form-control" id="confirm-password"
                        placeholder="Confirm your password" v-model.lazy="confirmPassword" required>
                    </div>
                    <div class="signin-link mb-3">
                      <router-link tag="a" to="/signin">Already have an account? Signin!</router-link>
                    </div>
                    <div class="d-grid">
                      <button class="btn btn-signup text-uppercase fw-bold" type="button" @click="setSignedupUsers">
                        Sign up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      // firstName: '',
      // lastName: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      invalidField: false,
    }
  },
  computed: {
    validName() {
      const namePattern = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
      return namePattern.test(this.name);
    },
    validEmail() {
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailPattern.test(this.email);
    },
    isPasswordShort() {
      return (this.password.length < 8) ? true : false;
    },
    isPasswordConfirmed() {
      return (this.password === this.confirmPassword) ? true : false;
    },
    ...mapGetters([
      'getAllUsers',
    ])
  },

  methods: {
    setSignedupUsers() {
      // check if the fields are empty or not
      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        alert("Empty field(s).");
        this.invalidField = true;
        return;
      }
      // check for any invalid field
      if (!this.validName || !this.validEmail) {
        alert("Invalid field(s).");
        this.invalidField = true;
        return;
      }
      // check if the password is of the desired length
      if (this.isPasswordShort) {
        alert("Password too short. Please enter again.");
        this.invalidField = true;
        return;
      }
      // check if both the passwords are correct or not
      if (!this.isPasswordConfirmed) {
        alert("Confirm password does not match your password.");
        return;
      }
      // if all checks are true than make the user object
      else {
        // create the user that is signing up
        let user = {
          // firstName: this.firstName,
          // lastName: this.lastName,
          name: this.name,
          email: this.email,
          password: this.password
        };
        // check if the account of the email already exists or not in the signed up users array
        this.getAllUsers.forEach(item => {
          // if email exists return from the loop and set invalid field to true
          if (item.email === this.email) {
            alert("Account already exists. Please sign in.");
            this.invalidField = true;
            return;
          }
        });
        // if no invalid field exists then dispatch the user and set the data in db
        if (!this.invalidField) {
          this.$store.dispatch('setUsersData', user);
          this.$store.dispatch('sendUsersData', user);
        }
        else
          return;
      }
      if (this.invalidField)
        return;
      // push to sign in page if the user is created
      else {
        alert("Account Created!");
        this.$router.push('/signin');
      }
    },
  },
};
</script>

<!-- scoped styling -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.signup {
  min-height: 100vh;
}

/* left panel */
.d-md-flex {
  padding: 10% 5% 0 5%;
  display: flex !important;
  flex-direction: column;
}

.left-panel {
  text-align: start;
  color: white;

  >p {
    font-size: 0.8rem;
  }
}

/* background image*/
.bg-image {
  background-image: url("../assets/side-image-panel.jpg");
  background-size: cover;
  background-position: center;
}

/* right panel */
/* form input fields focus */
.form-control:focus {
  border-color: #f5cb8cab;
  box-shadow: 0 0 0.3125rem 0.1rem #f3d2a0ab;
}

.form-control:hover {
  border-color: #f3d2a0ab;
  box-shadow: 0 0 0.3125rem 0.0125rem #f3d2a0ab;
}

.input-field {
  text-align: left;
}

.input-field>label {
  color: #0C134F;
  font-weight: bold;
  font-size: 14px;
}

.input-field>input::placeholder {
  font-size: 12px;
}

/* sign in heading at the top */
.signup-heading {
  font-size: 2rem;
  font-weight: 700;
  color: #0C134F;
}

/* signup link */
.signin-link {
  text-align: right;
}

.signin-link>a {
  font-size: 0.6875rem;
  text-decoration: none;
  color: #0C134F;
}

.signin-link>a:hover {
  text-decoration: underline;
}

/* sign in button */
.btn-signup {
  color: white;
  background-image: linear-gradient(to right, #FF5858, #f7a223);
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 3.125rem;
}

.btn-signup:hover {
  color: white;
  box-shadow: 0 0 0.1875rem 0.0625rem #b1b0b0b7;
}

/* media queries */
@media screen and (max-width: 770px) {
  .signup-bg-image {
    background-image: url("../assets/side-image-panel.jpg");
    background-size: cover;
    background-position: center;
    opacity: 0.9;
    width: 100%;
  }

  .signup-heading {
    font-size: 2.3rem;
    color: white;
  }

  .form-control {
    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid white;
  }

  .form-control:focus {
    background-color: transparent;
    box-shadow: none;
  }

  label,
  input {
    color: white !important;
  }
  input::placeholder {
    color: white !important;
  }

  .input-fields label[data-v-56bbef28] {
    background-color: transparent;
    color: #0C134F;
  }

  .left-panel {
    display: none !important;
  }
}
</style>
  