document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const lengthInput = document.getElementById('length');
    const passwordInput = document.getElementById('password');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', toggleGenerateButton);
    });

    lengthInput.addEventListener('input', toggleGenerateButton);

    generateBtn.addEventListener('click', generatePassword);

    passwordInput.addEventListener('mouseover', showTooltip);

    function toggleGenerateButton() {
        generateBtn.disabled = !isAnyCheckboxChecked() || !isValidLength();
    }

    function isAnyCheckboxChecked() {
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    }

    function isValidLength() {
        const length = parseInt(lengthInput.value, 10);
        return length >= 15 && length <= 20;
    }

    function generatePassword() {
        const length = parseInt(lengthInput.value, 10);
        const criteria = getSelectedCriteria();
        let password = '';
    
        while (password.length < length) {
            const randomCriteria = criteria[Math.floor(Math.random() * criteria.length)];
            password += randomCharacter(randomCriteria);
        }

        passwordInput.value = password;
    }

    function getSelectedCriteria() {
        const criteria = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                criteria.push(checkbox.value);
            }
        });
        return criteria;
    }

    function randomCharacter(type) {
        const characters = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            special: '!@#$%^&*()_+[]{}|;:,.<>?/~`'
        };
        const chars = characters[type];
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function showTooltip() {
        const tooltip = document.getElementById('copyTooltip');
        tooltip.style.visibility = 'visible';
        setTimeout(() => {
            tooltip.style.visibility = 'hidden';
        }, 2000);
    }
});
