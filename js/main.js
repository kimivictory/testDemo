/*main.js */

//获取用户名
function getUser() {
    let un = sessionStorage.getItem(usernameKey);
    let id = sessionStorage.getItem(userId);
    if (un === null) {
        getUserError();
    } else {
        getUserSuccess(un, id);
    }

}
//获取不到用户名
function getUserError() {
    alert('您尚未登录，请登录');
    document.getElementById('username').innerHTML = '游客';
}

function backToIndex() {
    window.location.href = indexPageHref;
}
//成功获取用户名
function getUserSuccess(un, id) {
    let data = {
        'id': id
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serverUrl + getNameRoute, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
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



//登出
function logout() {
    sessionStorage.removeItem(usernameKey);
    sessionStorage.removeItem(userId);
    alert('退出登录');
    backToIndex();
}

window.onload = getUser();

//返回主页面
function backToLogin() {
    window.location.href = mainPageHref;
}

function backToPerson() {
    window.location.href = personPageHref;
}

//输送留言文本
function sendText() {
    let un_id = sessionStorage.getItem(userId);
    let textCon = document.getElementById('text').value;
    if (un_id === null) {
        sendTextError();
    } else {
        if (textCon === '') {
            alert('请输入内容')
        } else {
            sendTextSuccess(un_id);
        }

    }
}

function sendTextError() {
    alert('您尚未登录，请登录');
}

function sendTextSuccess(un_id) {
    let user_id = un_id;
    let text = document.getElementById('text').value;
    let data = {
        'id': user_id,
        'text': text
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serverUrl + sendTextRoute, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var errcode = RESPONSE['errcode'];
            var errmsg = RESPONSE['errmsg'];
            if (errcode == 0) {
                alert(errmsg);
                document.getElementById('warn').innerHTML = errmsg;
                document.getElementById('warn').style.color = 'green';
            } else {
                alert(errmsg);
                document.getElementById('warn').innerHTML = errmsg;
                document.getElementById('warn').style.color = 'green';
            }
        } else {
            document.getElementById('warn').innerHTML = '发表请求出错';
            document.getElementById('warn').style.color = 'red';
        }
    }
    location.reload()
}


//获取留言
function getText() {
    let data = {
        'open': 1
    };
    let un_id = sessionStorage.getItem(userId);
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open('POST', serverUrl + getTextRoute, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);

            for (var i = 0; i < Object.keys(RESPONSE).length; i++) {
                var x = i.toString();
                var name = RESPONSE[x]["finalName"];
                var text = RESPONSE[x]["text"];
                var time = RESPONSE[x]["time"];
                var uid = RESPONSE[x]['user_id']
                var fid = RESPONSE[x]['floor_id']; //取值
                var box = document.getElementById('box'); //获取插入处
                var divBox = document.createElement('div');
                var nameBox = document.createElement('span');
                var timeBox = document.createElement('span');
                var floorBox = document.createElement('span');
                var textBox = document.createElement('div'); //创建
                var deleteBox = document.createElement('span');
                var updateBox = document.createElement('span');
                deleteBox.onclick = function () {
                    var msg = "您真的确定要删除吗？\n\n请确认！！！";
                    if (confirm(msg) == true) {
                        let ddd = this.parentNode.children[2].innerHTML;
                        let dfid = parseInt(ddd);
                        let data2 = {
                            'delete': 1,
                            'floor_id': dfid,
                            'user_id': un_id
                        }
                        var xmlhttp = new XMLHttpRequest;
                        xmlhttp.open('POST', serverUrl + deleteTextRoute, true);
                        xmlhttp.setRequestHeader('Content-type', 'application/json');
                        xmlhttp.send(JSON.stringify(data2));
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var response2 = xmlhttp.responseText;
                            var RESPONSE2 = JSON.parse(response2);
                            var errcode = RESPONSE2['errcode'];
                            var errmsg = RESPONSE2['errmsg'];
                            if (errcode === 0) {
                                alert(errmsg);
                            } else {
                                alert(errmsg);
                            }

                        } else {

                        }
                    } else {
                        alert('好吧，真是可惜');
                    }



                    location.reload();
                }
                updateBox.onclick = function () {
                    let uuu = this.parentNode.children[2].innerHTML;
                    let ufid = parseInt(uuu);
                    var x = document.getElementById('update-container');
                    x.style.display = 'inline';
                    document.getElementById('floor').value = ufid;

                }
                nameBox.innerHTML = name;
                timeBox.innerHTML = time;
                floorBox.innerHTML = fid;
                textBox.innerHTML = text; //文本插入
                deleteBox.innerHTML = '删除';
                updateBox.innerHTML = '修改';
                nameBox.className = 'nameBox';
                timeBox.className = 'timeBox';
                floorBox.className = 'floorBox';
                deleteBox.className = 'deleteBox';
                updateBox.className = 'updateBox';
                divBox.className = 'divBox';
                var content = document.getElementsByClassName('divBox');
                divBox.appendChild(nameBox);
                divBox.appendChild(timeBox);
                divBox.appendChild(floorBox);
                divBox.appendChild(textBox); //留言获得,待入

                if (un_id == uid) {
                    divBox.appendChild(deleteBox);
                    divBox.appendChild(updateBox);
                } else {

                }
                if (i === 0) {
                    box.appendChild(divBox);
                } else {
                    box.insertBefore(divBox, content[0]);
                }
            }



        } else {

        }
    }
}
window.onload = getText();

function hideUTextarea() {
    var x = document.getElementById('update-container');
    x.style.display = 'none';
}

function showUTextarea() {
    var x = document.getElementById('update-container');
    x.style.display = 'inline';
}

function updateText() {
    var floor_id = document.getElementById('floor').value;
    var un_id = sessionStorage.getItem(userId);
    var textCon = document.getElementById('utext').value;
    var data = {
        'text': textCon,
        'floor_id': floor_id,
        'user_id': un_id
    };
    if (textCon === '') {
        alert('请输入内容');
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', serverUrl + updateTextRoute, true);
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = xmlhttp.responseText;
                var RESPONSE = JSON.parse(response);
                var errcode = RESPONSE['errcode'];
                var errmsg = RESPONSE['errmsg'];
                if (errcode == 0) {
                    document.getElementById('uWarn').innerHTML = errmsg;
                    document.getElementById('uWarn').style.color = 'green';
                } else {
                    document.getElementById('uWarn').innerHTML = errmsg;
                    document.getElementById('uWarn').style.color = 'red';
                }
            } else {
                document.getElementById('uWarn').innerHTML = '请求失败';
                document.getElementById('uWarn').style.color = 'red';
            }
        }
        location.reload();
    }

}