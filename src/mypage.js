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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('upload-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
      const response = await fetch('/uploads', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      

      if (!response.ok) {
        const message = await response.json();
        alert(`Error: ${message.message}`);
        return;
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data.filePath);
      // Display the uploaded image or video in your UI, or perform any other actions you'd like
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  });
});

async function fetchUserPosts() {
  try {
    // Replace the URL with the route to your server endpoint that returns the user's posts
    const response = await fetch('/user-posts');
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }
    const posts = await response.json();

    const container = document.getElementById('posts-container');
    posts.forEach((post) => {
      const postElement = document.createElement('img');
      postElement.src = post.filePath; // Use the file path saved in the database
      postElement.classList.add('post');
      container.appendChild(postElement);
    });
  } catch (err) {
    console.error('Error fetching user posts:', err);
  }
}

fetchUserPosts();


