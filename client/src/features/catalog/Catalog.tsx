import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";

function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then(resp => resp.json())
      .then(product => setProducts(product));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>

  )
}

export default Catalog