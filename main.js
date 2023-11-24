const firebaseConfig = {
    apiKey: "AIzaSyBOGN2y_n481oaVUmIf9qZnoLami55JwxE",
    authDomain: "formloginsignup-a7fb8.firebaseapp.com",
    databaseURL: "https://formloginsignup-a7fb8-default-rtdb.firebaseio.com",
    projectId: "formloginsignup-a7fb8",
    storageBucket: "formloginsignup-a7fb8.appspot.com",
    messagingSenderId: "277189178497",
    appId: "1:277189178497:web:e96e30e6885f9e55560980"
};

firebase.initializeApp(firebaseConfig)


//khởi tạo variable
const auth = firebase.auth()
const database = firebase.database()


//function SignUp
function SignUp(){
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    username = document.getElementById("username").value

    if(checkEmail(email) == false || checkPwd(password) == false){
        alert("Please check ur email or password")
        return 
    }

    if(checkField(username) == false){
        alert("Please check username")
        return
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                username: username,
                password: password,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            // DOne
            alert('User Created!!!');
        })
        .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        })
}

function logIn(){
    email = document.getElementById("emailLogin").value
    password = document.getElementById("passwordLogin").value

    if(checkEmail(email) == false || checkPwd(password) == false){
        alert("please check your email or password")
        return
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data);

            // DOne
            alert('User Logged In!!!');

        })
        .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        })
}



function checkEmail(email){
    //regex-kiểm tra tính hợp lệ cho email
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email) == true){
        return true
    } else {
        return false
    }
}


function checkPwd(){
    //regex-kiểm tra tính hợp lệ của pwd
    expression = /^[A-Za-z]\w{7,14}$/
    if(expression.test(password) == true){
        return true
    } else {
        return false
    }
}

function checkField(field){
    if(field == null){
        return false
    } 
    if(field.length <= 0){
        return false
    } else {
        return true
    }
}