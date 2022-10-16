/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ini = require('ini');
const Meter = require('../../models/Meter');
const ConfigFile = require('../../models/obvius/Configfile');
const moment = require('moment');
const Unit = require('../../models/Unit');

/**
 * Creates array of meters from a config file
 * @param {ConfigFile} configFile
 * @returns {Meter[]} an array of Meter objects
 */
async function processConfigFile(configFile) {
	const config = ini.parse(configFile.contents);
	const regularExpression = /([0-9][0-9])/;
	// For the metersHash we assume each key corresponds
	// to a hash of structure { NAME: <alternative name>, UNITS: <units>, LOW:<>, HIGHT:<>, CONSOLE:<> }
	const metersHash = {};
	// Array of Meter (from models) objects
	const metersArray = [];
	for (key of Object.keys(config)) {
		const [, meterNumber, characteristic] = key.split(regularExpression);
		const internalMeterName = `${configFile.serialId}.${parseInt(meterNumber)}`;
		const meter = metersHash[internalMeterName];
		metersHash[internalMeterName] = { ...meter, [characteristic]: config[key] };
	}
	// TODO: the unit name needs to come from the config file
	const kWhUnit = await Unit.getByName( 'kWh', conn );
	let unitId; 
	if (kWhUnit === null) {
		console.log("kWh not found while processing Obvius data");
		// TODO need a warning log
		unitId = undefined;
	} else {
		unitId = kWhUnit.id;
	}
	for (internalMeterName of Object.keys(metersHash)) {
		metersArray.push(new Meter(
			undefined,
			internalMeterName,
			undefined,
			false,
			false,
			Meter.type.OBVIUS,
			null,
			undefined,
			// Sometimes the NAME is not unique so append with internalMeterName so does not fail
			// the uniqueness of the identifier.
			metersHash[internalMeterName].NAME + ' for ' + internalMeterName,
			'created via obvious config upload on ' + moment().format(),
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			// Obvious meters only have one reading so end only.
			true,
			undefined,
			undefined,
			undefined,
			unitId,
			unitId
			)
		);
	}
	return metersArray;
}

module.exports = {
	processConfigFile
};
