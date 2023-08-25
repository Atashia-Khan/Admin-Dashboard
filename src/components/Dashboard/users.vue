<template>
  <div>
    <!-- show the loader while fetching data from api -->
    <div v-if="loadingData" class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- show data when api fetched -->
    <h2 v-if="!loadingData" class="users-heading my-4 mx-auto">User Details</h2>
    <table v-if="!loadingData" class="table mx-auto">
      <thead class="table-header table-light">
        <tr>
          <th class="table-header" scope="col">#</th>
          <th class="table-header" scope="col">Name</th>
          <th class="table-header" scope="col">Username</th>
          <th class="table-header" scope="col">Email</th>
          <th class="table-header" scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="table-items">{{ item.id }}</td>
          <td class="table-items">{{ item.name }}</td>
          <td class="table-items">{{ item.username }}</td>
          <td class="table-items">{{ item.email }}</td>
          <td class="more-user-details">
            <!-- Button trigger modal -->
            <button type="button" class="btn modal-btn" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + index">
              Open
            </button>
            <!-- Modal -->
            <div class="modal fade" :id="'exampleModal' + index" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ item.name }}'s more details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p><b>Suite:</b> {{ item.address.suite }}</p>
                    <p><b>Address:</b> {{ item.address.street }}, {{ item.address.city }}</p>
                    <p><b>Zipcode:</b> {{ item.address.zipcode }}</p>
                    <p><b>Geo Location:</b> ({{ item.address.geo.lat }}, {{ item.address.geo.lng }})</p>

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

import axios from 'axios';


export default {
  data() {
    return {
      items: [],
      loadingData: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadingData = !this.loadingData;
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          this.items = response.data;
        })
        .catch(error => console.log("Something went wrong. Please try again..."));
    }, 2000);
  },
}
</script>


<style scopped>
.users-heading {
  color: #081932;
}

/* table */
.table {
  width: 90% !important;
  border: 1px solid #d7d9db !important;
}

td {
  vertical-align: middle;
}


.modal-btn {
  background-color: #c6dbfa !important;
  color: #081932 !important;
  font-weight: bold !important;
  border: none !important;
  border-radius: 15px !important;
  height: 2rem !important;
}

.modal-btn:hover {
  cursor: pointer ;
  color: #0b2854;
  background-color: #aacaf9;
  box-shadow: 0 0 0.4rem 0.0625rem #e3e3e3;
}

.btn-check:checked+.btn,
:not(.btn-check)+.btn:active,
.btn:first-child:active,
.btn.active,
.btn.show {
  background-color: #aacaf9 !important;
  border-color: var(--bs-btn-active-border-color);
}

.modal-body {
  text-align: left;
}
.btn-danger:hover{
  background-color: rgb(234, 77, 77);
  box-shadow: 0 0 0.4rem 0.0625rem #e3e3e3;
}
.btn-danger:first-child:active{
  color: white !important; 
  background-color: rgb(234, 77, 77) !important;
  box-shadow: 0 0 0.4rem 0.0625rem #e3e3e3 !important;
}

@media screen and (max-width: 770px) {
  .table-header {
    font-size: 12px;
  }

  .table-items,
  .more-user-details>button {
    font-size: 9px;
  }

  .table> :not(caption)>*>* {
    padding: 0.5rem 0.2rem !important;
  }
}
</style>