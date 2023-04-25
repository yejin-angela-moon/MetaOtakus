const profilePictureImg = document.querySelector('.profile-picture img');
const userNameElement = document.querySelector('.user-name h2');
const bioElement = document.querySelector('.bio p');

(async function () {
  // Get the profile ID from local storage
  const profileId = localStorage.getItem('profileId');

  if (profileId) {
    try {
      // Fetch the profile data from the back-end
      const response = await fetch(`/api/profile/${profileId}`);
      const profile = await response.json();

      // Update the elements with the fetched data
      if (profile.profilePicture) {
        profilePictureImg.src = profile.profilePicture;
      }
      if (profile.userName) {
        userNameElement.textContent = profile.userName;
      }
      if (profile.bio) {
        bioElement.textContent = profile.bio;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
})();
