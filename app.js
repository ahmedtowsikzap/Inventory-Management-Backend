const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
// middlewares
app.use(express.json());
app.use(cors());

// SCHEMA
const productSchema = mongoose.Schema({
 name: {
  type: String,
  required: [true, "Please proivde a name for this product"],
  trim: true,
  unique: [true, "name must be unique"],
  minLength: [3, "name should atleast 3 character"],
  maxLength:[100, "Name is too large to create"]
 },

 description: {
  type: String,
  required: true
 },

price: {
  type:Number,
  required: true,
  min: [0, "price can not be negative"],
},
unit: {
  type: String,
  required: true,
  enum: {
    values: ["kg", "litre", "pcs"],
    message: "unit value can not be {VALUE}, must be in kg/litre/pcs"
  }
},
quantity: {
  type: Number,
  required: true,
  min: [0, "quantity can not be negative"],
  validate: {
    validator: (value) => {
      const isInteger = Number.isInteger(value);
      if(isInteger){
        return true
      } else {
        return false
      }
    }
  },
  message: "quantity must be in Integer"
},

status: {
  type: String,
  required: true,
  enum: {
    
   values: ["in-stock", "out-of-stock", "discontinued"],
   message: "status can't be {VALUE}"
  }
},
// supplier: {

//   type: mongoose.Schema.Types.ObjectId,
//   ref: "supplier"
// },
// categories: [{
//   name:{
//       type:String,
//       required: true
//   },
//   _id: mongoose.Schema.Types.ObjectId
// }]

}, {
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema)



app.get("/", (req, res) => {
  res.send("It's working!!")
});

// posting to database

app.post('/api/v1/product', (req,res, next) => {

  // save or create
  const product = new Product(req.body)

  product.save()
})

module.exports = app;
