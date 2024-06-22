
function convert(){
    var num = document.getElementById("input").value;
    // console.log(num);
    var roman = "";
    var romanNumList = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    var numberList = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    var i = 0;
    while(num > 0){
        var times = Math.floor(num / numberList[i]);
        num -= numberList[i] * times;
        for(var j = 0; j < times; j++){
            roman += romanNumList[i];
        }
        i++;
    }
    // console.log(roman);
    document.getElementById("output").innerHTML = roman;
    return roman;
}
