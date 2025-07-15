// Define the course object
const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
      { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T' },
      { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A' }
    ],
    setNameAndNumber: function(courseName, courseNumber) {
      this.code = courseNumber;
      this.name = courseName;
    },
    renderSections: function(sections) {
      const table = document.querySelector('#sections');
      table.innerHTML = '';
      sections.forEach(section => {
        const row = table.insertRow();
        row.insertCell().textContent = section.sectionNum;
        row.insertCell().textContent = section.roomNum;
        row.insertCell().textContent = section.enrolled;
        row.insertCell().textContent = section.days;
        row.insertCell().textContent = section.instructor;
      });
    },
    enrollStudent: function(sectionNum) {
      const sectionIndex = this.sections.findIndex(section => section.sectionNum === sectionNum);
      if (sectionIndex !== -1) {
        this.sections[sectionIndex].enrolled++;
        this.renderSections(this.sections);
      }
    },
    dropStudent: function(sectionNum) {
      const sectionIndex = this.sections.findIndex(section => section.sectionNum === sectionNum);
      if (sectionIndex !== -1 && this.sections[sectionIndex].enrolled > 0) {
        this.sections[sectionIndex].enrolled--;
        this.renderSections(this.sections);
      }
    },
    changeEnrollment: function(sectionNum, add = true) {
      const sectionIndex = this.sections.findIndex(section => section.sectionNum === sectionNum);
      if (sectionIndex !== -1) {
        add ? this.sections[sectionIndex].enrolled++ : this.sections[sectionIndex].enrolled--;
        this.renderSections(this.sections);
      }
    }
  };
  
  // Event listeners
  document.querySelector('#enrollStudent').addEventListener('click', function() {
    const sectionNum = document.querySelector('#sectionNumber').value;
    aCourse.enrollStudent(parseInt(sectionNum));
  });
  
  document.querySelector('#dropStudent').addEventListener('click', function() {
    const sectionNum = document.querySelector('#sectionNumber').value;
    aCourse.dropStudent(parseInt(sectionNum));
  });
  
  // Example usage
  aCourse.setNameAndNumber("JavaScript Language", "CSE121b");
  aCourse.renderSections(aCourse.sections);
  