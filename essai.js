// Intersection Observer pour les animations au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-scroll]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Dark mode toggle
const setupDarkMode = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const html = document.documentElement;

    const toggleDarkMode = () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleDarkMode);
    }

    // Set initial theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }
};

// Mobile search functionality
const setupMobileSearch = () => {
    const searchToggle = document.getElementById('search-toggle');
    const mobileSearchBar = document.getElementById('mobile-search-bar');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchClose = document.getElementById('mobile-search-close');

    const openSearch = () => {
        mobileSearchBar.classList.remove('opacity-0', 'pointer-events-none');
        mobileSearchBar.classList.add('opacity-100');
        setTimeout(() => mobileSearchInput.focus(), 100);
    };

    const closeSearch = () => {
        mobileSearchBar.classList.add('opacity-0', 'pointer-events-none');
        mobileSearchBar.classList.remove('opacity-100');
    };

    searchToggle.addEventListener('click', openSearch);
    mobileSearchClose.addEventListener('click', closeSearch);

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (!mobileSearchBar.contains(e.target) && e.target !== searchToggle) {
            closeSearch();
        }
    });

    // Prevent closing when clicking inside search bar
    mobileSearchInput.addEventListener('click', (e) => e.stopPropagation());

    // Handle search on Enter
    mobileSearchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Add search logic here
            closeSearch();
        }
    });
};

// Mobile actions bar
const setupMobileActions = () => {
    const mobileActionsToggle = document.getElementById('mobile-actions-toggle');
    const mobileActionsBar = document.getElementById('mobile-actions-bar');
    const mobileUserToggle = document.getElementById('mobile-user-toggle');
    const mobileCartToggle = document.getElementById('mobile-cart-toggle');

    const toggleActionsBar = () => {
        if (mobileActionsBar.classList.contains('opacity-0')) {
            mobileActionsBar.classList.remove('opacity-0', 'pointer-events-none');
            mobileActionsBar.classList.add('opacity-100');
        } else {
            mobileActionsBar.classList.add('opacity-0', 'pointer-events-none');
            mobileActionsBar.classList.remove('opacity-100');
        }
    };

    mobileActionsToggle.addEventListener('click', toggleActionsBar);

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (!mobileActionsBar.contains(e.target)) {
            mobileActionsBar.classList.add('opacity-0', 'pointer-events-none');
            mobileActionsBar.classList.remove('opacity-100');
        }
    });

    // Prevent closing when clicking inside actions bar
    mobileActionsBar.addEventListener('click', e => e.stopPropagation());

    // User toggle
    mobileUserToggle.addEventListener('click', () => {
        document.getElementById('user-sidebar').classList.remove('hidden');
        mobileActionsBar.classList.add('opacity-0', 'pointer-events-none');
        mobileActionsBar.classList.remove('opacity-100');
    });
    
    // Cart toggle
    mobileCartToggle.addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.remove('hidden');
        mobileActionsBar.classList.add('opacity-0', 'pointer-events-none');
        mobileActionsBar.classList.remove('opacity-100');
    });
};

// Mobile menu
const setupMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    mobileMenuButton.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);

    // Close with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            closeMenu();
        }
    });
};

// Product page functionality
const setupProductPage = () => {
    const productPage = document.getElementById('product-page');
    const closeProduct = document.getElementById('close-product');
    
    // Open product page when clicking on product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            productPage.classList.remove('hidden');
        });
    });
    
    // Close product page
    closeProduct.addEventListener('click', () => {
        productPage.classList.add('hidden');
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === productPage) {
            productPage.classList.add('hidden');
        }
    });

    // Product tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active classes from all tabs
            tabBtns.forEach(b => {
                b.classList.remove('border-[#0298e4]', 'text-[#051769]', 'dark:text-[#0298e4]');
                b.classList.add('text-gray-500', 'dark:text-gray-400');
            });
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Activate current tab
            btn.classList.add('border-[#0298e4]', 'text-[#051769]', 'dark:text-[#0298e4]');
            btn.classList.remove('text-gray-500', 'dark:text-gray-400');
            tabContents[index].classList.remove('hidden');
        });
    });
    
    // Product image zoom
    function zoomImage(img) {
        if (img.style.transform === 'scale(2)') {
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';
        } else {
            img.style.transform = 'scale(2)';
            img.style.cursor = 'zoom-out';
        }
    }
    
    // Change main product image
    function changeMainImage(img) {
        document.getElementById('main-product-image').src = img.src;
    }
};

