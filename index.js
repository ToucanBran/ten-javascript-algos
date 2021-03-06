
function clearNames() {
    var rootDiv = document.getElementById('listContainer');
    if (rootDiv) {
        while (rootDiv.hasChildNodes()) {
            rootDiv.removeChild(rootDiv.lastChild);
        }
    }
}


function initDocument() {
    clearNames();
    initUsersNames();
    initMessages();
}

function initUsersNames() {
    var rootDiv = document.createElement('div');
    rootDiv.id = 'listContainer';
    var userNamesContainer = document.createElement('div');
    userNamesContainer.id = 'userNameList';
    userNames.forEach(function (userName, index) {
        var childDiv = document.createElement('div');
        var text = document.createTextNode(index.toString().concat(' .) ').concat(`${userName.firstName} ${userName.lastName}`));
        childDiv.appendChild(text);
        userNamesContainer.appendChild(childDiv);
    });
    rootDiv.appendChild(userNamesContainer);
    document.getElementById('mainContainer').appendChild(rootDiv);
}

function initMessages() {
    var rootDiv = document.createElement('div');
    var messagesContainer = document.createElement('div');
    messagesContainer.id = 'messagesContainer';
    messagesContainer.style['float'] = 'left';
    document.getElementById('mainContainer').appendChild(messagesContainer);
}

function clearMessages() {
    /* EXTRA CREDIT INCLUDE A SCRIPT TAG THATS FETCHES BOOTSTRAP CSS STLYINGS AND STYLE THE BUTTONS */
    document.getElementById('messagesContainer').innerHTML = '';
}

function addPlainMessage() {
    const userText = getUserText();
    var messagesContainer = document.getElementById('messagesContainer');
    var messageDiv = document.createElement('p');
    const text = document.createTextNode(userText);
    messageDiv.appendChild(text);
    messagesContainer.appendChild(messageDiv);
    clearUserInput();
}

function addHandleMessage(handle) {
    var messagesContainer = document.getElementById('messagesContainer');
    var messageDiv = document.createElement('p');
    var handleSpan = document.createElement('span');
    handleSpan.style['color'] = 'dodgerblue';
    handleText = document.createTextNode(handle);
    handleSpan.appendChild(handleText);
    var messageText = document.createTextNode(` ${getUserText().replace(/@\w+/, '')}`);
    messageDiv.appendChild(handleSpan);
    messageDiv.appendChild(messageText);
    messagesContainer.appendChild(messageDiv);

    clearFilteredNames();
    clearUserInput();
}

const instructionsFlag = false;
if (instructionsFlag) {
    console.log(`README`);
    console.log(`
            SETUP ->
            1. INSTALL LODASH USING NPM AND SAVE THE DEPENDENCY TO YOUR PACKAGE.JSON FILE
    
            2. IMPORT LODASH INTO THE INDEX.JS FILE.
    
            3. COMPLETE ALL TODOS
        `);
}

const userNames = [
    {
        firstName: 'Chandler',
        lastName: 'Gegg',
        handle: '@CGegg'
    },
    {
        firstName: 'Phil',
        lastName: 'Mickelson',
        handle: '@PMickelson'
    },
    {
        firstName: 'Grace',
        lastName: 'Hopper',
        handle: '@GHopper'
    },
    {
        firstName: 'Horace',
        lastName: 'Grant',
        handle: '@HGrant'
    },
    this.createPerson('theodore', 'dog'),
    this.createPerson('Dwight', 'Schrute'),
    this.createPerson('Brandon', 'Gomez'),
    this.createPerson('Elliot', 'Dixon'),
    this.createPerson('Diane', 'Xavier'),
    this.createPerson('Emildese', 'Gerschwin'),
];

const userMessages = [];

