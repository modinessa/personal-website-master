export function unable(button) {
  button.target.disabled = false;
  button.target.classList.remove('disabled');
}

export function disable(button) {
  button.target.disabled = true;
  button.target.classList.add('disabled');
}
