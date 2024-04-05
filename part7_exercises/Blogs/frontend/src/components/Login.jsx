import PropTypes from 'prop-types';
import title from '../images/title.jpeg';
const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div className="container h-100">
            <div className="row justify-content-sm-center h-100">
                <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <div className="text-center my-5 rounded-circle">
                        <img
                            className="rounded-circle"
                            src={title}
                            alt="logo"
                            width="100"
                        />
                    </div>
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <h1 className="fs-4 card-title fw-bold mb-4 d-flex justify-content-center">
                                Log in
                            </h1>

                            <form
                                onSubmit={handleSubmit}
                                className="needs-validation"
                            >
                                <div className="mb-3">
                                    <label className="mb-2 text-muted">
                                        Username
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        required
                                        autoFocus
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                    <div className="invalid-feedback">
                                        Name is required
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2 text-muted">
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="email"
                                        value={password}
                                        required
                                        onChange={handlePasswordChange}
                                    />
                                </div>

                                <div className="align-items-center d-flex">
                                    <button
                                        type="submit"
                                        className="btn btn-primary ms-auto"
                                        id="login"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};
export default LoginForm;
