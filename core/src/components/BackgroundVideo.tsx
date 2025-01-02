import React from 'react';

interface IBackgroundVideo {
  videoSrc: string;
  posterImg?: string;
  className?: string;
  [key: string]: any;
}

const BackgroundVideo: React.FC<IBackgroundVideo> = ({ videoSrc, posterImg, className, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={`relative overflow-hidden ${className}`} {...props}>
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute left-0 top-0 size-full object-cover"
      poster={posterImg}
    >
      <source src={`${videoSrc}.webm`} type="video/webm" />
      <source src={`${videoSrc}.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default BackgroundVideo;
