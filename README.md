# SPARCS-SSO-wrapper

Use SPARCS SSO to protect your service.

## Client-side flow

e.g.) Authentication이 필요한 페이지(e.g.) `secret.example.com`), 로그인 서버의 주소(`auth.example.com`, 이하 Auth 서버)

1. Authentication이 필요한 페이지 접속(e.g.) `secret.example.com`)
2. 리버스 프록시 단에서 `auth.example.com/api/verify` 로 요청 보냄
   1. 유효한 세션이 존재하면 200 Status code 반환
      1. 리버스 프록시 단에서 클라이언트에게 `secret.example.com`로 프록시함.
   2. 그렇지 않은 경우 401 Status Code 반환
      1. `auth.example.com/?rd=${로그인 후 리다이렉트할 주소}`로 클라이언트를 리다이렉트 시킴.
      2. Auth 서버는 SPARCS SSO 로그인 페이지로 클라이언트를 리다이렉트 시킴.
      3. SPARCS SSO 로그인이 성공적이면 클라이언트를 로그인 후 리다이렉트할 주소로 리다이렉트 시키고, 그렇지 않은 경우 다시 `auth.example.com/?rd=${로그인 후 리다이렉트할 주소}` 페이지로 리다이렉트시킴.
