try{

  browser.menus.create({
    id: "addspamwebsite",
    title: browser.i18n.getMessage("menuAddToSpamWebsites"),
    contexts: ["page"],
    icons: {
      "16": "spam-16.png",
      "32": "spam-32.png"
    }
  });

  browser.menus.create({
    id: "addspamlink",
    title: browser.i18n.getMessage("menuAddToSpamLinks"),
    contexts: ["link"],
    icons: {
      "16": "spam-16.png",
      "32": "spam-32.png"
    }
  });

  browser.menus.onClicked.addListener((info, tab) => {
    console.log("ADDED");
    console.log(info);
    var xhr = new XMLHttpRequest();
    var url;

    
    if(info.menuItemId=="addspamwebsite"){
      url = tab.url;
      console.log("WEBSITE",url);
     
    }
    else{
      url = info.linkUrl;
      console.log("LINK",url);
     
    }
    console.log("url",url);

    var sites=JSON.parse(localStorage.getItem("sites"))||[];
    for(i=0;i<sites.length;i++){
      if(sites[i]==url){
        var title = "We got you the first time!";
        var content  = "You have already reported this url as spam link.";
        browser.notifications.create({
          "type": "basic",
          "title": title,
          "message": content
          });
          return;
      }
    }

      

    xhr.onreadystatechange = function(e){

      if (xhr.readyState == 4) {
        var title = browser.i18n.getMessage("notificationTitle");
        var content = browser.i18n.getMessage("notificationContent");
        console.log("ADDED"+url);
        var sites=JSON.parse(localStorage.getItem("sites"))||[];
        sites.push(url);
        localStorage.setItem('sites',JSON.stringify(sites));
        browser.notifications.create({
        "type": "basic",
        "title": title,
        "message": content
        });
      }
      }
    xhr.open("GET", "http://connectmoodbidri.com/spam_adon/spam_report.php?add-to-spam="+encodeURIComponent(url), true);
    xhr.send();
    
  });
}
catch(e){
    console.log(e);
}
