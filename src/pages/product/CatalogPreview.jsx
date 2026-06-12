import React from 'react';
import { productPreviewImage } from './constants';

export default function CatalogPreview({ focus, imageSrc, isPlaceholder = false }) {
  const focusClass = focus ? `focus-${focus}` : '';
  const placeholderClass = isPlaceholder ? 'is-placeholder' : '';
  return (
    <span className={`catalog-preview ${focusClass} ${placeholderClass}`.trim()}>
      <img key={imageSrc || productPreviewImage} className="catalog-preview-image" src={imageSrc || productPreviewImage} alt="" />
      {/* <span className="catalog-preview-shade" /> */}
    </span>
  );
}
