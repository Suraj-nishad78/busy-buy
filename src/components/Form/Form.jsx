import "./Form.css";

const Form = ({
  signText,
  handleSignEmail,
  handleSignPassword,
  handleSignin,
  signupText,
  handleSignupName,
  handleSignupEmail,
  handleSignupPassword,
  handleSignup,
}) => {
  return (
    <>
      <form className="form-sign">
        {handleSignupName && (
          <input
            type="text"
            placeholder="Enter Name"
            value={signupText.name}
            onChange={handleSignupName}
            required
            auto-complete="off"
          />
        )}
        {handleSignEmail && (
          <input
            type="email"
            placeholder="Enter Email"
            value={signText.email}
            onChange={handleSignEmail}
            required
            auto-complete="off"
          />
        )}
        {handleSignupEmail && (
          <input
            type="email"
            placeholder="Enter Email"
            value={signupText.email}
            onChange={handleSignupEmail}
            required
            auto-complete="off"
          />
        )}
        {handleSignPassword && (
          <input
            type="password"
            placeholder="Enter Password"
            value={signText.password}
            onChange={handleSignPassword}
            required
          />
        )}
        {handleSignupPassword && (
          <input
            type="password"
            placeholder="Enter Password"
            value={signupText.password}
            onChange={handleSignupPassword}
            required
          />
        )}
        {handleSignin && <button onClick={handleSignin}>Sign In</button>}
        {handleSignup && <button onClick={handleSignup}>Sign Up</button>}
      </form>
    </>
  );
};

export default Form;
