import Link from 'next/link';
import { GridTileImage } from './tile';

function ThreeItemGridItem({
  item,
  size,
  background
}: {
  item: any;
  size: 'full' | 'half';
  background: 'white' | 'pink' | 'purple' | 'black';
}) {
  console.log('item>>>', { item });
  return (
    <div
      className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
    >
      <Link className="block h-full" href={`/product/${item.product_slug}`}>
        <GridTileImage
          src={
            item?.images?.length
              ? item.images[0]
              : item?.publicurl_app_web?.length
              ? item?.publicurl_app_web[0]
              : ''
          }
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          background={background}
          alt={''}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const res = await fetch('https://dev.wfhealthtech.com/v1/products?limit=20&offset=0&brand=omron');
  const data = await res.json();
  return (
    <section className="lg:grid lg:grid-cols-6 lg:grid-rows-2">
      {data.data.map((product: any) => (
        <ThreeItemGridItem item={product} size="half" background="purple" key={product.item_code} />
      ))}
    </section>
  );
}
