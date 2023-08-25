<template>
  <div>
    <div class="container-fluid p-0 m-0">
      <div class="row g-0 m-0">
        <!-- right form panel - registration form-->
        <div class="col-sm-12 col-12 col-md-12 col-lg-6 register-bg-image">
          <div class="register d-flex align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-8 mx-lg-auto mx-md-2">
                  <h3 class="register-heading mb-2">Register now!</h3>

                  <!-- REGISTRATION FORM -->
                  <form>
                    <!-- <h6 class="section-heading">User Name</h6>
                    <hr> -->
                    <!-- user name -->
                    <div class="row mb-3">
                      <!-- first name -->
                      <div class="col-lg-6 input-field">
                        <label for="first-name">First name<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="first-name" placeholder="Enter your first name"
                          v-model.lazy="firstName" title="Please enter only your first name." required />
                      </div>
                      <!-- last name -->
                      <div class="col-lg-6 input-field">
                        <label for="last-name">Last Name<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="last-name" placeholder="Enter your last name"
                          v-model.lazy="lastName" title="Please enter only your last name." required>
                      </div>
                    </div>
                    <!-- <h6 class="section-heading">Contact Info</h6>
                    <hr> -->
                    <!-- user contact info -->
                    <div class="row mb-3">
                      <!-- email fields -->
                      <div class="col-lg-6 input-field">
                        <label for="email">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" placeholder="student@gmail.com"
                          v-model.lazy="email" title="Please enter correct email." required>
                      </div>
                      <!-- phone number field -->
                      <div class="col-lg-6 input-field">
                        <label for="phone-number">Phone Number<span class="text-danger">*</span></label>
                        <input type="phone-number" class="form-control" id="phone-number" placeholder="xxxx-xxxxxxx"
                          v-model.lazy="phoneNumber" title="Please enter correct phone number." required>
                      </div>
                    </div>

                    <!-- user personal details -->
                    <div class="row mb-3">
                      <!-- age -->
                      <div class="col-lg-3 input-field">
                        <label for="age">Age<span class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="age" name="age" min="15" max="70" placeholder="Age"
                          v-model.lazy="age" required>
                      </div>
                      <!-- date of birth -->
                      <div class="col-lg-4 input-field">
                        <label for="dob">Date Of Birth<span class="text-danger">*</span></label>
                        <input type="date" id="dob" name="dob" class="form-control" v-model.lazy="dob" required>
                      </div>
                      <!-- gender -->
                      <div class="col-lg-5 input-field">
                        <label for="gender">Gender<span class="text-danger">*</span></label>
                        <select id="gender" name="gender" class="form-control" v-model.lazy="gender" required>
                          <option id="select-gender" disabled selected value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <!-- address, cnic, education -->
                    <div class="row mb-3">
                      <!-- address -->
                      <div class="col-lg-4 input-field">
                        <label for="address">Address<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="address" placeholder="123-A, town"
                          v-model.lazy="address" title="Please enter your address." required>
                      </div>
                      <!-- CNIC -->
                      <div class="col-lg-4 input-field">
                        <label for="cnic">CNIC<span class="text-danger">*</span></label>
                        <input type="cnic" class="form-control" id="cnic" placeholder="xxxxx-xxxxxxx-x"
                          v-model.lazy="cnic" title="Please enter correct phone number." required>
                      </div>
                      <!-- education -->
                      <div class="col-lg-4 input-field">
                        <label for="education">Education<span class="text-danger">*</span></label>
                        <select id="education" name="education" class="form-control" v-model.lazy="education" required>
                          <option id="select-education" disabled selected value="">Your education</option>
                          <option value="Primary">Primary</option>
                          <option value="Secondary">Secondary</option>
                          <option value="Bachelor's">Bachelor's</option>
                        </select>
                      </div>
                    </div>

                    <!-- files - cover letter, CV -->
                    <div class="input-field mb-4">
                      <label for="user-cv">CV<span class="text-danger">*</span></label>
                      <input type="file" class="form-control-file" id="user-cv" @change="checkFileExtension('cv')"
                        ref="fileInputCV">
                    </div>

                    <!-- register submit button -->
                    <div class="d-grid mb-2">
                      <button class="btn btn-register text-uppercase fw-bold" type="button" @click="registerUser">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- left image panel -->
        <div class="right-panel d-none d-md-flex col-lg-6  bg-image">
          <div class="my-auto">
            <h3 class="left-panel-heading">Get a chance to unlock opportunities!</h3>
            <p class="left-panel-content">By registering, you're taking the first step towards harnessing this power.
              Whether you're here to connect
              with like-minded professionals, explore new career prospects, or collaborate on innovative projects,
              our platform is designed to cater to your needs.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // fields
      firstName: '',
      lastName: '',
      email: '',
      education: '',
      phoneNumber: '',
      age: '',
      cnic: '',
      gender: '',
      dob: '',
      address: '',
      cv: '',
      // validity flag
      invalidField: false,
    }
  },
  computed: {
    validFirstName() {
      const namePattern = /^[a-zA-Z]+$/;
      return namePattern.test(this.firstName);
    },
    validLastName() {
      const namePattern = /^[a-zA-Z]+$/;
      return namePattern.test(this.lastName);
    },
    validEmail() {
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailPattern.test(this.email);
    },
    validPhoneNumber() {
      const phonePattern = /^0\d{10}$/;
      return phonePattern.test(this.phoneNumber);
    },
    validCNIC() {
      const cnicPattern = /^\d{13}$/;
      return cnicPattern.test(this.cnic);
    },

  },
  methods: {
    registerUser() {
      // check if fields are empty or not
      if (!this.firstName || !this.lastName || !this.email || !this.education ||
        !this.phoneNumber || !this.age || !this.cnic || !this.gender || !this.dob || !this.address) {
        alert("Empty field(s).");
        this.invalidField = true;
        return;
      }
      // check if the field are valid or not
      if (!this.validFirstName || !this.validLastName || !this.validEmail || !this.validPhoneNumber || !this.validCNIC) {
        alert("Invalid field(s).");
        this.invalidField = true;
        return;
      }
      // password short or not
      else if (this.isPasswordShort) {
        alert("Password too short. Please enter again.");
        this.invalidField = true;
        return;
      }
      // if no invalid fields are present then send data 
      if (!this.invalidField) {
        this.sendRegisterUser();
      }
    },

    checkFileExtension(inputType) {
      // max size of 2 MB
      const maxFileSize = 2 * (1024) * (1024);
      this.cv = this.$refs.fileInputCV.files[0];

      if (this.cv) {
        const fileExtension = this.cv.name.split('.').pop().toLowerCase();
        if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'pdf') {
          if (this.cv.size >= maxFileSize) {
            alert('File should be less than 2 MB.');
          }
        }
        else {
          alert('Invalid file format. Please upload a .jpg, .png, .jpeg, .pdf file.');
        }
      }
    },
    sendRegisterUser() {
      // convert string to integer
      const userAge = Number(this.age);
      const userCNIC = Number(this.cnic);
      const userPhoneNo = Number(this.phoneNumber);

      // formData object and append values to send through API
      const formData = new FormData();

      formData.append('firstName', this.firstName);
      formData.append('lastName', this.lastName);
      formData.append('email', this.email);
      formData.append('education', this.education);
      formData.append('phoneNo', userPhoneNo);
      formData.append('age', userAge);
      formData.append('cinc', userCNIC);
      formData.append('gender', this.gender);
      formData.append('DOB', this.dob);
      formData.append('address', this.address);
      formData.append('cv', this.cv);

      // send registration data through API
      axios
        .post('http://192.168.11.213:3000/registration/register-user', formData)
        .then((response) => {
          console.log('Response:', response);
        })
        .catch((error) => {
          console.error('Error Received:', error);
        });
        alert("Congrats! You have been registered.");
    }
  },
}
</script>

