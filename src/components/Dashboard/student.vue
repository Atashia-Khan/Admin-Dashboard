<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h2 class="student-header">Admin Page</h2>
        <div class="navbar-collapse">
          <!-- filter by approved / disapproved -->
          <select class="filter-by form-select me-2" v-model.lazy="filterBy" @change="filterStatus()" required>
            <option id="select-education" disabled selected value="">Filter</option>
            <option value="true">Approved</option>
            <option value="false">Disapproved</option>
          </select>
          <!-- order by ascending / descending -->
          <select class="order-by form-select me-2" v-model.lazy="orderBy" @change="orderItemsBy()" required>
            <option id="select-education" disabled selected value="">Order</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
          <form class="d-flex">
            <input class="form-control search-input" type="search" v-model.lazy="searchData" placeholder="Search..."
              @click="searchItem()">
            <button class="btn btn-outline-info search-button ms-1" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>

    <div v-if="loadingData" class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <table v-if="!loadingData" class="table mx-auto mt-3">
      <thead class="table-header table-light">
        <tr>
          <th class="table-header" scope="col">Name</th>
          <th class="table-header" scope="col">Email</th>
          <th class="table-header" scope="col">Education</th>
          <th class="table-header" scope="col">CNIC</th>
          <th class="table-header" scope="col">Status</th>
          <th class="table-header" scope="col">Download</th>
          <th class="table-header" scope="col">Approval</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="table-items">{{ item.firstName + " " + item.lastName }}</td>
          <td class="table-items">{{ item.email }}</td>
          <td class="table-items">{{ item.Education }}</td>
          <td class="table-items">{{ item.CINC }}</td>
          <!-- approval status of the user -->
          <td class="table-items">
            <div v-if="item.approved === true">
              Approved
            </div>
            <div v-else-if="item.approved === false">
              Disapproved
            </div>
            <div v-else>
              Pending...
            </div>
          </td>
          <!-- download cv field -->
          <td class="table-items">
            <div v-if="downloadingCV" v-bind:style="{ cursor: 'pointer' }">
              <button type="button" class="btn download-btn">
                <i class="fa-solid fa-download"></i>
                <!-- <i class="fa-solid fa-spinner fa-spin-pulse"></i> -->
              </button>
            </div>
            <div v-else-if="!downloadingCV">
              <button type="button" class="btn download-btn" @click="download(item)">
                <i class="fa-solid fa-download"></i>
                <!-- <i class="fa-solid fa-spinner fa-spin-pulse"></i> -->
              </button>
            </div>
          </td>
          <!-- approval toggle button (approve/disapprove) -->
          <td class="table-items">
            <label class="switch">
              <div v-if="item.approved === true">
                <input type="checkbox" @click="changeStatus(item, 0)" checked>
                <span :class="{ 'slider': true, 'green-slider slider round': item.approved === true }"></span>
              </div>
              <div v-if="item.approved === null">
                <input type="checkbox" @click="changeStatus(item, 1)">
                <span class="slider round"></span>
              </div>
              <div v-if="item.approved === false">
                <input type="checkbox" @click="changeStatus(item, 1)">
                <span :class="{ 'slider': true, 'slider round': item.approved === false }"></span>
              </div>

              <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Are you sure?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save</button>
                    </div>
                  </div>
                </div>
              </div> -->
            </label>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination -->
    <div class="pagination mx-auto">
      <div v-for="(pages, index) in pageList" :key="index">
        <span><a href="#" @click="incremenetPage(pages)">{{ pages }}</a></span>
      </div>
    </div>
  </div>
