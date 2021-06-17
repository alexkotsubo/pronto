document.addEventListener('DOMContentLoaded', function(e) {
  const contactForms = document.querySelectorAll('._form-validate');

  for(let i = 0, length = contactForms.length; i < length; i++) {
    contactForms[i].addEventListener('submit', formSend);
    async function formSend(e) {
      e.preventDefault();
      let error = formValidate(contactForms[i]);
      let formData = new FormData(contactForms[i]);
      formData.append('image', formImage.files[0]);

      if (error === 0) {
        contactForms[i].classList.add('_sending');
        let response = await fetch(contactForms[i].getAttribute('action'), {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          let result = await response.json();
          alert(result.message);
          formPreview.innerHTML = '';
          contactForms[i].reset();
          contactForms[i].classList.remove('_sending');
        } else {
          alert('Ошибка');
          contactForms[i].classList.remove('_sending');
        }
      } else {
        alert('Заполните обязательные поля');
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for(let i = 0, length = formReq.length; i < length; i++) {
      formRemoveError(formReq[i]);
      if (formReq[i].classList.contains('_email')) {
        if (emailTest(formReq[i])) {
          formAddError(formReq[i]);
          error++;
        }
      } else if (formReq[i].classList.contains('_phone')) {
        if (phoneTest(formReq[i])) {
          formAddError(formReq[i]);
          error++;
        }
      } else if (formReq[i].classList.contains('_password')) {
        if (passwordTest(formReq[i])) {
          formAddError(formReq[i]);
          error++;
        }
      } else if (formReq[i].getAttribute('type') === 'checkbox' && formReq[i].checked === false) {
        formAddError(formReq[i]);
        error++;
      } else {
        if (formReq[i].value === '') {
          formAddError(formReq[i]);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.classList.remove('_error');
  }

  function phoneTest(input) {
    return !/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/.test(input.value);
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+/.test(input.value);
  }

  function passwordTest(input) {
    return !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(input.value);
  }

  const formImage = document.getElementById('formImage');
  const formPreview = document.getElementById('formPreview');

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Разрешены только изображения.');
      formImage.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть менее 2 МБ.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    }
    reader.onerror = function(e) {
      alert('Ошибка');
    }
    reader.readAsDataURL(file);
  }
});