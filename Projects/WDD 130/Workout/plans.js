document.addEventListener('DOMContentLoaded', () => {
    // Sample workout data
    const workouts = [
        { name: "Full-Body Workout", difficulty: "Beginner", duration: 45, goal: "Overall Strength" },
        { name: "Push-Pull-Legs", difficulty: "Intermediate", duration: 60, goal: "Muscle Development" },
        { name: "Upper-Lower Split", difficulty: "Intermediate", duration: 50, goal: "Overall Strength" },
        { name: "Body Part Split", difficulty: "Advanced", duration: 70, goal: "Muscle Development" },
        { name: "Circuit Training", difficulty: "Intermediate", duration: 30, goal: "Cardiovascular Fitness" },
        { name: "HIIT", difficulty: "Intermediate", duration: 20, goal: "Cardiovascular Fitness" },
        { name: "Strength Training", difficulty: "Intermediate", duration: 60, goal: "Overall Strength" },
        { name: "Endurance Training", difficulty: "Beginner", duration: 50, goal: "Muscular Endurance" },
        { name: "Flexibility and Mobility", difficulty: "Beginner", duration: 25, goal: "Flexibility" },
        { name: "CrossFit", difficulty: "Advanced", duration: 75, goal: "Overall Strength" }
    ];

    function displayWorkouts(filteredWorkouts) {
        const workoutList = document.getElementById('workoutList');
        workoutList.innerHTML = ''; // Clear existing workouts
        filteredWorkouts.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.classList.add('workout-item');
            workoutItem.textContent = `${workout.name} - ${workout.difficulty} - ${workout.duration} mins - ${workout.goal}`;
            workoutList.appendChild(workoutItem);
        });
    }

    function filterWorkouts() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const difficultyFilter = document.getElementById('difficultyFilter').value;
        const durationFilter = parseInt(document.getElementById('durationFilter').value, 10);
        const goalFilter = document.getElementById('goalFilter').value;

        const filteredWorkouts = workouts.filter(workout => {
            return (!searchInput || workout.name.toLowerCase().includes(searchInput)) &&
                   (!difficultyFilter || workout.difficulty === difficultyFilter) &&
                   (!durationFilter || workout.duration <= durationFilter) &&
                   (!goalFilter || workout.goal === goalFilter);
        });

        displayWorkouts(filteredWorkouts);
    }

    // Add event listeners
    document.getElementById('searchInput').addEventListener('input', filterWorkouts);
    document.getElementById('difficultyFilter').addEventListener('change', filterWorkouts);
    document.getElementById('durationFilter').addEventListener('input', filterWorkouts);
    document.getElementById('goalFilter').addEventListener('change', filterWorkouts);

    // Initial display of all workouts
    displayWorkouts(workouts);
});
