import PropTypes from 'prop-types'

const LoginForm = ({
  loginHandler,
  username,
  setUsername,
  password,
  setPassword
}) => (
  <form onSubmit={loginHandler}>
    <div>
          username
      <input
        type="text"
        value={username}
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
          password
      <input
        type="password"
        value={password}
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit" id="login-button">login</button>
  </form>
)

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm