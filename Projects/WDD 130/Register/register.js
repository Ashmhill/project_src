let participantCount = 1;

document.getElementById('addParticipant').addEventListener('click', function() {
  participantCount++;
  let newParticipant = document.createElement('section');
  newParticipant.className = 'participant' + participantCount;
  newParticipant.innerHTML = `
    <p>Participant ${participantCount}</p>
    <div class="item">
      <label for="fname${participantCount}"> First Name<span>*</span></label>
      <input id="fname${participantCount}" type="text" name="fname${participantCount}" value="" required />
    </div>
    <div class="item activities">
      <label for="activity${participantCount}">Activity #<span>*</span></label>
      <input id="activity${participantCount}" type="text" name="activity${participantCount}" />
    </div>
    <div class="item">
      <label for="fee${participantCount}">Fee ($)<span>*</span></label>
      <input id="fee${participantCount}" type="number" name="fee${participantCount}" />
    </div>
    <div class="item">
      <label for="date${participantCount}">Desired Date <span>*</span></label>
      <input id="date${participantCount}" type="date" name="date${participantCount}" />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${participantCount}" name="grade${participantCount}">
        <option selected value="" disabled selected></option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>
    </div>
  `;
  document.getElementById('participants').appendChild(newParticipant);
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let totalFees = 0;
  for (let i = 1; i <= participantCount; i++) {
    let fee = parseInt(document.getElementById('fee' + i).value);
    if (!isNaN(fee)) {
      totalFees += fee;
    }
  }
  let adultName = document.getElementById('adult_name').value;
  let summary = document.getElementById('summary');
  summary.innerHTML = `Thank you ${adultName} for registering. You have registered ${participantCount} participants and owe $${totalFees} in Fees.`;
  summary.classList.remove('hide');
});
