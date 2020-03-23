import React, { Component } from 'react'

class Pokemon extends Component {

    render() {
        const { id, name, img } = this.props;
        return (
            <div>
                <img src={img} className="" alt="Pokemon" />
                <span>id: #{id}</span>
                <span> {name} </span>
            </div>
        );
    }

}

export default Pokemon;