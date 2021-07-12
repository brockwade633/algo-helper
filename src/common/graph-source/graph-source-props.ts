import { RefObject } from "react";

export interface GraphSourceProps {
    containerRef: RefObject<HTMLDivElement> | undefined;
    validate: Function;
    transform: Function;
}