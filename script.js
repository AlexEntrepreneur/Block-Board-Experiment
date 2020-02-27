const grid = document.querySelector('.grid');

grid.addEventListener('mousedown', (e) => {
    const startPosition = { x: e.clientX, y: e.clientY };
    let delta = {};
  
    const handleMouseMove = makeHandleMouseMove(startPosition, delta);
    console.log('down eros!');
    
    // document.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mouseup', makeHandleMouseUp(handleMouseMove, startPosition));
});

function makeHandleMouseMove(startPosition, delta) {
  return function handleMouseMove(e) {
    
    console.log(delta);
  }
}

function roundPosition(unit, value) {
  if(value % unit === 0) return value;
  return Math.round(value / unit) * unit;
}

function makeHandleMouseUp(handleMouseMove, startPosition) {
  return function handleMouseUp(e) {
    console.log('up mars!');
    const delta = {
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    }
    
    const rect = offsetRectCoords(snapRectToGrid(startPosition.x, startPosition.y, delta.x, delta.y, 14), 2);

    createBlock(
      rect.originX, 
      rect.originY,
      rect.width,
      rect.height,
    )

    // document.removeEventListener('mousemove', handleMouseMove);
    grid.removeEventListener('mouseup',  handleMouseUp);
  }
}

function snapRectToGrid(originX, originY, width, height, gridUnit) {
  const rect = {
    originX,
    originY,
    width,
    height
  };
  
  for (const prop in rect) {
    rect[prop] = roundPosition(gridUnit, rect[prop]);
  }

  return rect;
}

function offsetRectCoords(rect, offset) {
  const offsettedRect = {
    ...rect
  }

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

function createBlock(originX, originY, width, height) {
  const container = document.createElement('div');

  container.contentEditable = true;
  container.placeholder = 'Type something';

  container.style.position = 'absolute';

  if (Math.abs(width) !== width) {
    container.style.left = `${originX + width}px`;
  } else {
    container.style.left = `${originX}px`;
  }

  if (Math.abs(height) !== height) {
    container.style.top = `${originY + height}px`;
  } else {
    container.style.top = `${originY}px`;
  }
  
  container.style.width = `${Math.abs(width)}px`;
  container.style.height = `${Math.abs(height)}px`;
  
  container.classList.add('block');

  document.body.append(container);
}