import "./Form.css";

const Form = ({
  // 🟢 Signin Props
  signText,               // Holds signin email & password values
  handleSignEmail,        // Handles change in signin email
  handleSignPassword,     // Handles change in signin password
  handleSignin,           // Handles signin form submission

  // 🔵 Signup Props
  signupText,             // Holds signup name, email & password values
  handleSignupName,       // Handles change in signup name
  handleSignupEmail,      // Handles change in signup email
  handleSignupPassword,   // Handles change in signup password
  handleSignup,           // Handles signup form submission
}) => {
  return (
    <>
      <form className="form-sign">
      {/* Name input (for Signup only) */}
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
        {/* Email input for Signin */}
        {handleSignEmail && (
          <input
            type="email"
            placeholder="Enter Email"
            value={signText.email}
            onChange={handleSignEmail}
            required
          />
        )}
        {/* Email input for Signup */}
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
        {/* Password input for Signin */}
        {handleSignPassword && (
          <input
            type="password"
            placeholder="Enter Password"
            value={signText.password}
            onChange={handleSignPassword}
            required
          />
        )}
        {/* Password input for Signup */}
        {handleSignupPassword && (
          <input
            type="password"
            placeholder="Enter Password"
            value={signupText.password}
            onChange={handleSignupPassword}
            required
          />
        )}
        {/* Submit Button: Either Sign In or Sign Up */}
        {handleSignin && <button onClick={handleSignin}>Sign In</button>}
        {handleSignup && <button onClick={handleSignup}>Sign Up</button>}
      </form>
    </>
  );
};

export default Form;
