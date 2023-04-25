document.getElementById('edit-profile-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const profilePictureInput = document.getElementById('profile-picture-input');
    const userNameInput = document.getElementById('user-name-input');
    const bioInput = document.getElementById('bio-input');
  
    // Save the values in local storage
    localStorage.setItem('profilePicture', profilePictureInput.value);
    localStorage.setItem('userName', userNameInput.value);
    localStorage.setItem('bio', bioInput.value);
  
    // Redirect to the "mypage.html" after saving the data
    window.location.href = 'mypage.html';
  });
  