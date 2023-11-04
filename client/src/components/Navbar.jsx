function NavigationBar() {
  const redirectToHome = () => {
    // Replace this with your home navigation logic
    console.log('Redirect to Home');
  };

  const redirectToProfile = () => {
    // Replace this with your profile navigation logic
    console.log('Redirect to Profile');
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={redirectToHome}>
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="profile-icon" onClick={redirectToProfile}>
        <img src="profile-icon.png" alt="Profile" />
      </div>
    </div>
  );
}

export default NavigationBar;