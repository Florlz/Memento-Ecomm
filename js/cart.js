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