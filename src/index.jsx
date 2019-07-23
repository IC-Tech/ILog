/* Copyright © Imesh Chamara 2019 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

class ILog extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
  componentDidMount() {
  }
	render() {
		return (
			<div id='ILog' className='ICApp'>
				<div className='top-c1'></div>
				<div className='top'>
					<div className='c2'><div></div><div></div><div></div></div>
					<div className='c1'>
						<span>ILog</span>
					</div>
				</div>
				<div className='Entry'></div>
			</div>
		)
	}
}

var e = document.getElementById('root')
e.classList.add('red')
document.querySelector('[name=theme-color]').setAttribute('content', '#ef5350')
document.querySelector('[name=msapplication-navbutton-color]').setAttribute('content', '#ef5350')
document.querySelector('[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', '#ef5350')
console.info('\n██╗ ██████╗      ████████╗███████╗ ██████╗██╗  ██╗\n██║██╔════╝      ╚══██╔══╝██╔════╝██╔════╝██║  ██║\n██║██║     █████╗   ██║   █████╗  ██║     ███████║\n██║██║     ╚════╝   ██║   ██╔══╝  ██║     ██╔══██║\n██║╚██████╗         ██║   ███████╗╚██████╗██║  ██║\n╚═╝ ╚═════╝         ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\n        IC-Tech; Imesh Chamara (C) 2019;          \n')
setTimeout(() => ReactDOM.render(<ILog />, e), 1000)
