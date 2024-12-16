import { ProductCard } from "@/app/components/Products";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getProductsByBrand } from "@/lib/firestore/products/read_server";

export async function generateMetadata({ params }) {
  const { brandId } = params;
  const brand = await getBrand({ id: brandId });

  return {
    title: `${brand?.name} | Brand`,
    openGraph: {
      images: [brand?.imageURL],
    },
  };
}

export default async function Page({ params }) {
  const { brandId } = params;
  const brand = await getBrand({ id: brandId });
  const products = await getProductsByBrand({ brandId: brandId });
  
  return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
      <div className="flex flex-col gap-6 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-4xl">{brand.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-self-center justify-center items-center gap-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </main>
  );
}
