const router = require('express').Router()
const Product = require('../models/Product')

//lista
router.get('/',(req, res)=>{
  Product.find({inStock:true})
    .then(products=>{
      res.render('products/list',{products})
    }).catch(e=>res.render('error'))
})


//detalle
router.get('/detail/:productId', (req,res)=>{
  Product.findById(req.params.productId)
    .then(product=>{
      res.render('products/detail',product)
    }).catch(e=>res.render('error'))
})

//formulario
router.get('/new', (req, res)=>{
  res.render('products/form')
})

router.post('/new',(req, res)=>{
  console.log(req.body)
  Product.create(req.body)
    .then(product=>{
      res.redirect('/products')
    }).catch(e=>res.render('error'))
})

module.exports = router

