function togglePaymentDetails() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const creditCardContainer = document.getElementById('creditCardContainer');
    const paypalContainer = document.getElementById('paypalContainer');
  
    if (paymentMethod === 'creditCard') {
      creditCardContainer.classList.remove('hide');
      paypalContainer.classList.add('hide');
      paypalContainer.querySelector('input').removeAttribute('required');
      creditCardContainer.querySelector('input').setAttribute('required', 'true');
    } else if (paymentMethod === 'paypal') {
      paypalContainer.classList.remove('hide');
      creditCardContainer.classList.add('hide');
      creditCardContainer.querySelector('input').removeAttribute('required');
      paypalContainer.querySelector('input').setAttribute('required', 'true');
    } else {
      creditCardContainer.classList.add('hide');
      paypalContainer.classList.add('hide');
      creditCardContainer.querySelector('input').removeAttribute('required');
      paypalContainer.querySelector('input').removeAttribute('required');
    }
  }
  
  function showErrors(errors) {
    const errorEl = document.querySelector(".errors");
    const html = errors.map((error) => `<p>${error}</p>`);
    errorEl.innerHTML = html.join("");
  }
  
  function validateForm(event) {
    const theForm = event.target;
    const errors = [];
    let isValid = true;
  
    const name = theForm.querySelector('#name').value;
    if (name !== 'Bob') {
      errors.push('Only "Bob" can submit the form.');
      isValid = false;
    }
  
    const creditCardNumber = theForm.querySelector('#creditCardNumber').value;
    if (creditCardNumber !== '1234123412341234') {
      errors.push('Invalid credit card number.');
      isValid = false;
    }
  
    if (!isValid) {
      event.preventDefault();
      showErrors(errors);
      return false;
    }
  }
  
  document.getElementById('paymentMethod').addEventListener('change', togglePaymentDetails);
  document.getElementById('checkoutForm').addEventListener('submit', validateForm);
  