package model.Dao.memberDao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class memberDao extends SuperDao_M {

	private static memberDao mdao = new memberDao();

	public static memberDao getInstance() {
		return mdao;
	}

	// 회원가입 - 혜영
	public boolean sign_up(String user_name, String user_pw, String user_email, String user_phone) {
		String sql = "insert into user(user_name, user_pw, user_email, user_phone) values( ?, ?, ?, ? )";
		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, user_name);
			ps.setString(2, user_pw);
			ps.setString(3, user_email);
			ps.setString(4, user_phone);
			int count = ps.executeUpdate();
			if (count == 1) {
				return true;
			}
		} catch (Exception e) {
			System.out.println("회원가입 메소드 오류 : " + e);
		}
		return false;
	} // sign_up e
	

	// [10-30] 회원가입 시 핸드폰 번호 중복 체크 - 허혜영
	public boolean phone_check( String user_phone ) { // 핸드폰 번호 받아오기
		String sql = "select * from user where user_phone = ?"; // user 테이블에 등록된 핸드폰 번호인지 확인

		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, user_phone);
			rs = ps.executeQuery();
			if ( rs.next() ) {
				return true;
			}
		} catch (Exception e) {
			System.out.println("핸드폰번호 중복 메소드 오류 : " + e);
		}
		return false;
	} // phone_check e

	// [10-30] 회원가입 시 이메일 중복 체크 - 허혜영
	public boolean email_check( String user_email ) { // 이메일 주소 받아오기
		String sql = "select * from user where user_email = ?"; // user 테이블에 등록된 이메일인지 확인
        
      try {
         ps = con.prepareStatement(sql);
         ps.setString(1, user_email);
         rs = ps.executeQuery();
         if( rs.next() ) {
            return true;
         }
      } catch (Exception e) {
         System.out.println("이메일 중복 메소드 오류 : " + e );
      }
      return false;
	}

	// [10-26 ] 김원종 로그인 매소드 구현
	public int login(String user_email, String mpassword) { // 매개변수로 id 와 password 받기
		String sql = "select*from user where user_email=?"; // user테이블에 email 일치하는값 찾기

		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, user_email); // 아이디값 셋팅
			rs = ps.executeQuery();
			if (rs.next()) {// 아이디가 만약 존재하면
				sql = "select*from user where user_email=? and user_pw=?"; // 아이디와 비밀번호가 같은거
				ps = con.prepareStatement(sql);
				ps.setString(1, rs.getString(4)); // 아이디필드에 처음 셋팅한 값을 대입
				ps.setString(2, mpassword);// 2번째 물음표에 password대입
				rs = ps.executeQuery();
				sql = "select*from user where user_email=? and user_pw=?";
				if (rs.next()) {// 만약 둘다 일치하면
					return 1;
				}
				// 2번 if end
				return 2; // PW가 틀렸다
			} // 1번 if end

		} // try end
		catch (Exception e) {
			System.out.println("로그인메소드 오류" + e);
			return 3;
		} // DB오류다
		return 0;// 아이디가 없다.
	}// 메소드 end

	// [10-27] 김원종 회원번호값 가져오는 메소드
	public int user_num(String user_email) { // email값 가져오기
		String sql = "select user_num from user where user_email =?"; // email이 일치하는 user_num 호출
		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, user_email);
			rs = ps.executeQuery();
			if (rs.next()) {
				int user_num = rs.getInt(1); // 만약에 있으면 user_num 에 담기
				return user_num; // user_num return
			}
		} catch (Exception e) {
			System.out.println("유저번호오류" + e);
		}
		return 0;
	}
	
	//11/7 도현 나의 프로필 가져오기
	public ArrayList<String> getprofile(int user_num){
		ArrayList<String> list = new ArrayList<>();
		String sql = "select u.user_profile,u.user_name,u.user_msg from user u where user_num="+user_num;
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();
			if(rs.next()) {
				list.add(rs.getString(1));
				list.add(rs.getString(2));
				list.add(rs.getString(3));
			}
			return list;
		} 
		catch (Exception e) {
			System.out.println("프로필가져오기 오류" + e);
		}
		return null;
	}
	//11/8 
	public boolean setprofile (int user_num , String user_msg , String user_profile) {
		String sql = "update user set user_msg=? , user_profile=?  where user_num = "+user_num;
		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, user_msg);
			ps.setString(2, user_profile);
			ps.executeUpdate();
			return true;
		} 
		catch (Exception e) {
			System.out.println("프로필올리기 오류"+e);
		}
		return false;
	}

	// [11-8] 혜영 회원 번호에서 부서명을 가져오는 메소드
	public String getuser_department( int user_num ) { // 유저 번호를 가져와서
		String sql = "select user_department from user where user_num = " + user_num ;
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();
			
			if( rs.next() ) {
				String user_department = rs.getString(1); // 만약에 값이 있으면 변수에 담아서
				return user_department; // 보내기
			}
			
		} catch (Exception e) {
			System.out.println("유저 이름 가져오기 오류 : " + e);
		}
		return null;
	}
	
	// [11-8] 혜영 회원 번호에서 부서명을 가져오는 메소드
	public String getuser_profile( int user_num ) { // 유저 번호를 가져와서
		String sql = "select user_profile from user where user_num = " + user_num ;
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();
			
			if( rs.next() ) {
				String user_profile = rs.getString(1); // 만약에 값이 있으면 변수에 담아서
				return user_profile; // 보내기
			}
			
		} catch (Exception e) {
			System.out.println("유저 이름 가져오기 오류 : " + e);
		}
		return null;
	}
	
	
	
	
	
}


	









