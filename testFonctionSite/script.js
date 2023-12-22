let currentLanguage = 'en';

// Define translations directly in the script
const translations = {
    'en': {
        1: 'Hello, world!',
        2: 'This is another content block.',
        3: 'Swich Language'
    },
    'fr': {
        1: 'Bonjour, le monde!',
        2: 'Ceci est un autre bloc de contenu.',
        3: 'Changer de langue'
    }
};

function toggleLanguage() {
    // Toggle between English and French
    currentLanguage = (currentLanguage === 'en') ? 'fr' : 'en';
    // Update the content based on the selected language
    updateContent();
}

function updateContent() {
    // Get the content element
    var elements = document.getElementsByClassName('content');
    // Access translations directly from the defined object
    for (var i = 0; i < elements.length; i++) {
        elements[i].textContent = translations[currentLanguage][elements[i].id];
    }
}


const selectLanguageBtn = document.getElementById('selectLanguageBtn');
const languageButtons = document.getElementById('languageButtons');

selectLanguageBtn.addEventListener('click', function () {
    // Toggle the visibility of language buttons
    languageButtons.classList.toggle('hidden');
});

// Add click event listeners to the language buttons (English and French)
const englishBtn = document.getElementById('englishBtn');
const frenchBtn = document.getElementById('frenchBtn');

englishBtn.addEventListener('click', function () {
    currentLanguage = 'en';
    updateContent();
    // Add logic for English language selection
    languageButtons.classList.add('hidden');
});

frenchBtn.addEventListener('click', function () {
    currentLanguage = 'fr';
    updateContent();
    // Add logic for French language selection
    languageButtons.classList.add('hidden');
});