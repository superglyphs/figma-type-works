figma.showUI(__html__);
figma.ui.onmessage = msg => {
    if (msg.type === 'count-characters') {
        // the for is loop due to near future multiple selection features
        for (const node of figma.currentPage.selection) {
            // checks if the selection is text
            if (node.type === "TEXT") {
                // counts the total characters
                const chars = node.characters.length;
                // counts spaces
                const spaces = node.characters.split(" ").length - 1;
                // counts only alphabetic characters
                const alphabetics = node.characters.match(/[a-zA-Z]+/g).join('').length;
                // counts words
                const words = node.characters.split(/ +/).length;
                // sends count data to ui
                figma.ui.postMessage({
                    spaceCount: spaces,
                    charCount: chars,
                    alphaCount: alphabetics,
                    wordCount: words
                });
            }
            // signal to ui that selection is not text
            else {
                figma.ui.postMessage('notext');
            }
        }
    }
};
