const $form = document.getElementById("form-subscribe");
const $emailInput = document.getElementById("input-email");
const $errorMessage = document.getElementById("form-error");
const $submitBtn = document.querySelector(".form__submit");
const $dialog = document.getElementById("dialog-thanks");


function getEmailValue() {
   return $emailInput.value.trim().toLowerCase();
}

function markInputAsInvalid() {
   $emailInput.classList.add("form__input--invalid");
   $errorMessage.classList.add("form__error--visible");
   $submitBtn.disabled = true;
}

function markInputAsValid() {
   $emailInput.classList.add("form__input--valid");
   $errorMessage.classList.remove("form__error--visible");
   $submitBtn.disabled = false;
}

function validateEmailInput() {
   const email = getEmailValue();
   const REGEX = /^[\w.-]+@[\w.-]+(\.\w{2,})+$/;
   const isValid = REGEX.test(email);

   if (email === "") {
      markInputAsInvalid();
      return;
   }

   !isValid ? markInputAsInvalid() : markInputAsValid();
}

function resetForm() {
   $form.reset();
   $emailInput.classList.remove("form__input--valid");
   $emailInput.classList.remove("form__input--invalid");
   $errorMessage.classList.remove("form__error--visible");
   $submitBtn.disabled = true;
   $emailInput.focus();
}

function handleFormSubmit(e) {
   e.preventDefault();
   $dialog.showModal();
   resetForm();
}

$emailInput.addEventListener("input", validateEmailInput);
$form.addEventListener("submit", handleFormSubmit);
