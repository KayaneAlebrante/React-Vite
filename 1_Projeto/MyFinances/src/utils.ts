export const FormatMoney = (money: string) : string =>{
    const formateValue = Number(money).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
    return formateValue;
}