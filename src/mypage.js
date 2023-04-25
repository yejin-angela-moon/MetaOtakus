const profilePictureImg = document.querySelector('.profile-picture img');
const userNameElement = document.querySelector('.user-name h2');
const bioElement = document.querySelector('.bio p');

// Get the values from local storage
const profilePicture = localStorage.getItem('profilePicture');
const userName = localStorage.getItem('userName');
const bio = localStorage.getItem('bio');

// Update the elements with the saved values
if (profilePicture) {
  profilePictureImg.src = profilePicture;
}
if (userName) {
  userNameElement.textContent = userName;
}
if (bio) {
  bioElement.textContent = bio;
}
