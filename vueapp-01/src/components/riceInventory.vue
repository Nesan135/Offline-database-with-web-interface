<template>
  <div class="container">
    <div class="header">
      <h3>Inventory (Finished Goods)</h3>
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
          <th>Buyer</th>
          <th>Tags</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{'stored-status': riceItem_alias.status === 'Stored',
        'taken-status': riceItem_alias.status === 'Taken',
        'sold-status':riceItem_alias.status === 'Sold'}" v-for="riceItem_alias in riceItem" :key=riceItem_alias.id>
          <td width="10%"> {{ riceItem_alias.weight}}</td>
          <td> {{ riceItem_alias.number_of_bags}}</td>
          <td width="10%"> {{ riceItem_alias.rice_type}}</td>
          <td> {{ riceItem_alias.cost}}</td>
          <td width="8%"> {{ riceItem_alias.supplier}}</td>
          <td> {{ riceItem_alias.order_type}}</td>
          <td width="10%"> {{ riceItem_alias.rate}}</td>
          <td> {{ riceItem_alias.sale}}</td>
          <td>
            <button class="button button-table" @click="changeStatus(riceItem_alias._id,riceItem_alias.status)"> {{riceItem_alias.status}}
              </button>
          </td>
          <td width="8%"> {{ riceItem_alias.sold_to_whom}} </td>
          <td width="26%"> {{riceItem_alias.tag}}</td>
          <td width="10%">
            <button class="button button-delete" @click="deleteItem(riceItem_alias._id)">Delete</button>
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
            riceItem: [],
            sold_to_whom:'',
            change:""
        }
    },
    methods:{
      changeStatus(id,status) {
      if (status == "Stored") {
        this.change = "Taken";
      } else if (status == "Taken") {
        //prompt for sold to whom attribute
        this.sold_to_whom = prompt("Sold to whom");
        if (this.sold_to_whom == ''|| this.sold_to_whom === null) {
          return;
        };
        //save to sold to whom then submit it along with change
        this.change = "Sold";
      } else if (status == "Sold") {
        this.change = "Stored";
      }
      axios.put('http://localhost:3000/rice',{ids:id, stat:this.change, stat1:this.sold_to_whom})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.sold_to_whom = '';
      },
      deleteItem(id) {
      console.log(id);
      axios.delete('http://localhost:3000/rice',{data: {data:id}})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });        
      }
    },
    updated() {
    axios.get('http://localhost:3000/rice')
        .then((response) => {
            console.log(response.data);
            this.riceItem = response.data;
        })
        .catch((error) => {
            console.log(error);
        });      
    },
    mounted() {
    axios.get('http://localhost:3000/rice')
        .then((response) => {
            console.log(response.data);
            this.riceItem = response.data;
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
  width: 30rem;
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

.taken-status {
  background-color: rgb(244, 130, 64) ;
}

.sold-status {
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