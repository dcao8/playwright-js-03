export const validFieldsTestData = [
    {
        fullNameInput: "Day Cao",
        emailInput: "day@cao.com",
        phoneNumberInput: "1234567890",
        dateOfBirthInput: "2000-Dec-14",
        addressInput: "Ho Chi Minh City",
        occupationInput: "Automation Tester",
        companyInput: "Apple Inc."
    }
]

export const emptyFieldsTestData = [
    {
        fullNameError: "Please input your full name!",
        emailError: "Please input your email!",
        phoneNumberError: "Please input your phone number!",
        dateOfBirthError: "Please select your date of birth!You must be at least 18 years old!",
        addressError: "Please input your address!"
    }
]

export const invalidEmailTestData = [
    "plainaddress",
    "#@%^%#@#@#.com",
    "@domain.com",
    "day< email@domain.com>",
    "email.domain.com",
    "email@domain@domain.com",
    "email.@domain.com",
    "email..email@domain.com",
    "email@domain",
    "email@-domain.com",
    "email@111.222.333.44444",
    "email@domain..com"
]

export const invalidPhoneTestData = [
    "123456789",
    "12345678910",
    "123456789a",
    "<td>a</td>",
    "!@#$%^&*()",
    "+123456789"
]

export const invalidDateOfBirthTestData = [
    "2023-Jan-11", "2030-Jan-1"
]