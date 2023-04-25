document.getElementById('edit-profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const profile = {
      name: document.getElementById('name').value,
      bio: document.getElementById('bio').value,
      image: document.getElementById('profile-picture').files[0],
    };
  
    try {
      await saveProfile(profile);
      // Redirect the user back to their 'my page' with the updated information
      window.location.href = 'mypage.html';
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  });
  