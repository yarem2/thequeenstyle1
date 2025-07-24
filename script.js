document.addEventListener('DOMContentLoaded', function() {
    // Get all screen elements
    const splashScreen = document.getElementById('splashScreen');
    const loginScreen = document.getElementById('loginScreen');
    const dashboardScreen = document.getElementById('dashboardScreen');
    const searchScreen = document.getElementById('searchScreen');

    // Get navigation elements
    const splashLoginButton = document.getElementById('splashLoginButton');
    const loginBackArrow = document.getElementById('loginBackArrow');
    const loginForm = document.getElementById('loginForm');
    const dashboardMenuIcon = document.getElementById('dashboardMenuIcon');
    const searchMenuIcon = document.getElementById('searchMenuIcon');
    const logoutButtonDashboard = document.getElementById('logoutButtonDashboard');
    const logoutButtonSearch = document.getElementById('logoutButtonSearch');

    // Get Dashboard dynamic elements
    const profilePic = document.getElementById('profilePic');
    const profileName = document.getElementById('profileName');
    const profileAlias = document.getElementById('profileAlias');
    const commissionValue = document.getElementById('commissionValue');
    const totalCommissionValue = document.getElementById('totalCommissionValue');
    const totalProductSaleValue = document.getElementById('totalProductSaleValue');
    const totalProductGoalValue = document.getElementById('totalProductGoalValue');

    // --- User Data (KALIYA TUSAALE AHAAN - HA ISTICMAALIN SIDAN PRODUCTION!) ---
    // User credentials and associated dashboard data
    const usersData = {
        'admin': {
            password: '12345',
            profile: {
                pic: 'images/profile_pic.jpg', // Default or generic image for admin
                fullName: 'Admin User',
                alias: 'Admin'
            },
            dashboard: {
                commission: '$500',
                totalCommission: '$15000',
                totalProductSale: '250',
                totalProductGoal: '500'
            }
        },
        'sahro': {
            password: 'sahro123',
            profile: {
                pic: 'images/sahro_profile.jpg',
                fullName: 'Sahro Ahmed Mustaf',
                alias: 'Sahro'
            },
            dashboard: {
                commission: '$2',
                totalCommission: '$40',
                totalProductSale: '5',
                totalProductGoal: '100'
            }
        },
        'hamdi': {
            password: 'hamdiPass',
            profile: {
                pic: 'images/hamdi_profile.jpg',
                fullName: 'Hamdi Hassan Muuse',
                alias: 'Hamdi'
            },
            dashboard: {
                commission: '$10',
                totalCommission: '$150',
                totalProductSale: '15',
                totalProductGoal: '50'
            }
        },
        'user1': {
            password: 'pass1',
            profile: {
                pic: 'https://via.placeholder.com/80/cccccc/ffffff?text=U1', // Generic user image
                fullName: 'User One',
                alias: 'One'
            },
            dashboard: {
                commission: '$5',
                totalCommission: '$80',
                totalProductSale: '10',
                totalProductGoal: '30'
            }
        }
    };
    // ---------------------------------------------------------------------------------

    let currentLoggedInUser = null; // To keep track of who is logged in

    // Function to show a specific screen and hide others
    function showScreen(screenToShow) {
        // Hide all screens first
        splashScreen.classList.remove('active');
        loginScreen.classList.remove('active');
        dashboardScreen.classList.remove('active');
        searchScreen.classList.remove('active');

        // Show the desired screen
        screenToShow.classList.add('active');

        // Adjust body background color based on the screen
        if (screenToShow === loginScreen) {
            document.body.style.backgroundColor = '#2F6FDF'; // Blue for login
        } else if (screenToShow === splashScreen) {
            document.body.style.backgroundColor = 'white'; // White for splash
        } else {
            document.body.style.backgroundColor = '#f0f2f5'; // Light grey for others
        }
    }

    // Function to update Dashboard with current user's data
    function updateDashboard() {
        if (currentLoggedInUser && usersData[currentLoggedInUser]) {
            const userData = usersData[currentLoggedInUser];

            profilePic.src = userData.profile.pic;
            profileName.textContent = userData.profile.fullName;
            profileAlias.textContent = userData.profile.alias;

            commissionValue.textContent = userData.dashboard.commission;
            totalCommissionValue.textContent = userData.dashboard.totalCommission;
            totalProductSaleValue.textContent = userData.dashboard.totalProductSale;
            totalProductGoalValue.textContent = userData.dashboard.totalProductGoal;
        }
    }

    // Function to handle logout
    function handleLogout() {
        if (confirm('Ma hubtaa inaad dooneyso inaad ka baxdo?')) {
            currentLoggedInUser = null; // Clear logged-in user
            showScreen(splashScreen); // Redirect to splash screen on logout
            // Optional: Clear login fields just in case
            document.getElementById('username').value = '';
            document.getElementById('serialNumber').value = '';
        }
    }

    // Initial screen to show (Splash Screen)
    showScreen(splashScreen);

    // === Event Listeners for Navigation ===

    // Splash screen's "LOG IN" button
    if (splashLoginButton) {
        splashLoginButton.addEventListener('click', function() {
            showScreen(loginScreen);
        });
    }

    // Login screen's back arrow
    if (loginBackArrow) {
        loginBackArrow.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            showScreen(splashScreen);
        });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const usernameInput = document.getElementById('username');
            const serialNumberInput = document.getElementById('serialNumber');

            const username = usernameInput.value.trim();
            const serialNumber = serialNumberInput.value.trim();

            // Simple validation: Check if fields are empty
            if (username === '' || serialNumber === '') {
                alert('Fadlan buuxi dhammaan goobaha.');
                return;
            }

            // --- Check against multiple users (KALIYA TUSAALE AHAAN!) ---
            if (usersData[username] && usersData[username].password === serialNumber) {
                alert('Soo galitaan guul leh!');
                currentLoggedInUser = username; // Set the logged-in user
                updateDashboard(); // Update dashboard with their data
                showScreen(dashboardScreen); // Go to Dashboard after successful login
                // Clear login fields after successful login
                usernameInput.value = '';
                serialNumberInput.value = '';
            } else {
                alert('Magaca isticmaalaha ama lambarka serial-ka ma saxna. Fadlan isku day mar kale.');
                usernameInput.value = '';
                serialNumberInput.value = '';
            }
        });
    }

    // Dashboard Menu Icon (Example: navigate to Search Screen)
    if (dashboardMenuIcon) {
        dashboardMenuIcon.addEventListener('click', function() {
            showScreen(searchScreen);
        });
    }

    // Search Menu Icon (Example: navigate to Dashboard Screen or back)
    if (searchMenuIcon) {
        searchMenuIcon.addEventListener('click', function() {
            showScreen(dashboardScreen);
        });
    }

    // Logout Buttons
    if (logoutButtonDashboard) {
        logoutButtonDashboard.addEventListener('click', handleLogout);
    }
    if (logoutButtonSearch) {
        logoutButtonSearch.addEventListener('click', handleLogout);
    }


    // --- Additional JavaScript for the screens (if needed) ---
    // Example: If you wanted search functionality
    const serialSearchInput = document.getElementById('serialSearchInput');
    if (serialSearchInput) {
        serialSearchInput.addEventListener('keyup', function() {
            // Implement search logic here
            const searchTerm = serialSearchInput.value.toLowerCase();
            const results = document.querySelectorAll('.results-list .result-item');

            results.forEach(item => {
                const name = item.querySelector('.item-name').textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    item.style.display = 'flex'; // Show item
                } else {
                    item.style.display = 'none'; // Hide item
                }
            });
        });
    }

});