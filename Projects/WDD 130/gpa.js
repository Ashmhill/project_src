// Function to get grades from the input field
function getGrades() {
    const gradesInput = document.querySelector("#grades").value;
    return gradesInput.split(',').map(grade => grade.trim().toUpperCase());
  }
  
  // Function to look up the GPA points for a given grade
  function lookupGrade(grade) {
    if (grade === 'A') return 4.0;
    if (grade === 'B') return 3.0;
    if (grade === 'C') return 2.0;
    if (grade === 'D') return 1.0;
    if (grade === 'F') return 0.0;
    return null; // For invalid grades
  }
  
  // Function to calculate the GPA
  function calculateGpa(grades) {
    const gradePoints = grades.map(lookupGrade).filter(point => point !== null);
    const totalPoints = gradePoints.reduce((total, point) => total + point, 0);
    const gpa = totalPoints / gradePoints.length;
    return gpa.toFixed(2); // Round to 2 decimal places
  }
  
  // Function to display the GPA
  function displayGpa(gpa) {
    const outputElement = document.querySelector("#output");
    outputElement.textContent = `Your GPA is: ${gpa}`;
  }
  
  // Function to handle the click event
  function clickHandler() {
    const grades = getGrades();
    const gpa = calculateGpa(grades);
    displayGpa(gpa);
  }
  
  // Adding event listener to the button
  document
    .querySelector("#submitButton")
    .addEventListener("click", clickHandler);
  