// Cart sidebar functionality
const setupCartSidebar = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const cartBtn = document.getElementById('cart-btn');

    // Open cart
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.remove('hidden');
    });

    // Close cart
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.add('hidden');
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartSidebar) {
            cartSidebar.classList.add('hidden');
        }
    });

    // Order confirmation
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const orderConfirmModal = document.getElementById('order-confirm-modal');
    const closeOrderConfirm = document.getElementById('close-order-confirm');

    confirmOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('hidden');
        orderConfirmModal.classList.remove('hidden');
    });

    closeOrderConfirm.addEventListener('click', () => {
        orderConfirmModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === orderConfirmModal) {
            orderConfirmModal.classList.add('hidden');
        }
    });
};

// User account functionality
const setupUserAccount = () => {
    const userSidebar = document.getElementById('user-sidebar');
    const closeUser = document.getElementById('close-user');
    const userAccountBtn = document.getElementById('user-account-btn');

    // Open user sidebar
    userAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userSidebar.classList.remove('hidden');
    });

    // Close user sidebar
    closeUser.addEventListener('click', () => {
        userSidebar.classList.add('hidden');
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === userSidebar) {
            userSidebar.classList.add('hidden');
        }
    });

    // Edit profile
    const editProfileSidebar = document.getElementById('edit-profile-sidebar');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const closeEditProfile = document.getElementById('close-edit-profile');

    editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userSidebar.classList.add('hidden');
        editProfileSidebar.classList.remove('hidden');
    });

    closeEditProfile.addEventListener('click', () => {
        editProfileSidebar.classList.add('hidden');
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editProfileSidebar) {
            editProfileSidebar.classList.add('hidden');
        }
    });

    // Profile image upload preview
    document.querySelector('#edit-profile-sidebar input[type="file"]')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profile-avatar').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout functionality
    const logoutSidebar = document.getElementById('logout-sidebar');
    const logoutBtn = document.getElementById('logout-btn');
    const cancelLogout = document.getElementById('cancel-logout');
    const confirmLogout = document.getElementById('confirm-logout');

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userSidebar.classList.add('hidden');
        logoutSidebar.classList.remove('hidden');
    });

    cancelLogout.addEventListener('click', () => {
        logoutSidebar.classList.add('hidden');
    });

    confirmLogout.addEventListener('click', () => {
        // Add actual logout logic here
        alert('Déconnexion effectuée');
        logoutSidebar.classList.add('hidden');
        // window.location.href = '/login';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === logoutSidebar) {
            logoutSidebar.classList.add('hidden');
        }
    });

    // Change password
    const changePasswordModal = document.getElementById('change-password-modal');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const closeChangePassword = document.getElementById('close-change-password');

    changePasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userSidebar.classList.add('hidden');
        changePasswordModal.classList.remove('hidden');
    });

    closeChangePassword.addEventListener('click', () => {
        changePasswordModal.classList.add('hidden');
    });

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = "password";
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Form submission
    document.getElementById('password-change-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add actual password change logic here
        alert('Mot de passe changé avec succès');
        changePasswordModal.classList.add('hidden');
    });
};

