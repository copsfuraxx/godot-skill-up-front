import { FocusEvent, useState } from "react";
import Button from "./button";

interface Props {
    name: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    error?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    onBlur?: (taget: HTMLInputElement) => void;
    onChange?: (value: string) => void;
}

export default function PasswordInput(props: Props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);

    }


    return (
        <>
        <input
            className={"text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 " + (props.error ? "border-red-500" : "border-gray-300")}
            id={props.name}
            name={props.name}
            type={passwordVisible ? "text" : "password"}
            placeholder={props.placeholder}
            value={props.value}
            required={props.required}
            min={props.min}
            max={props.max}
            minLength={props.minLength}
            maxLength={props.maxLength}
            pattern={props.pattern}
            onBlur={(event) => props.onBlur?.(event.target)}
            onChange={(event) => props.onChange?.(event.target.value)}
        />
        <div className="w-full flex">
            <input id="password-visibility" type="checkbox" onClick={togglePasswordVisibility}/>
            <label htmlFor="password-visibility" className="ml-2">Visible</label>
        </div>
        </>
    )
}