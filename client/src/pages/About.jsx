import { useState, useEffect } from "react";
import "../styles/About.css";
import GitHubIcon from "/src/images/github-mark-white.svg";
import LoadingScreen from "./Loading"; // Import the LoadingScreen component

const About = () => {
  const [repoDetails, setRepoDetails] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchRepoDetails = async () => {
      const response = await fetch(
        "https://api.github.com/repos/project1o1/EduSign"
      );
      const data = await response.json();
      setRepoDetails(data);
    };

    const fetchUserDetails = async () => {
      const users = ["pavanmanishd", "Vishal0129"];
      const userDetailsList = await Promise.all(
        users.map(async (user) => {
          const response = await fetch(`https://api.github.com/users/${user}`);
          return response.json();
        })
      );
      setUserDetails(userDetailsList);
    };

    // Simulate loading for 2 seconds (adjust as needed)
    setTimeout(() => {
      fetchRepoDetails();
      fetchUserDetails();
      setIsLoading(false); // Mark loading as complete
    }, 2000);

  }, []);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>

      {isLoading ? ( // Display loading screen while data is being fetched
        <LoadingScreen />
      ) : (
        <>
          <div className="mission-section">
            <h2>Our Mission</h2>
            <p>
              Our mission at EduSign is to empower individuals with hearing and
              speech disabilities by providing them with innovative communication
              tools and resources. We strive to create an inclusive and supportive
              environment where everyone can express themselves freely and connect
              with others effortlessly. Through our commitment to accessibility and
              technology, we aim to break down barriers and enhance the quality of
              life for individuals with diverse communication needs.
            </p>
          </div>

          <div className="github-section">
            <h2>GitHub</h2>
            <div className="github-card">
              {repoDetails ? (
                <div>
                  <img src={GitHubIcon} alt="GitHub Logo" className="github-logo" />
                  <div>
                    <p>
                      <strong>Repository Name:</strong> {repoDetails.full_name}
                    </p>
                    <p>
                      <strong>Description:</strong> {repoDetails.description}
                    </p>
                    <p>
                      <a
                        href={repoDetails.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Our GitHub Repository
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <p>Loading GitHub details...</p>
              )}
            </div>
          </div>

          <div className="team-section">
            <h2>Team</h2>
            {userDetails.map((user, index) => (
              <div className="team-member" key={index}>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="user-container">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="github-avatar"
                    />
                    <p>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{user.login}
                      </a>
                    </p>
                    {/* {user.bio && <p className="user-bio">{user.bio}</p>} */}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default About;
