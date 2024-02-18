export const useTimeNowSQL = () => {
    const dateNowSQL = () => {
        const today = new Date();
        let day = today.getDate();
        let month = 1 + today.getMonth();
        let year = today.getFullYear();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return { dateNowSQL }
}