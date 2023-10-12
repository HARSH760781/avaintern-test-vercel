/* Lazy loading */
const lazyImages = document.querySelectorAll("img[data-src]");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute("data-src"); // Load the image
      img.removeAttribute("data-src"); // Remove data-src to avoid loading it again
      observer.unobserve(img); // Stop observing this image
    }
  });
});

lazyImages.forEach((img) => {
  observer.observe(img);
});

// //**********blog***************** */
const reviews = document.querySelector(".reviews");
const reviewSlides = document.querySelectorAll(".review");
const paginationBtns = document.querySelectorAll(".page-btn");
const sliderContainer = document.querySelector(".review-slider");

let currentSlide1 = 0;
let slideWidth1 = reviewSlides[0].clientWidth;

// Next slide function
function nextSlide1() {
  // Increment current slide
  //   console.log(1);
  currentSlide1++;
  // Reset current slide to 0 if we reach the end
  if (currentSlide1 >= reviewSlides.length) {
    currentSlide1 = 0;
  }
  // Update slider position
  reviews.style.transform = `translateX(-${currentSlide1 * slideWidth1}px)`;
  // Update active pagination button
  setActivePaginationBtn(currentSlide1);
}

// Set active pagination button
function setActivePaginationBtn(ind) {
  // Remove active class from all buttons
  paginationBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  // Add active class to the button with the same index as the current slide
  paginationBtns[ind].classList.add("active");
}

// Pagination button click event listeners
paginationBtns.forEach((btn, ind) => {
  btn.addEventListener("click", () => {
    currentSlide1 = ind;
    reviews.style.transform = `translateX(-${currentSlide1 * slideWidth1}px)`;
    setActivePaginationBtn(currentSlide1);
  });
});

// Start slider
setActivePaginationBtn(currentSlide1);
setInterval(() => {
  nextSlide1();
}, 5000);
// /*****************Blog ends************/

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const myElementPosition = document.querySelector(".mentor").offsetTop;

  if (scrollPosition >= myElementPosition) {
    let counter1 = document.querySelector(".counter1");
    let targetNumber1 = 10000;
    let currentNumber1 = 100;

    function incrementCounter1() {
      if (currentNumber1 >= targetNumber1) {
        clearInterval(intervalId1);
      } else {
        currentNumber1 += 100;
        counter1.textContent = currentNumber1;
      }
    }
    const intervalId1 = setInterval(incrementCounter1, 4);
    let x = counter1.innerHTML;
    // console.log(x);
    let counter3 = document.querySelector(".counter3");
    let targetNumber3 = 35000;
    let currentNumber3 = 700;

    function incrementCounter3() {
      if (currentNumber3 >= targetNumber3) {
        clearInterval(intervalId3);
      } else {
        currentNumber3 += 686;
        counter3.textContent = currentNumber3;
      }
    }
    const intervalId3 = setInterval(incrementCounter3, 10);

    let counter2 = document.querySelector(".counter2");
    let targetNumber2 = 500;
    let currentNumber2 = 0;

    function incrementCounter2() {
      if (currentNumber2 >= targetNumber2) {
        clearInterval(intervalId2);
      } else {
        currentNumber2 += 5;
        counter2.textContent = currentNumber2;
      }
    }
    const intervalId2 = setInterval(incrementCounter2);
  }
});

// get the navbar menu element
var navbarMenu = document.querySelector(".navbar-collapse");

// listen for clicks on the document
document.addEventListener("click", function (event) {
  // check if the click was outside the navbar menu
  if (!navbarMenu.contains(event.target)) {
    // close the navbar menu
    navbarMenu.classList.remove("show");
  }
});

// *******************************************************************************

const slider = document.querySelector(".slider");
const container = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const pagination = document.querySelector(".pagination");

let currentSlide = 0;
let interval = null;

// create pagination buttons
for (let i = 0; i < slides.length; i++) {
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    goToSlide(i);
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  });
  pagination.appendChild(button);
}

// update pagination on slide change
function updatePagination() {
  const buttons = pagination.querySelectorAll("button");
  buttons.forEach((button) => button.classList.remove("active"));
  buttons[currentSlide].classList.add("active");
}

// go to specific slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  container.style.left = `-${currentSlide * 100}%`;
  updatePagination();
}

// go to next slide
function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  container.style.left = `-${currentSlide * 100}%`;
  updatePagination();
}

// start auto slide
interval = setInterval(nextSlide, 5000);

// make slider responsive
function resize() {
  const slideWidth = slider.clientWidth;
  container.style.width = `${slides.length * slideWidth}px`;
  slides.forEach((slide) => (slide.style.width = `${slideWidth}px`));
  container.style.left = `-${currentSlide * slideWidth}px`;
}

window.addEventListener("resize", resize);
resize();

//********************************************* second pagination */
const slideshows = document.getElementById("slideshow");
const imags = slideshows.getElementsByTagName("img");
let currentImageIndex = 0;

function showNextImage() {
  imags[currentImageIndex].style.display = "none";
  currentImageIndex = (currentImageIndex + 1) % imags.length;
  imags[currentImageIndex].style.display = "block";
}

setInterval(showNextImage, 3000);

// ******************Facility slider**********************//

const containers = document.querySelector(".facility");
const imageWrapper = document.querySelector(".image-wrapper");
const images = document.querySelectorAll(".image-wrapper img");
const leftButton = document.querySelector("#left-button");
const rightButton = document.querySelector("#right-button");

let currentIndex = 0;
let animating = false;

leftButton.addEventListener("click", () => {
  if (!animating) {
    animating = true;
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    imageWrapper.style.transform = `translateX(-${
      currentIndex * containers.clientWidth
    }px)`;
    setTimeout(() => {
      animating = false;
    }, 500);
  }
});

rightButton.addEventListener("click", () => {
  // console.log("hello");
  if (!animating) {
    animating = true;
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    imageWrapper.style.transform = `translateX(-${
      currentIndex * containers.clientWidth
    }px)`;
    setTimeout(() => {
      animating = false;
    }, 500);
  }
});
