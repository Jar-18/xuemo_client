angular.module('starter')
    .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'TITLE': 'Hello',
        'FOO': 'This is a paragraph',
        NAMESPACE: {
            PARAGRAPH: 'And it comes with awesome features!'
        }
    });

    $translateProvider.translations('de', {
        'TITLE': 'Hallo',
        'FOO': 'Dies ist ein Paragraph'
    });

    $translateProvider.preferredLanguage('en');
}]);