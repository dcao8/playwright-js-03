import { expect } from "@playwright/test"

export const cascaderTestData = [
    "Test, With, You",
    "Tho, Test, UI",
    "Tho, Test, API"
]

export const multipleCascaderTestData = [
    {
        input: "Light, Number 4",
        expectResult: "\nlight, 4"
    },
    {
        input: "Bamboo, Little, Toy Bird",
        expectResult: "\nbamboo, little, bird"
    },
    {
        input: "Bamboo, Little",
        expectResult: "\nbamboo"
    }
]