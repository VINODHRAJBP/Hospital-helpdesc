export interface book {
    id: string,
    name: string,
    author: string,
    price: number,
    count: number,
    image: string
}

export interface admin{
    email:string,
    password:string
}
export interface buy{
    data:string
}
export interface play{
    id:string
    qn:string,
    op1:string,
    op2:string
}