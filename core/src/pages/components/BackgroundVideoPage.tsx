import { useRef, useState } from 'react';

const BackgroundVideoPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      // Video ters mi oynuyor kontrol et
      if (isReversed) {
        // Eğer ters oynuyorsa, normale dön
        videoRef.current.src = '/assets/videos/nature.mp4';
      } else {
        // Eğer normal oynuyorsa, ters versiyona geç
        videoRef.current.src = '/assets/videos/nature-reverse.mp4';
      }
      setIsReversed(!isReversed); // Durumu değiştir
      videoRef.current.play(); // Videoyu başlat
    }
  };
  return (
    <div className="relative flex h-screen w-full justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={handleVideoEnd}
        className="absolute left-0 top-0 size-full object-cover opacity-50"
      >
        <source src="/assets/videos/nature.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container absolute mx-auto flex size-full max-w-screen-2xl px-4">
        <h1>Deneme Deneme</h1>
      </div>
    </div>
  );
};

export default BackgroundVideoPage;
