import React from 'react';

function Login(props) {
  // eslint-disable-next-line object-curly-newline
  const {
    buttonText,
    formMethod,
    formAction,
    handleSubmit,
    promptText,
    linkText,
    toggleForm,
  } = props;

  return (
    <div>
      <form method={formMethod} action={formAction}>
        {/* DON'T NEED forMethod and formAction anymore */}
        <label htmlFor="username">
          Username:
          <input id="username" type="text" name="username" required placeholder="Please enter username..." />
        </label>
        <label htmlFor="password">
          Password:
          <input id="password" type="password" name="password" required placeholder="Please enter password.." />
        </label>
        <div>
          <input type="submit" value={buttonText} onClick={handleSubmit} />
        </div>
        <p>
          {promptText}
          <span className="clickable" onClick={toggleForm}>{linkText}</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
