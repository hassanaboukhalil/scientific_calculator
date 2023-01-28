document.body.style.width = window.innerWidth + "px";
document.body.style.height = window.innerHeight + "px";
let file1 = document.getElementById("file1");
let file2 = document.getElementById("file2");
let glass = document.getElementsByClassName("glass")[0];
let equation_html = document.getElementById("equation_html");
let result = document.getElementById("result");
let rad_deg = document.getElementById("radORdeg");
let equation_js = "";
let result_js = 0;
let Ans = "";
let glass_width = window.getComputedStyle(glass,null).width
glass_width = glass_width.replace("px", "");
glass_width = parseInt(glass_width);
let equationHtml_width;
file1.style.left = window.getComputedStyle(glass,null).marginLeft;
file2.style.right = window.getComputedStyle(glass,null).marginLeft;
let obj_For_File1 = {
    row1 : ["+","-"],
    row2 : ["1","2","3","x"],
    row3 : ["4","5","6","/"],
    row4 : ["7","8","9"],
    row5 : ["0",".","DEL"]
}
let obj_For_File2 = {
    row1 : ["(",")"],
    row2 : ["log","ln","pow","e"],
    row3 : ["sin","cos","tan","redical"],
    row4 : ["sinh","cosh","tanh"],
    row5 : ["pi","rad","X!"]
}
let row1 = document.getElementsByClassName("row1")
let row2 = document.getElementsByClassName("row2")
let row3 = document.getElementsByClassName("row3")
let row4 = document.getElementsByClassName("row4")
let row5 = document.getElementsByClassName("row5")
function changeFile(page){
    let objFile;
    let id_file = page.id;
    if(id_file == "file1"){
        objFile = obj_For_File1;
        page.style.backgroundColor = "rgb(108, 255, 38)";
        file2.style.backgroundColor = "#D9D9D9";
    }
    else if(id_file == "file2"){
        objFile = obj_For_File2
        page.style.backgroundColor = "rgb(108, 255, 38)";
        file1.style.backgroundColor = "#D9D9D9";
    }
    for(let i = 0; i < row1.length ; i++){
        row1[i].innerHTML = objFile.row1[i]
    }
    for(let i = 0; i < row2.length ; i++){
        row2[i].innerHTML = objFile.row2[i]
        row3[i].innerHTML = objFile.row3[i]
    }
    if(objFile.row3[3] == "redical"){
        row3[3].innerHTML = ""
        row3[3].style.backgroundImage = `url('./images/redical-n.png')`;
        row3[3].style.backgroundSize = "100% 100%";
        row3[3].style.width= "50%";
        row3[3].style.height= "50%";
    }
    else{
        row3[3].style.backgroundImage = `none`;
        row3[3].innerHTML = objFile.row3[3]
        row3[3].style.backgroundSize = "initial";
        row3[3].style.width= "initial";
        row3[3].style.height= "initial";
    }
    for(let i = 0; i < row4.length ; i++){
        row4[i].innerHTML = objFile.row4[i]
        row5[i].innerHTML = objFile.row5[i]
    }
    if(objFile.row5[0] == "pi"){
        row5[0].innerHTML = ""
        row5[0].style.backgroundImage = `url('./images/pi.png')`;
        row5[0].style.backgroundSize = "100% 100%";
        row5[0].style.width= "20%";
        row5[0].style.height= "20%";
    }
    else {
        row5[0].style.backgroundImage = `none`;
        row5[0].innerHTML = objFile.row5[0]
        row5[0].style.backgroundSize = "initial";
        row5[0].style.width= "initial";
        row5[0].style.height= "initial";
    }
}

function ac_btn(obj){
    shadow_change(obj);
    document.getElementById("equation_html").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    rad_deg.innerHTML = ""
    equation_js = "";
    Ans = ""
    if(file2.style.backgroundColor == "rgb(108, 255, 38)"){
        document.getElementById("rc-41").firstChild.innerHTML = "rad"
    }
}

