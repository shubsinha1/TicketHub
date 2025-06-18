// Sample event data (in a real application, this would come from a backend API)
const events = [
    {
        id: 1,
        title: "Music Show",
        category: "concerts",
        date: "2025-07-15",
        time: "7:00 PM",
        venue: "Bapu Sabhagar",
        price: 1000,
        image: "Bapu-Sabhagar.jpg.png",
        description: "Witness the ultimate showdown ..",
        availableTickets: 100
    },
    {
        id: 2,
        title: "Cricket Match",
        category: "sports",
        date: "2025-08-20",
        time: "2:00 PM",
        venue: "Moin-ul-haq Stadium",
        price: 1000,
        image: "cricket-match.jpg.png",
        description: "Watch the thrilling cricket match between top teams.",
        availableTickets: 150
    },
    {
        id: 3,
        title: "Theatre Play",
        category: "shows",
        date: "2025-09-10",
        time: "7:30 PM",
        venue: "Gyan Bhawan",
        price: 1000,
        image: "theatre-play.jpg.jpeg",
        description: "Experience the magic of Broadway with this award-winning production.",
        availableTickets: 80
    }
];

// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.querySelector('.search-container input');
const categoryCards = document.querySelectorAll('.category-card');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const eventModal = document.getElementById('eventModal');
const closeButtons = document.querySelectorAll('.close-modal');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    loadEvents();
    setupEventListeners();
    setupSearchFunctionality();
    setupCategoryFilters();
});

// Load events into the grid
function loadEvents(filteredEvents = events) {
    console.log('Loading events...');
    if (!eventsGrid) {
        console.error('Events grid element not found');
        return;
    }

    eventsGrid.innerHTML = '';
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// Create event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-image" style="background-image: url('${event.image}')"></div>
        <div class="event-details">
            <h3>${event.title}</h3>
            <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
            <p><i class="fas fa-clock"></i> ${event.time}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
            <p class="event-price">₹${event.price}</p>
            <button class="book-btn" data-event-id="${event.id}">Book Now</button>
        </div>
    `;

    // Add click event listener directly to the button
    const bookBtn = card.querySelector('.book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            console.log('Book button clicked for event:', event.id);
            showEventDetails(event);
        });
    }

    return card;
}

// Format date to readable format
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Modal controls
    loginBtn.addEventListener('click', () => showModal(loginModal));
    signupBtn.addEventListener('click', () => showModal(signupModal));
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            hideAllModals();
        });
    });

    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideAllModals();
        }
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

// Show modal
function showModal(modal) {
    hideAllModals();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Hide all modals
function hideAllModals() {
    console.log('Hiding all modals');
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Show event details in modal
function showEventDetails(event) {
    console.log('Showing event details for:', event.id);
    if (!eventModal) {
        console.error('Event modal element not found');
        return;
    }

    const modalBody = eventModal.querySelector('.modal-body');
    if (!modalBody) {
        console.error('Modal body element not found');
        return;
    }

    modalBody.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="event-details-container">
            <h2>${event.title}</h2>
            <img src="${event.image}" alt="${event.title}" style="width: 100%; border-radius: 5px; margin: 1rem 0;">
            <p>${event.description}</p>
            <div class="event-info">
                <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
                <p><i class="fas fa-clock"></i> ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                <p class="event-price">₹${event.price}</p>
                <p><i class="fas fa-ticket-alt"></i> Available Tickets: ${event.availableTickets}</p>
            </div>
            <form id="bookingForm">
                <div class="form-group">
                    <label for="ticketQuantity">Number of Tickets:</label>
                    <input type="number" id="ticketQuantity" min="1" max="${event.availableTickets}" value="1" required>
                </div>
                <div class="form-group">
                    <label for="customerName">Full Name:</label>
                    <input type="text" id="customerName" required>
                </div>
                <div class="form-group">
                    <label for="customerEmail">Email:</label>
                    <input type="email" id="customerEmail" required>
                </div>
                <div class="form-group">
                    <label for="customerPhone">Phone Number:</label>
                    <input type="tel" id="customerPhone" pattern="[0-9]{10}" required>
                </div>
                <div class="price-summary">
                    <p>Price per ticket: ₹${event.price}</p>
                    <p>Total Price: ₹<span id="totalPrice">${event.price}</span></p>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Submit Details</button>
                    <button type="button" class="cancel-btn" onclick="hideAllModals()">Cancel</button>
                </div>
            </form>
        </div>
    `;

    // Show the modal
    eventModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add event listener for the close button
    const closeBtn = modalBody.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            hideAllModals();
        });
    }

    // Add event listener for quantity change
    const quantityInput = document.getElementById('ticketQuantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', (e) => {
            const quantity = parseInt(e.target.value) || 0;
            const totalPrice = quantity * event.price;
            const totalPriceElement = document.getElementById('totalPrice');
            if (totalPriceElement) {
                totalPriceElement.textContent = totalPrice;
            }
        });
    }

    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Booking form submitted');
            
            const quantity = parseInt(document.getElementById('ticketQuantity').value) || 0;
            const customerName = document.getElementById('customerName').value;
            const customerEmail = document.getElementById('customerEmail').value;
            const customerPhone = document.getElementById('customerPhone').value;
            
            // Validate inputs
            if (!customerName || !customerEmail || !customerPhone) {
                alert('Please fill in all required fields');
                return;
            }

            if (!validatePhoneNumber(customerPhone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            if (quantity <= 0 || quantity > event.availableTickets) {
                alert('Please select a valid number of tickets');
                return;
            }

            // Show booking confirmation
            showBookingConfirmation(event, {
                quantity,
                customerName,
                customerEmail,
                customerPhone
            });
        });
    }
}

