
function test(date) {
    
    dd = date.split("/")[0];
    mm = date.split("/")[1];
    yyyy = date.split("/")[2];

    const selectedDate = new Date(yyyy, dd, mm - 1);
    console.log("selecteddate = " + selectedDate);
}