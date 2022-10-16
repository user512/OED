/*
  * This Source Code Form is subject to the terms of the Mozilla Public
  * License, v. 2.0. If a copy of the MPL was not distributed with this
  * file, You can obtain one at http://mozilla.org/MPL/2.0/.
  */

import ApiBackend from './ApiBackend';
import { UnitData, UnitEditData } from '../../types/redux/units';
export default class UnitsApi {
	private readonly backend: ApiBackend;

	constructor(backend: ApiBackend) {
		this.backend = backend;
	}

	public async edit(unit: UnitData): Promise<UnitEditData> {
		return await this.backend.doPostRequest<UnitEditData>(
			'/api/units/edit',
			{
				id: unit.id, name: unit.name, identifier: unit.identifier, typeOfUnit: unit.typeOfUnit,
				unitRepresent: unit.unitRepresent, secInRate: unit.secInRate,
				displayable: unit.displayable, preferredDisplay: unit.preferredDisplay,
				suffix: unit.suffix, note: unit.note
			}
		);
	}

	public async addUnit(unit: UnitData): Promise<void> {
		return await this.backend.doPostRequest('/api/units/addUnit', unit);
	}

	public async getUnitsDetails(): Promise<UnitData[]> {
		return await this.backend.doGetRequest<UnitData[]>('/api/units');
	}
}