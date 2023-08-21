import Product from "../models/product.js"
import shortid from 'shortid';
import slugify from "slugify";
import category from "../models/category.js";


export function createProduct(req,res){
    //res.status(200).json({file:req.files,body:req.body});
    const {name, price, description, category, quantity, createdBy} = req.body;

    let productPictures = [];
    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img : file.filename}
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy:req.user._id
    });
0
     product.save(((error,product) => {
        if(error) return res.status(400).json({error: error});
        if(product){
            res.status(201).json({product});
        }
    }))

};


export function getProductsBySlug(req, res) { 
    const { slug } = req.params;
    category.findOne({ slug: slug })
      .select("_id")
      .exec((error, category) => {
        if (error) {
          return res.status(400).json({ error });
        }
  
        if (category) {
          Product.find({ category: category._id }).exec((error, products) => {
            if (error) {
              return res.status(400).json({ error });
            }
  
            if (category) {
              if (products.length > 0) {
                let less = products.filter((product) => product.price <= 5000);
                res.status(200).json({
                  products,
                  priceRange: {
                    under5k: 5000,
                    under10k: 10000,
                    under15k: 15000,
                    under20k: 20000,
                    under30k: 30000,
                  },
                  productsByPrice: {
                    under5k: products.filter((product) => product.price <= 5000),
                    under10k: products.filter(
                      (product) => product.price > 5000 && product.price <= 10000
                    ),
                    under15k: products.filter(
                      (product) => product.price > 10000 && product.price <= 15000
                    ),
                    under20k: products.filter(
                      (product) => product.price > 15000 && product.price <= 20000
                    ),
                    under30k: products.filter(
                      (product) => product.price > 20000 && product.price <= 30000
                    ),
                  },
                });
              }
            } else {
              res.status(200).json({ products });
            }
          });
        }
      });
  };

  export const getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };