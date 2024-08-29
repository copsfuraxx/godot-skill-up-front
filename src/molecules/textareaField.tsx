import Textarea from '@/atoms/textarea'
import Label from '@/atoms/label'

interface Props {
    name: string;
    label: string;
    required?: boolean;
    value?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
}

export default function TextareaField(props: Props) {
    return (
        <div className="flex flex-col space-y-2">
            <Label
                htmlFor={props.name}
                required={props.required}
                value={props.label}
            >
            </Label>
            <Textarea
                name={props.name}
                value={props.value}
                onBlur={props.onBlur}
                onChange={props.onChange}
                required={props.required}
            />
        </div>
    )
}