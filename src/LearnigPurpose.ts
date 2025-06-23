type Laptop = {
  type: "laptop";
  screenSize: number;
  graphics: string;
};

type HeadPhone = {
  type: "headphone";
  ANC: boolean;
};

type Product = {
  id: string;
  name: string;
  price: number;
} & (Laptop | HeadPhone);

const macbook: Product = {
  id: "1",
  name: "MacBook Pro",
  price: 2500,
  type: "laptop",
  screenSize: 16,
  graphics: "M1 Pro",
};

const airpods: Product = {
  id: "2",
  name: "AirPods Pro",
  price: 250,
  type: "headphone",
  ANC: true,
};

const x: Product = {
  id: "3",
  name: "MacBook Air",
  price: 1500,
  type: "laptop",
  screenSize: 13,
  graphics: "M1",
};
