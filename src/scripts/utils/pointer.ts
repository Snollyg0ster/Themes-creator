const onMouseMove = (e: MouseEvent) => {
  console.log(e.x, e.y);
};

const removeListener = () =>
  document.removeEventListener('mousemove', onMouseMove);

let activate = false;

export const pointer = (indicate = true) => {
  if (!indicate) removeListener();
  document.addEventListener('mousemove', onMouseMove);
};
