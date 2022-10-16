/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * This is a custom error used by the CSV Pipeline.
 * When this error is triggered, it should be passed into the failure function
 * also used in the pipeline. It stores the status code of the failure response
 * as well as the log and response messages.
 */
class CSVPipelineError extends Error {
	constructor(responseMessage, logMessage = responseMessage, statusCode=400) {
		super(responseMessage);
		// Ensure the name of this error is the same as the class name
		this.name = this.constructor.name;
		this.data = { logMessage, responseMessage, statusCode };
		// This clips the constructor invocation from the stack trace.
		// It's not absolutely essential, but it does make the stack trace a little nicer.
		//  @see Node.js reference (bottom)
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = {
	CSVPipelineError
};
