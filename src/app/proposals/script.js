document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  if (!track || !prevButton || !nextButton) return;

  const items = track.children;
  const itemWidth = items[0].getBoundingClientRect().width + 16; // ancho del item + margen (mx-2 => 8px cada lado)
  let currentIndex = 0;

  const updateCarousel = () => {
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
});
