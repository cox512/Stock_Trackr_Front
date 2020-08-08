import React, { Component } from 'react'

export default class ShowStock extends Component {
    state = {
        current_price: 0,
        
    }

    render() {
        return (
            <div>
                <h2>{this.props.ticker}</h2>
                <h4>Current Price:</h4>
            </div>
        )
    }
}
