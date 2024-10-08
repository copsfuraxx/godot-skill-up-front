import { FocusEvent } from "react";

interface Props {
    type: string;
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
    onBlur?: (target: HTMLInputElement) => void;
    onChange?: (value: string) => void;
}

export default function Input(props: Props) {
    return (
        <input
            className={"text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 " + (props.error ? "border-red-500" : "border-gray-300")}
            id={props.name}
            name={props.name}
            type={props.type}
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
    )
}