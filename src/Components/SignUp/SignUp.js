import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/UserContext';
import './SignUp.css';

const SignUp = () => {
  //* alternative way to show error message(using state)
  // const [error, setError] = useState(null);

  const { createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm.value;

    if (password.length < 6) {
      toast.error(`Password should be at least 6 characters`);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(`Password didn't match`);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('User created successfully');
      })
      .catch((error) => {
        console.error('error', error);
      });

    form.reset();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email"> Email</label>
          <input type="email" name="email" placeholder="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="confirm-password"
            required
          />
        </div>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p>
        <small>
          Already have an account?
          <Link to="/login" className="create-new-account">
            Login
          </Link>
        </small>
      </p>
    </div>
  );
};

export default SignUp;
