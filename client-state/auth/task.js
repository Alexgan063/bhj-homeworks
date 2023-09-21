const signinForm = document.getElementById('signin__form');
const signinDiv = document.getElementById('signin');
const welcomeBlock = document.getElementById('welcome');
const welcomeUserId = document.getElementById('user_id');
const userId = localStorage.getItem('user_id');
if (userId) {
    welcomeUserId.textContent = userId;
    welcomeBlock.classList.add('welcome_active');
    signinDiv.classList.remove('signin_active');
}

signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);

    try {
        const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('user_id', data.user_id);
            welcomeUserId.textContent = data.user_id;
            welcomeBlock.classList.add('welcome_active');
            signinDiv.classList.remove('signin_active');
        } else {
            alert('you shall not pass');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});