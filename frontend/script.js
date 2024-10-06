// Handle user registration
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    alert(result.message);
});

// Handle user login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    console.log("Login Response:", result); // Debugging line
    alert(result.message);

    // Store the username in local storage for future requests
    if (result.token) {
        localStorage.setItem('username', username);
        // Automatically fetch profile after successful login
        fetchProfile(username);
        /*you did this because b4 you had a get profile button and
        you could change the token to another user's*/
    }
});

// Function to fetch the user profile
async function fetchProfile(username) {
    const response = await fetch(`http://localhost:3000/profile`, {
        method: 'GET',
        headers: { 'x-username': username }
    });

    const result = await response.json();
    
    if (response.ok) {
        const profileContainer = document.getElementById('profileResult');
        profileContainer.innerHTML = `
        <p><b>Username:</b> ${result.user.username}</p>
        <p><b>Email:</b> ${result.user.email}</p>
        `;
    } else {
        alert(`Error fetching profile: ${result.message}`);
    }
}
