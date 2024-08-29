interface Props {
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    children: string;
}
export default function Button(props: Props) {
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            className="mx-auto px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
        >
            {props.children}
        </button>
    )
}