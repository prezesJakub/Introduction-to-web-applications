document.querySelectorAll('#minLength, #maxLength').forEach(input => {
    input.addEventListener('keydown', (event) => {
      const key = event.key;

      if (
        !key.match(/[0-9]/) && 
        key !== 'Backspace' && 
        key !== 'ArrowLeft' && 
        key !== 'ArrowRight' && 
        key !== 'Delete' && 
        key !== 'Tab'
      ) {
        event.preventDefault();
      }
    });
  });

document.getElementById('generatePassword').addEventListener('click', () => {
    const minLength = parseInt(document.getElementById('minLength').value);
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const includeUpperCase = document.getElementById('includeUpperCase').checked;
    const includeSpecialChar = document.getElementById('includeSpecialChar').checked;

    if(isNaN(minLength) || isNaN(maxLength) || minLength < 1 || maxLength < minLength) {
        alert('Niepoprawne wartości dla minimalnej i maksymalnej długości hasła');
        return;
    }

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const numbers = '0123456789';

    let characterPool = lowercaseChars + numbers;
    if(includeUpperCase) characterPool += uppercaseChars;
    if(includeSpecialChar) characterPool += specialChars;

    const passwordLength = Math.floor(Math.random() * (maxLength-minLength+1)+minLength);
    let password = '';
    for(let i=0; i<passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    alert(`Wygenerowano hasło: ${password}`);
});