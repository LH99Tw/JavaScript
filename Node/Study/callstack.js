function func1(){
    console.log("func1");
    func2();
    return;
}
function func2(){
    console.log("func2");
    return;
}

func1();
