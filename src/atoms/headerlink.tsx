import Link from 'next/link';

import { MouseEvent } from 'react';

interface Props {
    href?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    children: string;
}

export default function HeaderLink(props: Props) {
    return (
        <Link href={props.href || "#"} onClick={props.onClick} className="text-blue-400 hover:underline">{props.children}</Link>
    );
}