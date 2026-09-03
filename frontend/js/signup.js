
/* ========================= TEMPORARY SIGN UP DATA
This represents the account that will later be created through the backend/database. ========================= */
let registeredUser = null;
/* ========================= ELEMENTS ========================= */
const signupForm =document.getElementById("signupForm");

const formMessage =
document.getElementById(
    "formMessage"
);

/* ========================= FORM SUBMISSION ========================= */
signupForm.addEventListener( "submit", function(event) {
   event.preventDefault();



    const firstName =

        document.getElementById(
            "firstName"
        ).value.trim();


    const lastName =

        document.getElementById(
            "lastName"
        ).value.trim();


    const phone =

        document.getElementById(
            "phone"
        ).value.trim();


    const businessName =

        document.getElementById(
            "businessName"
        ).value.trim();


    const businessType =

        document.getElementById(
            "businessType"
        ).value;


    const businessLocation =

        document.getElementById(
            "businessLocation"
        ).value.trim();


    const businessDescription =

        document.getElementById(
            "businessDescription"
        ).value.trim();


    const email =

        document.getElementById(
            "email"
        ).value.trim();


    const password =

        document.getElementById(
            "password"
        ).value;


    const confirmPassword =

        document.getElementById(
            "confirmPassword"
        ).value;



    /* =========================
       PASSWORD VALIDATION
    ========================= */


    if (
        password !== confirmPassword
    ) {

        formMessage.textContent =
            "Passwords do not match.";

        return;

    }



    /* =========================
       TEMPORARY USER OBJECT
    ========================= */


    registeredUser = {


        user: {

            firstName,

            lastName,

            phone,

            email

        },


        business: {

            name:
                businessName,

            type:
                businessType,

            location:
                businessLocation,

            description:
                businessDescription

        }

    };



    /* =========================
       TEMPORARY SUCCESS
    ========================= */


    formMessage.textContent =
        "Account created successfully.";


    signupForm.reset();



    console.log(
        "Temporary registered user:",
        registeredUser
    );

}

);