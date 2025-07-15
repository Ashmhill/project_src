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
})