import heroImage from '@/assets/hero-banner.png';

export default function HeroBanner() {
  return (
    <div className='relative h-full w-full'>
      {/* image */}
      <img src={heroImage} alt='Hero' className='w-full h-full object-cover' />

      {/* overlay */}
      <div className='absolute inset-0 bg-black/50' />

      {/* content */}
      <div className='absolute inset-0 z-10 flex items-center'>
        <div className='mx-auto max-w-7xl px-6'>
          <h1 className='text-5xl font-bold mb-4'>The Gorge</h1>

          <p className='max-w-xl text-gray-200 mb-8'>
            Two highly trained operatives grow close from a distance after being
            sent to guard opposite sides of a mysterious gorge.
          </p>

          <div className='flex gap-4'>
            <button className='bg-red-600 px-6 py-3 rounded-full'>
              Watch Trailer
            </button>

            <button className='border border-white px-6 py-3 rounded-full'>
              See Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
