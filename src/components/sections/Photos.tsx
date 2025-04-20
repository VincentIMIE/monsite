import React, { useState } from 'react';
import { PhotoItem } from '../../types';

interface PhotosProps {
  photos: PhotoItem[];
  isAdmin?: boolean;
  onEdit?: () => void;
}

const Photos: React.FC<PhotosProps> = ({ 
  photos, 
  isAdmin = false, 
  onEdit 
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const openLightbox = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Photography</h2>
        
        {isAdmin && (
          <div className="mb-6 text-center">
            <button 
              onClick={onEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Edit Photos
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openLightbox(photo)}
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{photo.title}</h3>
                  {photo.description && <p className="text-sm">{photo.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={closeLightbox}>
            <div className="max-w-4xl w-full p-4" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="mt-4 text-white">
                <h3 className="text-xl font-semibold">{selectedPhoto.title}</h3>
                {selectedPhoto.description && <p className="text-gray-300 mt-2">{selectedPhoto.description}</p>}
              </div>
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={closeLightbox}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;