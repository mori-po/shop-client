export type ShopResponse = {
    id: number;
    name: string;
    icon: string;
}

export type ShopRequest = {
    name: string;
    icon: string;
}

export type PointTicketRequest = {
    nonce: string;
}

export type PointTicketResponse = {
    price: number;
}

export type Test = {
    location_name: string,
    event_name: string
}
