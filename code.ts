figma.showUI(__html__);
figma.ui.resize(300, 240)

// TO DO: counts only alphabetic characters
// let alphabetics = entryNode.characters.match(/[\u0000-~Ā-žƀ-ɎͰ-ϾЀ-ӾԀ-\u052eἀ-῾Ⱡ-\u2c7e\u2de0-\u2dfeꙀ-\ua69e꜠-ꟾ]+/g).join('').length;


  figma.on("selectionchange", () => {

    // if nothing is selected, let the UI know
    if (figma.currentPage.selection.length === 0) {
      figma.ui.postMessage({
        selectionStatus: 'nothing-selected'
      })
    }

    function countChars(entryNode) {


    }

    function countWords(entryNode) {
        
  

    }

    function countSpaces(entryNode) {
        


    }

    // the for is loop due to near future multiple selection features
    for (const node of figma.currentPage.selection) {
      
      // checks if the selection is text and NOT in edit mode
      if (node.type === "TEXT" && !figma.currentPage.selectedTextRange) {
        
        
      // counts and returns the total characters of the text node
      const countedChars = node.characters.length
      
      // counts and returns the total words of the text node
      const countedWords = node.characters.split(/ +/).length

      // counts and returns the total spaces of the text node
      const countedSpaces = node.characters.split(" ").length - 1

        // sends count data to ui
        figma.ui.postMessage({
          selectionStatus: 'yes-text-layer',
          layerName: node.name,
          charCount: countedChars,
          wordCount: countedWords,
          spaceCount: countedSpaces, 
        })
      }

      // checks if the selection is text and IS in edit mode
      if (node.type === "TEXT" && figma.currentPage.selectedTextRange) {
        
        // gets the start and end of a text selection
        const nodeSelectionStart = figma.currentPage.selectedTextRange.start
        const nodeSelectionEnd = figma.currentPage.selectedTextRange.end
        
        // extracts the chars from the text selection
        const nodeSelectionChars = node.characters.slice(nodeSelectionStart, nodeSelectionEnd)

        // counts and returns the total characters of the text node
        const countedSelectionChars = nodeSelectionChars.length

        // counts and returns the total words of the text node
        const countedSelectionWords = nodeSelectionChars.split(/ +/).length

        // counts and returns the total spaces of the text node
        const countedSelectionSpaces = nodeSelectionChars.split(" ").length - 1
        
        // sends count data to ui
        figma.ui.postMessage({
          selectionStatus: 'yes-text-layer-selection',
          layerName: nodeSelectionChars,
          charCount: countedSelectionChars,
          wordCount: countedSelectionWords,
          spaceCount: countedSelectionSpaces, 
        })
      }

      // signal to ui that selection is not text
      if (node.type != "TEXT") {
        const name = node.name;
        figma.ui.postMessage({
          selectionStatus: 'not-text-layer',
          layerName: name
        })
      }
    }
  });