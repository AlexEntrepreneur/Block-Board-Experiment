document.addEventListener('mousedown', (e) => {
  const handleMouseMove = makeHandleMouseMove({x: e.clientX, y: e.clientY});
  console.log('down eros!');
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', makeHandleMouseUp(handleMouseMove));
});

function makeHandleMouseMove(startPosition) {
  return function handleMouseMove(e) {
    const delta = {
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    }

    console.log(delta);
  }
}

function makeHandleMouseUp(handleMouseMove) {
  return function handleMouseUp(e) {
    console.log('up mars!');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup',  handleMouseUp);
  }
}