import Input from '@/atoms/input'
import Label from '@/atoms/label'
import { FocusEvent } from 'react';

interface Props {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    value?: string;
    placeholder?: string;
    error?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    onBlur?: (target: HTMLInputElement) => void;
    onChange?: (value: string) => void;
}

export default function InputField(props: Props) {
    return (
        <div className="flex flex-col space-y-2">
            <Label
                htmlFor={props.name}
                required={props.required}
                value={props.label}
            >
            </Label>
            <Input
                name={props.name}
                type={props.type}
                value={props.value}
                required={props.required}
                placeholder={props.placeholder}
                error={props.error != null}
                min={props.min}
                max={props.max}
                minLength={props.minLength}
                maxLength={props.maxLength}
                pattern={props.pattern}
                onBlur={props.onBlur}
                onChange={props.onChange}
            />
            {props.error && (
                <span className="text-red-500 text-sm">{props.error}</span>
            )}
        </div>
    )
}