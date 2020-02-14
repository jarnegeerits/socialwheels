export class Cars {
  constructor(
    public id: void,
    public ownerUID: string,
    public car: string,
    public fuelType: string,
    public fuelAmount: number,
    public currentPossessUID: string
  ) {}
}

export class Users {
  constructor(
      public UID: string,
      public userName: string,
      public cost: number,
      public carId: number
  ) {}
}
