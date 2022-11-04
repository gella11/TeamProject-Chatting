//웹소켓
let clientsocket = null;
//채팅방번호 변수
let roomnumber= null;
//회원번호 변수
let mid = document.querySelector('.mid').value;
//채팅방html
let html = '<tr>채팅방 이름</tr><br>';

c_list() 
function c_list(){
	$.ajax({
		url : "/TeamProjectChatting/F_list",
		data:{"option":3 ,"user_num":mid},
		type:"POST",
		success : function(re){
			let json = JSON.parse(re)
			console.log(json)
			json.forEach(c=>{
				html+= `<tr class="roomnumber" value="${c.c_num}">${c.c_name}<button onclick='gochat(${c.c_num})'>채팅</button></tr><br>`;
			})
			document.querySelector('.clist').innerHTML=html;
			socket()
		}
	})
}
// 11/1 도현 : 채팅하기.
function gochat(c_num){
	$.ajax({
		url : "/TeamProjectChatting/F_list",
		data:{"option":2 , "c_num":c_num},
		type:"POST",
		success : function(re){
			let json = JSON.parse(re)
			roomnumber=json.roomnumber;
			document.querySelector('.btn-primary').click()
		}
	})
}
// 11/1 도현 채팅소켓여는함수
function socket(){
	if (mid != 'null') {
		// 웹소켓에 서버소켓으로 연결[매핑]
		clientsocket = new WebSocket('ws://localhost:8080/TeamProjectChatting/chatting/'+mid);
		// 아래에서 구현 메소드를 객체에 대입
		clientsocket.onopen = function(e) { onopen(e) }
		clientsocket.onclose = function(e) { onclose(e) }
		clientsocket.onmessage = function(e) { onmessage(e) }
		clientsocket.onerror = function(e) { onerror(e) }
	}
	function onopen(e) {}
	function onclose(e) {}  
}
 
 
// 11/2 도현 esc로 소켓끄기 새로고침
$(document).keyup(function(e) {
     if (e.key === "Escape") { 
        location.reload();
    }
}); 
 
 
 
// 11/1 도현 소켓끄기 새로고침
function socketclose(){
   //clientsocket.close();
   location.reload();
}
//  11/1 도현 메시지보내기
function send() {
	let msg = { // 전송할 데이터 객체
		type: roomnumber,// 일반메시지 
		content: document.querySelector('.msgbox').value, // 작성내용
		mid: mid,  // 보낸 사람 
	}
	
	clientsocket.send(JSON.stringify(msg));
	document.querySelector('.msgbox').value = '';
}
//  11/1 도현 엔터키로 메시지보내기
function enterkey() { if (window.event.keyCode == 13) { send() } }
//  11/1 도현 메시지받기
function onmessage(e) {
	let msg = JSON.parse(e.data) // 받은 데이터 객체

	if (msg.type === roomnumber) { //전송타입이 현재방번호 
		if (msg.mid == mid) { // 본인 글이면  // 보낸사람 아이디와 접속된 아이디가 동일하면
			let html = document.querySelector('.contentbox').innerHTML;

			html += '<div class="secontent my-3"> ' +
				//'<span class="date"> ' + msg.date + ' </span>' +
				'<span class="content"> ' + msg.content + ' </span>' +
				'</div>';
			document.querySelector('.contentbox').innerHTML = html

		} else { // 본인 글이 아니면 
			let html = document.querySelector('.contentbox').innerHTML;
			html += '<div class="row g-0 my-3">' +
				'	<div class="col-sm-1 mx-2">' +
				'		<img width="100%;" class="rounded-circle" alt="" src="/jspweb/img/' + msg.img + '">' +
				'	</div>' +
				'	<div class="col-sm-9"> ' +
				'		<div class="recontent"> ' +
				'			<div class="name">' + msg.mid + '</div>' +
				'			<span class="content">' + msg.content + '</span>' +
				'		</div>' +
				'	</div>' +
				'</div>';
			document.querySelector('.contentbox').innerHTML = html
		}
		//////////////////////////////////////////////////////////////
	} 
	

	////////////////////////스크롤 고정 /////////////////////////////// 
	let top = document.querySelector('.contentbox').scrollTop;
	let Height = document.querySelector('.contentbox').scrollHeight;
	  document.querySelector('.contentbox').scrollTop
	= document.querySelector('.contentbox').scrollHeight;
}

function onerror(e) { }


