const utilities = {
  
  unixToDateTime: (unixTimestamp: number): string => {
    const date          = new Date(unixTimestamp*1000);
    const monthsStrings = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    const day     = date.getDate();
    const month   = monthsStrings[date.getMonth()];
    const year    = date.getFullYear();

    const hours   = "0" + date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    if (new Date().getFullYear() === year) {
      return day + " " + month + ", " + hours.substr(-2) + ":" + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    else {
      return day + " " + month + " " + year + ", " + hours.substr(-2) + ":" + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
  }

}

export default utilities;