const debounce = (func, delay) => {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

function initConstantTimeNameFileter() {
    // global dictionary of name combos. Keys are the first and last names
    // as well as the first, first two, and first three characters of the 
    // first and last names. Values will be a list of usernames that contain
    // the key
    this.constantNameFilterDictionary = {};

    userNames.forEach((username) => {
        const maxSearchChars = 3;
        filterDictionaryAdd(username, username.firstName, maxSearchChars);
        filterDictionaryAdd(username, username.lastName, maxSearchChars);
    });
}

function filterDictionaryAdd(username, searchName, maxSearchChars) {
    let name = searchName.toLowerCase();
    // add whole name as key
    let keys = [name];

    // add first, first two, and first three characters of the 
    // name as keys
    for (let i = 1; i <= maxSearchChars && i < name.length; i++) {
        let searchText = name.slice(0, i);
        keys.push(searchText);
    }

    // for each key, add this username to the list in the dictionary. If 
    // key doesn't exist, add it to dictionary with the username
    keys.forEach(key => {
        if (this.constantNameFilterDictionary[key]) {
            this.constantNameFilterDictionary[key].push(username);
        }
        else {
            this.constantNameFilterDictionary[key] = [username];
        }
    });
}
function constantTimeNameFilter(userText) {
    /* EXTRA CREDIT :: CONVERT filterNames FUNCTION TO DO CONSTANT TIME LOOK UP.  
    THIS WILL REQUIRE initConstantTimeNameFileter ON PAGE LOAD AS WELL */
    const maxSearchChars = 3;
    // checks if usertext exists in dictionary
    let filteredNames = this.constantNameFilterDictionary[userText.slice(1, userText.length)];
    i = maxSearchChars + 1;
    // if not in dictionary, check the dictionary if names exist for either the first three,
    // two, or first character(s) of the text 
    while (filteredNames == null && i > 1) {
        filteredNames = this.constantNameFilterDictionary[userText.slice(1, i--)];
    }
    return filteredNames;
}

function filterNames(userText) {
    const firstThreeChars = userText.toLowerCase().slice(1, 4);
    var re = new RegExp(firstThreeChars, 'g');
    console.log(`First three characters: ${firstThreeChars} `);
    console.log(`First three characters: ${firstThreeChars} `);
    const filteredNames = [];
    userNames.forEach((userName) => {
        const fullname = `${userName.firstName.toLowerCase()} ${userName.lastName.toLowerCase()}`;
        var isMatch = !!userName.firstName.toLowerCase().match(re) || !!userName.lastName.toLowerCase().match(re);
        console.log(`Fullname: ${fullname}`);
        console.log(isMatch);
        console.log(`Fullname: ${fullname}`);
        if (isMatch) {
            filteredNames.push(userName);
        }
    });
    return filteredNames;
}

function initFilteredNames(filteredNames) {
    clearNames();
    if (!filteredNames) {
        return;
    }
    var namesContainer = document.createElement('div');
    namesContainer.id = 'filteredNamesContainer';
    filteredNames.forEach((name) => {
        var nameElm = document.createElement('button');
        nameElm.style['background-color'] = 'dodgerblue';
        nameElm.style['cursor'] = 'pointer';
        nameElm.setAttribute('class', 'filtered-name');
        var text = document.createTextNode(`${name.firstName} ${name.lastName}`);
        nameElm.appendChild(text);
        nameElm.setAttribute('data-handle', name.handle);
        nameElm.addEventListener('click', function (event) {
            addHandleMessage(event.target.dataset.handle);
        });
        namesContainer.appendChild(nameElm);
    });
    // document.getElementById('mainContainer').appendChild(namesContainer);
    // Appending to listContainer instead so the buttons will clear if the
    // user searches for other names
    document.getElementById('listContainer').appendChild(namesContainer);
}

function clearUserInput() {
    document.getElementById('inputText').value = '';
}

function clearFilteredNames() {
    const filteredNames = document.getElementsByClassName('filtered-name');
    Array.from(filteredNames).forEach((filteredName) => {
        filteredName.remove();
    });

}

function getUserText() {
    return document.getElementById('inputText').value.trim();
}

function searchNames() {
    const userText = getUserText();
    console.log('Search names ...');
    console.log(userText);
    console.log('Search names ...');

    const firstChar = userText[0] || '';
    if (firstChar === '@') {
        console.log('filter names ...');
        // const filteredNames = filterNames(userText);
        const filteredNames = constantTimeNameFilter(userText.toLowerCase());
        initFilteredNames(filteredNames);
    } else {
        console.log('MISSING @ IN USER TEXT');
    }
}

function createPerson(firstName, lastName) {
    if (firstName && lastName) {
        // yes, I should check for duplicate handles but the dev is the only
        // one who can create users and I trust myself not to create dups at the moment.
        return {
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            handle: `@${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`
        }
    }
    return null;
}
// TODO UPDATE THE DEBOUNCE DELAY TO MORE CLOSELY RESEMBLE USER TYPING
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('inputText').addEventListener(
        'input',
        debounce(
            searchNames,
            500
        )
    );
    initDocument();
    initConstantTimeNameFileter();
});