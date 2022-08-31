const app = document.querySelector(".app");

function toggleFadeInElement(element, toggle) {
  element.classList.add("transparent");

  if (!toggle) {
    element.addEventListener("transitionend", () => {
      if (this.classList.contains("fade-in")) {
        return toggle;
      }
      this.classList.toggle("fade-in");
    });
  } else {
    element.classList.add("fade-in");
    element.classList.remove("transparent");
    return;
  }
}

function createCarousels() {
  const carouselList = document.querySelectorAll(".carousel");
  carouselList.forEach((list) => {
    const carousel = new Flickity(list, {
      cellAlign: "left",
      wrapAround: true,
      autoPlay: true,
      lazyLoad: 1,
      watchCSS: true,
    });

    const addCarouselEvents = () => {
      carousel.element.addEventListener("click", () => {
        const selectedSlide = carousel.element.querySelector(".is-selected");

        const heading = selectedSlide.querySelector(".card__heading");
        const description = selectedSlide.querySelector(".card__description");
        const hiddenItem = selectedSlide.querySelector(".hidden");

        selectedSlide.addEventListener("click", (e) => {
          if (hiddenItem === heading) {
            description.classList.add("hidden");
          }

          if (hiddenItem === description) {
            heading.classList.add("hidden");
          }

          hiddenItem.classList.remove("hidden");
        });
      });
    };

    addCarouselEvents();
  });
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? "flex" : "none";
}

const wait = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

toggleFadeInElement(app, false);
setVisible(".app", false);
setVisible(".loader", true);

document.addEventListener("DOMContentLoaded", () => {
  wait(1500).then(() => {
    setVisible(".loader", false);
    setVisible(".app", true);
    createCarousels();
    toggleFadeInElement(app, true);
  });
});