</div></template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      orderBy: '',
      pageNo: 1,
      pageList: [],
      totalPagesCount: 0,
      searchData: '',
      loadingData: true,
      downloadingCV: false,
      filterBy: '',
    };
  },

  mounted() {
    setTimeout(() => {
      this.loadingData = !this.loadingData;
      this.fetchData();
    }, 2000);
  },

  watch: {
    pageNo(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchData();
      }
    },
    searchData(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.searchItem();
      }
    },
  },

  methods: {
    async fetchData() {
      await axios
        .get(`http://192.168.11.213:3000/registration/get-all-user?page=${this.pageNo}`)
        .then((response) => {
          this.items = response.data.getall;
          this.totalPagesCount = response.data.totalPages;
          if (!this.pageList.length)
            this.totalPageList();
        })
        .catch(error => console.log("Something went wrong while fetching data. Error: ", error));
    },
    // increments the page number
    incremenetPage(pageNumber) {
      this.pageNo = pageNumber;
    },
    // change approval (approve/disapprove)
    async changeStatus(userID, status) {
      const param = {
        id: userID.id,
        approved: status,
      };
      await axios
        .put('http://192.168.11.213:3000/registration/update-users', param)
        .then((response) => {
          console.log("Status changed: ", response);
          this.fetchData();
        })
        .catch(error => console.log("Something went wrong while changing status. Error: ", error));
      if (status === 1)
        alert("Student approved!");
      else
        alert("Student disapproved.");
    },
    // filter approval(approve/disapprove)
    async filterStatus() {
      let filter;
      // check the order in which the data should be ordered
      if (this.filterBy === "true")
        filter = 1;
      else if (this.filterBy === "false")
        filter = 0;
      // fetch the ordered data
      await axios
        .get(`http://192.168.11.213:3000/registration/get-all-user?page=${this.pageNo}&isapprove=${filter}`)
        .then((response) => {
          this.items = response.data.getall;
          console.log("Filter response: ", response);
        })
        .catch(error => console.log("Something went wrong while ordering. Error:", error));
    },
    // download user cv
    async download(user) {
      this.downloadingCV = true;
      const param = user.id;

      // send the user id whose cv should be downloaded
      await axios
        .get(`http://192.168.11.213:3000/registration/download-cv?id=${param}`, {
          responseType: 'blob'
        })
        .then((response) => {
          console.log("CV download respone: ", response);
          // using blob for working with the binary file received through response type
          const blob = new Blob([response.data], { type: response.headers['content- type'] });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const fileExtension = response.data.type.substring(response.data.type.lastIndexOf('/') + 1);

          let extension = '';
          // check the extension of the file 
          if (fileExtension === 'pdf') {
            extension = fileExtension;
          } else if (fileExtension === 'jpg') {
            extension = fileExtension;
          } else if (fileExtension === 'png') {
            extension = fileExtension;
          } else if (fileExtension === 'jpeg') {
            extension = fileExtension;
          }

          link.download = `${user.firstName} ${user.lastName}` + '_cv' + '.' + extension;

          alert("Your cv is being downloaded...");
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
        .catch(error => console.log("Something went wrong while downloading CV. Error: ", error));

      this.downloadingCV = false;
    },
    // search the user by either name or email
    async searchItem() {
      const param = {
        firstName: this.searchData,
      }
      await axios
        .get(`http://192.168.11.213:3000/registration/get-all-user?page=${this.pageNo}&name=${param.firstName}`)
        .then((response) => {
          console.log("Search respone: ", response);
          this.items = response.data.getall;
        })
        .catch(error => console.log("Something went wrong while searching. Error:", error));
    },
    // order the students by their name
    async orderItemsBy() {
      let order;
      // check the order in which the data should be ordered
      if (this.orderBy === "ASC")
        order = "ASC";
      else if (this.orderBy === "DESC")
        order = "DESC";
      // fetch the ordered data
      await axios
        .get(`http://192.168.11.213:3000/registration/get-all-user?page=${this.pageNo}&order=${order}`)
        .then((response) => {
          this.items = response.data.getall;
          console.log("Order response: ", response);
        })
        .catch(error => console.log("Something went wrong while ordering. Error:", error));
    },
    // store the total pages of and store it into pageList array
    totalPageList() {
      for (let i = 1; i <= this.totalPagesCount; i++) {
        this.pageList.push(i);
      }
    }
  },
}
</script>

<style scoped>
.student-header {
  color: #0C134F !important;
  text-align: left !important;
  padding-top: 0.5rem;
  cursor: context-menu;
}

.navbar-collapse {
  justify-content: flex-end;
}

/* filter button */
.filter-button {
  border: none;
  background-color: #020f81;
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 0.4rem;
}

/* seacrh bar/button */
#search-input {
  border-radius: 3rem;
  width: 8rem;
}

