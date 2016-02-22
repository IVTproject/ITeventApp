$.get(
    "http://it-event.esy.es/api.php", 
    { 
        mod: "list_all_events"
    },
    success
)

//функция, которая работает с данными, которые пришли с сервера
function success(data)
{
    alert(data);
}
