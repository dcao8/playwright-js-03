export const formTestDataFailureCases = [
    {
        testCaseName: "Check validate error in case of when let all fields empty",
        tags: ['@ID-TC-1'],
        data: {
            "Full Name": {
                input: "",
                error: "Please input your full name!"
            },
            "Email": {
                input: "",
                error: "Please input your email!"
            },
            "Phone Number": {
                input: "",
                error: "Please input your phone number!"
            },
            "Date of Birth": {
                input: "",
                error: "Please select your date of birth!You must be at least 18 years old!"
            },
            "Address": {
                input: "",
                error: "Please input your address!"
            },
        }
    },
    {
        testCaseName: "Check validate error in case of invalid email, phone < 10 chars, DOB < 18",
        tags: ['@ID-TC-2', '@ID-TC-3', '@ID-TC-4'],
        data: {
            "Email": {
                input: "daycao.com",
                error: "The input is not valid E-mail!"
            },
            "Phone Number": {
                input: "123456789",
                error: "Phone number must be 10 digits!"
            },
            "Date of Birth": {
                input: "2024-12-14",
                error: "You must be at least 18 years old!"
            }
        }
    },
    {
        testCaseName: "Check validate error in case of invalid email, phone > 10 chars",
        tags: ['@ID-TC-5', '@ID-TC-6', '@ID-TC-7'],
        data: {
            "Email": {
                input: "daycao@com",
                error: "The input is not valid E-mail!"
            },
            "Phone Number": {
                input: "12345678910",
                error: "Phone number must be 10 digits!"
            }
        }
    }
]

export const formTestDataSuccessCases = [
    {
        testCaseName: "Submit form in case of all fields are filled",
        tags: ['@ID-TC-8'],
        data: {
            "Full Name": "Day Cao",
            "Email": "day@cao.com",
            "Phone Number": "1234567890",
            "Date of Birth": "1993-12-14",
            "Address": "Ho Chi Minh City",
            "Occupation": "Tester",
            "Company": "Apple Inc."
        },
    },
    {
        testCaseName: "Submit form in case of all fields are filled but occupation and company",
        tags: ['@ID-TC-9'],
        data: {
            "Full Name": "Day Cao",
            "Email": "day@cao.com",
            "Phone Number": "1234567890",
            "Date of Birth": "1993-12-14",
            "Address": "Ho Chi Minh City"
        },
    }
]