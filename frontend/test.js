var users = [
    { id: 'asdf', name: 'Vasy' },
    { id: 'dasd', name: 'Petia' },
    { id: 'gdfg', name: 'Masha' }
];

console.log( _.pluck(users, 'name') );

console.log($('html'));

function name(name) {
    this.name = name || 'vasia';

    this.getName = function() {
        return this.name;
    }
}

