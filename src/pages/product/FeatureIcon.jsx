import React from 'react';
import pieceGlassIcon from '../../images/icones/piece-glass.svg';
import pieceMirrorIcon from '../../images/icones/piece-mirror.svg';
import pieceCoverIcon from '../../images/icones/piece-cover.svg';
import pieceSingleIcon from '../../images/icones/piece-single.svg';
import glassIcon from '../../images/new-icones/SVG/Glace.svg';
import foldingIcon from '../../images/new-icones/SVG/rabattement.svg';
import underlightIcon from '../../images/new-icones/SVG/Sous-eclairage.svg';
import shapeIcon from '../../images/new-icones/SVG/Forme.svg';
import heatingIcon from '../../images/new-icones/SVG/Chauffage.svg';
import memoryIcon from '../../images/new-icones/SVG/Memoire.svg';
import adjustmentIcon from '../../images/new-icones/SVG/Reglage-electrique.svg';
import antiLightIcon from '../../images/new-icones/SVG/Anti-eblouissement.svg';
import lampIcon from '../../images/icones/lamp.svg';
import controllerIcon from '../../images/icones/controller.svg';
import blindSpotIcon from '../../images/new-icones/SVG/Angle mort.svg';
import cameraIcon from '../../images/new-icones/SVG/Camera.svg';

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
