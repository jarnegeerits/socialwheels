export class Cars{
    constructor(
    public id:void,
    public owner: string,
    public car: string,
    public fuel: number,
    public fuelAmount: number,
    public currentPossess: string){}
}

export class Users{
    constructor(
        public id:void,
        public userName:string,
        public cost: number,
        public auto_id: number){}
}