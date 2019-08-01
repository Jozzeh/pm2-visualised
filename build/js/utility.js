class Utility{
    addZero(numbervalue){
        if(parseInt(numbervalue) < 10){
            return ('0'  + numbervalue).slice(-2);
        }else{
            return numbervalue;
        }
    }
}