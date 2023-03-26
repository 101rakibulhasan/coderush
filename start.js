const {ipcRenderer} = require('electron')
const fs = require("fs")

fetch("setting.json")
.then(response => response.json())
.then(data => {
    if(data.default_programming_language == "C")
    {
        document.getElementById("li_c").style.backgroundColor = "rgb(103, 103, 103)";
    }else if(data.default_programming_language == "Cpp")
    {
        document.getElementById("li_cpp").style.backgroundColor = "rgb(103, 103, 103)";
    }else if(data.default_programming_language == "Python")
    {
        document.getElementById("li_python").style.backgroundColor = "rgb(103, 103, 103)";
    }else if(data.default_programming_language == "Java")
    {
        document.getElementById("li_java").style.backgroundColor = "rgb(103, 103, 103)";
    }

})

function updateJSON(x,val)
{
    var name = 'setting.json';
    var m = JSON.parse(fs.readFileSync(name).toString());

    if(x == "dpl")
    {
        m.default_programming_language = val;
    }else if(x == "lsdo")
    {
        m.last_start_default_option = val;
    }else if(x == "wd")
    {
        m.working_dir = val;
    }

    fs.writeFileSync(name, JSON.stringify(m, (key, value) => (value || ''), 4).replace(/"([^"]+)":/g, '"$1":'));
} 

function openmain(x)
{
    if(x == "single")
    {
        ipcRenderer.send('open-main')
    }else if(x == "multiple")
    {
        ipcRenderer.send('open-main')
    }
    
    changeFocus(x)
}

function progchange(x)
{
    
    if(x == "C")
    {
        updateJSON("dpl", "C");
        document.getElementById("li_c").style.backgroundColor = "rgb(103, 103, 103)";
    }else if(x == "Cpp")
    {
        updateJSON("dpl", "Cpp");
        document.getElementById("li_cpp").style.backgroundColor = "rgb(103, 103, 103)";
    }else if(x == "Python")
    {
        updateJSON("dpl", "Python");
        document.getElementById("li_python").style.backgroundColor = "rgb(103, 103, 103)";
    }else if(x == "Java")
    {
        updateJSON("dpl", "Java");
        document.getElementById("li_java").style.backgroundColor = "rgb(103, 103, 103)";
    }
}

function changeFocus(x)
{
    if(x == "single")
    {
        updateJSON("lsdo", "single")
        document.getElementById("btn-single").focus()
    }else if(x == "multiple")
    {
        updateJSON("lsdo", "multiple")
        document.getElementById("btn-multiple").focus()
    }
}
