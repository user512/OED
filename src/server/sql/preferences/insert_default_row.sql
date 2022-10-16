/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

-- This makes sure that two rows cannot be inserted. OED only expects one row.
-- This was happening if a second install was done on the system.
-- Note that you should not check that the same values are there since the 
-- admin can change the value after the row is created.
DO
$$
BEGIN
IF NOT EXISTS(SELECT *
	FROM preferences
	)
	THEN
	INSERT INTO preferences (display_title, default_chart_to_render, default_bar_stacking, default_language, default_timezone, default_warning_file_size, default_file_size_limit) 
	VALUES ('', 'line', FALSE, 'en', NULL, 5, 25);

    END IF ;

END;
$$
