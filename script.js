let tabsBarUl = document.getElementById('tabsBarUl');

let tabsBarUlChilds = Array.from(tabsBarUl.children);

let currentActiveTab = undefined;

let currentTabIndex;


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
        
        let removedElement = element;


        tabsBarUl.removeChild(element);
        tabsBarUlChilds = Array.from(tabsBarUl.children);


        if (removedElement == currentActiveTab) {
            if (currentTabIndex < tabsBarUlChilds.length) {

                changeCurrentTab(null, tabsBarUlChilds[currentTabIndex], true);
            }
            else if (currentTabIndex > tabsBarUlChilds.length - 1) {
                changeCurrentTab(null, tabsBarUlChilds[tabsBarUlChilds.length - 1], true);
            }
        }

    });
});