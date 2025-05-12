
import React from 'react';
import { Link } from 'react-router-dom';

interface CollectionBannerProps {
  title: string;
  image: string;
  url: string;
}

const CollectionBanner = ({ title, image, url }: CollectionBannerProps) => {
  return (
    <Link to={url} className="group relative block">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <span className="text-white font-medium text-xl tracking-wider">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionBanner;
