import React, { Component } from 'react'
import { Root } from "native-base";


import "./Config/StatusBarConfig";

import Routes from './routes'

export default class index extends Component {



    render() {
        return (
            <Root>
                <Routes/>                
            </Root>
        )
    }
}