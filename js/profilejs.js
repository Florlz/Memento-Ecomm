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

// Function to fetch user information via AJAX
function fetchUserInfo() {
  // AJAX request
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Parse JSON response
      const userData = JSON.parse(this.responseText);
      // Check if user data is not empty and does not contain an error
      if (
        Object.keys(userData).length !== 0 &&
        userData.constructor === Object &&
        !userData.error
      ) {
        // Update profile info on the page
        document.getElementById("profile-card").innerHTML = `
                <!-- Profile Header -->
                <div class="flex items-center">
        <!-- Profile Picture -->
        <img src="${userData.profile_picture}" alt="Profile Picture" class="w-24 h-24 rounded-full mr-6">
        <!-- User Information -->
        <div>
            <!-- User Full Name -->
            <h2 class="text-3xl font-semibold text-gray-800 font-poppins">${userData.firstname} ${userData.lastname}</h2>
            <!-- Username -->
            <p class="text-gray-600 text-sm mt-1">@${userData.username}</p>
            <!-- Email -->
            <p class="text-gray-600 mt-2"><span class="font-semibold text-gray-700">Email:</span> ${userData.email}</p>
            <!-- Contact Number -->
            <p class="text-gray-600"><span class="font-semibold text-gray-700">Contact:</span> ${userData.contact_number}</p>
            <!-- Address -->
            <p class="text-gray-600"><span class="font-semibold text-gray-700">Address:</span> ${userData.address}</p>
        </div>
    </div>
            `;
      } else {
        // Handle error - display error message
        document.getElementById(
          "profile-card"
        ).innerHTML = `<p class="text-red-500">Error: ${userData.error}</p>`;
      }
    }
  };
  // Make GET request to PHP script with user ID from session
  xhttp.open("GET", "php/get_user_info.php", true);
  xhttp.send();
}

// Call fetchUserInfo function when the page loads
fetchUserInfo();

// Call updateUsername function when the page loads
updateUsername();

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});
