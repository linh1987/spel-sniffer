export class Game {
  url: string;
  name: string;
  image: string;
  price: string;
  lowestPrice: number;
  hightestPrice: number;
  available: boolean;

  public getPrice(): number {
    return Number(this.price.split(" ")[0]);
  }

  public get hasDiscount() : boolean {
      return this.getPrice() < this.hightestPrice;
  }
}
