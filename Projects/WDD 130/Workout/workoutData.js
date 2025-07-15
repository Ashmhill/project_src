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
