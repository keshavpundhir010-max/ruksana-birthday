import React, { useState, useEffect } from 'react';
import { HelloKittyFace } from '../shared/KawaiiSvgIcons';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';

/**
 * MascotIcon
 * Renders BIRTHDAY_CONFIG.ICON_URL if set, or automatically falls back to our
 * sharp inline Hello Kitty vector face so no image is ever broken.
 */
export const MascotIcon = ({ className = "w-10 h-10", bowColor = "#FF6B8B" }) => {
  const [imgError, setImgError] = useState(false);
  const iconUrl = BIRTHDAY_CONFIG.ICON_URL?.trim();

  // Dynamically update favicon if ICON_URL is provided
  useEffect(() => {
    if (iconUrl && !imgError) {
      const favicon = document.getElementById('dynamic-favicon');
      if (favicon) {
        favicon.href = iconUrl;
      }
    }
  }, [iconUrl, imgError]);

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt="Hello Kitty Mascot"
        className={`${className} object-contain rounded-full shadow-sm`}
        onError={() => setImgError(true)}
      />
    );
  }

  return <HelloKittyFace className={className} bowColor={bowColor} />;
};
