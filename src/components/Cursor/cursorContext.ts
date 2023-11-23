import { atom } from "nanostores";

export const isCursorHovering = atom<boolean>(false);

export const setCursorHovering = (value: boolean) => {
    isCursorHovering.set(value);
};
