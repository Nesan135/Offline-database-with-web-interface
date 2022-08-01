<template>
  <div style="display:flex;">
  <form @submit.prevent="addToPaddyAPI">
    <div class="header">
      <h3>Add Paddy Item</h3>
    </div>
    <div class="form-control" :class="{invalid: weightValidity === 'invalid'}">
      <label for="weight">Weight (KG)</label>
      <input type="text" id="weight" name="weight" v-model.trim="PaddyItem.weight" @input="validateInput">
      <p v-if="weightValidity === 'invalid'">Please enter a valid weight!</p>
    </div>
    <div class="form-control">
      <label for="number-of-bags">Number of bags</label>
      <input type="text" id="number-of-bags" name="number-of-bags" v-model="PaddyItem.number_of_bags">
    </div>
    <div class="form-control">
      <h2>Rice type</h2>
      <div>
        <input id="Grade A" name="Grade A" type="radio" value="Grade A" v-model="PaddyItem.paddy_type" />
        <label for="Grade A">Grade A</label>
        <input id="Grade B" name="Grade B" type="radio" value="Grade B" v-model="PaddyItem.paddy_type"/>
        <label for="Grade B">Grade B</label>
      </div>
    </div>
    <div class="form-control">
      <h2>Order type</h2>
      <div>
        <input id="preorder" name="preorder" type="radio" value="preorder" v-model="PaddyItem.order_type" />
        <label for="preorder">Preorder</label>
        <input id="company" name="company" type="radio" value="company" v-model="PaddyItem.order_type"/>
        <label for="company">Company</label>
      </div>
    </div>
    <div class="form-control">
      <label for="cost">Cost (Naira)</label>
      <input id="pcost" name="cost" type="text" v-model="PaddyItem.cost"/>
    </div>
    <div class="form-control">
      <label for="supplier">Name of Supplier</label>
      <input id="supplier" name="supplier" type="text" v-model="PaddyItem.supplier"/>
    </div>
    <div class="form-control">
      <label for="profit">Profit margin (%)</label>
      <input id="profit" name="profit" default= 'Default rate is 200%' type="text" v-model="PaddyItem.rate"/>
    </div>
    <h2> Estimated selling price: {{ salePrice }} naira</h2>
    <br>
    <h2> Tags: {{ paddy_tag }}</h2>
    <br>
    <router-link to="/">
        <button type="submit" class="button" @click="addToPaddyAPI">Submit</button>
    </router-link>
    <button @click="$router.push('paddy')">View Inventory</button>
  </form>
  <form @submit.prevent="addToRiceAPI">
    <div class="header">
      <h3>Add Rice Item</h3>
    </div>
    <div class="form-control" :class="{invalid: weightValidity === 'invalid'}">
      <label for="weight">Weight (KG)</label>
      <input type="text" id="weight" name="weight" v-model.trim="RiceItem.weight" @input="validateInput">
      <p v-if="weightValidity === 'invalid'">Please enter a valid weight!</p>
    </div>
    <div class="form-control">
      <label for="number-of-bags">Number of bags</label>
      <input type="text" id="number-of-bags" name="number-of-bags" v-model="RiceItem.number_of_bags">
    </div>
    <div class="form-control">
      <h2>Rice type</h2>
      <div>
        <input id="Brown" name="Brown" type="radio" value="Brown" v-model="RiceItem.rice_type" />
        <label for="Brown">Brown</label>
        <input id="White" name="White" type="radio" value="White" v-model="RiceItem.rice_type"/>
        <label for="White">White</label>
      </div>
    </div>
    <div class="form-control">
      <h2>Order type</h2>
      <div>
        <input id="preorder" name="preorder" type="radio" value="preorder" v-model="RiceItem.order_type" />
        <label for="preorder">Preorder</label>
        <input id="company" name="company" type="radio" value="company" v-model="RiceItem.order_type"/>
        <label for="company">Company</label>
      </div>
    </div>
    <div class="form-control">
      <label for="cost">Cost (Naira)</label>
      <input id="rcost" name="cost" type="text" v-model="RiceItem.cost"/>
    </div>
    <div class="form-control">
      <label for="supplier">Name of Supplier</label>
      <input id="supplier" name="supplier" type="text" v-model="RiceItem.supplier"/>
    </div>
    <div class="form-control">
      <label for="profit">Profit margin (%)</label>
      <input id="profit" name="profit" default= 'Default rate is 200%' type="text" v-model="RiceItem.rate"/>
    </div>
    <h2> Estimated selling price: {{ salePriceR }} naira</h2>
    <br>
    <h2> Tags: {{ rice_tag }}</h2>
    <br>
    <router-link to="/">
        <button type="submit" class="button" @click="addToRiceAPI">Submit</button>
    </router-link>
    <button @click="$router.push('rice')">View FG Inventory</button>
  </form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      PaddyItem: { 
      weight:70, 
      number_of_bags:1, 
      paddy_type: '', 
      cost:0, 
      order_type:'', 
      rate: 200, 
      sale:0,
      paddy_tag:'',
      supplier:'',
      status:'Stored' },
      RiceItem: { 
      weight:70, 
      number_of_bags:1, 
      rice_type: '',
      cost:0, 
      order_type:'', 
      rate: 200, 
      sale:0,
      rice_tag:'',
      supplier:'',
      status:'Stored' },
      weightValidity: 'pending',
    }
  },
  computed: {
    salePrice() {
      this.PaddyItem.sale = (this.PaddyItem.rate)/100 * this.PaddyItem.cost;
      return this.PaddyItem.sale;
    },
    salePriceR() {
      this.RiceItem.sale = (this.RiceItem.rate)/100 * this.RiceItem.cost;
      return this.RiceItem.sale;
    },
    paddy_tag() {
      const now = new Date();
      const ptags = [];
      let year = now.getFullYear().toString();
      let month = now.getMonth().toString();
      month = (parseInt(month)+1).toString();
      let date = now.getDate().toString();
      let hour = now.getHours().toString();
      const text = hour+'h '+date+'/'+month+'/'+year;
      if (this.PaddyItem.order_type === 'preorder') {
        this.PaddyItem.paddy_tag = 'P '+ text;
        for (let i = 0; i < this.PaddyItem.number_of_bags; i++) {
          ptags.push(this.PaddyItem.paddy_tag+ " (Bag "+i+") - "+this.PaddyItem.supplier)
        };
        this.PaddyItem.paddy_tag = ptags;
        return ptags;
      } else if (this.PaddyItem.order_type === 'company') {
        this.PaddyItem.paddy_tag = 'C ' + text;
        for (let i = 0; i < this.PaddyItem.number_of_bags; i++) {
          ptags.push(this.PaddyItem.paddy_tag+ " (Bag "+(i+1)+") - "+this.PaddyItem.supplier)
        };
        this.PaddyItem.tag = ptags;
        return ptags;
      };
    },
    rice_tag() {
      const now = new Date();
      const rtags = [];
      let year = now.getFullYear().toString();
      let month = now.getMonth().toString();
      month = (parseInt(month)+1).toString();
      let date = now.getDate().toString();
      let hour = now.getHours().toString();
      const text = hour+'h '+date+'/'+month+'/'+year;
      if (this.RiceItem.order_type === 'preorder') {
        this.RiceItem.rice_tag = 'P '+ text;
        for (let i = 0; i < this.RiceItem.number_of_bags; i++) {
          rtags.push(this.RiceItem.rice_tag+ " (Bag "+i+") - "+this.RiceItem.supplier)
        };
        this.RiceItem.rice_tag = rtags;
        return rtags;
      } else if (this.RiceItem.order_type === 'company') {
        this.RiceItem.rice_tag = 'C ' + text;
        for (let i = 0; i < this.RiceItem.number_of_bags; i++) {
          rtags.push(this.RiceItem.rice_tag+ " (Bag "+(i+1)+") - "+this.RiceItem.supplier)
        };
        this.RiceItem.rice_tag = rtags;
        return rtags;
      };
    }
  },
  methods: {
    addToRiceAPI() {
      let newRiceItem = {
        weight: this.RiceItem.weight,
        number_of_bags: this.RiceItem.number_of_bags,
        rice_type: this.RiceItem.rice_type,
        order_type: this.RiceItem.order_type,
        cost: this.RiceItem.cost,
        rate: this.RiceItem.rate,
        sale: this.RiceItem.sale,
        tag: this.RiceItem.rice_tag,
        status: this.RiceItem.status,
        supplier: this.RiceItem.supplier
      }
      axios.post('http://localhost:3000/rice', newRiceItem)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    
    },
    addToPaddyAPI() {
      let newPaddyItem = {
        weight: this.PaddyItem.weight,
        number_of_bags: this.PaddyItem.number_of_bags,
        paddy_type: this.PaddyItem.paddy_type,
        order_type: this.PaddyItem.order_type,
        cost: this.PaddyItem.cost,
        rate: this.PaddyItem.rate,
        sale: this.PaddyItem.sale,
        tag: this.PaddyItem.paddy_tag,
        status: this.PaddyItem.status,
        supplier: this.PaddyItem.supplier
      }
      axios.post('http://localhost:3000/paddy', newPaddyItem)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
      validateInput() {
      this.weightValidity = 'pending';
      if (this.PaddyItem.weight === '') {
        this.weightValidity = 'invalid';
      } else {
        this.weightValidity = 'valid';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

form {
  margin: 0rem auto;
  margin-top:1rem;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
}

.form-control {
  margin: 1rem 0;
}

.form-control.invalid input {
  border-color: red;
}

.form-control.invalid label {
  color: red;
}

label {
  font-weight: bold;
  padding-right: 40px;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
  text-transform: capitalize
}

h3 {
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
  border-bottom: thin solid rgb(223, 221, 221);
  margin-top:0rem;
}

input,
select {
  display: block;
  font: inherit;
  width:100%;
  margin-top: 0.5rem;
}

input[type=text]:focus {
  background-color: lightblue;
}

select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 2px solid rgb(223, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 30px;
  margin:auto;
}

.header {
  padding: 1px;
  border-radius: 10px;
  color: rgb(11, 11, 11);
  margin-left: auto;
  margin-right: auto;
  margin-top:0;
  width: 15rem;
}

button:hover,
button:active {
  border-color: #0a0a0a;
}
</style>