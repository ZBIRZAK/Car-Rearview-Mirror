import React from 'react';
import pieceGlassIcon from '../../images/icones/piece-glass.svg';
import pieceMirrorIcon from '../../images/icones/piece-mirror.svg';
import pieceCoverIcon from '../../images/icones/piece-cover.svg';
import pieceSingleIcon from '../../images/icones/piece-single.svg';
import glassIcon from '../../images/icones/glass.svg';
import foldingIcon from '../../images/icones/folding.svg';
import underlightIcon from '../../images/icones/underlight.svg';
import shapeIcon from '../../images/icones/shape.svg';
import heatingIcon from '../../images/icones/heating.svg';
import memoryIcon from '../../images/icones/memory.svg';
import adjustmentIcon from '../../images/icones/adjustment.svg';
import antiLightIcon from '../../images/icones/anti-light.svg';
import lampIcon from '../../images/icones/lamp.svg';
import controllerIcon from '../../images/icones/controller.svg';
import blindSpotIcon from '../../images/icones/blind-spot.svg';
import cameraIcon from '../../images/icones/camera.svg';

const iconSrcByType = {
  pieceGlass: pieceGlassIcon,
  pieceMirror: pieceMirrorIcon,
  pieceCover: pieceCoverIcon,
  pieceSingle: pieceSingleIcon,
  glass: glassIcon,
  folding: foldingIcon,
  underlight: underlightIcon,
  shape: shapeIcon,
  heating: heatingIcon,
  memory: memoryIcon,
  adjustment: adjustmentIcon,
  antiLight: antiLightIcon,
  lamp: lampIcon,
  controller: controllerIcon,
  blindSpot: blindSpotIcon,
  camera: cameraIcon,
};

export default function FeatureIcon({ type }) {
  const iconSrc = iconSrcByType[type];

  if (iconSrc) {
    return <img src={iconSrc} alt="" className="feature-icon-svg feature-icon-img" aria-hidden="true" loading="lazy" decoding="async" />;
  }

  return (
    <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
      <circle cx="32" cy="32" r="10" fill="#111" />
    </svg>
  );
}
