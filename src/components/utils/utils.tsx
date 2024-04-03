
//Utils function to format the date
export const dateFormatter=(dateStr:string, pattern:string)=>{
    const date = new Date(dateStr);
    const day = date.getDay().toString().padStart(2,'0'); //adds 0 at the start if day is single digit
    const month = date.getMonth().toString().padStart(2,'0'); //adds 0 at the start if month is single digit
    const year = date.getFullYear().toString(); //adds 0 at the start if day is single digit
    return pattern.replace("dd",day).replace("mm",month).replace("yyyy",year);
}