<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 페이지</title>
<!-- 폰트어썸 [아이콘 ] -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
<link href="/TeamProjectChatting/CSS/member_CSS/login.css" rel="stylesheet">
</head>
<body>

	<div class="box">
		<div class="in_box" onclick="slide()">
			<p class="font-monospace title"> We are Cacao Company <br>
			 cacaoTalk</p>
			<p class="font-monospace title">Welcome.</p>
			<div class="in_box_two">
				<div class="form-floating mb-3">
					<input type="email" class="form-control mid" id="floatingInput"
						placeholder="name@example.com"> <label for="floatingInput">Email
					</label>
				</div>
				<div class="form-floating mb-3">
					<input type="password" class="form-control mpassword"
						id="floatingInput" placeholder="name@example.com"> <label
						for="floatingInput">password </label>
				</div>
				<div class="logout_box">
					<button type="button" class="btn btn-secondary btn-lg"onclick="login()">Enter</button>
				</div>
			</div>
			<div class="font-monospace result">
				<span style=""></span>
			</div>
		</div>
	</div>
	
	<script  src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
	<script type="text/javascript" src="/TeamProjectChatting/member_JS/login.js"></script>
</body>
</html>