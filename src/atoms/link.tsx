import NextLink from 'next/link';

import { MouseEvent } from 'react';

interface Props {
    href?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
    children: string;
}

export default function Link(props: Props) {
    return (
        <NextLink
        href={props.href || "#"}
        onClick={props.onClick}
        className="text-blue-400 hover:underline"
        rel={props.external ? "nofollow noopener noreferrer external" : ""}
        >
            {props.children}
        
        </NextLink>
    );
}