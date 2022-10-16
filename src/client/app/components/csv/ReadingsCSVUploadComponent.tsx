/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import { Button, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import { ReadingsCSVUploadProps, TimeSortTypes, BooleanTypes } from '../../types/csvUploadForm';
import { ReadingsCSVUploadDefaults } from '../../utils/csvUploadDefaults';
import FormFileUploaderComponent from '../FormFileUploaderComponent';
import { FormattedMessage } from 'react-intl';
import { MODE } from '../../containers/csv/UploadCSVContainer';
import translate from '../../utils/translate';
/**
 * Returns a range of values between the specified lower and upper bounds.
 * @param {number} lower The lower bound, which will be included in the range.
 * @param {number} upper The upper bound, which will be excluded from the range.
 * @returns {number[]} An array of values between starting from the lower bound and up to and excluding the upper bound.
 */
function range(lower: number, upper: number): number[] {
	const arr = [];
	for (let i = lower; i < upper; i++) {
		arr.push(i);
	}
	return arr;
}

export default class ReadingsCSVUploadComponent extends React.Component<ReadingsCSVUploadProps> {
	private fileInput: React.RefObject<HTMLInputElement>;
	constructor(props: ReadingsCSVUploadProps) {
		super(props);
		this.handleSetMeterName = this.handleSetMeterName.bind(this);
		this.handleSetTimeSort = this.handleSetTimeSort.bind(this);
		this.handleSetDuplications = this.handleSetDuplications.bind(this);
		this.handleSetCumulative = this.handleSetCumulative.bind(this);
		this.handleSetCumulativeReset = this.handleSetCumulativeReset.bind(this);
		this.handleSetCumulativeResetStart = this.handleSetCumulativeResetStart.bind(this);
		this.handleSetCumulativeResetEnd = this.handleSetCumulativeResetEnd.bind(this);
		this.handleSetLengthGap = this.handleSetLengthGap.bind(this);
		this.handleSetLengthVariation = this.handleSetLengthVariation.bind(this);
		this.handleSetEndOnly = this.handleSetEndOnly.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
	}

	private async handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			const current = this.fileInput.current as HTMLInputElement;
			const { files } = current;
			if (files && (files as FileList).length !== 0) {
				const msg = await this.props.submitCSV(files[0]);
				// TODO Using an alert is not the best. At some point this should be integrated
				// with react.
				window.alert(msg);
			}
		} catch (error) {
			// A failed axios request should result in an error.
			window.alert(error.response.data as string);
		}
	}

	private handleSetMeterName(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.setMeterName(MODE.readings, target.value);
	}

	private handleSetTimeSort(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.selectTimeSort(target.value as TimeSortTypes);
	}

	private handleSetDuplications(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.selectDuplications(target.value);
	}

	private handleSetCumulative(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.selectCumulative(target.value as BooleanTypes);
	}

	private handleSetCumulativeReset(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.selectCumulativeReset(target.value as BooleanTypes);
	}

	private handleSetCumulativeResetStart(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.setCumulativeResetStart(target.value);
	}

	private handleSetCumulativeResetEnd(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.setCumulativeResetEnd(target.value);
	}

	private handleSetLengthGap(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.setLengthGap(target.value);
	}

	private handleSetLengthVariation(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.setLengthVariation(target.value);
	}

	private handleSetEndOnly(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target;
		this.props.selectEndOnly(target.value as BooleanTypes);
	}

	public render() {
		const titleStyle: React.CSSProperties = {
			fontWeight: 'bold',
			paddingBottom: '5px'
		};

		const checkboxStyle: React.CSSProperties = {
			paddingBottom: '15px'
		}

		const formStyle: React.CSSProperties = {
			display: 'flex',
			justifyContent: 'center',
			padding: '20px'
		}

		return (
			<div style={formStyle}>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label style={titleStyle}>
							<FormattedMessage id='csv.readings.param.meter.name' />
						</Label>
						<Col sm={8}>
							<Input required value={this.props.meterName} name='meterName' onChange={this.handleSetMeterName} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Label style={titleStyle}>
							<FormattedMessage id='csv.readings.param.time.sort' />
						</Label>
						<Col sm={8}>
							<Input type='select' name='timeSort' onChange={this.handleSetTimeSort}>
								<option value={TimeSortTypes.meter}> {translate('TimeSortTypes.meter')} </option>
								<option value={TimeSortTypes.increasing}> {translate('TimeSortTypes.increasing')} </option>
								<option value={TimeSortTypes.decreasing}> {translate('TimeSortTypes.decreasing')} </option>
							</Input>
						</Col>
					</FormGroup>
					<FormGroup>
						<Label style={titleStyle}>
							<FormattedMessage id='csv.readings.param.duplications' />
						</Label>
						<Col sm={8}>
							<Input value={this.props.duplications} type='select' name='duplications' onChange={this.handleSetDuplications}>
								{range(1, 10).map(i => (
									<option key={i} value={`${i}`}> {i} </option>
								))}
							</Input>
						</Col>
					</FormGroup>
					<FormFileUploaderComponent formText='csv.upload.readings' reference={this.fileInput} required labelStyle={titleStyle} />
					<FormGroup>
						<Label style={titleStyle}>
							<FormattedMessage id='csv.readings.section.cumulative.data' />
						</Label>
						<Col sm={8}>
							<FormGroup>
								<Label style={titleStyle}>
									<FormattedMessage id='csv.readings.param.cumulative' />
								</Label>
								<Col sm={12}>
									<Input type='select' name='cumulative' onChange={this.handleSetCumulative}>
										<option value={BooleanTypes.meter}> {translate('BooleanTypes.meter')} </option>
										<option value={BooleanTypes.true}> {translate('BooleanTypes.true')} </option>
										<option value={BooleanTypes.false}> {translate('BooleanTypes.false')} </option>
									</Input>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label style={titleStyle}>
									<FormattedMessage id='csv.readings.param.cumulative.reset' />
								</Label>
								<Col sm={12}>
									<Input type='select' name='cumulativeReset' onChange={this.handleSetCumulativeReset}>
										<option value={BooleanTypes.meter}> {translate('BooleanTypes.meter')} </option>
										<option value={BooleanTypes.true}> {translate('BooleanTypes.true')} </option>
										<option value={BooleanTypes.false}> {translate('BooleanTypes.false')} </option>
									</Input>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label style={titleStyle}>
									<FormattedMessage id='csv.readings.param.cumulative.reset.start' />
								</Label>
								<Col sm={12}>
									<Input
										value={this.props.cumulativeResetStart}
										name='cumulativeResetStart'
										onChange={this.handleSetCumulativeResetStart}
										placeholder={ReadingsCSVUploadDefaults.cumulativeResetStart}
									/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label style={titleStyle}>
									<FormattedMessage id='csv.readings.param.cumulative.reset.end' />
								</Label>
								<Col sm={12}>
									<Input
										value={this.props.cumulativeResetEnd}
										name='cumulativeResetEnd'
										onChange={this.handleSetCumulativeResetEnd}
										placeholder={ReadingsCSVUploadDefaults.cumulativeResetEnd}
									/>
								</Col>
							</FormGroup>
						</Col>
					</FormGroup>
					<FormGroup>
						<Label style={titleStyle}>
							<FormattedMessage id='csv.readings.section.time.gaps' />
						</Label>
						<Col sm={8}>
							<FormGroup>
								<Label style={titleStyle}>
									<FormattedMessage id='csv.readings.param.lengthGap' />
								</Label>
								<Col sm={12}>
									<Input value={this.props.lengthGap} name='lengthGap' onChange={this.handleSetLengthGap} />
								</Col>
							</FormGroup>
							<FormGroup>
								<Label style={titleStyle}>
									<FormattedMessage id='csv.readings.param.length.variation' />
								</Label>
								<Col sm={12}>
									<Input value={this.props.lengthVariation} name='lengthVariation' onChange={this.handleSetLengthVariation} />
								</Col>
							</FormGroup>
						</Col>
					</FormGroup>
					<FormGroup>
						<Label style={titleStyle}>
							<FormattedMessage id='csv.readings.param.endOnly' />
						</Label>
						<Col sm={8}>
							<Input type='select' name='endOnly' onChange={this.handleSetEndOnly}>
								<option value={BooleanTypes.meter}> {translate('BooleanTypes.meter')} </option>
								<option value={BooleanTypes.true}> {translate('BooleanTypes.true')} </option>
								<option value={BooleanTypes.false}> {translate('BooleanTypes.false') } </option>
							</Input>
						</Col>
					</FormGroup>
					<FormGroup check style={checkboxStyle}>
						<Label check>
							<Input checked={this.props.createMeter} type='checkbox' name='createMeter' onChange={this.props.toggleCreateMeter} />
							<FormattedMessage id='csv.readings.param.create.meter' />
						</Label>
					</FormGroup>
					<FormGroup check style={checkboxStyle}>
						<Label check>
							<Input checked={this.props.gzip} type='checkbox' name='gzip' onChange={this.props.toggleGzip} />
							<FormattedMessage id='csv.common.param.gzip' />
						</Label>
					</FormGroup>
					<FormGroup check style={checkboxStyle}>
						<Label check>
							<Input checked={this.props.headerRow} type='checkbox' name='headerRow' onChange={this.props.toggleHeaderRow} />
							<FormattedMessage id='csv.common.param.header.row' />
						</Label>
					</FormGroup>
					<FormGroup check style={checkboxStyle}>
						<Label check>
							<Input checked={this.props.update} type='checkbox' name='update' onChange={this.props.toggleUpdate} />
							<FormattedMessage id='csv.common.param.update' />
						</Label>
					</FormGroup>
					<FormGroup check style={checkboxStyle}>
						<Label check>
							<Input checked={this.props.refreshReadings} type='checkbox' name='refreshReadings' onChange={this.props.toggleRefreshReadings} />
							<FormattedMessage id='csv.readings.param.refresh.readings' />
						</Label>
					</FormGroup>
					<FormGroup check style={checkboxStyle}>
						<Label check>
							<Input
								checked={this.props.refreshHourlyReadings}
								type='checkbox'
								name='refreshHourlyReadings'
								onChange={this.props.toggleRefreshHourlyReadings}
							/>
							<FormattedMessage id='csv.readings.param.refresh.hourlyReadings' />
						</Label>
					</FormGroup>
					<Button type='submit'>
						<FormattedMessage id='csv.submit.button' />
					</Button>
				</Form>
			</div>
		)
	}
}
