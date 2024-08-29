interface Props {
    name: string;
    placeholder?: string;
    value?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
    required?: boolean;
}

export default function Textarea(props: Props) {
    return (
        <textarea
            className="text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onBlur={(event) => props.onBlur?.(event.target.value)}
            onChange={(event) => props.onChange?.(event.target.value)}
            required={props.required}
        />
    )
}