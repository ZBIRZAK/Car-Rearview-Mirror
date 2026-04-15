import React from 'react';
import { productPreviewImage } from './constants';

export default function CatalogPreview({ focus, imageSrc }) {
  const focusClass = focus ? `focus-${focus}` : '';
  return (
    <span className={`catalog-preview ${focusClass}`}>
      <img key={imageSrc || productPreviewImage} className="catalog-preview-image" src={imageSrc || productPreviewImage} alt="" />
      <span className="catalog-preview-shade" />
    </span>
  );
}
