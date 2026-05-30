
import { Icon } from "@iconify/react"

function Restemail(){
    return (
        <div>
            <div className="resetEmailWrp">
                <div className="restEmIcon">

                </div>
                <h3>Forgot Password?</h3>
                <p>No worries, type your new password below.</p>
                <div className="restPassInput">
                    <p>New Password</p>
                    <input type="password" ref={password} placeholder="Enter Password" />
                    <div className="restPassInputBtnWrap">
                        <button>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restemail