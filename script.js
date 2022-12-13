let NotesContainer = document.getElementById('Notes');

let NotesChilds = Array.from(NotesContainer.children);

let currentActiveNote = undefined;


let tabsBarUl = document.getElementById('tabsBarUl');

let tabsBarUlChilds = Array.from(tabsBarUl.children);

let currentActiveTab = undefined;


let currentTabIndex;


function getNotesPair(childs) { // It will returns key value pair of notes.

    let returnValue = [];

    childs.forEach((e) => {
        returnValue[e.id] = e;
    });

    return returnValue;
}


function changeNotes(e, element, afterRemoving) {
    let sID = element.textContent;
    let pair = getNotesPair(NotesChilds);

    try {


        if (afterRemoving == false) {
            if (e.target.nodeName != 'IMG') {    // Find other logic for this shit.  .

                if (currentActiveNote == undefined) {
                    currentActiveNote = pair[sID];
                    currentActiveNote.className = 'activeNote';
                }
                else {
                    currentActiveNote.className = 'unActiveNote';
                    currentActiveNote = pair[sID];
                    currentActiveNote.className = 'activeNote';
                }

            }
        }
        else if (afterRemoving == true) {
            currentActiveNote.className = 'unActiveNote';
            currentActiveNote = pair[sID];
            currentActiveNote.className = 'activeNote';
        }
    } catch (error) {
        console.log('All Notes are closed');
    }


}

function removeNote(element) {

    NotesChilds.forEach((el) => {
        if (el.id == element.textContent) {
            NotesContainer.removeChild(el);
        }
    });
    NotesChilds = Array.from(NotesContainer.children);
}


function changeCurrentTab(e, element, afterRemoving) {
    try {

        if (afterRemoving == false) {

            if (e.target.nodeName != 'IMG') {

                if (currentActiveTab == undefined) {

                    element.style.cssText = 'background-color:#282828;';

                    currentActiveTab = element;


                }
                else {

                    currentActiveTab.style.cssText = 'background-color:#171717;';

                    element.style.cssText = 'background-color:#282828';

                    currentActiveTab = element;

                }

                currentTabIndex = tabsBarUlChilds.indexOf(element);
            }
        }

        else if (afterRemoving == true) {

            currentActiveTab.style.cssText = 'background-color:#171717;';

            element.style.cssText = 'background-color:#282828';

            currentActiveTab = element;

            currentTabIndex = tabsBarUlChilds.indexOf(element);

        }
    }
    catch (error) {
        console.log('All Tabs Are closed.');
    }
}


tabsBarUlChilds.forEach((element, index) => {

    element.addEventListener('click', (e) => {

        changeCurrentTab(e, element, false);
        changeNotes(e, element, false);
    });

    element.firstElementChild.addEventListener('mouseover', () => {
        element.firstElementChild.className = 'crossIconOnHover'
    });

    element.firstElementChild.addEventListener('mouseout', () => {
        element.firstElementChild.className = 'crossIcon'
    });

    element.firstElementChild.addEventListener('touchstart', () => {
        element.firstElementChild.className = 'crossIconOnTouch'
    });

    element.firstElementChild.addEventListener('click', (e) => {

        let removedElement = element;


        tabsBarUl.removeChild(element);
        removeNote(removedElement);
        tabsBarUlChilds = Array.from(tabsBarUl.children);



        if (removedElement == currentActiveTab) {
            if (currentTabIndex < tabsBarUlChilds.length) {

                changeCurrentTab(null, tabsBarUlChilds[currentTabIndex], true);
                changeNotes(e, currentActiveTab, true);
            }
            else if (currentTabIndex > tabsBarUlChilds.length - 1) {
                changeCurrentTab(null, tabsBarUlChilds[tabsBarUlChilds.length - 1], true);
                changeNotes(e, currentActiveTab, true);
            }
        }

    });
});

function createNewTab(name) {
    
}

function createNewNote(element){

}

function OpenNote(name){

}

function saveNote(activeNote){

}

function saveAs(activeNote,id){

}

function deleteNode(){ // Delete's active note and tab.

}

function stckey(){ // Stickey open the tab and note in new window.

}