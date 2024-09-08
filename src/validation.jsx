export default
    function validate(props) {
    const nameRegex = /^[A-Za-z\s'-]+$/
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^(\+\d{1,3})?(\d{10,})$/
    const passwordRegex = /^[^\W_](?=.*[^\W_]).{5,}$/

    if (!emailRegex.test(props.email)) {
        showError({ email: "Invalid email, please enter a  valid email" })
        return false
    }

    if (!passwordRegex.test(props.password)) {
        showError({ password: props.password.length > 5 ? "invalid password, please enter a valid password" : "Password must be at least 6 characters long" })
        return false
    }

    if (props.from === "SIGNUP") {

        if (!nameRegex.test(props.name) || props.name.trim() === "") {
            showError({ name: "Invalid name, please enter a  valid name" })
            return false
        }

        if (!phoneRegex.test(props.phone) || Number(props.phone )< 1) {
            showError({ phone: "invalid phone, please enter a valid phone number" })
            return false
        }

    }


    function showError(err) {
        props.setError(prevError => ({ ...prevError, ...err }));
    }

    return true
}