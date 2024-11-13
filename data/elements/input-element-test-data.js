export const textInputTestData = [
    "Hello!",
    "Test with me!",
    "Input password"
]

export const numberInputTestData = [
    {
        input: -1,
        expected: 1
    },
    {
        input: 0,
        expected: 1
    },
    {
        input: 1,
        expected: 1
    },
    {
        input: 50,
        expected: 50
    },
    {
        input: 99,
        expected: 99
    },
    {
        input: 100,
        expected: 100
    },
    {
        input: 101,
        expected: 100
    },
    {
        input: "abc",
        expected: "null"
    }
]

export const increaseDescreaseTestData = [
    {
        input: 3,
        expected: 1,
        action: 'down'
    },
    {
        input: 7,
        expected: 2,
        action: 'down'
    },
    {
        input: 10,
        expected: 15,
        action: 'up'
    },
    {
        input: 99,
        expected: 100,
        action: 'up'
    }
]