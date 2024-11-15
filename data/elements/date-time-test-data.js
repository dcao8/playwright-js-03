export const timePickerTestData = [
    {
        placeholder: "Select time",
        time: "00:00:00"
    },
    {
        placeholder: "Select time",
        time: "14:12:39"
    },
    {
        placeholder: "Select time",
        time: "23:59:59"
    }
]

export const timeRangePickerTestData = [
    {
        placeholder: "Start time",
        startTime: "01:01:01",
        endTime: "04:04:04",
        expectedResult: "01:01:01 - 04:04:04"
    },
    {
        placeholder: "Start time",
        startTime: "05:05:05",
        endTime: "04:04:04",
        expectedResult: "04:04:04 - 05:05:05"
    },
    {
        placeholder: "End time",
        startTime: "02:02:02",
        endTime: "04:04:04",
        expectedResult: "02:02:02 - 04:04:04"
    }
]

export const datePickerTestData = [
    {
        placeholder: "Select date",
        value: "1993-12-14"
    },
    {
        placeholder: "Select week",
        value: "2024-46th"
    },
    {
        placeholder: "Select month",
        value: "2020-07"
    },
    {
        placeholder: "Select quarter",
        value: "2023-Q2"
    },
    {
        placeholder: "Select year",
        value: "2023"
    }
]

export const dateRangePickerTestData = [
    {
        startPlaceholder: "Start date",
        startTime: "2024-11-11",
        endPlaceholder: "End date",
        endTime: "2024-11-13",
        expectedResult: "2024-11-11 - 2024-11-13"
    },{
        startPlaceholder: "Start date",
        startTime: "2024-11-11 00:00:30",
        endPlaceholder: "End date",
        endTime: "2024-11-11 00:00:35",
        expectedResult: "2024-11-11 00:00:30 - 2024-11-11 00:00:35"
    },{
        startPlaceholder: "Start week",
        startTime: "2023-46th",
        endPlaceholder: "End week",
        endTime: "2024-46th",
        expectedResult: "2023-46th - 2024-46th"
    },
    {
        startPlaceholder: "Start month",
        startTime: "2023-06",
        endPlaceholder: "End month",
        endTime: "2020-07",
        expectedResult: "2020-07 - 2023-06"
    },
    {
        startPlaceholder: "End quarter",
        startTime: "2023-Q2",
        endPlaceholder: "Start quarter",
        endTime: "2023-Q3",
        expectedResult: "2023-Q2 - 2023-Q3"
    },
    {
        startPlaceholder: "Start year",
        startTime: "1992",
        endPlaceholder: "End year",
        endTime: "1993",
        expectedResult: "1992 - 1993"
    }
]

export const multipleDatePickerTestData = [
    {
        listDate:["2023-Jan-11", "1993-Dec-14", "2030-Jan-1"],
        expectedResult: "Current date: 1993-12-14, 2023-01-11, 2030-01-01"
    }
]