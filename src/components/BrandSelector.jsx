import React, { useRef } from 'react';

export default function BrandSelector({ brands, selectedBrand, onSelect, disabled }) {
  const listRef = useRef(null);
  const dragStateRef = useRef({
    dragging: false,
    moved: false,
    startY: 0,
    startScrollTop: 0,
  });

  const handlePointerDown = (event) => {
    const list = listRef.current;
    if (!list) return;
    dragStateRef.current.dragging = true;
    dragStateRef.current.moved = false;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startScrollTop = list.scrollTop;
    list.classList.add('dragging');
    list.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const list = listRef.current;
    const dragState = dragStateRef.current;
    if (!list || !dragState.dragging) return;
    const delta = event.clientY - dragState.startY;
    if (Math.abs(delta) > 3) dragState.moved = true;
    list.scrollTop = dragState.startScrollTop - delta;
  };

  const handlePointerEnd = (event) => {
    const list = listRef.current;
    const dragState = dragStateRef.current;
    if (!list) return;
    dragState.dragging = false;
    list.classList.remove('dragging');
    list.releasePointerCapture?.(event.pointerId);
  };

  const handleBrandClick = (event, brand) => {
    if (dragStateRef.current.moved) {
      event.preventDefault();
      return;
    }
    onSelect(brand);
  };

  return (
    <div className="brand-selector">
      <h3>Marques</h3>
      <div
        ref={listRef}
        className="brand-list"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        {brands.map(brand => (
          <button
            key={brand.id}
            className={`brand-item ${selectedBrand?.id === brand.id ? 'active' : ''}`}
            onClick={(event) => handleBrandClick(event, brand)}
            disabled={disabled}
          >
            {brand.isImage ? (
              <img src={brand.icon} alt={brand.name} className="brand-image" />
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
