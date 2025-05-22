// assets/js/countdown.js
// Set the date and time we're counting down to
var countDownDate = new Date("Aug 30, 2025 08:00:00").getTime();

// Function to add leading zeros
function padNumber(number) {
    return number.toString().padStart(2, '0');
}

// Function to animate number change
function animateValue(element, oldValue, newValue) {
    if (!element) return;
    
    element.style.transform = 'translateY(-20px)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.innerHTML = padNumber(newValue);
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 100);
}

// Update the count down every 1 second
var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the elements with animation if they exist
    var daysElement = document.getElementById("days");
    var hoursElement = document.getElementById("hours");
    var minutesElement = document.getElementById("minutes");
    var secondsElement = document.getElementById("seconds");

    if (daysElement) {
        // Only animate if values have changed
        if (daysElement.innerHTML !== padNumber(days)) {
            animateValue(daysElement, daysElement.innerHTML, days);
        }
        if (hoursElement.innerHTML !== padNumber(hours)) {
            animateValue(hoursElement, hoursElement.innerHTML, hours);
        }
        if (minutesElement.innerHTML !== padNumber(minutes)) {
            animateValue(minutesElement, minutesElement.innerHTML, minutes);
        }
        if (secondsElement.innerHTML !== padNumber(seconds)) {
            animateValue(secondsElement, secondsElement.innerHTML, seconds);
        }
    }

    // If the count down is finished, write some text with animation
    if (distance < 0) {
        clearInterval(x);
        var countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.style.animation = 'fadeInUp 1s ease-out';
            countdownElement.innerHTML = '<div class="event-started">L\'événement a commencé</div>';
        }
    }
}, 1000);
