import html from './login.html?raw';

export function init(container) {
    container.innerHTML = html;

    const usernameInput = document.getElementById('zorinUsername');
    const avatarIcon = document.getElementById('zorinAvatarIcon');
    const avatarImg = document.getElementById('zorinAvatarImg');
    let currentAvatarState = ''; // 'generic' or 'admin'
    
    function updateAvatarSource() {
        if (usernameInput && avatarIcon && avatarImg) {
            const isCustom = usernameInput.value.trim().toLowerCase() === 'admin';
            const targetState = isCustom ? 'admin' : 'generic';
            
            if (currentAvatarState !== targetState) {
                currentAvatarState = targetState;
                if (isCustom) {
                    avatarIcon.classList.add('d-none');
                    avatarImg.classList.remove('d-none');
                    
                    // Trigger entrance effect on the image
                    avatarImg.classList.remove('avatar-entrance-effect');
                    void avatarImg.offsetWidth; // Force reflow
                    avatarImg.classList.add('avatar-entrance-effect');
                } else {
                    avatarImg.classList.add('d-none');
                    avatarIcon.classList.remove('d-none');
                    
                    // Trigger entrance effect on the icon
                    avatarIcon.classList.remove('avatar-entrance-effect');
                    void avatarIcon.offsetWidth; // Force reflow
                    avatarIcon.classList.add('avatar-entrance-effect');
                }
            }
        }
    }
    
    if (usernameInput) {
        usernameInput.addEventListener('input', updateAvatarSource);
        updateAvatarSource();
        
        // Submit Username on Enter
        usernameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.goToPasswordStep();
            }
        });
    }
    
    const passwordInput = document.getElementById('zorinPassword');
    if (passwordInput) {
        // Submit Password on Enter
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.submitZorinLogin();
            }
        });
    }

    // Zorin OS Real-Time Clock
    function updateZorinClock() {
        const clockEl = document.getElementById('zorinClock');
        if (!clockEl) return;
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayName = days[now.getDay()];
        const dayNum = now.getDate();
        const monthName = months[now.getMonth()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        clockEl.textContent = `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`;
    }
    setInterval(updateZorinClock, 1000);
    updateZorinClock();

    // Zorin OS Greeting Text Management with Animation
    function updateZorinGreeting(newText) {
        const greetingEl = document.getElementById('zorinGreeting');
        if (greetingEl) {
            greetingEl.classList.add('greeting-hidden');
            setTimeout(() => {
                greetingEl.textContent = newText;
                greetingEl.classList.remove('greeting-hidden');
            }, 200);
        }
    }

    // Zorin OS Login Form Step Management
    window.goToPasswordStep = function() {
        const usernameInput = document.getElementById('zorinUsername');
        const username = usernameInput.value.trim();
        if (!username) {
            window.showGlassAlert('Please enter a username.', 'warning');
            return;
        }
        
        updateZorinGreeting(`Hi ${username}!`);
        
        const stepUser = document.getElementById('loginStepUsername');
        const stepPass = document.getElementById('loginStepPassword');
        
        stepUser.classList.add('d-none');
        stepPass.classList.remove('d-none');
        
        // Auto-focus password field
        setTimeout(() => {
            document.getElementById('zorinPassword').focus();
        }, 100);
    }

    window.goToUsernameStep = function() {
        updateZorinGreeting('Hi?');
        
        const stepUser = document.getElementById('loginStepUsername');
        const stepPass = document.getElementById('loginStepPassword');
        
        stepPass.classList.add('d-none');
        stepUser.classList.remove('d-none');
        
        // Auto-focus username field
        setTimeout(() => {
            document.getElementById('zorinUsername').focus();
        }, 100);
    }

    window.toggleZorinPasswordVisibility = function() {
        const passwordInput = document.getElementById('zorinPassword');
        const eyeIcon = document.getElementById('passwordEyeIcon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.remove('bi-eye');
            eyeIcon.classList.add('bi-eye-slash');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('bi-eye-slash');
            eyeIcon.classList.add('bi-eye');
        }
    }

    window.submitZorinLogin = function() {
        const user = document.getElementById('zorinUsername').value.trim();
        const pass = document.getElementById('zorinPassword').value.trim();
        const centerForm = document.querySelector('.zorin-center-login');
        
        if (user === 'admin' && pass === 'admin123') {
            // Hide inputs to make only the avatar and "Welcome" text visible
            const stepPass = document.getElementById('loginStepPassword');
            if (stepPass) {
                stepPass.classList.add('d-none');
            }
            
            // Animate greeting to "Welcome"
            updateZorinGreeting('Welcome');
            
            // Keep the glass alert notification
            window.showGlassAlert('Welcome to GlassKit OS! Access granted.', 'success');
            
            setTimeout(() => {
                document.getElementById('zorinUsername').value = '';
                document.getElementById('zorinUsername').dispatchEvent(new Event('input'));
                document.getElementById('zorinPassword').value = '';
                window.goToUsernameStep();
            }, 1500);
        } else {
            centerForm.classList.add('shake-animation');
            window.showGlassAlert('Authentication failed. Please verify credentials.', 'danger');
            setTimeout(() => {
                centerForm.classList.remove('shake-animation');
            }, 500);
        }
    }
}
