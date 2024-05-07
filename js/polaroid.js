function updateUsername() {
  // Make an AJAX request to fetch the username and profile image URL
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      const loggedIn = response.loggedin;
      const username = response.username;
      const profileImage = response.profile_picture; // Assuming this is the key in your JSON response for the profile image URL

      // Update the username in mobile view
      const mobileUserElement = document.getElementById("mobileUser");
      mobileUserElement.innerHTML = loggedIn
        ? `<a class="text-white font-poppins text-lg font-medium mt-3" href="profile.html">${username}</a>`
        : `<a href="login.html">Login</a>`;

      // Update the username in desktop view
      const desktopUserElement = document.getElementById("desktopUser");
      desktopUserElement.innerHTML = loggedIn
        ? `<a class="text-white font-poppins text-lg font-medium mt-3" href="profile.html">${username}</a>`
        : `<a href="login.html">Login</a>`;

      // Update the avatar image for mobile view
      const mobileAvatarImg = document.getElementById("mobileAvatarImg");
      if (loggedIn && profileImage) {
        mobileAvatarImg.src = profileImage;
        mobileAvatarImg.alt = "User Avatar";
      } else {
        // Set a default image if the user is not logged in or doesn't have a profile image
        mobileAvatarImg.src = "images/avatarpreview.jpg"; // Replace "default-avatar.jpg" with your default avatar image URL
        mobileAvatarImg.alt = "Default Avatar";
      }

      // Update the avatar image for desktop view
      const desktopAvatarImg = document.getElementById("desktopAvatarImg");
      if (loggedIn && profileImage) {
        desktopAvatarImg.src = profileImage;
        desktopAvatarImg.alt = "User Avatar";
      } else {
        // Set a default image if the user is not logged in or doesn't have a profile image
        desktopAvatarImg.src = "images/avatarpreview.jpg"; // Replace "default-avatar.jpg" with your default avatar image URL
        desktopAvatarImg.alt = "Default Avatar";
      }
    }
  };

  xhttp.open("GET", "php/check_login.php", true);
  xhttp.send();
}

function logout() {
  // Make an AJAX request to logout.php
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Redirect to login page after successful logout
      window.location.href = "login.html";
    }
  };

  xhttp.open("GET", "php/logout.php", true);
  xhttp.send();
}

updateUsername();

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Handle form submission
document
  .getElementById("reviewForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Get form values
    var name = document.getElementById("name").value;
    var jobTitle = document.getElementById("jobTitle").value;
    var rating = document.getElementById("rating").value;
    var review = document.getElementById("review").value;
    // Add new slide to swiper
    swiper.appendSlide(
      '<div class="swiper-slide">' +
        '<div class="group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-indigo-600 hover:shadow-sm">' +
        '<div class="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">' +
        '<svg class="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="currentColor" />' +
        "</svg>" +
        '<span class="text-base font-semibold text-indigo-600">' +
        rating +
        "</span>" +
        "</div>" +
        '<p class="text-base text-gray-600 leading-6  transition-all duration-500 pb-8 group-hover:text-gray-800">' +
        review +
        "</p>" +
        '<div class="flex items-center gap-5 border-t border-solid border-gray-200 pt-5">' +
        '<img class="h-10 w-10" src="https://pagedone.io/asset/uploads/1696229994.png" alt="avatar" />' +
        '<div class="block">' +
        '<h5 class="text-gray-900 font-medium transition-all duration-500  mb-1">' +
        name +
        "</h5>" +
        '<span class="text-sm leading-4 text-gray-500">' +
        jobTitle +
        "</span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("jobTitle").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("review").value = "";
  });

  function smoothScroll(event, targetId) {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    const offset = 80; // Adjust as needed
    const bodyRect = document.body.getBoundingClientRect().top;
    const targetRect = targetElement.getBoundingClientRect().top;
    const targetOffset = targetRect - bodyRect - offset;
    window.scrollTo({
        top: targetOffset,
        behavior: "smooth"
    });
}
