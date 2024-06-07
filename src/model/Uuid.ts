import { validate as validateUuid, v4 as uuidV4} from "uuid";

export class Uuid
{
    private _value : string;

    constructor(value: string)
    {
        if(!validateUuid(value)){
            throw new Error(`Value ${value} not is a valid UUID`);
        }
        this._value = value;
    }

    static randomGenerator(): Uuid
    {
        return new Uuid(uuidV4());
    }
}