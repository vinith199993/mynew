import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense } from "react";
import MyRating from "./MyRating";


export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center py-10 bg-gray-50">
      <div className="flex flex-col gap-5 max-w-[1200px] p-5 border border-gray-200 rounded-lg shadow-md bg-white">
        <h1 className="text-center font-semibold text-4xl text-gray-800  decoration-blue-500 decoration-2 hover:text-blue-600 transition-colors duration-300">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full product-image-container">
        <img
          src={product?.featureImageURL}
          className="rounded-lg h-48 w-full object-cover transform transition-transform duration-300 hover:scale-110 hover:rotate-2"
          alt={product?.title}
        />
        <div className="absolute top-1 right-1">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm hover:text-blue-500 transition-colors duration-300">
          {product?.title}
        </h1>
      </Link>
      <div className="">
        <h2 className="text-green-500 text-sm font-semibold">
        Rs {new Intl.NumberFormat('en-US').format(product?.salePrice)}{" "}
          <span className="line-through text-xs text-gray-600">
          Rs {new Intl.NumberFormat('en-US').format(product?.price)}
          </span>
        </h2>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2 hover:text-gray-900 transition duration-300 ease-in-out">
        {product?.shortDescription}
      </p>
      <Suspense>
        <RatingReview product={product} />
      </Suspense>
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 rounded-lg text-xs font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}
      <div className="flex items-center gap-4 w-full">
        <div className="w-full">
          <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
            <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs w-full hover:bg-blue-600 transition-colors duration-300">
              Buy Now
            </button>
          </Link>
        </div>
        <AuthContextProvider>
          <AddToCartButton productId={product?.id} />
        </AuthContextProvider>
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}
