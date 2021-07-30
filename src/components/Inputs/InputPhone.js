import * as React from 'react';
import {Avatar, Card, Form, Input, Select} from "antd";
import { countries } from 'country-flag-icons';
import { getCountryCallingCode, isSupportedCountry, isValidNumberForRegion, getCountries } from 'libphonenumber-js';
import Flags from 'country-flag-icons/react/1x1';
import {useState} from "react";
const { Option } = Select;

export function InputPhone(props) {
    const [selectedCountry, setSelectedCountry] = useState(props.defaultCountry);
    const [inputStatus, setInputStatus] = useState('');
    const [form] = Form.useForm();

    const getCountryListOptions = () => {
        const options = [];
        const availableCountries = countries.filter(value => isSupportedCountry(value)).sort((a,b) => getCountryCallingCode(a) - getCountryCallingCode(b));
        for (const country of availableCountries) {
            const Flag = Flags[country];
            options.push((
                <Option value={country} key={country}>
                    <Avatar size={15} icon={<Flag/>}/> <span style={{verticalAlign: 'middle', marginLeft: 5}}>+{getCountryCallingCode(country)}</span>
                </Option>
            ))
        }
        return options;
    }

    const changeCountrySelection = (value, options) => {
        setSelectedCountry(value);
        form.validateFields(['phone']).then(value1 => {})
    }

    const filterCountrySearch = (value, option) => {
        const countryCallingCode = `+${getCountryCallingCode(option.value)}`;
        return option?.value?.includes(value) || countryCallingCode?.includes(value);
    }

    const sortCountryList = (countryA, countryB) => {
        return getCountryCallingCode(countryA.value) - getCountryCallingCode(countryB.value);
    }

    const checkPhoneValid = (phone) => {
        return isValidNumberForRegion(phone, getCountries().find(c => c === selectedCountry));
    }

    const countrySelect = (
        <Select showSearch
                style={{width: 100}}
                onSelect={changeCountrySelection}
                filterOption={filterCountrySearch}
                filterSort={sortCountryList}
                defaultValue={props.defaultCountry}
        >
            {getCountryListOptions()}
        </Select>
    );

    return (
        <Card style={{width: '50%'}} >
            <Form form={form}>
                <Form.Item
                    hasFeedback
                    colon
                    label="Numéro de téléphone"
                    name="phone"
                    validateStatus={inputStatus}
                    rules={[{
                        required: true,
                        message: "Merci de renseigner un numéro de téléphone"
                    }, () => ({
                        validator(_, value) {
                            setInputStatus('validating');
                            if (!checkPhoneValid(value)) {
                                setInputStatus('error');
                                return Promise.reject("Le numéro de téléphone est incorrect");
                            }
                            setInputStatus('success');
                            return Promise.resolve();
                        }
                    })]}
                >
                    <Input addonBefore={countrySelect} defaultValue={props.defaultNumber} type={'tel'}/>
                </Form.Item>
            </Form>
        </Card>
    );
}
