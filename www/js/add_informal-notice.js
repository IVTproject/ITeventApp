function chek_and_write_informal() {
    var theme = document.getElementById('theme').value;
    var information = document.getElementById('information').value;
    var place = document.getElementById('place_inf').value;
    var email = localStorage.getItem('email');
    if (!(localStorage.getItem("email") && localStorage.getItem("id_user"))) {
		show_confirm();
        return;
    }
    if(theme.length > 0 && place.length > 0) {
        var organize = localStorage.getItem('first_name') + " " + localStorage.getItem('second_name');
        add_informal_to_server(localStorage.getItem('last_evet_id'), theme, organize, information, place);
    } else {
       navigator.notification.alert("Нужно заполнить все поля.", function(){} , 'Ошибка');
    }
}

function remember_id_informal(data) {
    if(data >= 0) {
        if(localStorage.getItem("my_informals_" + localStorage.getItem("last_evet_id")) &&
           localStorage.getItem("my_informals_" + localStorage.getItem("last_evet_id")) != "undefined") {
            var my_informals = JSON.parse(localStorage.getItem("my_informals_" + 
                localStorage.getItem("last_evet_id")));
            my_informals.push(data);
            localStorage.setItem("my_informals_" + localStorage.getItem("last_evet_id"), JSON.stringify(my_informals));
        } else {
            localStorage.setItem("my_informals_" + localStorage.getItem("last_evet_id"), JSON.stringify([data]));
        }
    }
}

function remember_id_notice(data) {
    if(data >= 0) {
        if(localStorage.getItem("my_notice_" + localStorage.getItem("last_evet_id")) &&
           localStorage.getItem("my_notice_" + localStorage.getItem("last_evet_id")) != "undefined") {
            var my_informals = JSON.parse(localStorage.getItem("my_notice_" + 
                localStorage.getItem("last_evet_id")));
            my_informals.push(data);
            localStorage.setItem("my_notice_" + localStorage.getItem("last_evet_id"), JSON.stringify(my_informals));
        } else {
            localStorage.setItem("my_notice_" + localStorage.getItem("last_evet_id"), JSON.stringify([data]));
        }
    }
}

function chek_and_write_notice() {
    var name_ads = document.getElementById('name_ads').value;
    var type_notice = document.getElementById('type_notice').value;
    var info_ads = document.getElementById('info_ads').value;
    var caontact_ads = document.getElementById('caontact_ads').value;
    var FIO = localStorage.getItem('first_name') + " " + localStorage.getItem('second_name');
    var email = localStorage.getItem('email');
    if(!email || email == "undefined") {
        alert("Для добавления вы должны быть авторизированы.");
        return;
    }
    if(name_ads != "" && type_notice != "Выберите категорию" && caontact_ads != "") {
        add_notice_to_server(localStorage.getItem("last_evet_id"), name_ads, FIO, type_notice, info_ads, caontact_ads);
    }
}