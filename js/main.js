// 🎯 Select key DOM elements
const $form = document.getElementById("form-subscribe");       // Main subscription form
const $emailInput = document.getElementById("input-email");    // Email input field
const $errorMessage = document.getElementById("form-error");   // Inline error message
const $submitBtn = document.querySelector(".form__submit");    // "Notify Me" button
const $dialog = document.getElementById("dialog-thanks");      // Confirmation <dialog>

/**
 * 📥 Returns sanitized email value:
 * - trims leading/trailing whitespace
 * - converts to lowercase for consistency
 */
function getEmailValue() {
   return $emailInput.value.trim().toLowerCase();
}

/**
 * ❌ Marks the email input as invalid:
 * - removes valid styling
 * - adds invalid styling
 * - shows the error message
 * - disables the submit button for screen readers
 * - prevents keyboard focus on the button
 */
function markInputAsInvalid() {
   $emailInput.classList.remove("form__input--valid");
   $emailInput.classList.add("form__input--invalid");
   $errorMessage.classList.add("form__error--visible");
   $submitBtn.setAttribute("aria-disabled", "true");
   $submitBtn.tabIndex = -1; // remove from tab order
}

/**
 * ✅ Marks the email input as valid:
 * - removes invalid styling
 * - applies valid styling
 * - hides the error message
 * - enables the submit button for screen readers
 * - restores keyboard focus ability
 */
function markInputAsValid() {
   $emailInput.classList.remove("form__input--invalid");
   $emailInput.classList.add("form__input--valid");
   $errorMessage.classList.remove("form__error--visible");
   $submitBtn.setAttribute("aria-disabled", "false");
   $submitBtn.tabIndex = 0; // restore tab focus
}

/**
 * 🧪 Validates email on every input:
 * - an empty field triggers invalid state
 * - a field not matching regex triggers invalid state
 * - a valid email triggers valid state
 */
function validateEmailInput() {
   const email = getEmailValue();
   const REGEX = /^[\w.-]+@[\w.-]+(\.\w{2,})+$/;
   const isValid = REGEX.test(email);

   if (email === "") {
      markInputAsInvalid();
      return;
   }

   isValid ? markInputAsValid() : markInputAsInvalid();
}

/**
 * 🔁 Resets the form after successful submission:
 * - clears the form fields
 * - removes all validation styling
 * - hides any error message
 * - disables the submit button again
 */
function resetForm() {
   $form.reset();
   $emailInput.classList.remove("form__input--valid", "form__input--invalid");
   $errorMessage.classList.remove("form__error--visible");
   $submitBtn.setAttribute("aria-disabled", "true");
   $submitBtn.removeAttribute("tabindex");
}

/**
 * 📤 Handles form submission:
 * - prevents submission if submission is disabled
 * - prevents default form action
 * - displays confirmation <dialog>
 * - resets the form afterwards
 */
function handleFormSubmit(e) {
   if ($submitBtn.getAttribute("aria-disabled") === "true") {
      e.preventDefault();
      return;
   }

   e.preventDefault();
   $dialog.showModal();
   resetForm();
}

// 📡 Event listeners for live validation and form submission
$emailInput.addEventListener("input", validateEmailInput);
$form.addEventListener("submit", handleFormSubmit);
