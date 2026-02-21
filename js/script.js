// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
    
    if(!nav.classList.contains('active')) {
        document.querySelectorAll('.dropdown-parent.active').forEach(item => {
            item.classList.remove('active');
        });
    }
}

// Improved Mobile Dropdown Logic
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                event.preventDefault(); 
                const parent = this.parentElement;
                const wasActive = parent.classList.contains('active');
                parent.classList.toggle('active', !wasActive);
                
                const menu = parent.querySelector('.dropdown-menu');
                if (!wasActive) {
                    menu.style.display = 'flex';
                } else {
                    menu.style.display = 'none';
                }
            }
        });
    });

    // Initialize Review Dates
    updateReviewDates();
});

// Contact Form Submission
function handleFormSubmit(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerText;

    if(name && phone) {
        btn.innerText = "Sending...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        setTimeout(() => {
            alert(`Thank you, ${name}! We have received your request. We will contact you at ${phone} shortly.`);
            document.getElementById('contactForm').reset();
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
        }, 2000);
    } else {
        alert("Please fill in your Name and Phone number.");
    }
}

// --- NEW FUNCTION: Update Review Times ---
function updateReviewDates() {
    const timeElements = document.querySelectorAll('.review-time');
    const now = new Date();
    
    timeElements.forEach(element => {
        const dateAttr = element.getAttribute('data-date');
        if(!dateAttr) return;

        const reviewDate = new Date(dateAttr);
        // Calculate difference in milliseconds
        const diffTime = now - reviewDate;
        // Convert to days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let timeString = "";
        
        if (diffDays < 30) {
            timeString = diffDays + (diffDays === 1 ? " day ago" : " days ago");
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            timeString = months + (months === 1 ? " month ago" : " months ago");
        } else {
            const years = Math.floor(diffDays / 365);
            timeString = years + (years === 1 ? " year ago" : " years ago");
        }
        
        // Only update if the calculation is valid (non-negative)
        if(diffDays >= 0) {
            element.textContent = timeString;
        }
    });
}