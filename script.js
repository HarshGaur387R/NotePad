window.onload = () => {
    let length = localStorage.length;
    for (let index = 0; index < length; index++) {
        const key = localStorage.key(index);

        let option = document.createElement('option');
        option.value = key;

        document.getElementById('savedNotes').appendChild(option);

    }
}


let menuBarItems = Array.from(document.getElementById('menuBar').firstElementChild.children);


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

function createTabSolo(name) {

    let img = document.createElement('img');
    img.src = "/NotePad/img/bCross.png";
    img.className = "crossIcon";
    img.alt = "x";

    let li = document.createElement('li');
    li.innerHTML = name;
    li.appendChild(img);

    tabsBarUl.appendChild(li);
    tabsBarUlChilds = Array.from(tabsBarUl.children);

    li.addEventListener('click', (e) => {

        changeCurrentTab(e, li, false);
        changeNotes(e, li, false);
    });

    li.firstElementChild.addEventListener('mouseover', () => {
        li.firstElementChild.className = 'crossIconOnHover'
    });

    li.firstElementChild.addEventListener('mouseout', () => {
        li.firstElementChild.className = 'crossIcon'
    });

    li.firstElementChild.addEventListener('touchstart', () => {
        li.firstElementChild.className = 'crossIconOnTouch'
    });

    li.firstElementChild.addEventListener('click', (e) => {

        let removedElement = li;


        tabsBarUl.removeChild(li);
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
}

function createNoteSolo(id) {
    let div = document.createElement('div');
    div.id = id;
    div.innerHTML = id; // ******* WILL REMOVE IT IN FUTURE.
    div.className = "unActiveNote";

    document.getElementById('Notes').appendChild(div);
    NotesChilds = Array.from(NotesContainer.children);

}


function createNewTabAndNote() {

    let nameAskingWindow = document.getElementById('nameAskingWindow');
    nameAskingWindow.style.display = "block";
    let nameButton = document.getElementById('nameButton');

    nameButton.onclick = () => {
        let val = document.getElementById('nameInput').value;
        document.getElementById("nameInput").value = "";
        nameAskingWindow.style.display = "none";

        // Creating Tab. 

        let img = document.createElement('img');
        img.src = "/NotePad/img/bCross.png";
        img.className = "crossIcon";
        img.alt = "x";

        let li = document.createElement('li');
        li.innerHTML = val;
        li.appendChild(img);

        tabsBarUl.appendChild(li);
        tabsBarUlChilds = Array.from(tabsBarUl.children);

        li.addEventListener('click', (e) => {

            changeCurrentTab(e, li, false);
            changeNotes(e, li, false);
        });

        li.firstElementChild.addEventListener('mouseover', () => {
            li.firstElementChild.className = 'crossIconOnHover'
        });

        li.firstElementChild.addEventListener('mouseout', () => {
            li.firstElementChild.className = 'crossIcon'
        });

        li.firstElementChild.addEventListener('touchstart', () => {
            li.firstElementChild.className = 'crossIconOnTouch'
        });

        li.firstElementChild.addEventListener('click', (e) => {

            let removedElement = li;


            tabsBarUl.removeChild(li);
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

        let fakeEvent = { target: { nodeName: "Not_Image" } }
        changeCurrentTab(fakeEvent, li, false);

        // Creating new notes tab.

        let div = document.createElement('div');
        div.id = val;
        div.innerHTML = val; // ******* WILL REMOVE IT IN FUTURE.
        div.className = "unActiveNote";

        document.getElementById('Notes').appendChild(div);
        NotesChilds = Array.from(NotesContainer.children);

        changeNotes(fakeEvent, div, false);

    }

}


function OpenNote() { // CHECKPOINT
    document.getElementById('fileListWindow').style.display = 'block';

    let filesBtn = document.getElementById('filesButton');
    let val = '';


    filesBtn.onclick = () => {

        let flag = false;

        let filesInput = document.getElementById('filesInput');

        let val = filesInput.value;

        if (val == '') {
            // TASK:  show error in fixed pop up window.
        }
        else if (val != '') {
            document.getElementById('fileListWindow').style.display = 'none';

            let arr = Array.from(document.getElementById('tabsBarUl').children);

            arr.forEach((e) => {
                if (e.textContent == val) {
                    flag = true;
                    console.log(flag);
                }
            });

            if (flag == false) {
                createTabSolo(val);
                createNoteSolo(val);
            }

            filesInput.value = '';

        }
    };

}

function saveNote() {

    if (currentActiveNote != undefined) {
        localStorage.setItem(currentActiveNote.id, currentActiveNote.innerHTML);

    }
}

function saveAs(activeNote, id) {

}

function deleteNode() { // Delete's active note and tab.

}

function stckey() { // Stickey open the tab and note in new window.

}


menuBarItems[0].addEventListener('click', createNewTabAndNote);
menuBarItems[1].addEventListener('click', OpenNote);
menuBarItems[2].addEventListener('click', saveNote);