function randomizeArray(myArray, recordCount) { // Fisher-Yates shuffle
    var sliceLimit = myArray.length;
    if (recordCount) {
        sliceLimit = recordCount;
    }
    var m = myArray.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = myArray[m];
        myArray[m] = myArray[i];
        myArray[i] = t;
    }

    return myArray.slice(0, sliceLimit);

}
function pluralize(word, qty) {
    var newWord = '';
    if (qty == 1) {
        newWord = word;
    } else {
        newWord = word + 's';
    }
    return qty.toString() + ' ' + newWord;
}

module.exports = { randomizeArray, pluralize };