/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

INSERT INTO obvius_configs(serial_id, modbus_id, created, hash, contents, processed)
	VALUES (${serialId}, ${modbusId}, ${created}, ${hash}, ${contents}, ${processed})
	RETURNING id;
