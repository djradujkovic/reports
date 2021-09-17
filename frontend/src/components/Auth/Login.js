import "./Login.style.css";

const Login = () => {
  return (
    <div className="login">
      <form>
        <label>E-mail:</label>
        <input type="mail" required />
        <label>Lozinka:</label>
        <input type="password" required />
        <br />
        <p>Zaboravljena sifra?</p>
        <button>Register</button>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
