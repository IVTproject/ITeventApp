<?php
	if ($_POST['exit']) {	
		setcookie("email", NULL);
		header('Location: http://it-event.tk/');
		exit;
	}

	if(empty($_COOKIE['email'])) {
		header('Location: http://it-event.tk/');
		exit;
	}

	include 'php_scripts/interface.php';
	include 'php_scripts/api_manager.php';
	$api = new API();

	$id = htmlspecialchars($_GET['id']);
	$type = htmlspecialchars($_GET['type']);

	if (!$api->is_belong($id, $_COOKIE['email'])) {
		header('Location: http://it-event.tk/');
		exit;
	}
	if($_GET['save_change']) {
		$api->save_change();
		header('Location: http://it-event.tk/edit.php?id='.$id.'&type=profile');
	}
?>
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="/favicon.ico">
		<title>Мои мероприятия - Админ панель</title>
		<!-- Bootstrap core CSS -->
		<link href="/css/bootstrap.min.css" rel="stylesheet">
		<link href="/css/style.css" rel="stylesheet">
		<link href="/phone_preview/css/style.css" rel="stylesheet">
		<script
			src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script src="/js/script.js"></script>
		<script type="text/javascript">		
					function name_event() {
						var x = <?=$api->get_information_event($id);?>;
						$('#title_event').append(x.name);
					}
					
					function add_edit_combobox() {
						/*&#1043;&#1086;&#1076;*/
						var d = new Date();
						var n = d.getFullYear();
						for (var i = 2012/*n*/; i <= n + 2; i++) {
							$('#begin_years_event').append(new Option(i, i));
							$('#end_years_event').append(new Option(i, i));
						} /*&#1052;&#1077;&#1089;&#1103;&#1094;*/
						for (var i = 1; i <= 12; i++) {
							if (i < 10) i = '0' + i;
							$('#begin_moth_event').append(new Option(i, i));
							$('#end_moth_event').append(new Option(i, i));
						} /*&#1063;&#1080;&#1089;&#1083;&#1086;*/
						for (var i = 1; i <= 31; i++) {
							if (i < 10) i = '0' + i;
							$('#begin_num_event').append(new Option(i, i));
							$('#end_num_event').append(new Option(i, i));
						} /*&#1063;&#1072;&#1089;&#1099;*/
						for (var i = 1; i <= 24; i++) {
							if (i < 10) i = '0' + i;
							$('#begin_hour_event').append(new Option(i, i));
							$('#end_hour_event').append(new Option(i, i));
						} /*&#1052;&#1080;&#1085;&#1091;&#1090;&#1099;*/
						for (var i = 0; i <= 60; i++) {
							if (i < 10) i = '0' + i;
							$('#begin_minute_event').append(new Option(i, i));
							$('#end_minute_event').append(new Option(i, i));
						}
						
						var x = <?=$api->get_information_event($id);?>;
						
						begin_date = x.begin_date;
						end_date = x.end_date;
						
						begin_date = begin_date.split(" ");
						ymd = begin_date[0].split("-");
						hm = begin_date[1].split(":");
						$('#begin_years_event').val(ymd[0]);
						$('#begin_moth_event').val(ymd[1]);
						$('#begin_num_event').val(ymd[2]);
						$('#begin_hour_event').val(hm[0]);
						$('#begin_minute_event').val(hm[1]);
						
						end_date = end_date.split(" ");
						ymd = end_date[0].split("-");
						hm = end_date[1].split(":");
						$('#end_years_event').val(ymd[0]);
						$('#end_moth_event').val(ymd[1]);
						$('#end_num_event').val(ymd[2]);
						$('#end_hour_event').val(hm[0]);
						$('#end_minute_event').val(hm[1]);
						
						
					
						$("#name_event").val(x.name);
						document.getElementById("textarea_info").innerHTML = x.information;
						$("#site_event").val(x.site);
						$("#mySelect").val(x.city);
						$("#address_event").val(x.address);
						$("#image_ava").attr("src", x.pictures);            			
					}
					
					$(document).ready(function(){
						var i = $('input').size();
					
						$('#add_field').click(function() {
							if (i == 1) {
								$("#remove").show();
							}
							
							$('<div class="row"><div class="form-group bleat col-xs-8"><div class="input-group"><span class="input-group-addon"><span class="glyphicon glyphicon-bullhorn"></span></span><input type="text" class="form-control col-xs-2" id="additional_fields" name="additional_fields" placeholder="Дополнительное поле ' + i + '"></div></div></div>').fadeIn('slow').appendTo('#additional_fields');
							i++;
						});
					
						$('#remove').click(function() {
							if(i > 1) {
								$('.bleat:last').remove();
								
								i--;
								if (i == 1) {
									$("#remove").hide();
								}
							}
						});
					});
					
					function save_additional_fields() {
						var additional_fields = document.getElementsByName('additional_fields');
						var array_fields = [];
						for(var i = 0; additional_fields[i]; i++) {
							array_fields.push({name: additional_fields[i].value, value:""});
						}	
						var struct_string = JSON.stringify(array_fields);
						var message;
						$('#zag_mod').text("Создание шаблона");
						$.ajax({
							type: 'POST',
							url: 'http://it-event.tk/api.php?mod=write_additional_fields',
							data: {id_event: <?=$id ?>, value: struct_string},
							error: function(req, text, error) {
								message = 'Ошибка AJAX: ' + text + ' | ' + error;
								$('#reg_modal_body').text(message);
									$('#myModal').modal();
							},
							success: function (data) {            
								message = "Поля успешно добавлены!";
							$('#reg_modal_body').text(message);
								$('#myModal').modal();
								setTimeout( 'location.reload(true);', 1500 );
								
							},
							dataType: 'json'
						});
					}			

					function save_change_time(prev_date, id) {
						write_change_server(id, "time", prev_date + " " + 
								document.getElementById('hourse_' + id).value + ":" + document.getElementById('minute_' + id).value + ":00");
					}

					function save_change_inf(id) {
						var val = document.getElementById('inf_' + id).value;
						write_change_server(id, "name", string_out_chars(val));
					}

					var dop_pole = <?=$api->get_struct_from_event($id) ?>;
					function save_change_additional_fields(id) {
						var adf = [];
						for(var i = 0; dop_pole[i]; i++) {
							var vl = document.getElementById(dop_pole[i].name + "_" + id).value;
							adf.push({name:dop_pole[i].name, value:string_out_chars(vl)});
						}
						write_change_server(id, "additional_fields", JSON.stringify(adf));
					}

					function write_change_server(id_action, name_field, value) {
						$.ajax({
							type: 'POST',
							url: 'http://it-event.tk/api.php?mod=save_change_actions',
							data: {
								name_field: name_field,
								value_field: value,
								id_action: id_action,
								email_user: "<?=$_COOKIE['email']?>"
							},
							error: function(req, text, error) {
								alert('Ошибка AJAX: ' + text + ' | ' + error);
							},
							success: function (data) {            
								var message = "Поля успешно изменены!";
												$('#zag_mod').text("Изменение полей");
												$('#reg_modal_body').text(message);
											$('#myModal').modal();
							},
							dataType: 'json'
						});
					}

					var list_actions_event;
					var date_event;

					function createTable() {
						date_event = <?=$api->get_interval_event($id); ?>;
						list_actions_event = <?=$api->list_actios_from_event($id) ?>;
						list_actions_event = list_actions_event.list_actions;
						var str = "";
						var th = "";
						for (var i = 0; i < dop_pole.length; i++) {
							th += '<th>' + dop_pole[i].name + '</th>';
						}
						var ind = 0;
						for(var i = 0; i < date_event.length; i++) {
							var day = date_event[i].split(" ")[0].split("-")[2];
							str += '<h3 class="sub-header">День '+ (i+1) +' (' + date_event[i].split(' ')[0]	+ ') <a id="add_schedule'+ (i+1) +'" onclick="create_next_field(\''+date_event[i].split(' ')[0]+'\', '+i+');" href="#">Добавить поле</a></h3>'+
										'<div class="table-responsive">'+
											'<table class="table table-striped">'+
												'<thead>'+
													'<tr> <th>Время</th><th>Описание</th>' + th + '</tr>'+
												'</thead>'+
												'<tbody id="schedule_edit_'+i+'">';
												while(list_actions_event[ind] && list_actions_event[ind].time.split(" ")[0].split("-")[2] == day) {
													var d_t = list_actions_event[ind].time.split(" ");
													var id_act = list_actions_event[ind].id;
													str += '<tr><td><input oninput="check_hours(this)" onBlur="save_change_time(\'' + d_t[0] + '\', ' + id_act + ');" id="hourse_' + id_act +  '" class="time_schedule" name="hour_schedule" type="text" placeholder="ЧЧ" value="' + d_t[1].split(":")[0] + '"><input oninput="check_mins(this)" onBlur="save_change_time(\'' + d_t[0] + '\', ' + id_act + ');" id="minute_' + id_act +  '" class="time_schedule" name="minute_schedule" type="text" placeholder="ММ" value="' + d_t[1].split(":")[1] + '"></td>'+              
														'<td><textarea onBlur="save_change_inf(' + id_act + '); textAreaAdjustNormal(this);" id="inf_' + id_act +  '" name="info_schedule" rows="2" onFocus="textAreaAdjust(this)" onkeyup="textAreaAdjust(this)" class="textarea_schedule">' + list_actions_event[ind].name + '</textarea></td>';                     
														for(var j = 0; list_actions_event[ind].additional_fields[j]; j++) {
															str += '<td><textarea onBlur="save_change_additional_fields(' + id_act + ');"  id="' + list_actions_event[ind].additional_fields[j].name + '_' + id_act +'" name="' + list_actions_event[ind].additional_fields[j].name + '" onkeyup="textAreaAdjust(this)" rows="2" class="textarea_schedule">' + list_actions_event[ind].additional_fields[j].value + '</textarea></td>';
														}
														str += '</tr>';
														ind++;
												}
												str += '</tbody>'+
											'</table>'+
										'</div>';								
							
						}
						$(str).fadeIn('slow').appendTo('#tables_schedule');				
					}

					function add_action_server() {
						var date = document.getElementById('date_add').value + 
							" " + document.getElementById('add_hour').value +
							":" + document.getElementById('add_mins').value + ":00";
						var inf = document.getElementById('add_inf').value;
						var dop = [];
						for(var i = 0; dop_pole[i]; i++) {
							dop.push({name:dop_pole[i].name, value:document.getElementById('dop_pole_' + i).value});
						}
						var id_table = document.getElementById('id_table').value;
						$.ajax({
							type: 'POST',
							url: 'http://it-event.tk/api.php?mod=add_action_from_event',
							data: {
								id_event: <?=$id ?>,
								inf: inf,
								date: date,
								additional_fields: JSON.stringify(dop)
							},
							error: function(req, text, error) {
							
							},
							success: function (data) {
								var message = "";
								if(JSON.stringify(data) != "{}") {         
									message = "Поле добавленно";
									var str = '<tr><td><input oninput="check_hours(this)" onBlur="save_change_time(\'' + data.time.split(" ")[0] + '\', ' + data.id + ');" id="hourse_' + data.id +  '" class="time_schedule" name="hour_schedule" type="text" placeholder="ЧЧ" value="' + data.time.split(" ")[1].split(":")[0] + '"><input oninput="check_mins(this)" onBlur="save_change_time(\'' + data.time.split(" ")[0] + '\', ' + data.id + ');" id="minute_' + data.id +  '" class="time_schedule" name="minute_schedule" type="text" placeholder="ММ" value="' + data.time.split(" ")[1].split(":")[1] + '"></td>'+              
									'<td><textarea onBlur="save_change_inf(' + data.id + ');" id="inf_' + data.id +  '" name="info_schedule" onkeyup="textAreaAdjust(this)" class="textarea_schedule">' + data.name + '</textarea></td>';                     
									for(var j = 0; data.additional_fields[j]; j++) {
										str += '<td><textarea onBlur="save_change_additional_fields(' + data.id + ');"  id="' + data.additional_fields[j].name + '_' + data.id +'" name="' + data.additional_fields[j].name + '" onkeyup="textAreaAdjust(this)" class="textarea_schedule">' + data.additional_fields[j].value + '</textarea></td>';
									}
									str += '</tr>';
									$('#schedule_edit_' + id_table).append(str);
								} else {
									message = "Поле не добавленно";
								}
								$('#zag_mod').text("Добавление полей");
								$('#reg_modal_body').text(message);
								$('#myModal').modal();
							},
							dataType: 'json'
						});
					}
					//создает модальное окно с заполнением полей
					function create_next_field(date, id_table) {
						var th = "";
						for (var i = 0; i < dop_pole.length; i++) {
							th += '<th>' + dop_pole[i].name + '</th>';
						}
						
						var table = '<input type="hidden" value="'+id_table+'" id="id_table"/><input type="hidden" value="'+date+'" id="date_add"/><table class="table table-striped">' + 
										'<thead>'+
											'<tr> <th>Время</th><th>Описание</th>' + th + '</tr>'+
										'</thead>'+
										'<tbody id="add_schedule">';
						table += '<tr><td><input oninput="check_hours(this)" name="add_hour" id="add_hour" class="time_schedule" type="text" placeholder="ЧЧ"><input oninput="check_mins(this)" name="add_mins" id="add_mins" class="time_schedule" type="text" placeholder="ММ"></td>' +
								 '<td><textarea name="add_inf" id="add_inf" class="textarea_schedule" onkeyup="textAreaAdjust(this)"></textarea></td>';

						for(var i = 0; i < dop_pole.length; i++) {
							table += '<td><textarea id="dop_pole_' + i + '" name="dop_pole_' + i + '" onkeyup="textAreaAdjust(this)" class="textarea_schedule"></textarea></td>';
						}
						table += '</tr></tbody></table>';
						$('#add_schedule_modal_body').html(table);
						$('#add_schedule_modal').modal();
					}
					//Добавить строку в таблицу			
					/*$(document).ready(function(){
						var i = $('tr').size();				
				
						$('#add_schedule').click(function() {				
							$('<tr>'+
							  '<td>'+					
								'<input class="time_schedule" name="hour_schedule'+i+'" type="text" placeholder="Часы">'+
								'<input class="time_schedule" name="minute_schedule'+i+'" type="text" placeholder="Минуты">	'+									
							  '</td>'+                
							  '<td><textarea name="info_schedule'+i+'" onkeyup="textAreaAdjust(this)" class="textarea_schedule">Описание</textarea></td>     '+                             
							  '<td><textarea name="dop1_schedule'+i+'" onkeyup="textAreaAdjust(this)" class="textarea_schedule">Дополнительное поле 1</textarea></td>  '+                                
							  '<td><textarea name="dop2_schedule'+i+'" onkeyup="textAreaAdjust(this)" class="textarea_schedule">Дополнительное поле 2</textarea></td>  '+                                
							  '<td><textarea name="dop3_schedule'+i+'" onkeyup="textAreaAdjust(this)" class="textarea_schedule">Дополнительное поле 3</textarea></td>'+    				  
							'</tr> ').fadeIn('slow').appendTo('#schedule_edit');
							i++;
						});
					
						$('#remove').click(function() {
							if(i > 1) {
								$('.bleat:last').remove();
								
								i--;
								if (i == 1) {
									$("#remove").hide();
								}
							}
						});
					});*/		
					
				</script>

		<script src="/js/rezine.js"></script>
		<!-- Custom styles for this template -->
		<link href="/css/dashboard.css"
			rel="stylesheet">
		<!-- Just for debugging purposes. Don't actually copy this line! -->
		<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body onload="<?php if ($type == "profile") { ?>add_edit_combobox();<?php } ?> name_event();">

		<div id="add_schedule_modal" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button class="close" type="button" data-dismiss="modal">×</button>
						<h4 class="modal-title" id="header_modal">Добавить поле</h4>
					</div>
					<div class="modal-body" id="add_schedule_modal_body"></div>
					<!--прописать в онклик отправку данных на сервер -->
					<div class="modal-footer">
						<button class="btn btn-default" type="button" data-dismiss="modal"
							onclick="add_action_server();">Добавить</button>
					</div>
				</div>
			</div>
		</div>

		<div id="myModal" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button class="close" type="button" data-dismiss="modal">×</button>
						<h4 class="modal-title" id="zag_mod"></h4>
					</div>
					<div class="modal-body" id="reg_modal_body"></div>
					<!--прописать в онклик отправку данных на сервер -->
					<div class="modal-footer">
						<button class="btn btn-default" type="button" data-dismiss="modal">OK</button>
					</div>
				</div>
			</div>
		</div>

		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/">IT-Event</a>
				</div>
				<div class="navbar-collapse collapse">
					<div class="navbar-form navbar-left">
						<a class="btn btn-primary" href="add_event.php">Добавить
							мероприятие</a>
					</div>
					<form class="navbar-form navbar-right" method="post"
						action="event.php">
						<input type="submit" value="Выйти" name="exit"
							class="btn btn-success" />
					</form>
				</div>
				<!--/.navbar-collapse -->
			</div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="sidebar">
					<ul class="nav nav-sidebar">
						<li <?php if($type == "profile") { echo 'class="active"'; } ?> id="profile"><a href="?id=<?=$id?>&type=profile">Профиль
								мероприятия</a>
						</li>
						<li <?php if($type == "schedule") { echo 'class="active"'; } ?>><a href="?id=<?=$id?>&type=schedule">Расписание</a></li>
					</ul>

					<?php	
						if ($type == "schedule") {
							echo getTemplate("phone_preview_schedule");
						} else if ($type == "profile") {							
							$avatar = "http://it-event.esy.es/file/snezhkinv@yandex.ru/6_%D0%98%D0%A2%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D1%8F/108.png";
							$name_event = "Название dcsdfdsfds dsf dsfdsds fds";
							$description = "Описание";
							$city = "Ульск";
							$adres = "Рандомный";
							$organizer = "Я";
							$begin_date = "23.04.2016";
							$end_date = "23.04.2016";
							$site_url = "lol.ru";
							
							$userpanel = str_replace(
							array(
							  "%ava_src%",
							  "%name_event%",
							  "%description%",
							  "%city%",
							  "%adres%",
							  "%organizer%",
							  "%begin_date%",
							  "%end_date%",
							  "%site_url%"
							),
							array (
								$avatar,
								$name_event,
								$description,
								$city,
								$adres,
								$organizer,
								$begin_date,
								$end_date,
								$site_url
							),
								getTemplate("phone_preview_profile")
							);
							echo $userpanel;
						}
					?>					
				</div>
				<div class="main">
					<h2 class="sub-header" id="title_event"></h2>

					<div class="row">


						<?php 
						$is_structure_of_event = $api->is_structure_of_event($id);
						if ($type == "schedule") {
							if ($is_structure_of_event == 0) {
								?>
						<div class="col-md-6">
							<form class="form-horizontal" method="post">
								<div class="form-group">
									<h3>Определите структуру расписания</h3>
									<h5>Поля по умолчанию</h5>
									<button type="button" class="btn btn-default btn tooltip_elem"
										data-tooltip="Обязательное поле с временем">
										<span class="glyphicon glyphicon-time"></span> Время
									</button>
									<button type="button" class="btn btn-default btn tooltip_elem"
										data-tooltip="Обязательное поле с описанием события">
										<span class="glyphicon glyphicon-info-sign"></span> Описание
									</button>
								</div>

								<div class="form-group">
									<a id="add_field" class="tooltip_elem"
										data-tooltip="Дополнительные поля для событий расписания, например:<br>тип, докладчик, ценазавходидр.">Добавить
										поле</a>
								</div>

								<div id="additional_fields"></div>

								<div class="form-group">
									<a id="remove">Удалить поле</a>
								</div>
								<a class="btn btn-success" onclick="save_additional_fields();"
									name="submit_save_additional_fields">Сохранить доп. поля</a>
							</form>
						</div>
						<?php 
								} else if ($is_structure_of_event == 1) { ?>
						<div id="tables_schedule"></div>
						<script>createTable();</script>
						<?php 
								}
						}
							if ($type == "profile") { ?>
						<div class="col-md-6">
							<form class="form-horizontal"
								action="edit.php?id=<?=$id?>&type=profile&save_change=1"
								method="post" enctype="multipart/form-data">
								<div class="form-group">
									<label for="exampleInputName">Аватар:</label>
									<div class="input-group" style="border: 1px solid #ccc">
										<img id="image_ava" alt="" width="150px" />
										<div id="div_upload_ava">
											<div id="text_upload_ava">Выберите фото</div>
											<input type="file" name="file" class="photo" id="upload_ava" />
										</div>
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputName">Название мероприятия:</label>
									<div class="input-group">
										<span class="input-group-addon"><span
											class="glyphicon glyphicon-bullhorn"></span> </span> <input
											type="text" name="name_event" id="name_event"
											class="form-control" placeholder="Название мероприятия">
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputName">Информация:</label>
									<div class="input-group">
										<span class="input-group-addon"><span
											class="glyphicon glyphicon-info-sign"></span> </span>
										<textarea style="width: 100%; border: 1px solid #cccccc;"
											onFocus="textAreaAdjust(this)" id="textarea_info"
											class="form-control" style="overflow:hidden" name="text"></textarea>
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputInfo">Сайт мероприятия:</label>
									<div class="input-group">
										<span class="input-group-addon"><span
											class="glyphicon glyphicon-globe"></span> </span> <input
											type="text" name="site_event" id="site_event"
											class="form-control" placeholder="Ссылка на сайт">
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputCity">Город проведения:</label>
									<div class="input-group">
										<span class="input-group-addon"><span
											class="glyphicon glyphicon-screenshot"></span> </span> <select
											id="mySelect" class="form-control" name="city_event">
											<option selected="">Кликни, чтобы выбрать город</option>
											<?php include 'resourse/list_citys.html';?>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputCity">Точный адрес:</label>
									<div class="input-group">
										<span class="input-group-addon"><span
											class="glyphicon glyphicon-home"></span> </span> <input
											type="text" name="address_event" id="address_event"
											class="form-control"
											placeholder="Например: ул. Ленина, д. 100">
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputCity">Дата проведения:</label>
									<div id="date_move">
										<label for="exampleInputCity">Дата начала: (Кликни, чтобы
											выбрать)</label>
										<div class="input-group">
											<span class="input-group-addon"><span
												class="glyphicon glyphicon-calendar"></span> </span> <select
												id="begin_years_event" name="begin_years_event">
												<option selected>Год</option>
											</select> <select id="begin_moth_event"
												name="begin_moth_event">
												<option selected>Месяц</option>
											</select> <select id="begin_num_event" name="begin_num_event">
												<option selected>Число</option>
											</select> <select id="begin_hour_event"
												name="begin_hour_event">
												<option selected>Часы</option>
											</select> <select id="begin_minute_event"
												name="begin_minute_event">
												<option selected>Минуты</option>
											</select>
										</div>
										<label for="exampleInputCity">Дата завершения:</label>
										<div class="input-group">
											<span class="input-group-addon"><span
												class="glyphicon glyphicon-calendar"></span> </span> <select
												id="end_years_event" name="end_years_event">
												<option selected>Год</option>
											</select> <select id="end_moth_event" name="end_moth_event">
												<option selected>Месяц</option>
											</select> <select id="end_num_event" name="end_num_event">
												<option selected>Число</option>
											</select> <select id="end_hour_event" name="end_hour_event">
												<option selected>Часы</option>
											</select> <select id="end_minute_event"
												name="end_minute_event">
												<option selected>Минуты</option>
											</select>
										</div>
									</div>
								</div>
								<div class="form-group">
									<input type="submit" class="btn btn-success" onclick="edit();"
										name="submit" value="Сохранить изменения">
								</div>
							</form>
						</div>
						<?php } ?>

					</div>
				</div>
			</div>
			<!-- Bootstrap core JavaScript
				================================================== -->
			<!-- Placed at the end of the document so the pages load faster -->
			<script
				src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
			<script src="http://bootstrap-3.ru/dist/js/bootstrap.min.js"></script>
			<script src="http://bootstrap-3.ru/assets/js/docs.min.js"></script>

	</body>
</html>