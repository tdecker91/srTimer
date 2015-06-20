/*

	Name: scrambler.js
	Author: Tyson Decker
	Email: tyson.decker@gmail.com

	Description: Generates scrambles for any size nxn cubic twisty puzzle

 */

var SRModules = SRModules || {};

SRModules.scrambler = (function(){

	var sides = ['F','R','L','U','D','B'];

	var Scrambler = {}

	/**
	 * Generates a scramble for a rubiks cube
	 * @param  {int} size  how big(in layers) of cube to generate a scramble for
	 * @param  {int} turns how many turns the scramble should be
	 * @return {String}       text representation of the scramble
	 */
	Scrambler.generateScramble = function(size, turns) {
		return "";
	}

	return Scrambler;

})();