/**
 *
 * AuthRegister
 *
 * Pages.Authentication.Register.html page content scripts. Initialized from scripts.js file.
 *
 *
 */

class AuthRegister {
  constructor() {
    // Initialization of the page plugins
    this._initForm();
  }

  // Form validation
  _initForm() {
    const form = document.getElementById('registerForm');
    if (!form) {
      return;
    }
    const validateOptions = {
      rules: {
        affiliateCode: {
          required: true,
        },
      },
      messages: {
        affiliateCode: {
          required: 'Seu código de afiliado é ogrigatório!',
        },
      },
    };
    jQuery(form).validate(validateOptions);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (jQuery(form).valid()) {
        const formValues = {
          email: form.querySelector('[name="affiliateCode"]').value,
        };
        console.log(formValues);
        return;
      }
    });
  }
}
