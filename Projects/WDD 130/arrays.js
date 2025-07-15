document.addEventListener("DOMContentLoaded", function() {
    // Activity 1 - Map
    const steps = ["one", "two", "three"];
    const listTemplate = (step) => `<li>${step}</li>`;
    const stepsHtml = steps.map(listTemplate).join('');
    document.querySelector("#myList").innerHTML = stepsHtml;

    // Activity 2 - Map
    const grades = ['A', 'B', 'A'];
    const gradeToGpa = (grade) => {
        switch (grade) {
            case 'A':
                return 4;
            case 'B':
                return 3;
            case 'C':
                return 2;
            case 'D':
                return 1;
            case 'F':
                return 0;
            default:
                return 0;
        }
    }
    const gpaPoints = grades.map(gradeToGpa);
    document.querySelector("#gpaPoints").textContent = `GPA Points: ${gpaPoints.join(', ')}`;

    // Activity 3 - Reduce
    const totalGpa = gpaPoints.reduce((acc, curr) => acc + curr, 0);
    const averageGpa = totalGpa / gpaPoints.length;
    document.querySelector("#averageGpa").textContent = `Average GPA: ${averageGpa}`;

    // Activity 4 - Filter
    const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
    const longFruits = fruits.filter(fruit => fruit.length > 6);
    document.querySelector("#filteredFruits").textContent = `Filtered Fruits: ${longFruits.join(', ')}`;

    // Activity 5 - indexOf
    const numbers = [12, 34, 21, 54];
    const luckyNumber = 21;
    const index = numbers.indexOf(luckyNumber);
    document.querySelector("#luckyNumberIndex").textContent = `Index of Lucky Number: ${index}`;
});
