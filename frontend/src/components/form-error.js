import React from "react";

class FormError extends React.Component {

    render() {
        return (
            <div className="form-error">
                {this.props.error}
            </div>
        )
    }
}

export {
    FormError
}