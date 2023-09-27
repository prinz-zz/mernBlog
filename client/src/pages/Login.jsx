

export default function Login() {
    return(
        <div className={'auth'}>
        <h1>Login</h1>
        <form className={"register"}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type='submit'>Login</button>
        </form>
      </div>
    )
}