/* Copyright © Imesh Chamara 2019 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './Themes.css'

class ILog extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.SetMent = this.SetMent.bind(this)
		this.backAction = null
	}
  componentDidMount() {
  	var a = () => {
			if(this.backAction != null) {
				this.backAction()
				return false
			}
		}
		document.addEventListener('backbutton', a)
		document.addEventListener('keydown', e => {
			if(e.key == 'Escape') a()
		})
		document.querySelector('.menu').addEventListener('click', e => {
			if(e.target.classList.contains('menu')) this.SetMent(0)
		})
  }
  SetMent(v) {
  	document.querySelector('html').style.overflow = v == true ? 'hidden' : 'unset'
  	document.querySelector('.menu').style.display = v == true ? 'block' : 'none'
  	this.backAction = v ? (() => this.SetMent(0)) : null
  }
	render() {
		return (
			<div id='ILog' className='ICApp'>
				<div className='top-c1'></div>
				<div className='top'>
					<div className='c2' onClick={() => this.SetMent(true)}><div></div><div></div><div></div></div>
					<div className='c1'>
						<span>ILog</span>
					</div>
				</div>
				<div className='Entry'>{(()=>{
					var r = []
					for(var i=0; i<30; i++)
						r[i] = <div key={'k' + i}><span className='c1'>Title {i + 1}</span><span className='c2'>Content {i + 1}</span><span className='c3'>{Date().toString()}</span></div>
					return r
				})()}</div>
				<div className='Editor'></div>
				<div className='menu'>
					<div className='c1'>
						<div>
							<button>Create New</button>
							<button>Import</button>
							<button>Export</button>
							<button onClick={window.close}>Exit</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

var e = document.getElementById('root')
e.classList.add('purple')
document.querySelector('[name=theme-color]').setAttribute('content', '#8e24aa')
document.querySelector('[name=msapplication-navbutton-color]').setAttribute('content', '#8e24aa')
document.querySelector('[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', '#8e24aa')
console.info('\n██╗ ██████╗      ████████╗███████╗ ██████╗██╗  ██╗\n██║██╔════╝      ╚══██╔══╝██╔════╝██╔════╝██║  ██║\n██║██║     █████╗   ██║   █████╗  ██║     ███████║\n██║██║     ╚════╝   ██║   ██╔══╝  ██║     ██╔══██║\n██║╚██████╗         ██║   ███████╗╚██████╗██║  ██║\n╚═╝ ╚═════╝         ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\n        IC-Tech; Imesh Chamara (C) 2019;          \n')
setTimeout(() => ReactDOM.render(<ILog />, e), 1000)
