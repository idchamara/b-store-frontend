import { Link } from "react-router-dom"

export default function ProductCard(props){

    const product = props.product
    
    return(
        <Link 
        to={/overview/+product.productId}
        className="group w-[280px] h-[400px] m-4 bg-red-950/20 border border-red-500/20 rounded-2xl overflow-hidden hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] transition-all duration-300"
        >
            {/* Product Image */}
            <div className="h-[240px] bg-black/40 overflow-hidden relative">

                <img
                src={
                    product.images?.[0] ||
                    "https://placehold.co/500x400/1a0808/ffffff?text=B+Store"
                }
                alt={product.productName}
                className="w-full h-full object-contain p-5 group-hover:scale-110 transition-transform duration-500"
                />

                {product.stock > 0 ? (
                <span className="absolute top-4 left-4 bg-green-900/80 text-green-300 text-xs px-3 py-1 rounded-full">
                    In Stock
                </span>
                ) : (
                <span className="absolute top-4 left-4 bg-red-900/90 text-red-300 text-xs px-3 py-1 rounded-full">
                    Out of Stock
                </span>
                )}
            </div>

            {/* Product Details */}
            <div className="p-5">

                  <p className="text-gray-500 text-xs tracking-widest">
                    {product.productId}
                  </p>

                  <h3 className="font-bold text-lg mt-2 ">
                    {product.productName}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-red-500 text-xl font-bold">LKR {product.price.toFixed(2)} </span>
                    <span className="text-gray-500 text-sm line-through">{product.price < product.labeledPrice && product.labeledPrice.toFixed(2)}</span>
                  </div>
            </div>
            
        </Link>
    )
}