// Chat support functionality
const setupChatSupport = () => {
    const chatSupport = document.querySelector('#chat-support > div');
    const openChat = document.getElementById('open-chat');
    const closeChat = document.getElementById('close-chat');
    const chatMore = document.getElementById('chat-more');
    const chatOptions = document.getElementById('chat-options');
    
    // Open/close chat
    openChat.addEventListener('click', () => {
        chatSupport.classList.toggle('hidden');
    });
    
    closeChat.addEventListener('click', () => {
        chatSupport.classList.add('hidden');
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.querySelector('#chat-support')) {
            chatSupport.classList.add('hidden');
        }
    });

    // Send text message
    document.getElementById('chat-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const msg = input.value.trim();
        if (msg) {
            addChatMessage(msg, 'user');
            input.value = '';
            setTimeout(() => addChatMessage("Merci pour votre message, un conseiller va vous répondre.", 'support'), 800);
        }
    });

    // Add message to chat
    function addChatMessage(text, sender) {
        const chat = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'flex items-end gap-2 ' + (sender === 'user' ? 'justify-end' : '');
        div.innerHTML = sender === 'user'
            ? `<div class="bg-[#051769] text-white rounded-2xl px-4 py-2 max-w-[70%]">${text}</div>
            <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-sm font-bold">M</div>`
            : `<div class="w-8 h-8 rounded-full bg-[#0298e4] flex items-center justify-center text-white text-sm font-bold">S</div>
            <div class="bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-blue-100 rounded-2xl px-4 py-2 max-w-[70%]">${text}</div>`;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    // Image upload
    document.getElementById('chat-image-input')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                addImageMessage(ev.target.result, 'user');
            };
            reader.readAsDataURL(file);
        }
    });

    // Add image message
    function addImageMessage(src, sender) {
        const chat = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'flex items-end gap-2 ' + (sender === 'user' ? 'justify-end' : '');
        div.innerHTML = sender === 'user'
            ? `<div class="bg-[#051769] text-white rounded-2xl px-2 py-2 max-w-[70%]"><img src="${src}" class="rounded-lg max-w-[180px]" alt="Image envoyée"></div>
            <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-sm font-bold">M</div>`
            : `<div class="w-8 h-8 rounded-full bg-[#0298e4] flex items-center justify-center text-white text-sm font-bold">S</div>
            <div class="bg-blue-100 dark:bg-blue-900 rounded-2xl px-2 py-2 max-w-[70%]"><img src="${src}" class="rounded-lg max-w-[180px]" alt="Image reçue"></div>`;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    // Audio recording (simple UX, not real upload)
    let mediaRecorder, audioChunks = [];
    document.getElementById('chat-audio')?.addEventListener('click', async function() {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];
                    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const url = URL.createObjectURL(audioBlob);
                        addAudioMessage(url, 'user');
                    };
                    mediaRecorder.start();
                    document.getElementById('chat-audio').classList.add('animate-pulse');
                    setTimeout(() => {
                        mediaRecorder.stop();
                        document.getElementById('chat-audio').classList.remove('animate-pulse');
                    }, 4000); // 4s max
                } catch (err) {
                    console.error('Error accessing microphone:', err);
                    addChatMessage("Impossible d'accéder au microphone. Veuillez vérifier les permissions.", 'support');
                }
            }
        }
    });

    function addAudioMessage(src, sender) {
        const chat = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'flex items-end gap-2 ' + (sender === 'user' ? 'justify-end' : '');
        div.innerHTML = sender === 'user'
            ? `<div class="bg-[#051769] text-white rounded-2xl px-2 py-2 max-w-[70%]"><audio controls src="${src}" class="w-40"></audio></div>
            <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-sm font-bold">M</div>`
            : `<div class="w-8 h-8 rounded-full bg-[#0298e4] flex items-center justify-center text-white text-sm font-bold">S</div>
            <div class="bg-blue-100 dark:bg-blue-900 rounded-2xl px-2 py-2 max-w-[70%]"><audio controls src="${src}" class="w-40"></audio></div>`;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    };

    // ...dans setupChatSupport()...

if (chatMore && chatOptions) {
    chatMore.addEventListener('click', (e) => {
        e.stopPropagation();
        chatOptions.classList.toggle('hidden');
    });
    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', () => {
        chatOptions.classList.add('hidden');
    });
    chatOptions.addEventListener('click', (e) => e.stopPropagation());
}

// ...dans setupChatSupport()...
document.getElementById('chat-video-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            addVideoMessage(ev.target.result, 'user');
        };
        reader.readAsDataURL(file);
    }
});

