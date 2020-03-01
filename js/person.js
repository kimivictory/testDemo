function backToMain() {
    window.location.href = mainPageHref;
}
//获取用户名
function getUser() {
    let un = sessionStorage.getItem(usernameKey);
    let id = sessionStorage.getItem(userId);
    if (un === null) {
        getUserError();
    } else {
        getUserSuccess(un,id);
        getPerson();
    }
}
//获取不到用户名
function getUserError() {
    alert('您尚未登录，请登录');
    document.getElementById('username').innerHTML = '游客';
}


//成功获取用户名，显示用户名
function getUserSuccess(un,id) {
    let data = {
        'id': id
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serverUrl + getNameRoute, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function (){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var name = RESPONSE['name'];
            if (name === null) {
                document.getElementById('username').innerHTML = un;
            } else {
                document.getElementById('username').innerHTML = name;
            }
            
        } else {
            document.getElementById('username').innerHTML = un;
        }
        

    }
}


//成功获取用户名，显示信息
function getPerson() {
    let ip = sessionStorage.getItem(userId);
    let data = {
        'id': ip
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serverUrl + getPersonRoute, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var name = RESPONSE['name'];
            var age = RESPONSE['age'];
            var gender = RESPONSE['gender'];
            document.getElementById('name').value = name;
            document.getElementById('age').value = age;
            if (gender === null) {
                document.getElementById('gender').value = '--';
            } else {
                document.getElementById('gender').value = gender;
            }
        } else {}
    }
}
window.onload = getUser()
//检查年龄
function checkAge() {
    var reg1 = /^[1-9][0-9]{0,1}$/;
    var reg2 = /^100$/
    let age = document.getElementById('age').value;
    if (age.match(reg1) || age === '' || age.match(reg2)) {
        document.getElementById('awarn').innerHTML = '';
        return result = true;
    } else {
        document.getElementById('awarn').innerHTML = '年龄值为1-100';
        document.getElementById('awarn').style.color = 'red';
        return result = false;
    }
}

//
function sendPerson() {
    result = checkAge();
    if (result) {
        send();
    } else {
        document.getElementById('warn').innerHTML = '请检查数据';
        document.getElementById('warn').style.color = 'red';
    }
}

//发送用户名信息
function send() {
    let ip = sessionStorage.getItem(userId);
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    if (name == '') {
        name = null;
    } else {
        name = name;
    }
    if (age == '') {
        age = null;
    } else {
        age = age;
    }
    var obj = document.getElementById('gender');
    var gender = obj.options[obj.selectedIndex].value;
    let data = {
        'id': ip,
        'name': name,
        'age': age,
        'gender': gender
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serverUrl + updatePersonRoute, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var errcode = RESPONSE['errcode'];
            var errmsg = RESPONSE['errmsg'];
            if (errcode == 0) {

                document.getElementById('warn').innerHTML = errmsg;
                document.getElementById('warn').style.color = 'green';
            } else {

                document.getElementById('warn').innerHTML = errmsg;
                document.getElementById('warn').style.color = 'green';
                document.getElementById('text').style.borderColor = 'red';
            }
        } else {
            document.getElementById('warn').innerHTML = '修改信息请求出错';
            document.getElementById('warn').style.color = 'red';

        }
    }
    
}

