import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const formData = new FormData()
			formData.append('username', username)
			formData.append('email', email)
			formData.append('password', password)
			formData.append('profile_pic', image)
			formData.append('first_name', firstName)
			formData.append('last_name', lastName)

			setImageLoading(true);
			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div>
			<div className="signin-upper-container"><img src='https://opentables.s3.us-west-1.amazonaws.com/onetableicon.png' /><h2>Open Tables</h2></div>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="form-elements-container">
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						<div>Email</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }}
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						<div>Username</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }}
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<label>
						<div>First Name</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }} style={{ width: "92%", height: "25px", padding: "10px" }}
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
					<label>
						<div>Last Name</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }}
							type="text"
							value={lastName}
							onChange={(e) => setlastName(e.target.value)}
							required
						/>
					</label>
					<label>
						<div>Profile Picture</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }}
							type="file"
							accept="image/*"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</label>
					<label>
						<div>Password</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label>
						<div>Confirm Password</div>
						<input
							style={{ width: "92%", height: "25px", padding: "10px" }}
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					<button type="submit">Sign Up</button>
					{(imageLoading) && <p>Loading...</p>}
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;