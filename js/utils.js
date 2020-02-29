import { MINIMUM_BLOCK_WIDTH, MINIMUM_BLOCK_HEIGHT } from './index.js';

export function roundValueToUnit(unit, value) {
  if (value % unit === 0) return value;
  return Math.round(value / unit) * unit;
}

export function parseSVG(s) {
  const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
  div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
  const frag = document.createDocumentFragment();
  while (div.firstChild.firstChild) frag.appendChild(div.firstChild.firstChild);
  
  return frag;
}

export function snapRectToGrid(originX, originY, width, height, gridUnit) {
  const rect = createRect(
    originX,
    originY,
    width,
    height,
    MINIMUM_BLOCK_WIDTH,
    MINIMUM_BLOCK_HEIGHT
  );
  
  for (const prop in rect) {
    rect[prop] = roundValueToUnit(gridUnit, rect[prop]);
  }

  return rect;
}

export function createRect(originX, originY, width, height, minWidth, minHeight) {
  return {
    originX,
    originY,
    width: width < minWidth ? minWidth : width,
    height: height < minHeight ? minHeight : height
  };
}

// Ensures shape sits on the grid even with negative width/height values
export function offsetRectCoords(rect, offset) {
  const offsettedRect = { ...rect };

  if (Math.abs(offsettedRect.width) !== offsettedRect.width) {
    offsettedRect.width = offsettedRect.width - offset;
    offsettedRect.originX = offsettedRect.originX + offset;
  } else {
    offsettedRect.width = offsettedRect.width + offset;
  }
  
  if (Math.abs(offsettedRect.height) !== offsettedRect.height) {
    offsettedRect.height = offsettedRect.height - offset;
    offsettedRect.originY = offsettedRect.originY + offset;
  } else {
    offsettedRect.height = offsettedRect.height + offset;
  }
  
  return offsettedRect;
}

// Ensures block has the correct CSS position values despite negative width/height values
export function offsetBlockPosition(block, originX, originY, width, height) {
  const positionedBlock = block.cloneNode(true);

  if (Math.abs(width) !== width) {
    positionedBlock.style.left = `${originX + width}px`;
  } else {
    positionedBlock.style.left = `${originX}px`;
  }

  if (Math.abs(height) !== height) {
    positionedBlock.style.top = `${originY + height}px`;
  } else {
    positionedBlock.style.top = `${originY}px`;
  }

  return positionedBlock;
}