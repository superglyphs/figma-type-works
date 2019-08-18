figma.showUI(__html__);
figma.ui.resize(300, 360);
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
                let alphabetics = !node.characters.match(/[0-9]+$/g) ? node.characters.match(/[a-zA-Z]+/g).join('').length : 0;
                // counts words
                const words = node.characters.split(/ +/).length;
                // name 
                const name = node.name;
                // sends count data to ui
                figma.ui.postMessage({
                    type: 'text',
                    layerName: name,
                    spaceCount: spaces,
                    charCount: chars,
                    alphaCount: alphabetics,
                    wordCount: words
                });
            }
            // signal to ui that selection is not text
            else {
                const name = node.name;
                figma.ui.postMessage({
                    type: 'not-text',
                    layerName: name
                });
            }
        }
    }
};
