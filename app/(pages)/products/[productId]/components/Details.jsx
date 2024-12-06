import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import AuthContextProvider from "@/contexts/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import Link from "next/link";
import { Suspense } from "react";
import { marked } from "marked";
import hljs from "highlight.js";


marked.setOptions({
  breaks: true, // Enable line breaks
  gfm: true,    // Enable GitHub Flavored Markdown
});

export default function Details({ product }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-3">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>
      <h1 className="font-semibold text-xl md:text-4xl">{product?.title}</h1>
      <Suspense fallback="Failed To Load">
        <RatingReview product={product} />
      </Suspense>
      <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">
        {product?.shortDescription}
      </h2>
      <h3 className="text-green-500 font-bold text-lg">
        Rs {product?.salePrice}{" "}
        <span className="line-through text-gray-700 text-sm">
          Rs {product?.price}
        </span>
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
          <button className="bg-black text-white rounded-lg px-4 py-1.5">
            Buy Now
          </button>
        </Link>
        <AuthContextProvider>
          <AddToCartButton type={"cute"} productId={product?.id} />
        </AuthContextProvider>
        <AuthContextProvider>
          <FavoriteButton productId={product?.id} />
        </AuthContextProvider>
      </div>
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 py-1 rounded-lg text-sm font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}
      <div className="flex flex-col gap-4 py-4">
  <div className="bg-white p-4 shadow-md rounded-lg">
  <div
  className="text-gray-700 text-base leading-relaxed"
  dangerouslySetInnerHTML={{
    __html: product?.description
      ? `<div style="font-family: 'Inter', sans-serif; line-height: 1.75;">
           <h2 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Product Details</h2>
           ${marked(product.description)} <!-- Convert Markdown to HTML -->
         </div>`
      : "<p style='color: #999;'>No description available</p>",
  }}
></div>
  </div>
</div>

    </div>
  );
}

async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
        <img className="h-4" src={category?.imageURL} alt="" />
        <h4 className="text-xs font-semibold">{category?.name}</h4>
      </div>
    </Link>
  );
}

async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
      <img className="h-4" src={brand?.imageURL} alt="" />
      <h4 className="text-xs font-semibold">{brand?.name}</h4>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-sm text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}
