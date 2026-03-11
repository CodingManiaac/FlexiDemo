// Master Event Listener for ALL navigation clicks
document.addEventListener('click', function(event) {
    const nav = document.getElementById('navLinks');
    if (!nav) return;

    // 1. Hamburger Menu Tap
    if (event.target.closest('.mobile-menu-btn')) {
        event.preventDefault();
        nav.classList.add('active');
    }

    // 2. Close Button Tap
    if (event.target.closest('.mobile-close')) {
        event.preventDefault();
        nav.classList.remove('active');
        
        // Reset dropdowns when closing menu
        document.querySelectorAll('.dropdown-parent.active, .dropdown-menu.show').forEach(item => {
            item.classList.remove('active', 'show');
            if (item.style) item.style.display = '';
        });
    }

    // 3. Services Dropdown Tap (Only triggers on mobile/tablet widths)
    const dropdownToggle = event.target.closest('.dropdown-toggle');
    if (dropdownToggle && window.innerWidth <= 1024) {
        event.preventDefault();
        
        const parent = dropdownToggle.parentElement;
        const menu = parent.querySelector('.dropdown-menu');
        
        if (menu) {
            const isShowing = menu.classList.contains('show');
            
            if (!isShowing) {
                parent.classList.add('active');
                menu.classList.add('show');
                menu.style.display = 'flex';
            } else {
                parent.classList.remove('active');
                menu.classList.remove('show');
                menu.style.display = 'none';
            }
        }
    }
});

// Window Resize Safety
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = ''; 
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-parent').forEach(p => p.classList.remove('active'));
        const nav = document.getElementById('navLinks');
        if(nav) nav.classList.remove('active');
    }
});

// Initialize Review Dates
document.addEventListener('DOMContentLoaded', function() {
    try {
        updateReviewDates();
    } catch(e) {
        console.warn("Reviews bypassed.");
    }
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

// Update Review Times
function updateReviewDates() {
    const timeElements = document.querySelectorAll('.review-time');
    if (timeElements.length === 0) return; 

    const now = new Date();
    
    timeElements.forEach(element => {
        const dateAttr = element.getAttribute('data-date');
        if(!dateAttr) return;

        const reviewDate = new Date(dateAttr);
        if(isNaN(reviewDate)) return; 

        const diffTime = now - reviewDate;
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
        
        if(diffDays >= 0) {
            element.textContent = timeString;
        }
    });
}