// Validate phone number
function validatePhoneNumber(phone) {
    return /^[0-9]{10}$/.test(phone);
}

// Show booking confirmation
function showBookingConfirmation(event, bookingDetails) {
    console.log('Showing booking confirmation');
    const modalBody = eventModal.querySelector('.modal-body');
    if (!modalBody) return;

    const totalPrice = bookingDetails.quantity * event.price;
    
    modalBody.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="booking-confirmation">
            <h2>Booking Confirmation</h2>
            <div class="confirmation-details">
                <h3>${event.title}</h3>
                <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
                <p><i class="fas fa-clock"></i> ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                <hr>
                <h4>Booking Details:</h4>
                <p><strong>Customer Name:</strong> ${bookingDetails.customerName}</p>
                <p><strong>Email:</strong> ${bookingDetails.customerEmail}</p>
                <p><strong>Phone:</strong> ${bookingDetails.customerPhone}</p>
                <p><strong>Number of Tickets:</strong> ${bookingDetails.quantity}</p>
                <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
                <hr>
                <p class="booking-id">Booking ID: ${generateBookingId()}</p>
            </div>
            <div class="payment-options">
                <h4>Select Payment Method:</h4>
                <div class="payment-methods">
                    <button type="button" class="payment-btn" data-method="upi">
                        <i class="fas fa-mobile-alt"></i> UPI
                    </button>
                    <button type="button" class="payment-btn" data-method="card">
                        <i class="fas fa-credit-card"></i> Card
                    </button>
                    <button type="button" class="payment-btn" data-method="netbanking">
                        <i class="fas fa-university"></i> Net Banking
                    </button>
                </div>
            </div>
            <div class="confirmation-actions">
                <button type="button" class="confirm-btn" onclick="processPayment('${event.id}', ${bookingDetails.quantity})">Confirm Payment</button>
                <button type="button" class="cancel-btn" onclick="hideAllModals()">Cancel</button>
            </div>
        </div>
    `;

    // Add event listener for the close button
    const closeBtn = modalBody.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            hideAllModals();
        });
    }

    // Add event listeners to payment buttons
    const paymentButtons = modalBody.querySelectorAll('.payment-btn');
    paymentButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
}

// Generate unique booking ID
function generateBookingId() {
    return 'BK' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

// Process payment
function processPayment(eventId, quantity) {
    console.log('Processing payment for event:', eventId);
    const selectedPaymentMethod = document.querySelector('.payment-btn.selected');
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }

    const paymentMethod = selectedPaymentMethod.dataset.method;
    showPaymentProcessing();
    
    // Simulate payment processing
    setTimeout(() => {
        hideAllModals();
        showSuccessMessage();
    }, 2000);
}

// Show payment processing
function showPaymentProcessing() {
    console.log('Showing payment processing');
    const modalBody = eventModal.querySelector('.modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="payment-processing">
            <div class="spinner"></div>
            <h3>Processing Payment...</h3>
            <p>Please do not close this window</p>
        </div>
    `;

    // Add event listener for the close button
    const closeBtn = modalBody.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            hideAllModals();
        });
    }
}

// Show success message
function showSuccessMessage() {
    console.log('Showing success message');
    const successModal = document.createElement('div');
    successModal.className = 'modal';
    successModal.style.display = 'block';
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-body">
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h2>Booking Successful!</h2>
                    <p>Your tickets have been booked successfully.</p>
                    <p>A confirmation email has been sent to your registered email address.</p>
                    <button type="button" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(successModal);
}

// Setup search functionality
function setupSearchFunctionality() {
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.venue.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
        loadEvents(filteredEvents);
    });
}

// Setup category filters
function setupCategoryFilters() {
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filteredEvents = events.filter(event => event.category === category);
            loadEvents(filteredEvents);
            
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // In a real application, this would make an API call to authenticate
    console.log('Login attempt:', { email, password });
    hideAllModals();
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    // In a real application, this would make an API call to register the user
    console.log('Signup attempt:', userData);
    hideAllModals();
} 
