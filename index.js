let slides = document.querySelectorAll(".iphones__slide");
slides = Array.from(slides);

const chevLeft = document.querySelector(".iphones__chev-left");
const chevRight = document.querySelector(".iphones__chev-right");

chevLeft.addEventListener("click", () => {
  newSlideIdx = getCurrentSlide(slides, currentSlideIdx, "left");
  const newSlideStyle = slides[newSlideIdx].style;
  const currSlideStyle = slides[currentSlideIdx].style;

  currSlideStyle.transition = "transform 0.9s ease-in-out";
  currSlideStyle.transform += " translateX(1020px)";

  newSlideStyle.left = "-1020px";
  newSlideStyle.visibility = "visible";
  newSlideStyle.transition = "transform 0.9s ease-in-out";
  newSlideStyle.transform = "translateX(1020px)";

  currentSlideIdx = newSlideIdx;
});

chevRight.addEventListener("click", () => {
  newSlideIdx = getCurrentSlide(slides, currentSlideIdx, "right");
  const newSlideStyle = slides[newSlideIdx].style;
  const currSlideStyle = slides[currentSlideIdx].style;

  currSlideStyle.transition = "transform 0.9s ease-in-out";
  currSlideStyle.transform += " translateX(-1020px)";

  newSlideStyle.left = "1020px";
  newSlideStyle.visibility = "visible";
  newSlideStyle.transition = "transform 0.9s ease-in-out";
  newSlideStyle.transform = "translateX(-1020px)";

  currentSlideIdx = newSlideIdx;
});

slides.forEach(el => {
  el.addEventListener("transitionend", _ => {
    console.log("Animation ended");
    slides.forEach((el, idx) => {
      if (idx !== currentSlideIdx) {
        const style = slides[idx].style;
        style.visibility = "hidden";
        style.left = "";
        style.transition = "";
        style.transform = "";
      }
    });
  });
});

currentSlideIdx = 0;

//slide one animation
const phoneOneBtn = document.querySelector(".slide-1__phone-1-btn");
const phoneOneScreen = document.querySelector(".slide-1__phone-1-blackscreen");
const phoneTwoBtn = document.querySelector(".slide-1__phone-2-btn");
const phoneTwoScreen = document.querySelector(".slide-1__phone-2-blackscreen");
const phoneThreeBtn = document.querySelector(".slide-2__phone-btn");
const phoneThreeScreen = document.querySelector(".slide-2__phone-blackscreen");

phoneOneBtn.addEventListener("click", _ => {
  phoneOneScreen.classList.toggle("blackscreen");
});

phoneTwoBtn.addEventListener("click", _ => {
  phoneTwoScreen.classList.toggle("blackscreen");
});

phoneThreeBtn.addEventListener("click", _ => {
  phoneThreeScreen.classList.toggle("blackscreen");
});

//header nav
const navlistItems = Array.from(document.querySelectorAll(".navlist-item"));
navlistItems.forEach(item => {
  item.addEventListener("click", _ => {
    item.classList.add("selected");
    navlistItems
      .filter(el => el !== item)
      .forEach(el => {
        el.classList.remove("selected");
      });
  });
});

//portfolio tabs
const portfolioTabs = Array.from(document.querySelectorAll(".portfolio__tags-item"));
let pos = 0;
portfolioTabs.forEach(item => {
  item.addEventListener("click", _ => {
    item.classList.add("portfolio__tags-item_selected");
    portfolioTabs
      .filter(el => el !== item)
      .forEach(el => {
        el.classList.remove("portfolio__tags-item_selected");
      });

    const images = Array.from(document.querySelectorAll(".portfolio-galery__item img"));
    const firstImgSrc = images[0].src;
    images.forEach((img, idx) => {
      if (idx + 1 > images.length - 1) {
        img.src = firstImgSrc;
      } else {
        img.src = images[idx + 1].src;
      }
    });
  });
});

//image selected
const portfolioItems = Array.from(document.querySelectorAll(".portfolio-galery__item"));
portfolioItems.forEach(item => {
  item.addEventListener("click", _ => {
    item.classList.add("selected");
    portfolioItems
      .filter(el => el !== item)
      .forEach(el => {
        el.classList.remove("selected");
      });
  });
});

//modal
const modalOverlay = document.querySelector(".modal-overlay");
const modalWindow = document.querySelector(".modal-window");

//form

const form = document.querySelector(".get-a-quote__form");
form.addEventListener("submit", event => {
  event.preventDefault();

  const subject = form.querySelector("#subject");
  const quote = form.querySelector("#quote");

  let message = "";

  if (subject.value === "Singolo") message += "Тема: Singolo";
  if (subject.value === "") message += "Без темы";
  if (quote.value == "Portfolio project") message += "<br> Описание: Portfolio project";
  if (quote.value == "") message += "<br> Без описания";
  modalWindow.querySelector(".modal-body").innerHTML = message;

  modalOverlay.classList.add("open");
  modalWindow.classList.add("open");
});

const frmBtnOk = modalWindow.querySelector("button");
frmBtnOk.addEventListener("click", _ => {
  modalWindow.classList.remove("open");
  modalOverlay.classList.remove("open");
});

function getCurrentSlide(array, currentSlideIdx, direction) {
  switch (direction) {
    case "right":
      if (currentSlideIdx === array.length - 1) {
        return 0;
      }
      return currentSlideIdx + 1;
      break;
    case "left":
      if (currentSlideIdx === 0) {
        return array.length - 1;
      } else {
        return currentSlideIdx - 1;
      }
  }
}
