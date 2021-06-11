console.log('insert2HTML');



// ===================================================================================
/**
 * Takes Text from a .txt file and inserts it into 
 * a selected part of a HTML code.
 * @param {string} file The file path of the txt file you want to read from.
 * @param {string} id   The id or class of the div you want to put the html text into.
 */
 function insertText(file, id) {
    d3.text(file).then(text => {
        let textArray = text.split('\n');
        let selected = d3.select(id);
        let htmlString = '';
        textArray.forEach(entry => {
            switch(entry){
                case '\r':
                    break;
                default:
                    htmlString = htmlString + '<p>' + entry + '</p>';
                    break;
            }
        });
        selected.html(htmlString);
    });
}
// ====================================================================================



// =====================================================================================================================

// insertMD closure
function MD() {
    
    // a function to strip of #'s at beginning of headers
    function handleHeader(string){
        let headerSplit = string.split('#');
        let header = headerSplit[headerSplit.length - 1];
        return header;
    }

    // a function to strip of *'s at beginning of list objects
    function handleUlist(string) {
        let UlistSplit = string.split('* ');
        let Ulist = UlistSplit[UlistSplit.length -1];
        return Ulist;
    }

    // a function to strip off 1.'s at beginning of list objects
    function handleOlist(string) {
        let OlistSplit = string.split('1. ');
        let Olist = OlistSplit[OlistSplit.length -1];
        return Olist;
    }

    // a functions to strip break down image component into array
    // [Defintion of Image, Location of Image]
    function handleImage(string) {
        let imageSplit = string.split('!').join('').split('[').join('').split(']').join('').split(')').join('').split('(');
        return imageSplit;
    }


    /**
     * This function inserts elements from a Markdown file into a div or other element in
     * an HTML file.
     * @param {string} file The path the file you want to take info from.
     * @param {string} id   The div or place you want to put the info into.
     */
    function insertMD(file, id) {
        d3.text(file).then(text => {
            // Splitting on every new line
            let mdArray = text.split('\n');

            // Adding an extra element at the end to make code work later down the road
            mdArray.push('');

            // setting a const length variable
            const len = mdArray.length;

            // grabbing a hold of HTML element where this is all going
            let selected = d3.select(id);

            // initailizing string that will go into element
            let htmlString = '';

            // this is a counter that does nothing, how fun
            let doNothing = 0;

            // looping over the length of my array
            for (let i = 0; i < len; i++) {

                // setting a variable to be my current array entry
                let entry = mdArray[i];

                // if entry is an empty row, do nothing, by counting do nothing, how fun
                if (entry === '\r') {

                    doNothing = doNothing + 1;

                // if it has 6 #'s make it a h6 header
                } else if (entry.startsWith('######')) {

                    htmlString = htmlString + '<h6>' + handleHeader(entry) + '</h6>';

                // if it has 5 #'s make it a h5 header
                } else if (entry.startsWith('#####')) {

                    htmlString = htmlString + '<h5>' + handleHeader(entry) + '</h5>';

                // if it has 4 #'s make it a h4 header
                } else if (entry.startsWith('####')) {

                    htmlString = htmlString + '<h4>' + handleHeader(entry) + '</h4>';

                // if it has 3 #'s make it a h3 header
                } else if (entry.startsWith('###')) {

                    htmlString = htmlString + '<h3>' + handleHeader(entry) + '</h3>';

                // if it has 2 #'s make it a h2 header
                } else if (entry.startsWith('##')) {

                    htmlString = htmlString + '<h2>' + handleHeader(entry) + '</h2>';

                // if it has 1 # make it a h1 header
                } else if (entry.startsWith('#')) {

                    htmlString = htmlString + '<h1>' + handleHeader(entry) + '</h1>';

                // if it is the first of set of an unordered list do this
                } else if (entry.startsWith('*') && !mdArray[i-1].startsWith('*')) {

                    htmlString = htmlString + '<ul><li>' + handleUlist(entry) + '</li>';

                // if it is the last of a set of an unordered list do this
                } else if (entry.startsWith('*') && !mdArray[i+1].startsWith('*')) {

                    htmlString = htmlString + '<li>' + handleUlist(entry) + '</li></ul>';
                
                // if it is in the middle of a set of an unordered list do this
                } else if (entry.startsWith('*')) {

                    htmlString = htmlString + '<li>' + handleUlist(entry) + '</li>';
                    
                // if it is the first of a set of an ordered list do this
                } else if (entry.startsWith('1.') && !mdArray[i-1].startsWith('1.')) {

                    htmlString = htmlString + '<ol><li>' + handleOlist(entry) + '</li>';

                // if it is the last of a set of an ordered list do this
                } else if (entry.startsWith('1.') && !mdArray[i+1].startsWith('1.')) {

                    htmlString = htmlString + '<li>' + handleOlist(entry) + '</li></ol>';
                
                // if it is in the middle of a set of an ordered list do this
                } else if (entry.startsWith('1.')) {

                    htmlString = htmlString + '<li>' + handleOlist(entry) + '</li>';
                    
                // if it is the last element in the array, the one I added on,
                // so I could handle a list at the end of the md, just do this
                } else if (entry === '') {

                    console.log('Andy was here');

                // if there is a horizontal divider, it puts a horizontal divider in
                } else if (entry.startsWith('===')) {

                    htmlString = htmlString + '<hr>'

                // if it is an image tag, make it a make element with a unique id, so you can customize each photo in css
                } else if (entry.startsWith('!')) {

                    htmlString = htmlString + '<img id=' + `inserted-img${i}` + ' class="inserted-img" src=' + handleImage(entry)[1] + 'width=100% ref=' + handleImage(entry)[0] + '>';

                // and if it is just plain text, just shove it into a paragraph element
                } else {

                    htmlString = htmlString + '<p>' + handleHeader(entry) + '</p>';

                }
                
            }

            // throw the completed string into the html
            selected.html(htmlString);
        });
    }

    // return the function out of the closure
    return insertMD;

}

// assign the returned function from closure to new function outside closures
insertMD = MD();

// ==============================================================================================================================

insertMD('../static/text/writeup.md', '#prediction_text');
