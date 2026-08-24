const riderName: string = "Shrey";
const riderAge: number = 23;
const hasActiveRide: boolean = false;
const cities: string[] = ["Delhi", "Mumbai", "Banglore"];

interface Driver {
  name: string;
  rating: number;
  isOnline: boolean;
}

const driver: Driver = {
  name: "Rahul",
  rating: 4.8,
  isOnline: true,
};

console.log(driver);