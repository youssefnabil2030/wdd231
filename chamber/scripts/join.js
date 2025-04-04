// Set current timestamp when form loads
document.addEventListener('DOMContentLoaded', () => {
    const timestamp = document.getElementById('timestamp');
    timestamp.value = new Date().toISOString();

    // Initialize membership cards animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    // Trigger animation after a short delay
    setTimeout(() => {
        cards.forEach(card => {
            card.style.animation = 'slideIn 0.5s ease-out forwards';
        });
    }, 100);

    // Modal functionality
    const modals = document.querySelectorAll('dialog');
    const infoButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal;
            const modal = document.getElementById(modalId);
            modal.showModal();
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            modal.close();
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            const modalDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < modalDimensions.left ||
                e.clientX > modalDimensions.right ||
                e.clientY < modalDimensions.top ||
                e.clientY > modalDimensions.bottom
            ) {
                modal.close();
            }
        });
    });
});

// Form validation and submission
const form = document.getElementById('joinForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const searchParams = new URLSearchParams();

    // Add required fields to URL parameters
    formData.forEach((value, key) => {
        if (value && ['firstName', 'lastName', 'email', 'phone', 'business', 'timestamp'].includes(key)) {
            searchParams.append(key, value);
        }
    });

    // Redirect to thank you page with form data
    window.location.href = `thankyou.html?${searchParams.toString()}`;
});