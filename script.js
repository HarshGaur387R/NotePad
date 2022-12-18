window.onload = () => {
    let length = localStorage.length;
    for (let index = 0; index < length; index++) {
        const key = localStorage.key(index);

        let option = document.createElement('option');
        option.value = key;

        document.getElementById('savedNotes').appendChild(option);

    }
}

let container = document.getElementById('container');

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
            if (e.target.nodeName != 'IMG') {

                if (currentActiveNote == undefined) {
                    currentActiveNote = pair[sID];
                    currentActiveNote.className = 'activeNote';
                }
                else if (currentActiveNote != undefined) {
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
                else if (currentActiveTab != undefined) {

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

    return li;
}

function createNoteSolo(id) {
    let div = document.createElement('div');
    div.id = id;
    div.className = "unActiveNote";

    let textarea = document.createElement('textarea');
    textarea.name = id;
    textarea.className = 'textareaFull';

    div.appendChild(textarea);

    return div;

}


function appendTab(li) {
    tabsBarUl.appendChild(li);
    tabsBarUlChilds = Array.from(tabsBarUl.children);
}


function appendNote(div) {
    document.getElementById('Notes').appendChild(div);
    NotesChilds = Array.from(NotesContainer.children);
}


function createNewTabAndNote() {

    let nameAskingWindow = document.getElementById('nameAskingWindow');
    nameAskingWindow.style.display = "block";
    let nameButton = document.getElementById('nameButton');

    /* Making others elements of container unclickable except the popup window. */
    container.style.pointerEvents = 'none'; 

    document.getElementById('nameAskingWindow').style.pointerEvents = 'all';


    nameButton.onclick = () => {
        let val = document.getElementById('nameInput').value;
        document.getElementById("nameInput").value = "";

        if (val == '') {
            // Show an error.
            console.log('Name is empty!');
        }
        else if (val != '') {

            nameAskingWindow.style.display = "none";
            container.style.pointerEvents = 'all';

            let fakeEvent = { target: { nodeName: "Not_Image" } }
            let isElementAlreadyExist = false;

            for (let index = 0; index < localStorage.length; index++) {

                if (localStorage.key(index) == val) {
                    isElementAlreadyExist = true;
                }

            }

            if (isElementAlreadyExist == false) {

                // Creating Tab. 

                let li = createTabSolo(val);
                appendTab(li);
                changeCurrentTab(fakeEvent, li, false);

                // Creating new notes.

                let div = createNoteSolo(val);
                appendNote(div);
                changeNotes(fakeEvent, li, false);


                localStorage.setItem(div.id, div.textContent);

                let option = document.createElement('option');
                option.value = val;
                document.getElementById('savedNotes').appendChild(option);


            }
            else if (isElementAlreadyExist == true) {

                // Show an error *****************

                console.log('Notes and Tab already exists!');
            }
        }
    }

}

function OpenNote() { 
    document.getElementById('fileListWindow').style.display = 'block';

    container.style.pointerEvents = 'none';

    document.getElementById('fileListWindow').style.pointerEvents = 'all';

    let filesBtn = document.getElementById('filesButton');
    let val = '';

    filesBtn.onclick = () => {

        let flag = false;

        let filesInput = document.getElementById('filesInput');

        let val = filesInput.value;

        if (val == '') {
            console.log('Input is empty');

            // Show an error ******************

        }
        else if (val != '') {
            document.getElementById('fileListWindow').style.display = 'none';

            container.style.pointerEvents = 'all';

            let arr = Array.from(document.getElementById('tabsBarUl').children);


            let isElemenetExist = false;

            for (let index = 0; index < localStorage.length; index++) {

                if (localStorage.key(index) == val) {
                    isElemenetExist = true;
                }
            }

            if (isElemenetExist == true) {

                arr.forEach((e) => {
                    if (e.textContent == val) {
                        flag = true;
                        console.log(flag);
                    }
                });

                if (flag == false) {
                    let li = createTabSolo(val);
                    appendTab(li);

                    let div = createNoteSolo(val);
                    div.firstElementChild.value = localStorage.getItem(div.id);

                    appendNote(div);
                }
                else if (flag == true) {

                    // Show an error ********

                    console.log('Tab is already open');

                }

            }
            else if (isElemenetExist == false) {

                // Show an Error ********

                console.log('Element does not exist');
            }

            filesInput.value = '';
        }
    };

}

function saveNote() // Saves current note with different name.
{

    if (currentActiveNote != undefined) {
        localStorage.setItem(currentActiveNote.id, currentActiveNote.firstElementChild.value);

    }
    else if (currentActiveNote == undefined) {
        // Show an error message *********
        console.log('Select the Note first');
    }
}

function saveAs() {


    if (currentActiveTab != undefined) {


        document.getElementById('saveAsWindow').style.display = 'block';

        container.style.pointerEvents = 'none';
        document.getElementById('saveAsWindow').style.pointerEvents = 'all';

        let btn = document.getElementById('saveAsButton');

        btn.onclick = () => {

            let val = document.getElementById('saveAsInput').value;

            if (val == '') {
                // Show an error ***********
                console.log('Please enter valid name!');
            }

            else if (val != '') {

                container.style.pointerEvents = 'all';


                document.getElementById('saveAsWindow').style.display = 'none';



                if (localStorage.getItem(val)) {
                    // Show an error *************
                    console.log('Note With this name already exist');
                }
                else if (!localStorage.getItem(val)) {
                    let li = createTabSolo(val);
                    let div = createNoteSolo(val);

                    div.firstElementChild.value = currentActiveNote.firstElementChild.value;

                    appendTab(li);
                    appendNote(div);


                    localStorage.setItem(div.id, div.firstElementChild.value);


                    let option = document.createElement('option');

                    option.value = val;

                    document.getElementById('savedNotes').appendChild(option);
                }

            }

            document.getElementById('saveAsInput').value = '';
        }

    }
    else if (currentActiveTab == undefined) {
        // Show an error ************.
        console.log('Select the element first');
    }

}

function deleteNode() { // Delete's active note and tab.
    if (currentActiveTab == undefined) {
        
        console.log('Select the node first.');
        //  Show an error message.
    }

    else if (currentActiveTab != undefined) {
        
        let element = currentActiveTab;

        tabsBarUl.removeChild(element);
        tabsBarUlChilds = Array.from(tabsBarUl.children);

        removeNote(element);

        localStorage.removeItem(element.textContent);
        
    }
}

function sticky() { // Sticky open the tab and note in new window.

    var win = window.open('', '_blank','height=500,width=500,left=100,top=100');
    win.focus();

    // TASK: Complete this nonsense.
}

menuBarItems[0].addEventListener('click', createNewTabAndNote);
menuBarItems[1].addEventListener('click', OpenNote);
menuBarItems[2].addEventListener('click', saveNote);
menuBarItems[3].addEventListener('click', saveAs);
menuBarItems[4].addEventListener('click',deleteNode);
menuBarItems[5].addEventListener('click',sticky);