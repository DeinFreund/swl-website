/*
 * Actions related to lobby server.
 */

'use strict'

var Reflux = require('reflux');

module.exports = Reflux.createActions([
	"connect",
	"disconnect",
	"register",
	"acceptAgreement", // bool
]);
