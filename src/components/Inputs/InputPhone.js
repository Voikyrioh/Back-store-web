//#region imports
/* REACT IMPORTS */
import * as React from 'react';
import { useState } from "react";

/* ANTD IMPORTS */
import { Avatar, Form, Input, Select } from "antd";

/* External libraries imports */
import { countries } from 'country-flag-icons';
import Flags from 'country-flag-icons/react/1x1';
import {
    getCountryCallingCode,
    isSupportedCountry,
    isValidNumberForRegion,
    parsePhoneNumber
} from 'libphonenumber-js';
//#endregion

export function InputPhone(props) {
    const [selectedCountry, setSelectedCountry] = useState(props.defaultCountry);
    const [inputStatus, setInputStatus] = useState('');

    //#region Utility functions
    // create a select's option for all countries
    function getCountryDialOptions() {
        const options = [];
        const availableCountries = countries.filter(value => isSupportedCountry(value)).sort((a,b) => getCountryCallingCode(a) - getCountryCallingCode(b));
        for (const country of availableCountries) {
            const Flag = Flags[country];
            options.push((
                <Select value={country} key={country}>
                    <Avatar size={15} icon={<Flag/>}/> <span style={{verticalAlign: 'middle', marginLeft: 5}}>+{getCountryCallingCode(country)}</span>
                </Select>
            ))
        }
        return options;
    }

    // Event to trigger when country's selection is changed
    function changeCountrySelection(value, options) {
        setSelectedCountry(value);
        props.form.validateFields([props.name]).then(value1 => {})
    }

    // Event to trigger when a search filter is called
    function filterCountrySearch(value, option) {
        const countryCallingCode = `+${getCountryCallingCode(option.value)}`;
        return option?.value?.includes(value?.toUpperCase()) || countryCallingCode?.includes(value);
    }

    // Phone validation function
    function checkPhoneValid(phone) {
        return isValidNumberForRegion(phone, selectedCountry);
    }

    // Function called when form is submitted to format this field output
    function computeValue(phone) {
        if (isValidNumberForRegion(phone, selectedCountry) && phone.length > 1 && typeof phone === 'string') {
            const number = parsePhoneNumber(`${phone}`, selectedCountry);
            return number.formatInternational();
        } else {
            return phone;
        }
    }
    //#endregion

    const countrySelect = (
        <Select showSearch
                style={{width: 100}}
                onSelect={changeCountrySelection}
                filterOption={filterCountrySearch}
                defaultValue={props.defaultCountry}
        >
            {getCountryDialOptions()}
        </Select>
    );

    return (
        <Form.Item
            hasFeedback
            colon
            label="Numéro de téléphone"
            name={props.name}
            validateTrigger={'onBlur'}
            validateStatus={inputStatus}
            normalize={computeValue}
            rules={[() => ({
                validator(_, value) {
                    setInputStatus('validating');
                    if (value?.length > 0 && !checkPhoneValid(value)) {
                        setInputStatus('error');
                        return Promise.reject("Le numéro de téléphone est incorrect");
                    }
                    setInputStatus('success');

                    if (!value || value?.length === 0) {
                        setInputStatus('error');
                        return Promise.reject("Merci de renseigner un numéro de téléphone")
                    }

                    return Promise.resolve();
                },
            })]}
        >
            <Input addonBefore={countrySelect} defaultValue={props.defaultNumber} type={'tel'}/>
        </Form.Item>
    );
}
