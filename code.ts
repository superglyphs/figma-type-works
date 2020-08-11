figma.showUI(__html__);
figma.ui.resize(300, 320)

figma.ui.onmessage = msg => {

  if (msg.type === 'count-characters') {

    // the for is loop due to near future multiple selection features
    for (const node of figma.currentPage.selection) {
      
      // checks if the selection is text
      if (node.type === "TEXT") {
        
        // counts the total characters
        const chars = node.characters.length

        // counts spaces
        const spaces = node.characters.split(" ").length - 1
        
        // TO DO: counts only alphabetic characters
        let alphabetics = node.characters.match(/[\u0000-~Ā-žƀ-ɎͰ-ϾЀ-ӾԀ-\u052eἀ-῾Ⱡ-\u2c7e\u2de0-\u2dfeꙀ-\ua69e꜠-ꟾ]+/g).join('').length;
        
        // counts words
        const words = node.characters.split(/ +/).length

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
        })
      }


      // signal to ui that selection is not text
      else {
        const name = node.name;
        figma.ui.postMessage({
          type: 'not-text',
          layerName: name
        })
      }
    }


  }
};