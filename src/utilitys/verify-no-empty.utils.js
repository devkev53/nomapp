export const verifyNoEmpty = () => {
  const inputs = document.querySelectorAll('.input_group2__input')
  const textareas = document.querySelectorAll('.text_group__textarea')
  inputs.forEach(input => {
    if (input.value !== '') {
      input.classList.add('no_empty')
    } else {
      input.classList.remove('no_empty')
    }
  });
  textareas.forEach(text => {
    if (text.value !== '') {
      text.classList.add('no_empty')
    } else {
      text.classList.remove('no_empty')
    }
  });
}