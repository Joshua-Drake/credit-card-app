// Declarations - begin
// Booleans for validation
var theName = false;
var theEmailAddress = false;
var theCardNumber = false;
// Declarations - end

// Validations - begin
// Name validation - begin
// If the name is rejected, change the colour of the input box to red and ensure the 'Submit' button is disabled
function wrongName() {
    document.getElementById("name-input").style.borderColor='red';
    document.getElementById("name-input").style.backgroundColor='#f57a7e';
    theName = false;
    $("#submit-button").attr("disabled",true);
}

// If the name is approved, change the colour of the input box to green and check if all fields are valid. If all inputs are valid the 'Submit' button is enabled
function approvedName() {
    document.getElementById("name-input").style.borderColor='green';
    document.getElementById("name-input").style.backgroundColor='#7af58a';
    theName = true;
    if(theName == true && theEmailAddress == true && theCardNumber == true){
        $("#submit-button").attr("disabled",false);
    }
}

// Check if the name is valid using the regex
function checkName(nameGiven)
{
    var nameRegex = /^([a-z\A-Z]+) ([a-z\A-Z\-]+) ?([a-z\A-Z\-]+)? ?([a-z\A-Z\-]+)? ?([a-z\A-Z\-]+)?$/;
    if(nameRegex.test(nameGiven)) {
        approvedName();
    }
    else {
        wrongName();
    }
}
// Name validation - end

// Email validation - begin
// If the email address is rejected, change the colour of the input box to red and ensure the 'Submit' button is disabled
function wrongEmail() {
    document.getElementById("email-input").style.borderColor='red';
    document.getElementById("email-input").style.backgroundColor='#f57a7e';
    theEmailAddress = false;
    $("#submit-button").attr("disabled",true);
}

// If the email address is approved, change the colour of the input box to green and check if all fields are valid. If all inputs are valid the 'Submit' button is enabled
function approvedEmail() {
    document.getElementById("email-input").style.borderColor='green';
    document.getElementById("email-input").style.backgroundColor='#7af58a';
    theEmailAddress = true;
    if(theName == true && theEmailAddress == true && theCardNumber == true){
        $("#submit-button").attr("disabled",false);
    }
}

// Check if the email address is valid using the regex
function checkEmail(emailGiven)
{
    var emailRegex = /^([a-z\A-Z\d\.-]+)@([a-z\A-Z\d-]+)\.([a-z\A-Z]{2,8})(\.[a-z\A-Z]{2,8})?$/
    if(emailRegex.test(emailGiven)){
        approvedEmail();
    }
    else{
        wrongEmail();
    }
}
// Email validation - end

// Credit card validation - begin
// If the card number is rejected, change the colour of the input box to red and ensure the 'Submit' button is disabled
function wrongCard() {
    document.getElementById("card-number-input").style.borderColor='red';
    document.getElementById("card-number-input").style.backgroundColor='#f57a7e';
    theCardNumber = false;
    $("#submit-button").attr("disabled",true);
}

// If the name is approved, change the colour of the input box to green and check if all fields are valid. If all inputs are valid the 'Submit' button is enabled
function approvedCard() {
    document.getElementById("card-number-input").style.borderColor='green';
    document.getElementById("card-number-input").style.backgroundColor='#7af58a';
    theCardNumber = true;
    if(theName == true && theEmailAddress == true && theCardNumber == true){
        $("#submit-button").attr("disabled",false);
    }
}

// Check if the card number is valid using the Luhn algorithm
function checkCard(cardNumberGiven) {
    var usercardinput = parseInt(cardNumberGiven, 10);
    var cc_sum = 0;
    var parsedCC;
    var cclen = cardNumberGiven.length;
    
    for (i=cclen-1; i>=0; i--) {
        var charati = cardNumberGiven[i] + '';
        parsedCC = parseInt(charati);
        var oddeven = cclen-1 - i;
        cc_sum += (oddeven%2 == 0) ? parsedCC :
        (parsedCC > 4) ? parsedCC * 2 % 10 + 1 :
        parsedCC * 2;
    }
    var checkvalid = ((cc_sum % 10) == 0) ? true : false;
    
// Checking the outcome
    if(checkvalid == true && cardNumberGiven.length >= 13 && cardNumberGiven.length <= 16 && usercardinput !== 0){
        approvedCard();
    }
    else{
        wrongCard();
    }
}
// Credit card validation - end
// Validations - end

// Flip credit card with jquery - begin
$("#submit-button").click(function() {
    $(".flip-card-back").css("transform", "rotateY(180deg)");
    $(".flip-card").toggleClass('active');
    $(".flip-card-back").css("visibility", "visible");
    setTimeout(function(){
        $(".flip-card-front").css("visibility", "hidden");
        $(".flip-card-front").css("backface-visibility", "hidden");
    }, 900);
});
// Flip credit card with jquery - end

// Reset page on 'Cancel' or 'Close' - begin
$(".reset-page").click(function() {
     window.location.href = "form.html"
});
// Reset page on 'Cancel' or 'Close' - end

// Disable 'Submit' button on page load - begin
$(document).ready(function(){
    $("#submit-button").attr("disabled",true);
});
// Disable 'Submit' button on page load - end

// Change text on the back of the card - start
function emailRecipient() {
    let emailInput = document.getElementById('email-input').value;
    $("#request-to-submit").text("A record of this transaction will be sent to " + emailInput + ".");
}
// Change text on the back of the card - end

// Send email from webpage - start
// Function to add text to modal
function confirmationModel() {
    let emailInput = document.getElementById('email-input').value;
    $("#details-sent").text("A record of this transaction has been sent to " + emailInput + ".");
}

// Function to send email
function sendEmail() {
    var modal = document.getElementById("myModal");
    let nameInput = document.getElementById('name-input').value;
    let emailInput = document.getElementById('email-input').value;
    let cardInput = document.getElementById('card-number-input').value;
    let body = decodeURI("Name: " + nameInput + "<br/>" + "Email address: " + emailInput + "<br/>" + "Credit card number: " + cardInput);
    Email.send({
    Host: "smtp.gmail.com",
    Username : "ADD YOUR EMAIL ADDRESS HERE", // NEEDS TO BE UPDATED TO WORK
    Password : "ADD YOUR PASSWORD HERE", // NEEDS TO BE UPDATED TO WORK
    To : emailInput,
    From : "ADD YOUR EMAIL ADDRESS HERE", // NEEDS TO BE UPDATED TO WORK
    Subject : "Thank you for submitting your details",
    Body : body,
    }).then(
        confirmationModel(),
        modal.style.display = "inline-block"
    );
}
// Send email from webpage - end