function addVideoMessage(src, sender) {
    const chat = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'flex items-end gap-2 ' + (sender === 'user' ? 'justify-end' : '');
    div.innerHTML = sender === 'user'
        ? `<div class="bg-[#051769] text-white rounded-2xl px-2 py-2 max-w-[70%]"><video controls src="${src}" class="rounded-lg max-w-[180px]"></video></div>
        <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-sm font-bold">M</div>`
        : `<div class="w-8 h-8 rounded-full bg-[#0298e4] flex items-center justify-center text-white text-sm font-bold">S</div>
        <div class="bg-blue-100 dark:bg-blue-900 rounded-2xl px-2 py-2 max-w-[70%]"><video controls src="${src}" class="rounded-lg max-w-[180px]"></video></div>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}
// ...reste du code...

};



/**********
 * 
    * Main initialization
 */

// Login Page Specific Functions
const setupLoginPage = () => {
    // Toggle between login and register forms
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    if (switchToRegister && switchToLogin) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginCard.classList.remove('active');
            setTimeout(() => {
                loginCard.classList.add('hidden');
                registerCard.classList.remove('hidden');
                setTimeout(() => registerCard.classList.add('active'), 10);
            }, 300);
        });
        
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerCard.classList.remove('active');
            setTimeout(() => {
                registerCard.classList.add('hidden');
                loginCard.classList.remove('hidden');
                setTimeout(() => loginCard.classList.add('active'), 10);
            }, 300);
        });
    }
    
    // Toggle password visibility
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            }
        });
    });
    
    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add login logic here
            console.log('Login form submitted');
            // window.location.href = 'dashboard.html';
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('reg-password')?.value;
            const confirmPassword = document.getElementById('reg-confirm-password')?.value;
            
            if (password && confirmPassword && password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }
            
            if (!document.getElementById('terms')?.checked) {
                alert('Veuillez accepter les conditions d\'utilisation');
                return;
            }
            
            // Add registration logic here
            console.log('Register form submitted');
            // window.location.href = 'dashboard.html';
        });
    }
};

// Password Reset Functionality
const setupPasswordReset = () => {
    // Elements
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const resetCodeModal = document.getElementById('reset-code-modal');
    const closeForgotPassword = document.getElementById('close-forgot-password');
    const closeResetCode = document.getElementById('close-reset-code');
    const cancelReset = document.getElementById('cancel-reset');
    const cancelResetCode = document.getElementById('cancel-reset-code');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const resetInstructions = document.getElementById('reset-instructions');
    const sentEmail = document.getElementById('sent-email');
    const resendLink = document.getElementById('resend-link');
    
    // Open forgot password modal
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });
    }
    
    // Close modals
    const closeModals = () => {
        forgotPasswordModal.classList.add('hidden');
        resetCodeModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };
    
    if (closeForgotPassword) closeForgotPassword.addEventListener('click', closeModals);
    if (closeResetCode) closeResetCode.addEventListener('click', closeModals);
    if (cancelReset) cancelReset.addEventListener('click', closeModals);
    if (cancelResetCode) cancelResetCode.addEventListener('click', closeModals);
    
    // Handle forgot password form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            
            // Simulate API call
            try {
                // In a real app, you would make an API call here
                console.log('Sending reset email to:', email);
                
                // Show success message
                resetInstructions.classList.remove('hidden');
                sentEmail.textContent = email;
                document.getElementById('reset-submit').disabled = true;
                
                // In a real app, you would wait for the API response
                setTimeout(() => {
                    forgotPasswordModal.classList.add('hidden');
                    resetCodeModal.classList.remove('hidden');
                    document.getElementById('reset-email-code').value = email;
                }, 1500);
                
            } catch (error) {
                console.error('Error:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
    
    // Handle resend link
    if (resendLink) {
        resendLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            console.log('Resending email to:', email);
            alert('Un nouvel email a été envoyé à ' + email);
        });
    }
    
    // Handle password reset form submission
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const code = document.getElementById('reset-code').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-new-password').value;
            
            // Validate passwords match
            if (newPassword !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }
            
            // Validate password strength (add your own rules)
            if (newPassword.length < 8) {
                alert('Le mot de passe doit contenir au moins 8 caractères');
                return;
            }
            
            // Simulate API call
            try {
                console.log('Resetting password with code:', code);
                
                // In a real app, you would make an API call here
                // await resetPassword(code, newPassword);
                
                // Show success message
                alert('Votre mot de passe a été réinitialisé avec succès !');
                resetCodeModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                
                // Clear forms
                resetPasswordForm.reset();
                forgotPasswordForm.reset();
                
            } catch (error) {
                console.error('Error:', error);
                alert('Une erreur est survenue. Veuillez vérifier le code et réessayer.');
            }
        });
    }
    
    // Password strength indicator
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthIndicator = this.parentElement.nextElementSibling;
            
            if (password.length === 0) {
                strengthIndicator.className = 'password-strength';
                return;
            }
            
            // Simple strength calculation (replace with your own logic)
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            const strengthClasses = ['password-strength-weak', 'password-strength-medium', 'password-strength-strong'];
            strengthIndicator.className = 'password-strength ' + (strengthClasses[Math.min(strength, 2)] || '');
        });
    }
};

// Update the initialization function
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    setupDarkMode();
    setupMobileSearch();
    setupMobileActions();
    setupMobileMenu();
    setupProductPage();
    setupCartSidebar();
    setupUserAccount();
    setupChatSupport();
    setupLoginPage();
    setupPasswordReset(); // Add this line
});
