import React, { useState, useEffect, useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { MemoryFallbackCard, HelloKittyBow } from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import { Heart, Sparkles, X, Calendar, Camera, RotateCcw } from 'lucide-react';

export const PhotoGallery = () => {
  // Load photos from config (which has Ruksana's real 9 images)
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('hk_ruksana_photos_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        return BIRTHDAY_CONFIG.PHOTOS.map((p) => {
          const custom = parsed[p.id];
          return {
            ...p,
            image: custom?.image || p.image,
            title: custom?.title || p.title,
            caption: custom?.caption || p.caption,
            hearts: p.initialHearts || 120,
            isLiked: false,
          };
        });
      }
    } catch (e) {}
    return BIRTHDAY_CONFIG.PHOTOS.map((p) => ({
      ...p,
      hearts: p.initialHearts || 120,
      isLiked: false,
    }));
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [floatingHeartBursts, setFloatingHeartBursts] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const fileInputRef = useRef(null);
  const [uploadingForId, setUploadingForId] = useState(null);

  const saveCustomPhoto = (id, newImageUrl) => {
    try {
      const saved = localStorage.getItem('hk_ruksana_photos_v3');
      const current = saved ? JSON.parse(saved) : {};
      current[id] = { ...current[id], image: newImageUrl };
      localStorage.setItem('hk_ruksana_photos_v3', JSON.stringify(current));
    } catch (e) {}
  };

  const resetPhoto = (id, e) => {
    e.stopPropagation();
    soundManager.playPopSound();
    const defaultImg = BIRTHDAY_CONFIG.PHOTOS.find((p) => p.id === id)?.image || '';
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, image: defaultImg } : p))
    );
    try {
      const saved = localStorage.getItem('hk_ruksana_photos_v3');
      if (saved) {
        const current = JSON.parse(saved);
        delete current[id];
        localStorage.setItem('hk_ruksana_photos_v3', JSON.stringify(current));
      }
    } catch (e) {}
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingForId) return;

    soundManager.playSparkleSound();
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (typeof base64Url === 'string') {
        setPhotos((prev) =>
          prev.map((p) => (p.id === uploadingForId ? { ...p, image: base64Url } : p))
        );
        saveCustomPhoto(uploadingForId, base64Url);
        setImageErrors((prev) => ({ ...prev, [uploadingForId]: false }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    setUploadingForId(null);
  };

  const handleSprinkleHearts = (id, e) => {
    e.stopPropagation();
    soundManager.playHeartSound();

    setPhotos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, hearts: item.hearts + 1, isLiked: true } : item
      )
    );

    const burstId = Date.now();
    setFloatingHeartBursts((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []).slice(-4), burstId],
    }));

    setTimeout(() => {
      setFloatingHeartBursts((prev) => ({
        ...prev,
        [id]: (prev[id] || []).filter((b) => b !== burstId),
      }));
    }, 700);
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const categories = ['All', 'Memes', 'Goofy', 'Relatable', 'Iconic', 'Aesthetic', 'Wholesome', 'Vibes'];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="memories" className="relative py-16 px-4 max-w-6xl mx-auto z-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pinkLight border border-pink-200 text-pastel-pinkDeep text-xs font-bold shadow-sm mb-3">
          <HelloKittyBow className="w-4 h-4" />
          <span>THE OFFICIAL EXHIBIT</span>
          <HelloKittyBow className="w-4 h-4" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-berry tracking-tight">
          The Ruksana Archives 📸✨
        </h2>
        <p className="mt-2 text-pastel-berryLight max-w-xl mx-auto text-sm sm:text-base">
          A hall of fame dedicated to her 99+ chaotic expressions, peak meme eras, and iconic outfits! Click to enlarge and sprinkle some love!
        </p>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                soundManager.playPopSound();
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-sm scale-105'
                  : 'bg-white/80 text-pastel-berry border-pink-200 hover:bg-pink-50 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Grid (3 columns, 9 cards total) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPhotos.map((photo, index) => {
          const hasCustomImg = photo.image && photo.image.trim() !== '' && !imageErrors[photo.id];
          const bursts = floatingHeartBursts[photo.id] || [];
          const tiltAngles = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1.5', 'rotate-1.5'];
          const tilt = tiltAngles[index % tiltAngles.length];

          return (
            <div
              key={photo.id}
              onClick={() => {
                setSelectedPhoto(photo);
                soundManager.playPopSound();
              }}
              className={`bg-white p-4 pb-5 rounded-3xl border-2 border-pink-200 shadow-kawaii hover:shadow-kawaii-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer relative group ${tilt} hover:rotate-0 flex flex-col justify-between`}
            >
              {/* Cute Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pastel-pink/70 border border-white/60 shadow-sm rounded-sm transform -rotate-2 z-20 pointer-events-none" />

              {/* Photo Frame Container */}
              <div>
                <div className="relative overflow-hidden rounded-2xl bg-pastel-snow border border-pink-100 group aspect-[4/3] flex items-center justify-center">
                  {hasCustomImg ? (
                    <img
                      src={photo.image}
                      alt={photo.title}
                      onError={() => handleImageError(photo.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <MemoryFallbackCard index={index} title={photo.title} />
                  )}

                  {/* Category / Meme Tag Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-pastel-berry shadow-sm border border-pink-100">
                    {photo.tag}
                  </div>

                  {/* Instant Upload/Change Photo Button */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-30">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadingForId(photo.id);
                        fileInputRef.current?.click();
                      }}
                      title="Upload custom picture for this memory"
                      className="p-1.5 rounded-full bg-white/95 hover:bg-pink-100 text-pastel-berry border border-pink-200 shadow-md transition-all hover:scale-110"
                    >
                      <Camera className="w-4 h-4 text-pink-500" />
                    </button>
                    {photo.image.startsWith('data:image') && (
                      <button
                        type="button"
                        onClick={(e) => resetPhoto(photo.id, e)}
                        title="Reset to original picture"
                        className="p-1.5 rounded-full bg-white/95 hover:bg-rose-100 text-rose-500 border border-rose-200 shadow-md transition-all hover:scale-110"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Polaroid Footer Content */}
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between gap-2 text-xs text-pastel-berryLight font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-pink-400" />
                      {photo.date}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-pastel-pinkLight text-pastel-pinkDeep font-bold">
                      #{photo.id}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-pastel-berry mt-1.5 line-clamp-1 group-hover:text-pastel-pinkDeep transition-colors">
                    {photo.title}
                  </h3>

                  <p className="text-xs text-pastel-berryLight mt-1 line-clamp-3 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Reaction Bar */}
              <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between">
                <span className="text-[11px] text-pastel-berryLight font-medium">
                  Click to inspect 🔍
                </span>

                {/* Sprinkle Hearts Button */}
                <div className="relative">
                  {bursts.map((bId) => (
                    <span
                      key={bId}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none text-base animate-bounceCute"
                    >
                      💖
                    </span>
                  ))}

                  <button
                    type="button"
                    onClick={(e) => handleSprinkleHearts(photo.id, e)}
                    title="Sprinkle bestie love on this memory!"
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                      photo.isLiked
                        ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-sm'
                        : 'bg-pastel-pinkLight text-pastel-pinkDeep border-pink-200 hover:bg-pink-100 hover:scale-105'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="tabular-nums">{photo.hearts}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 border-4 border-pastel-pink shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-pastel-pinkLight hover:bg-pink-200 text-pastel-berry transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Frame */}
            <div className="rounded-2xl overflow-hidden bg-pastel-snow border-2 border-pink-100 max-h-96 flex items-center justify-center relative">
              {selectedPhoto.image && selectedPhoto.image.trim() !== '' && !imageErrors[selectedPhoto.id] ? (
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-96"
                />
              ) : (
                <div className="w-full py-8">
                  <MemoryFallbackCard index={selectedPhoto.id} title={selectedPhoto.title} />
                </div>
              )}
            </div>

            {/* Modal Text & Details */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-pastel-pinkDeep">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  {selectedPhoto.date}
                </span>
                <span>{selectedPhoto.tag}</span>
              </div>

              <h3 className="text-xl font-extrabold text-pastel-berry mt-2">
                {selectedPhoto.title}
              </h3>

              <p className="text-sm text-pastel-berryLight mt-2 leading-relaxed">
                {selectedPhoto.caption}
              </p>

              {/* Action Buttons in Modal */}
              <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setUploadingForId(selectedPhoto.id);
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-pastel-berry border border-pink-200 hover:bg-pink-50 font-bold text-xs shadow-sm transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-pink-500" />
                  <span>Swap Picture</span>
                </button>

                <button
                  onClick={(e) => handleSprinkleHearts(selectedPhoto.id, e)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs shadow-kawaii hover:scale-105 active:scale-95 transition-transform"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Sprinkle Hearts ({photos.find((p) => p.id === selectedPhoto.id)?.hearts})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
