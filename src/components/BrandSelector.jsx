import React, { useRef } from 'react';

export default function BrandSelector({ brands, selectedBrand, onSelect, disabled }) {
  const selectorRef = useRef(null);
  const dragStateRef = useRef({
    dragging: false,
    moved: false,
    startY: 0,
    startScrollTop: 0,
  });

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const selector = selectorRef.current;
    if (!selector) return;
    dragStateRef.current.dragging = true;
    dragStateRef.current.moved = false;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startScrollTop = selector.scrollTop;
    selector.classList.add('dragging');
    selector.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const selector = selectorRef.current;
    const dragState = dragStateRef.current;
    if (!selector || !dragState.dragging) return;
    const delta = event.clientY - dragState.startY;
    if (Math.abs(delta) > 3) dragState.moved = true;
    selector.scrollTop = dragState.startScrollTop - delta;
  };

  const handlePointerEnd = (event) => {
    const selector = selectorRef.current;
    const dragState = dragStateRef.current;
    if (!selector) return;
    dragState.dragging = false;
    selector.classList.remove('dragging');
    selector.releasePointerCapture?.(event.pointerId);
  };

  const handleBrandClick = (event, brand) => {
    if (dragStateRef.current.moved) {
      event.preventDefault();
      return;
    }
    onSelect(brand);
  };

  return (
    <div
      ref={selectorRef}
      className="brand-selector"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onDragStart={(event) => event.preventDefault()}
    >
      <h3>Marques</h3>
      <div className="brand-list">
        {brands.map(brand => (
          <button
            key={brand.id}
            className={`brand-item ${selectedBrand?.id === brand.id ? 'active' : ''}`}
            onClick={(event) => handleBrandClick(event, brand)}
            disabled={disabled}
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
          >
            {brand.isImage ? (
              <img src={brand.icon} alt={brand.name} className="brand-image" draggable={false} />
            ) : (
              <span className="brand-icon">{brand.icon}</span>
            )}
            <span className="brand-name">{brand.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
