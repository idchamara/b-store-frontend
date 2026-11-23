import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/navBar";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);

    useEffect(
        () => {
            if (!productLoaded) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                    (res) => {
                        setProductList(res.data)
                        setProductLoaded(true)
                    }
                )
            }
        },[productLoaded]
    )
    return (
        <div className="min-h-screen bg-[#100606] text-white">
            
            <NavBar/>
            
            {
                productLoaded?
                <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-wrap justify-center">
                    {productList.map(
                        (product, index) =>{
                            return(
                                <ProductCard key={product.productId} product={product}/>
                            )
                        }
                    )}
                </div>
                :
                <Loader/>
            }
        </div>
        
    )
}