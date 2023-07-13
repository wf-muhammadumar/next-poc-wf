import { ThreeItemGrid } from 'components/grid/three-items';

export const runtime = 'edge';

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
    </>
  );
}
