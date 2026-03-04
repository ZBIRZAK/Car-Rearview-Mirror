import React, { useRef } from 'react';

export default function BrandSelector({ brands, selectedBrand, onSelect, disabled }) {
  const selectorRef = useRef(null);
  const dragStateRef = useRef({
    dragging: false,
    moved: false,
    justDragged: false,
    startY: 0,
    startScrollTop: 0,
  });

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const selector = selectorRef.current;
    if (!selector) return;
    dragStateRef.current.dragging = true;
    dragStateRef.current.moved = false;
    dragStateRef.current.justDragged = false;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startScrollTop = selector.scrollTop;
  };

  const handlePointerMove = (event) => {
    const selector = selectorRef.current;
    const dragState = dragStateRef.current;
    if (!selector || !dragState.dragging) return;
    const delta = event.clientY - dragState.startY;
    if (Math.abs(delta) > 3) {
      dragState.moved = true;
      selector.classList.add('dragging');
    }
    selector.scrollTop = dragState.startScrollTop - delta;
    if (dragState.moved) event.preventDefault();
  };

  const handlePointerEnd = () => {
    const selector = selectorRef.current;
    const dragState = dragStateRef.current;
    if (!selector) return;
    if (dragState.moved) {
      dragState.justDragged = true;
      setTimeout(() => {
        dragStateRef.current.justDragged = false;
      }, 120);
    }
    dragState.dragging = false;
    dragState.moved = false;
    selector.classList.remove('dragging');
  };

  const handleBrandClick = (event, brand) => {
    if (dragStateRef.current.justDragged) {
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
      onPointerLeave={handlePointerEnd}
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
