interface Props {
    type: string;
    name: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    error?: boolean;
    onBlur?: (value: string) => void;
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
            onBlur={(event) => props.onBlur?.(event.target.value)}
            onChange={(event) => props.onChange?.(event.target.value)}
            required={props.required}
        />
    )
}