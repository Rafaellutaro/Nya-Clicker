import type { IconType } from "react-icons";

interface PropsInterface {
    id: number;
    name: string;
    price: number[];
    imgs: IconType;
    effects: number[];
}

export type { PropsInterface};