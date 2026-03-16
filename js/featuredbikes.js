async function loadFeaturedBikes() {
  try {
    const res = await fetch("/api/vehicle/website/latest");
    const bikes = await res.json();

    const container = document.getElementById("featured-bikes-container");

    container.innerHTML = "";

    bikes.forEach((bike) => {
      const images = JSON.parse(bike.vehicleImage);
      const imageUrl = images.length
        ? `/api/uploads/${images[0]}`
        : "./images/home/bike-placeholder.jpg";

      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      slide.innerHTML = `
        <div class="bike-card">

        <div class="bike-image">
            <img src="${imageUrl}" alt="${bike.vehicleBrand}">
            <span class="bike-badge">Re-Ride Assured</span>
        </div>

        <div class="bike-info">

            <div class="bike-title-row">
            <h3>${bike.vehicleBrand} ${bike.vehicleModel}</h3>
            <span class="bike-price">₹${bike.vehicleOutLetPrice}</span>
            </div>

            <div class="bike-type">${bike.vehicleType}</div>

            <hr>

            <div class="bike-specs">
            <div>${bike.vehicleModelYear}</div>
            <div>Milage: ${bike.vehicleMileage}</div>
            </div>

            <div class="bike-owner">
            Owner: ${bike.vehicleOwnerType}
            </div>

            <div class="bike-reg">
            Reg No: ${bike.vehicleRegisterNumber}
            </div>

            <button class="bike-btn" onclick="window.location.href='/bikeDetails.html?id=${bike.vehicleId}'">
            Book Ride 
            </button>

        </div>

        </div>
        `;

      container.appendChild(slide);
    });

    initSwiper();
  } catch (error) {
    console.error("Failed to load featured bikes:", error);
  }
}

loadFeaturedBikes();

function initSwiper() {
  new Swiper(".featuredSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      640: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      },

      1280: {
        slidesPerView: 3,
      },
    },
  });
}
