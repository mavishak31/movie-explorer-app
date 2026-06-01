type TrailerModalProps = {
  isOpen: boolean;
  videoKey?: string;
  title?: string;
  onClose: () => void;
};

export default function TrailerModal({
  isOpen,
  videoKey,
  title,
  onClose,
}: TrailerModalProps) {
  if (!isOpen || !videoKey) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4'>
      <div className='relative w-full max-w-5xl rounded-xl overflow-hidden bg-black'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 bg-black/60 hover:bg-black px-4 py-2 rounded-lg text-white'
        >
          ✕
        </button>

        <div className='aspect-video'>
          <iframe
            className='w-full h-full'
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={title}
            allow='autoplay; encrypted-media'
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
