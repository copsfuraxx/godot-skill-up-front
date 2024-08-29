import Input from '@/atoms/input'
import Label from '@/atoms/label'

interface Props {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    value?: string;
    placeholder?: string;
    error?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
}

export default function InputField(props: Props) {
    console.log(props.error);
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
                onBlur={props.onBlur}
                onChange={props.onChange}
                required={props.required}
                placeholder={props.placeholder}
                error={props.error != null}
            />
            {props.error && (
                <span className="text-red-500 text-sm">{props.error}</span>
            )}
        </div>
    )
}