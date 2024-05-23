import {v4 as uuidv4} from "uuid";

export function getRandomId() {
    const randomId = uuidv4();

    return randomId.slice(9,23);
}