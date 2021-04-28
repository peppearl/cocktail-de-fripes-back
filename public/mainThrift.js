const select = (selector) => document.querySelector(selector);

const form = select('.form');
const message = select('.message');

const displayMessage = (text, color) => {
  message.style.visibility = 'visible';
  message.style.backgroundColor = color;
  message.innerText = text;
  setTimeout(() => {
    message.style.visibility = 'hidden';
  }, 3000);
};

const validateForm = () => {
  const name = select('#name').value.trim();
  const content = select('#content').value.trim();
  const thumbnail = select('#thumbnail').value;
  const city = select('#city').value.trim();
  const style = select('#style').value;
  const address = select('#address').value.trim();
  const hours = select('#hours').value.trim();
  const tel = select('#tel').value.trim();
  const instagram = select('#instagram').value.trim();
  const facebook = select('#facebook').value.trim();

  const exceptedImageFiles = ['jpg', 'jpeg', 'png'];

  if (!name || !content || !thumbnail || !city || style == '0' || !address || !hours || !tel) {
    // show  some error
    return displayMessage('Le champ ne peut être vide', 'red');
  }

  const extension = thumbnail.split('.').pop();
  if (!exceptedImageFiles.includes(extension)) {
    return displayMessage('Le fichier Image n\'est pas valide', 'red');
  }

  return true;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate our form
  const valid = validateForm();

  if (valid) {
    // Submit this form
    const formData = new FormData(form);
    await postData(formData);
  }
});

const resetForm = () => {
  select('#name').value = '';
  select('#content').value = '';
  select('#thumbnail').value = null;
  select('#city').value = '';
  select('#style').value = '0';
  select('#hours').value = '';
  select('#address').value = '';
  select('#tel').value = '';
  select('#instagram').value = null;
  select('#facebook').value = null;
};

const postData = async (data) => {
  const result = await fetch('/api/createThrift', {
    method: 'POST',
    body: data,
  });

  if (result.ok) {
    const response = await result.json();
    if (response.success) {
      displayMessage(response.message, 'green');
      resetForm();
    }
    if (!response.success) {
      displayMessage(response.message, 'red');
    }
  }
};
