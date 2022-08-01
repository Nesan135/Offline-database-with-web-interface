<template>
  <div class="container">
    <div class="header">
      <h3>Inventory (Paddy)</h3>
    </div>
    <table>
      <thead>
        <tr>
          <th>Weight (KG)</th>
          <th>Bags</th>
          <th>Grade</th>
          <th>Cost</th>
          <th>Supplier</th>
          <th>Order type</th>
          <th>Profit (%)</th>
          <th>Price</th>
          <th>Status</th>
          <th>Tags</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{'stored-status': PaddyItem_alias.status === 'Stored',
        'processing-status': PaddyItem_alias.status === 'Processing',
        'returned-status':PaddyItem_alias.status === 'Returned'}" v-for="PaddyItem_alias in PaddyItem" :key=PaddyItem_alias.id>
          <td width="10%"> {{ PaddyItem_alias.weight}}</td>
          <td> {{ PaddyItem_alias.number_of_bags}}</td>
          <td width="10%"> {{ PaddyItem_alias.paddy_type}}</td>
          <td> {{ PaddyItem_alias.cost}}</td>
          <td width="8%"> {{ PaddyItem_alias.supplier}}</td>
          <td width="8%"> {{ PaddyItem_alias.order_type}}</td>
          <td width="10%"> {{ PaddyItem_alias.rate}}</td>
          <td> {{ PaddyItem_alias.sale}}</td>
          <td width="10%">
            <button class="button button-table" @click="changeStatus(PaddyItem_alias._id,PaddyItem_alias.status)"> {{PaddyItem_alias.status}}
              </button>
          </td>
          <td width="26%"> {{PaddyItem_alias.tag}}</td>
          <td width="10%">
            <button class="button button-delete" @click="deleteItem(PaddyItem_alias._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
      <div class="center">
        <router-link to="/">
          <button class="button">Add Item</button>
        </router-link>
      </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios';
export default {
    data() {
        return {
            PaddyItem: [],
            change:""
        }
    },
    methods:{
      changeStatus(id,status) {
      if (status == "Stored") {
        this.change = "Processing";
      } else if (status == "Processing") {
        this.change = "Returned";
      } else if (status == "Returned") {
        this.change = "Stored";
      }
      axios.put('http://localhost:3000/paddy',{ids:id, stat:this.change})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      },
      deleteItem(id) {
      console.log(id);
      axios.delete('http://localhost:3000/paddy',{data: {data:id}})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });        
      }
    },
    updated() {
    axios.get('http://localhost:3000/paddy')
        .then((response) => {
            console.log(response.data);
            this.PaddyItem = response.data;
        })
        .catch((error) => {
            console.log(error);
        });      
    },
    mounted() {
    axios.get('http://localhost:3000/paddy')
        .then((response) => {
            console.log(response.data);
            this.PaddyItem = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    },
}
</script>

<style>

.header {
  color: rgb(1, 1, 1);
  margin-left: auto;
  margin-right: auto;
  margin-top:2rem;
  width: 15rem;
}

h3 {
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
  border-bottom: thin solid rgb(223, 221, 221);
}

table {
  width: 80%;
  margin-bottom:2rem;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
  font-size:14px;
  text-align: center;
}

th {
  height: 30px;
  border-bottom: thin solid rgb(223, 221, 221);
  background-color: #ffffff;
  color: rgb(72, 60, 60);
  font-style: bold;
}

td {
  padding: 8px;
  border-bottom: thin solid rgb(223, 221, 221);
}

.button {
  font: inherit;
  border: 2px solid rgb(223, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 30px;
  margin:auto;
}

.button-table {
  font: inherit;
  border: 0px;
  cursor: pointer;
  padding: 0.15rem 1rem;
  border-radius: 30px;
  margin:1px;
}

.button-delete {
  font: inherit;
  border: 0px;
  background-color: rgb(240, 9, 9);
  cursor: pointer;
  padding: 0.15rem 1rem;
  border-radius: 30px;
  margin:1px;
}

.stored-status {
  background-color: #f7f5f5 ;
}

.processing-status {
  background-color: rgb(244, 130, 64) ;
}

.returned-status {
  background-color: rgb(150, 236, 124) ;
}
.center {
  align-items: center;
  display: flex;
  justify-content: center;
}

button:hover,
button:active {
  border-color: #0a0a0a;
}
</style>