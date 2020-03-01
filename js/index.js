/*index.js */
function showElement(element) {
    var x = document.getElementsByClassName(element);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'inline';
    }
}

function hideElement(element) {
    var x = document.getElementsByClassName(element);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
}

function jumpToRegister() {
    showElement('registerPage');
    hideElement('loginPage');
    document.getElementById('form').classList.add('page');
    document.getElementById('registerWarn').style.visibility='hidden';

}

function jumpToLogin() {
    showElement('loginPage');
    hideElement('registerPage');
    document.getElementById('form').classList.remove('page');
    document.getElementById('registerWarn').style.visibility='hidden';
}
function jumpToMain(){
    window.location.href=mainPageHref;//原网页跳转为main.html(主页面)
}


function check() {
    var un = document.getElementById('username').value;
    var pw1 = document.getElementById('password1').value;
    var pw2 = document.getElementById('password2').value;
    var userWarn = document.getElementById('userWarn');
    var passwordWarn1 = document.getElementById('passwordWarn1');
    var passwordWarn2 = document.getElementById('passwordWarn2');

    var regun = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\_)[0-9 a-z A-Z _]{1,10}$/;
    var regpw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9 a-z A-Z]{6,24}$/;
    if (un === '') {
        userWarn.innerHTML = '用户名不能为空';
        userWarn.style.color = 'red';
    } else {
        if (un.match(regun)) {
            userWarn.innerHTML = '用户名格式正确';
            userWarn.style.color = 'green';

        } else {
            userWarn.innerHTML = '用户名长度为1~10个字符，由字母、数字和下划线组成';
            userWarn.style.color = 'red';

        }

    }

    if (pw1 === '') {
        passwordWarn1.innerHTML = '密码不能为空';
        passwordWarn1.style.color = 'red';
    } else {if (pw1.match(regpw)) {
        passwordWarn1.innerHTML = '密码格式正确';
        passwordWarn1.style.color = 'green';
        if (pw2 === pw1) {
            passwordWarn2.innerHTML = '两次密码一致';
            passwordWarn2.style.color = 'green';
            
            
        } else {
            passwordWarn2.innerHTML = '两次密码不一致';
            passwordWarn2.style.color = 'red';
            
        }
    } else {
        passwordWarn1.innerHTML = '密码长度为6~24个字符，由大写字母、小写字母和数字组成';
        passwordWarn1.style.color = 'red';
        
    }

    }
}



function onRegistercheck(){
    var c1 = document.getElementById('userWarn').style.color;
    var c2 = document.getElementById('passwordWarn1').style.color;
    var c3 = document.getElementById('passwordWarn2').style.color;
    if (c1==='green'&&c2==='green'&&c3==='green') {
        return{res:true};
    } else {
        return{res:false};
    }
}
function onLogincheck(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username===''||password==='') {
        return{res:false} 
    } else {
        return{res:true}  
    }
}

/*function ajax(methods,route,data){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(methods,serverUrl+route,true);
    xmlhttp.setRequestHeader('Content-type','application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4&&xmlhttp.status==200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var errcode = RESPONSE['errcode'];
            var errmsg = RESPONSE['errmsg'];
            var web = true;
            return{'web':true,'errcode':errcode,'errmsg':errmsg}  //连接成功
        } else {
            var web =false;
            return{'web':false}   //连接失败
        }
    }

}*/
function registering(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password1').value;
    let data = {'username':username,'password':password};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST',serverUrl+registerRoute,true);
    xmlhttp.setRequestHeader('Content-type','application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4&&xmlhttp.status==200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var errcode = RESPONSE['errcode'];
            var errmsg = RESPONSE['errmsg'];
            if (errcode==0) {
                alert(errmsg+',即将返回登录界面');
                document.getElementById('registerWarn').style.visibility='visible';
                document.getElementById('registerWarn').innerHTML=errmsg;
                document.getElementById('registerWarn').style.color='green';
                jumpToLogin();
                
            } else if(errcode==400||1) {
                alert(errmsg);
                document.getElementById('registerWarn').style.visibility='visible';
                document.getElementById('registerWarn').innerHTML=errmsg;
                document.getElementById('registerWarn').style.color='red';
                
            }   
        } else {
            document.getElementById('registerWarn').style.visibility='visible';
            document.getElementById('registerWarn').innerHTML='注册请求出错';
            document.getElementById('registerWarn').style.color='red';
        }
        hideElement('loading');
    }
}
function logining(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let data = {'username':username,'password':password};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST',serverUrl+loginRoute,true);
    xmlhttp.setRequestHeader('Content-type','application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4&&xmlhttp.status==200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var errcode = RESPONSE['errcode'];
            var errmsg = RESPONSE['errmsg'];
            var ip = RESPONSE['id'];
            if (errcode==0) {
                alert(errmsg+'即将进入主页面');
                document.getElementById('registerWarn').style.visibility='visible';
                document.getElementById('registerWarn').innerHTML=errmsg;
                document.getElementById('registerWarn').style.color='green';  
                sessionStorage.setItem(usernameKey,username) 
                sessionStorage.setItem(userId,ip)
                jumpToMain();
            } else if(errcode==401) {
                alert(errmsg);
                document.getElementById('registerWarn').style.visibility='visible';
                document.getElementById('registerWarn').innerHTML=errmsg;
                document.getElementById('registerWarn').style.color='red';
            }
        } else {
            document.getElementById('registerWarn').style.visibility='visible';
            document.getElementById('registerWarn').innerHTML='登录请求出错。。';
            document.getElementById('registerWarn').style.color='red';
        }
        hideElement('loading');
    }
}


function onRegister() {
    if (onRegistercheck().res) {
        showElement('loading');
        registering();
    } else {
        alert(completeR);
    }
}

function onLogin() {
    if (onLogincheck().res) {
        showElement('loading');
        logining();
    } else {
        alert(completeL);
        
    }
    
}