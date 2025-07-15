document.addEventListener('DOMContentLoaded', function() {
    // Data for Workout Frequency Chart
    const workoutFrequencyCtx = document.getElementById('workoutFrequencyChart').getContext('2d');
    new Chart(workoutFrequencyCtx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Workout Frequency',
                data: [2, 1, 3, 0, 4, 2, 1],
                backgroundColor: '#FFA726', // Accent 1
                borderColor: '#FF6F00',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Data for Performance Over Time Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Performance Over Time',
                data: [50, 55, 60, 65, 70, 75, 80],
                borderColor: '#4CAF50', // Secondary
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Data for Goal Achievement Chart
    const goalAchievementCtx = document.getElementById('goalAchievementChart').getContext('2d');
    new Chart(goalAchievementCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                label: 'Goal Achievement',
                data: [60, 20, 20],
                backgroundColor: ['#3E64FF', '#4CAF50', '#E0E0E0'], // Primary, Secondary, Accent 2
                borderColor: '#FFFFFF',
                borderWidth: 2
            }]
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle form submission (for demonstration purposes only)
    document.getElementById('login').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Logged in!');
    });

    document.getElementById('signup').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signed up!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const workouts = [
        { name: "Full-Body Workout", difficulty: "beginner", duration: "medium", goal: "strength" },
        { name: "Push-Pull-Legs", difficulty: "intermediate", duration: "long", goal: "strength" },
        { name: "Upper-Lower Split", difficulty: "intermediate", duration: "medium", goal: "strength" },
        { name: "Body Part Split", difficulty: "advanced", duration: "long", goal: "strength" },
        { name: "Circuit Training", difficulty: "intermediate", duration: "short", goal: "endurance" },
        { name: "HIIT", difficulty: "intermediate", duration: "short", goal: "endurance" },
        { name: "Strength Training", difficulty: "intermediate", duration: "medium", goal: "strength" },
        { name: "Endurance Training", difficulty: "beginner", duration: "medium", goal: "endurance" },
        { name: "Flexibility and Mobility", difficulty: "beginner", duration: "short", goal: "flexibility" },
        { name: "CrossFit", difficulty: "advanced", duration: "long", goal: "strength" }
    ];

    function displayWorkouts(filteredWorkouts) {
        const workoutList = document.getElementById('workout-list');
        workoutList.innerHTML = '';
        filteredWorkouts.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.textContent = workout.name;
            workoutList.appendChild(workoutItem);
        });
    }

    function filterWorkouts() {
        const search = document.getElementById('search').value.toLowerCase();
        const difficulty = document.getElementById('difficulty').value;
        const duration = document.getElementById('duration').value;
        const goal = document.getElementById('goal').value;

        const filteredWorkouts = workouts.filter(workout => {
            return (!search || workout.name.toLowerCase().includes(search)) &&
                   (!difficulty || workout.difficulty === difficulty) &&
                   (!duration || workout.duration === duration) &&
                   (!goal || workout.goal === goal);
        });

        displayWorkouts(filteredWorkouts);
    }

    document.getElementById('filter-form').addEventListener('input', filterWorkouts);
    filterWorkouts(); // Display all workouts initially

    document.getElementById('search-image').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const imagePreview = document.getElementById('search-image-preview');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });
});
