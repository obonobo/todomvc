import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import Todo from "../src/components/Todo";

const googleClientId =
  "336107596492-q2ci0rdsbq8j001up87vbmlv7ma02mca.apps.googleusercontent.com";

export default function TodoMVC(): JSX.Element {
  const onSuccess = (res: GoogleLoginResponse) => {
    console.log(`[Login Sucess] result: ${JSON.stringify(res)}`);
    console.log(`Current User: ${res.profileObj}`);
  };

  const onFailure = (res: GoogleLoginResponse) => {
    console.log(`[Login Failed] result: ${JSON.stringify(res)}`);
  };

  return (
    <div>
      <Todo />
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn
        style={{
          position: "fixed",
          top: "100vh",
          zIndex: 2000,
          marginTop: "1000px !important",
        }}
      />
    </div>
  );
}
