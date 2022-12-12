let tabsBarUl = document.getElementById('tabsBarUl');

let tabsBarUlChilds = Array.from(tabsBarUl.children);

let currentActiveTab = undefined;

tabsBarUlChilds.forEach(element => {

    element.addEventListener('click', (e) => {

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
        }
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

    element.firstElementChild.addEventListener('click', () => {

        tabsBarUl.removeChild(element);
    });
});


// let menuBar = document.getElementById('menuBar');
// let menuBarUl = menuBar.firstElementChild;
// let menuBarUlChilds = Array.from(menuBarUl.children);

/* 

    [0] [1] [2] [3] [4]
    

*/ 