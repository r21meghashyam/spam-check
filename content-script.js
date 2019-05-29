try{
var div=document.createElement("div");
div.style.background="#FFF";
div.style.width="100px";
div.style.height="100px";
div.style.position="fixed";
div.style.padding="10px";
div.style.fontSize="20px";
div.style.color="#999";

document.body.appendChild(div);
var divFocused=false;
var activeLink = "";
var origin = location.protocol+"/"+location.host+location.pathname;

Array
    .from(document.querySelectorAll("a[href]"))
    .forEach(function (element){
        let hovered=false;
        element.addEventListener('mouseover',function(event){
            console.log("CHECK URL");
            if(element.getAttribute("href")==activeLink)
                return;
            console.log("NEW LINK");
            activeLink = element.getAttribute("href");
            //console.log(absolute(origin,element.getAttribute("href")));
            hovered=true;
            setTimeout(function(){
                if(hovered){
                    console.log("checking",activeLink);
                    checkSpam(element,event);
                }
            },1000)
        });
        element.addEventListener('mouseout',function(){
            hovered=false;
            activeLink="";
            setTimeout(function(){
                if(div&&!divFocused)
                div.hidden=true;
            },500)
            
        });
    });

function checkSpam(element,event){
    console.log("URL2",event);
    var url = /*element.getAttribute("href");//*/absolute(origin,element.getAttribute("href"));
    console.log("URL",url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e){
        if (xhr.readyState == 4) {
            if(xhr.responseText=="0"){
                console.log("Site not spam");
            }
            else{
                console.log(location);
                if(location.host=="www.youtube.com")
                    div.innerHTML = xhr.responseText+" people reported this video as <span style='color:#900;'>clickbait</span>.";
                else
                    div.innerHTML = xhr.responseText+" people reported this link as <span style='color:#900;'>spam</span>.";
               
                div.style.top = event.clientY+"px";
                div.style.left = event.clientX+"px";
                div.hidden=false;
                div.addEventListener('mouseover',function(){
                    divFocused=true;
                });
                div.addEventListener('mouseout',function(){
                    divFocused=false;
                });
                
                console.log(xhr.responseText," reported spam");
            }
                
        }
    };
    console.log("REQUEST",url);
    console.log("http://connectmoodbidri.com/spam_adon/spam_report.php?check-url="+encodeURIComponent(url));
    xhr.open("GET", "http://connectmoodbidri.com/spam_adon/spam_report.php?check-url="+encodeURIComponent(url), true);
    xhr.send();
}

function absolute(base, relative) {
    console.log("ABS");
    if(relative.substr(0,5)=="http:"||relative.substr(0,6)=="https:"){
        console.log("link relative");
        return relative;
    }
    
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailiing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
            
    }
    var url= stack.join("/");
    url=url.replace(/\/\//g,"/").replace("https:/","https://").replace("http:/","http://");
    console.log("abs=",url);
    if(url[url.length-1]=="/")
        url=url.substr(0,url.length);
    return url;
}
}
catch(e){
    console.log(e);
}