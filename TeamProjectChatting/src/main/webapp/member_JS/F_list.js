
//10/28 도현,상진 친구리스트 가져오기.
f_list()
function f_list(){
	$.ajax({
		url : "/TeamProjectChatting/F_list",
		success : function(re){
			let list = JSON.parse(re)
			let html = '';
			for(let i = 0 ; i<list.length; i++){
				let l = list[i]
				html +=  '<div class="friend_list">'
					+ '<div class="friend_con_box" onclick="chatting('+l.user_num+')"  id='+l.user_num+' >'		
					+ '<div>'			
					+ '<img class="friend_img" alt="" src="../img/망햄터.png">' + l.user_profile	// 이 라인에 프로필 이미지 들어가야돼요		
					+ '</div>'			
					+ '<div class="friend_text_box">'			
					+ '<div class="friend_name">'+l.user_name+'</div>'				
					+ '<div class="friend_msg">'+l.user_msg+'</div>'				 
					+ '</div>'			
					+ '</div>'		
					+ '</div>'
			}
			document.querySelector('.f_list').innerHTML = html;
		}
	})
}
//10/28 도현,상진 채팅방생성 후 채팅창으로 넘어가기.
function chatting(num){
   let chattingnum = num;
   $.ajax({
      url : "/TeamProjectChatting/F_list",
      data : {"chattingnum" : chattingnum, "option" : 1},
      type:"POST",
      success : function(re){
		location.href='/TeamProjectChatting/member_View/c_list.jsp';
       }
   })
}
//11/2 도현 모달에서 친구추가하기.
function friendadd(){
	let email = document.querySelector('.f_email').value;
	$.ajax({
      url : "/TeamProjectChatting/F_list",
      data : {"email" : email, "option" : 4},
      type:"POST",
      success : function(re){
		if(re=='true'){
			location.reload();
		}else{alert('이메일을 확인해주세요')}
      }
   })
}

//11/2 도현 추천친구찾기. 나를 친구추가했지만 , 내가 친구추가안한사람

// 친구목록 & 채팅방 하단 탭 
let icon_box = document.querySelector('.icon_box')
let container = document.querySelector('.container')

//변환이벤트
function tabchange(page){
	$(".container").load(page)// 특정 태그에 해당 파일 로드 [ jquery ]
}
function addbtn(){
	document.querySelector('.friendaddbtn').click();
}
//11/2 도현 모달에서 친구추가하기.
function friendadd(){
   let email = document.querySelector('.f_email').value;
   $.ajax({
      url : "/TeamProjectChatting/F_list",
      data : {"email" : email, "option" : 4},
      type:"POST",
      success : function(re){
      if(re=='true'){
         location.reload();
      }else{alert('이메일을 확인해주세요')}
      }
   })
}
