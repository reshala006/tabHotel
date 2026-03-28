import "./LoginBtn.css"

function LoginBtn({ handleClick }: { handleClick: () => void }) {
    return (
        <button className="loginBtn" onClick={handleClick}>
            login
        </button>
    )
}

export default LoginBtn
