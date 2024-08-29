interface Props {
    htmlFor: string;
    required?: boolean;
    value: string
}

export default function Input(props: Props) {
    return (
        <label className="dark:text-white">
            {props.value}
            {props.required && <span className="text-red-600 ml-2">*</span>}
        </label>
    )
}