function equal_btn(obj){
    shadow_change(obj);
    try{
        if(equation_js[0]=="!" || (equation_js.includes("Ans") && equation_js.length > 3 && ".1234567890".includes(equation_js[3])) || equation_js.includes("//") ){
            throw ""
        }
        result_js = equation_js
        result_js = result_js.replace("Ans",Ans)
        result_js = result_js.replaceAll("log","Math.log10")
        result_js = result_js.replaceAll("ln(","Math.log(")
        result_js = result_js.replaceAll("^","**")
        result_js = result_js.replaceAll("e","Math.E")
        result_js = result_js.replaceAll("sinh","Math.sinh")
        result_js = result_js.replaceAll("cosh","Math.cosh")
        result_js = result_js.replaceAll("tanh","Math.tanh")
        if(rad_deg.innerHTML == ""){
            result_js = result_js.replaceAll("sin(","Math.sin(Math.PI / 180 *")
            result_js = result_js.replaceAll("cos(","Math.cos(Math.PI / 180 *")
            result_js = result_js.replaceAll("tan(","Math.tan(Math.PI / 180 *")
        }
        else{
            result_js = result_js.replaceAll("sin(","Math.sin(")
            result_js = result_js.replaceAll("cos(","Math.cos(")
            result_js = result_js.replaceAll("tan(","Math.tan(")
        }
        let position_of_fac = result_js.search("!");
        let nb = ""
        for(let k = position_of_fac - 1 ; position_of_fac != -1 && "0123456789".includes(result_js[position_of_fac-1]) && ("+-*/".includes(result_js[position_of_fac+1]) || result_js[position_of_fac+1] == undefined) ; k--){
            nb = result_js[k] + nb;
            if(!("0123456789".includes(result_js[k-1]))){
                nb = parseFloat(nb)
                if(result_js[k-1] == ".")throw "";
                if(nb > 30 || nb == 0){
                    throw ""
                }
                else{
                    let factorial = 1
                    for(let j=nb ; j>0 ; j--){
                        factorial = factorial * j;
                    }
                    result_js = result_js.replace(nb+"!",factorial.toString())
                    position_of_fac = result_js.search("!")
                    k = position_of_fac;
                    nb = ""
                }
            }
        }
        if(result_js == ""){
            result.innerHTML = ""
        }
        else{
            result_js = eval(result_js);
            result.innerHTML = result_js;
        }
    }
    catch{
        result.innerHTML = "ERROR"
    }
}

document.getElementById("rc-42").addEventListener('click',function(){
    if(this.firstChild.innerHTML == "DEL"){
        result.innerHTML = ""
        if("ln(Ans".includes(equation_html.innerHTML.slice(equation_html.innerHTML.length-3,equation_html.innerHTML.length))){
            equation_js = equation_js.slice(0, equation_js.length-3);
        }
        else if("log(sin(cos(tan(".includes(equation_html.innerHTML.slice(equation_html.innerHTML.length-4,equation_html.innerHTML.length))){
            equation_js = equation_js.slice(0, equation_js.length-4);
        }
        else if("sinh(cosh(tanh(".includes(equation_html.innerHTML.slice(equation_html.innerHTML.length-5,equation_html.innerHTML.length))){
            equation_js = equation_js.slice(0, equation_js.length-5);
        }
        else{
            equation_js = equation_js.slice(0, equation_js.length-1);
        }
        if(equation_js.length > equation_html.innerHTML.length){
            equation_html.innerHTML = equation_js.slice(equation_js.length - 17,equation_js.length)
        }
        else{
            equation_html.innerHTML = equation_js
        }
    }
    else{
        write_on_screen(this);
    }
    shadow_change(this)
})

document.getElementById("rc-41").addEventListener('click',function(){
    shadow_change(this)
    if(this.firstChild.innerHTML == "rad" || this.firstChild.innerHTML == "deg" ){
        if(this.firstChild.innerHTML == "rad"){
            rad_deg.innerHTML = "rad"
            this.firstChild.innerHTML = "deg"
        }
        else{
            rad_deg.innerHTML = ""
            this.firstChild.innerHTML = "rad"
        }
        result.innerHTML = ""
    }
    else{
        write_on_screen(this);
    }
})

function write_on_screen(obj){
    shadow_change(obj);
    if(result.innerHTML != "" && result.innerHTML != "ERROR"){
        Ans = result.innerHTML
        result.innerHTML = ""
        equation_html.innerHTML = "Ans"
        equation_js = "Ans"
    }
    let s = obj.firstChild.innerHTML;
    if(s == "x")s = "*"
    else if(s == "pow")s = "^"
    else if(obj.id == "rc-40" && s == "")s = "3.1416"
    else if(obj.id == "rc-23" && s == "")s = "^(1/"
    else if(s == "X!")s = "!"
    else if(s == "log" || s == "ln" || s == "sin" || s == "cos" || s == "tan" || s == "sinh" || s == "cosh" || s == "tanh"){
        s = s + "("
    }
    equation_js = equation_js + s;
    equation_html.innerHTML = equation_html.innerHTML + s;
    equationHtml_width = window.getComputedStyle(equation_html,null).width;
    equationHtml_width = equationHtml_width.replace("px", "");
    equationHtml_width = parseInt(equationHtml_width);
    if(equationHtml_width > glass_width){
        equation_html.innerHTML = equation_html.innerHTML.slice(equation_html.innerHTML.length - 17,equation_html.innerHTML.length)
    }
}

function shadow_change(obj){
    obj.style.boxShadow = `inset 2px 2px 2px rgb(0 0 0 / 33%), inset -3px -4px 4px rgb(0 0 0 / 72%)`;
    obj.firstChild.style.paddingRight = `0px`
    setTimeout(()=>{ 
        obj.style.boxShadow = `inset 2px 2px 2px rgba(0, 0, 0, 0.33), inset -5px -6px 4px rgba(0, 0, 0, 0.5)`;
        obj.firstChild.style.paddingRight = `2px`;
    }, 150);
}




