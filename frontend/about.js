'use strict';

import welcome from './welcome';

welcome("home");

console.log(NODE_ENV == 'development');
console.log(USERDOMAIN);

exports.welcome = welcome;