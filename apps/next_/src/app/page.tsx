import UtilCard from '@/components/util-card';
import CalculatorCard from '@/components/calc-card';

export default function Home() {
  return (
    <main className='grid place-items-center gap-y-2 w-full h-full p-4'>
      <UtilCard />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 font-mono'>
        <CalculatorCard />
      </div>
    </main>
  );
}
