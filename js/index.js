import {
  snapRectToGrid,
  offsetRectCoords,
  offsetBlockPosition
} from "./utils.js";

const grid = document.querySelector('.grid');

grid.addEventListener('mousedown', (e) => {
  const startPosition = { x: e.clientX, y: e.clientY };
  
  grid.addEventListener('mouseup', handleMouseUp(startPosition));
});

const handleMouseUp = (startPosition) => function f(e) {
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

  grid.removeEventListener('mouseup', f);
}

function createBlock(originX, originY, width, height) {
  const block = document.createElement('div');

  block.style.width = `${Math.abs(width)}px`;
  block.style.height = `${Math.abs(height)}px`;
  block.style.position = 'absolute';
  block.contentEditable = true;
  
  block.classList.add('block');
  
  const positionedBlock = offsetBlockPosition(block, originX, originY, width, height);
  
  document.body.append(positionedBlock);
}