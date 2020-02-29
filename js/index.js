import {
  parseSVG,
  snapRectToGrid,
  offsetRectCoords,
  offsetBlockPosition
} from "./utils.js";

const GRID_SIZE = 16;
const GRID_DOT_SIZE = 1;

function createGrid(gridSize, dotSize, container) {
  container.append(
    parseSVG(`
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <pattern id="dot_grid" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse">
    <rect width='${gridSize}' height='${gridSize}' fill='none' />
    <circle cx="${dotSize}" cy="${dotSize}" r="${dotSize}" fill="#E0E5E6" />
    </pattern>
    </defs>
    
    <rect width="100%" height="100%" fill="url(#dot_grid)" />
    </svg>
    `)
  );
}

const grid = document.querySelector('.grid');

createGrid(GRID_SIZE, GRID_DOT_SIZE, grid);
  
  
grid.addEventListener('mousedown', (e) => {
  const startPosition = { x: e.clientX, y: e.clientY };
  
  grid.addEventListener('mouseup', handleMouseUp(startPosition));
});

const handleMouseUp = (startPosition) => function f(e) {
  const delta = {
    x: e.clientX - startPosition.x,
    y: e.clientY - startPosition.y
  }
  
  const rect = offsetRectCoords(snapRectToGrid(startPosition.x, startPosition.y, delta.x, delta.y, GRID_SIZE), GRID_DOT_SIZE * 2);

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