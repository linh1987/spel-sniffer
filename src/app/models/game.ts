export class Game {
  url: string;
  name: string;
  image: string;
  price: string;
  lastKnownPrice: number;
  lowestPrice: number;
  available: boolean;

  public getPrice(): number {
    return Number(this.price.split(" ")[0]);
  }

  public get hasDiscount() : boolean {
      return this.getPrice() < this.lowestPrice || this.getPrice() < this.lastKnownPrice;
  }
}
