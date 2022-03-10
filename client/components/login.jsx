import React from 'react';

function Login(props) {
  const { buttonText, formMethod, formAction } = props;

  return (
    <div>
      <form method={formMethod} action={formAction}>
        <label htmlFor="username">
          Username:
          <input id="username" type="text" name="username" required placeholder="Please enter username..." />
        </label>
        <label htmlFor="password">
          Password:
          <input id="password" type="password" name="password" required placeholder="Please enter password.." />
        </label>
        <div>
          <input type="submit" value={buttonText} />
        </div>
      </form>
    </div>
  );
}

export default Login;
