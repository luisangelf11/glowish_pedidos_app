
export const useAddressMoney = ()=>{
    const getMoney = (address)=>{
        let city = address.split(',')[0]
        if(city === 'La Vega') return 100;
        else return 300;
    }
    return {getMoney}
}