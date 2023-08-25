<template>
  <div>
    <div class="container-fluid p-0 m-0">
      <div class="row g-0">
        <!-- left panel -->
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <!-- right form panel -->
        <div class="col-md-8 col-lg-6 signin-bg-image">
          <div class="signin d-flex align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="signin-heading mb-5">Sign In to Continue!</h3>
                  <!-- Sign In Form -->
                  <form>
                    <!-- user email -->
                    <div class="mb-3 input-field">
                      <label for="email">Email<span class="text-danger">*</span></label>
                      <input type="email" class="form-control" id="email" placeholder="john@gmail.com"
                        v-model.lazy="email" title="Please enter your correct email." required>
                    </div>
                    <!-- user password -->
                    <div class="input-field">
                      <label for="password">Password<span class="text-danger">*</span></label>
                      <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model.lazy="password" required>
                    </div>
                    <div class="signup-link mb-3">
                      <router-link tag="a" to="/signup">Don't have an account? Signup!</router-link>
                    </div>
                    <div class="d-grid">
                      <button class="btn btn-signin text-uppercase fw-bold" type="submit" @click="setLoginUser">
                        Sign in
                      </button>
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
      email: "",
      password: "",
      isValid: false,
    }
  },

  computed: {
    // check if the email is valid or not i.e. if the account already exists or not
    validEmail() {
      this.isValid = false;
      this.getAllUsers.forEach(element => {
        if (element.email === this.email)
          this.isValid = true
      });

      return this.isValid ? true : false;
    },
    // check if the password is valid or not of the existing user
    validPassword() {
      this.isValid = false;

      this.getAllUsers.forEach(element => {
        if (element.email === this.email && element.password === this.password)
          this.isValid = true
      });
      return this.isValid ? true : false;
    },
    // get all users array from vuex state
    ...mapGetters([
      'getAllUsers',
    ])
  },

  methods: {
    // login the user on the click of the sign in button
    setLoginUser() {
      // check if the fields are empty or not
      if (!this.email || !this.password) {
        alert("Empty field(s). ");
        return;
      }
      // check for the valid email
      if (!this.validEmail) {
        alert("Account does not exist. Please enter a valid email.");
        return;
      }
      // check if the password is correct or not
      else if (!this.validPassword) {
        alert("Password Incorrect. Try again.");
        return;
      }
      // if fields are correct than let the user signin 
      else {
        // if the email exists in the signed up user array than check its password and let it sign in
        this.getAllUsers.forEach(element => {
          if (element.email === this.email && element.password === this.password) {
            const user = {
              name: element.name,
              email: element.email,
              password: element.password
            }
            // if user exists set the signed in user object and than dispatch the data and set in db
            this.isValid = true;
            this.$store.dispatch('setSigninUser', user);
            this.$store.dispatch('sendSigninUserData', user);
          }
        });
        // if fields are correct route to dashboard
        if (this.isValid)
          this.$router.push('/dashboard');
        // else dont route and return 
        else
          return;
      }
    }
  },
}
</script>

<!-- style tag scoped -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.signin {
  min-height: 100vh;
}

/* left panel */
/* background image*/
.bg-image {
  background-image: url("../assets/side-image-panel.jpg");
  background-size: cover;
  background-position: center;
}

/* right panel */
/* form input fields focus */
.form-control:focus {
  border-color: #f3d2a0ab;
  box-shadow: 0 0 0.5rem 0.0625rem #fedaa3ab;
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
.signin-heading {
  font-size: 2rem;
  font-weight: 700;
  color: #0C134F;
}

/* signup link */
.signup-link {
  text-align: right;
}

.signup-link>a {
  font-size: 0.6875rem;
  text-decoration: none;
  color: #0C134F;
}

.signup-link>a:hover {
  text-decoration: underline;
}

/* sign in button */
.btn-signin {
  color: white;
  background-image: linear-gradient(to right, #FF5858, #f7a223);
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 3.125rem;
}

.btn-signin:hover {
  color: white;
  box-shadow: 0 0 0.1875rem 0.0625rem #b1b0b0b7;
}

/* media queries */
@media screen and (max-width: 770px) {
  .signin-bg-image {
    background-image: url("../assets/side-image-panel.jpg");
    background-size: cover;
    background-position: center;
    width: 100%;
  }

  .signin-heading {
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

  input::placeholder {
    color: white !important;
  }

  label,
  input {
    color: white !important;
  }
}
</style>