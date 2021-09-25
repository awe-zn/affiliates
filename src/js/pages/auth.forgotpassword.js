/**
 *
 * AuthForgotPassword
 *
 * Pages.Authentication.ForgotPassword.html page content scripts. Initialized from scripts.js file.
 *
 *
 */

class AuthForgotPassword {
  constructor() {
    // Initialization of the page plugins
    this._initForm();
  }

  // Form validation
  _initForm() {
    const form = document.getElementById('forgotPasswordForm');
    if (!form) {
      return;
    }
    const validateOptions = {
      rules: {
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        email: {
          required: 'O email é obrigatório!',
          email: 'Seu endereço de email precisa estar no padrão correto!',
        },
      },
    };
    jQuery(form).validate(validateOptions);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (jQuery(form).valid()) {
        const formValues = {
          email: form.querySelector('[name="email"]').value,
        };
        console.log(formValues);
        return;
      }
    });
  }
}
