var countDownDate = new Date(2024, 10, 26, 20, 0, 0).getTime(); // Oktober is maand 9

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update de HTML van de countdown-div
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0'); // Twee cijfers
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0'); // Twee cijfers
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0'); // Twee cijfers
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0'); // Twee cijfers

    // Wanneer de countdown voorbij is
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);