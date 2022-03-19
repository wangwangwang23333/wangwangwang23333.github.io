function isBigEnough(element) { 
    return (element >= 10); 
} 
    
var passed = [12, 5, 8, 130, 44].every(isBigEnough); 
console.log("Test Value : " + passed ); // false