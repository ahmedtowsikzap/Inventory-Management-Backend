// / SCHEMA
const mongoose = require('mongoose')
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

}, {
  timestamps: true,
})





app.get("/", (req, res) => {
  res.send("It's working!!")
});




// Mongoose Middlewaress for saving data: pre & post

productSchema.pre('save', function(next){


  console.log('before saving data');

  if(this.quantity === 0){
    this.status = 'out-of-stock'
  }
  next()
})
// productSchema.post('save', function(doc,next){
//   console.log('after saving data');
//   next()
// })

productSchema.methods.logger = function (){
  console.log(`Data saved for ${this.name}`);
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product;