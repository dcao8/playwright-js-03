export const dragAndDropTestData = [
    {
        itemToBeDragged: "Orange",
        itemToBeDropAt: "Mango",
        itemsInLeftPanel: ["Apple", "Banane", "Peach"],
        itemsInRightPanel: ["Strawberry", "Orange", "Mango", "Pineapple", "Grapes"]
    },
    {
        itemToBeDragged: "Strawberry",
        itemToBeDropAt: "Apple",
        itemsInLeftPanel: ["Strawberry", "Apple", "Banane", "Orange", "Peach"],
        itemsInRightPanel: ["Mango", "Pineapple", "Grapes"]
    },
    {
        itemToBeDragged: "Peach",
        itemToBeDropAt: "Banane",
        itemsInLeftPanel: ["Apple", "Peach", "Banane", "Orange"],
        itemsInRightPanel: ["Strawberry", "Mango", "Pineapple", "Grapes"]
    },
    {
        itemToBeDragged: "Pineapple",
        itemToBeDropAt: "Grapes",
        itemsInLeftPanel: ["Apple", "Banane", "Orange", "Peach"],
        itemsInRightPanel: ["Strawberry", "Mango", "Grapes", "Pineapple"]
    }
]