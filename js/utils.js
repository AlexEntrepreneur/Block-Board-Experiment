export function roundValueToUnit(unit, value) {
  if (value % unit === 0) return value;
  return Math.round(value / unit) * unit;
}

export function snapRectToGrid(originX, originY, width, height, gridUnit) {
  const rect = {
    originX,
    originY,
    width,
    height
  };
  
  for (const prop in rect) {
    rect[prop] = roundValueToUnit(gridUnit, rect[prop]);
  }

  return rect;
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