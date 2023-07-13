import { notFound } from 'next/navigation';

import { Gallery } from 'components/product/gallery';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const res = await fetch(`https://dev.wfhealthtech.com/v1/products/product/${params.handle}`);
  const data = await res.json();

  const product = data.product_detail;
  const options = data.options;
  const images = product?.images?.length
    ? product.images
    : product?.publicurl_app_web?.length
    ? product?.publicurl_app_web
    : [];

  if (!product) return notFound();

  return (
    <div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <Gallery
            title={product.item_name}
            amount={product.sale_price}
            currencyCode={'USD'}
            images={images.map((image: string) => ({
              src: image,
              altText: `${product.item_name}`
            }))}
          />
        </div>

        <div className="p-6 lg:col-span-2">
          <h2>Variants</h2>
          {options.map((option: any) => (
            <Link
              href={`/product/${option.product_slug}`}
              key={option.item_code}
              className="flex h-12 min-w-[48px] items-center justify-center rounded-full px-2 text-sm"
            >
              {option.item_name}
            </Link>
          ))}

          {/* {product.descriptionHtml ? (
            <Prose className="mb-6 text-sm leading-tight" html={product.descriptionHtml} />
          ) : null}

          <AddToCart variants={product.variants} availableForSale={product.availableForSale} /> */}
        </div>
      </div>
      {/* <Suspense>
        <RelatedProducts id={product.id} />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense> */}
    </div>
  );
}

// async function RelatedProducts({ id }: { id: string }) {
//   const relatedProducts = await getProductRecommendations(id);

//   if (!relatedProducts.length) return null;

//   return (
//     <div className="px-4 py-8">
//       <div className="mb-4 text-3xl font-bold">Related Products</div>
//       <Grid className="grid-cols-2 lg:grid-cols-5">
//         <ProductGridItems products={relatedProducts} />
//       </Grid>
//     </div>
//   );
// }
