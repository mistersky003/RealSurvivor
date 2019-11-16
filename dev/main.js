/*Main File*/

Callback.addCallback("LevelLoaded", function () {
    Game.message("Real Survivor mod loaded!\nAuthor: Denys Dzhuhalyk");
});

IDRegistry.genItemID("peebucket");
Item.createItem("peebucket", "Reject Bucket", {name: "peebucket", meta: 0}, {stack: 1});

//Translation
Translation.addTranslation("Reject Bucket", {ru: "Ведро с отходами"});