<style scoped>
/* margin padding of all elements */
* {
  padding: 0;
  margin: 0;
}

/* height of all form content */
.register {
  min-height: 100vh;
}

/* left panel */
/* Register heading at the top */
.register-heading {
  font-size: 2rem;
  font-weight: 700;
  color: #0C134F;
}

.section-heading {
  text-align: left;
  font-size: 0.8rem;
  color: gray;
}

/* form input fields box styling */
.form-control:focus {
  border-color: #f5cb8cab;
  box-shadow: 0 0 0.3125rem 0.1rem #f3d2a0ab;
}

.form-control:hover {
  border-color: #f3d2a0ab;
  box-shadow: 0 0 0.3125rem 0.0125rem #f3d2a0ab;
}

/* input fields styling */
/* text align */
.input-field {
  text-align: left;
}

/* input labels */
.input-field>label {
  color: #0C134F;
  font-weight: bold;
  font-size: 0.9rem;
}

.input-field>input::placeholder {
  font-size: 12px;
}

/* age input field */
#age:hover {
  cursor: pointer;
}

#gender:hover {
  cursor: pointer;
}

#select-gender {
  font-size: 12px !important;
}

#select-education {
  font-size: 12px !important;
}

.form-control-file {
  background-color: white !important;
}

/* register button */
/* button styling */
.btn-register {
  color: white;
  background-image: linear-gradient(to right, #FF5858, #f7a223);
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 3.125rem;
}

.btn-register:hover {
  color: white;
  box-shadow: 0 0 0.2rem 0.09rem #f7603eab;
}


/* the right panel of the form containing picture and content */
/* background image */
.bg-image {
  background-image: url("../assets/side-image-panel.jpg");
  background-size: cover;
  background-position: center;
}

/* right panel formatting */
.right-panel {
  text-align: start;
  color: white;

  >p {
    font-size: 0.8rem;
  }
}

/* flex box */
.d-md-flex {
  padding-left: 5rem;
  padding-right: 5rem;
  /* padding: 10% 5% 0 5%; */
  display: flex !important;
  flex-direction: column;
}

.left-panel-heading,
.left-panel-content {
  font-family: cursive;
}

.left-panel-content {
  font-family: Verdana, Geneva, sans-serif;
}

/* media queries */
@media screen and (max-width: 770px) {
  .right-panel {
    display: none !important;
  }

  .right-panel * {
    display: none !important;
  }

  .register-heading {
    font-size: 1.4rem;
  }

  .d-md-flex {
    padding-left: 0;
    padding-right: 0;
  }
}</style>