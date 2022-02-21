var firebaseConfig = {
    apiKey: "AIzaSyAVEsNp3binnT5JUMvftXFC30Z_Iw6nOmg",
    authDomain: "my-web-2627e.firebaseapp.com",
    databaseURL: "https://my-web-2627e-default-rtdb.firebaseio.com",
    projectId: "my-web-2627e",
    storageBucket: "my-web-2627e.appspot.com",
    messagingSenderId: "402125962516",
    appId: "1:402125962516:web:4960d1c575ac5bdfb2d601",
};
firebase.initializeApp(firebaseConfig);

var UserInputsRef = firebase.database().ref('UserInputs')
document.getElementById('testForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    var name = getInputVal('name');
    var mobile = getInputVal('mobile');
    var state = getInputVal('state');
    readState(state);
    var email = getInputVal('email');
    var emailstatus = validateEmail();
    var dateofbirth = getInputVal('dob');
    var selectedOption = document.querySelector('input[name = option]:checked').value;
    var symptomsList = getSelectedCheckboxValues('symptoms');

    console.log("HI")

    if (emailstatus)
        saveMessages(name, mobile, email, dateofbirth, state, selectedOption, symptomsList);
}

function readState(state) {
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
        centers = data.val();
        document.getElementById("result").innerHTML = "<br>" + centers;
    })
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveMessages(name, mobile, email, dateofbirth, state, selectedOption, symptomsList) {
    var newuserInputsRef = UserInputsRef.push();
    newuserInputsRef.set({
        name: name,
        mobile: mobile,
        email: email,
        dateofbirth: dateofbirth,
        selectedOption: selectedOption,
        state: state,
        symptomsList: symptomsList
    })
    alert("Thank you, find the list of centers nearby!  ");
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function validateEmail() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}