.search-input:focus-visible {
  border: none;
  outline: none;
}

.search-input:hover {
  border: none;
  /* border: 1px solid #0C134F; */
  box-shadow: 0 0 0.03rem 0.0625rem #aed1fe;
}

.more-user-details>button {
  background-color: #d5d5d7;
  color: #070b2b;
  /* border-radius: 1rem; */
}

.more-user-details>button:hover {
  background-color: #bdbdc1;
  color: #070b2b;
  /* border-radius: 1rem; */
}

/* order by select field */
.order-by {
  width: 20% !important;
}

.filter-by {
  width: 20% !important;
}

th {
  font-size: 0.9rem;
}

td {
  font-size: 0.8rem;
}

.download-btn {
  font-size: 1.5rem;
}

/* toggle slider */

.switch {
  position: relative;
  display: inline-block;
  width: 3.5rem;
  height: 1.6rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #FF6969;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.2rem;
  width: 1.2rem;
  left: 4px;
  bottom: 0.2rem;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

.green-slider {
  background-color: #A2FF86;
}

.red-slider {
  background-color: #FF6969;
}

.slider.round {
  border-radius: 12rem;
}

.slider.round:before {
  border-radius: 50%;
}

input:checked+.slider:before {
  -webkit-transform: translateX(1.4rem);
  -ms-transform: translateX(1.4rem);
  transform: translateX(1.8rem);
}

/* pagination */
.pagination {
  display: inline-block;
}

.pagination a,
.pagination>div {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a:active {
  background-color: #4CAF50 !important;
  color: white;
  border-radius: 5px;
}

.pagination a:hover {
  background-color: #ddd;
  border-radius: 5px;
}

/* media queries */
@media screen and (max-width: 770px) {

  /* navbar items flex */
  .navbar-collapse {
    justify-content: space-between;
  }

  .student-header {
    font-size: 1rem;
  }

  /* search input field and button */
  .search-input {
    font-size: 0.8rem;
    width: 30%;
    padding: 0.3rem !important;
  }

  .search-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }

  /* filter by and order by dropdown buttons */
  .order-by {
    font-size: 0.7rem;
    width: 17% !important;
    margin-right: 0.2rem !important;
    padding: 0.3rem !important;
  }

  .filter-by {
    font-size: 0.7rem;
    width: 17% !important;
    margin-right: 0.2rem !important;
    padding: 0.3rem !important;

  }

  /* table header font size */
  thead>tr th {
    font-size: 0.6rem;
  }

  /* table body items font size */
  .table-items {
    font-size: 0.4rem;
  }

  /* download button */
  .download-btn {
    font-size: 0.8rem;
  }

  /* pagination */
  .pagination a {
    font-size: 0.8rem;
    padding: 0.7rem 0.5rem;
  }

  .pagination>div {
    padding: 0.7rem 0.5rem;
  }

  /* switch toggle button */
  .switch {
    width: 2rem;
    height: 1rem;
  }

  input:checked+.slider:before {
    -webkit-transform: translateX(1rem);
    -ms-transform: translateX(1rem);
    transform: translateX(1rem);
  }

  .slider:before {
    height: 0.7rem;
    width: 0.7rem;
    left: 2px;
    bottom: 0.15rem;
  }
}</style>