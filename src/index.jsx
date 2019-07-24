/* Copyright © Imesh Chamara 2019 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './Themes.css'

var Data = [
	{
		name: 'Title 01',
		timeC: 1563895945931,
		timeM: 1563895970135,
		content: 'The Content 001.'
	},
	{
		name: 'Title 02',
		timeC: 1563895945931,
		timeM: 1563895970135,
		content: 'The Content 002.'
	}
]
/*Based on Project 201905271231 src/client/Dialog.js*/
const Dialog = {
	create: (id, title, content, buttons, call) => {
		if(isNaN(id)) for(id = 0; document.getElementById(`IC-Dialog-${id}`) != null && id < 1000; id++);
		var e = document.createElement('div')
		var e2 = document.createElement('span')
		e2.classList.add('c1')
		e2.innerText = title
		e.appendChild(e2)
		e2 = document.createElement('span')
		e2.innerText = content
		e.appendChild(e2)
		e2 = document.createElement('div')
		Array.from(buttons).forEach((b, i) => {
			var e3 = document.createElement('button')
			e3.innerText = b
			if(i == 0)
				e3.classList.add('c1')
			e3.addEventListener('click', () => call(id, i))
			e2.appendChild(e3)
		})
		e.appendChild(e2)
		e2 = document.createElement('div')
		e2.id = `IC-Dialog-${id}`
		e2.classList.add('dialog')
		e2.addEventListener('click', e => {
			if(e.target.id == `IC-Dialog-${id}`) call(id, 'cancel')
		})
		e2.appendChild(e)
		document.querySelector('.ICApp').appendChild(e2)
		return id
	},
	Visibility: (id, v) => {
		if(v == true) document.querySelector('#IC-Dialog-' + id).classList.add('show')
		else document.querySelector('#IC-Dialog-' + id).classList.remove('show')
	},
	remove: (id) => document.querySelector('#IC-Dialog-' + id).remove()
}

class ILog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			UI: 0
		}
		this.SetMent = this.SetMent.bind(this)
		this.EditCall = this.EditCall.bind(this)
		this.EditActon = this.EditActon.bind(this)
		this.backAction = null
		this.i = -1
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
  	document.querySelector('body').style.overflow = v == true ? 'hidden' : 'unset'
  	document.querySelector('body').style.height = v == true ? '100%' : 'auto'
  	document.querySelector('html').style.height = v == true ? '100%' : 'auto'
  	document.querySelector('.menu').style.display = v == true ? 'block' : 'none'
  	this.backAction = v ? (() => this.SetMent(0)) : null
  }
  EditCall(i, e) {
  	const c = a => a.toString().length == 1 ? '0' + a : a.toString()
  	const a = a => `${a.getFullYear()}-${c(a.getMonth() + 1)}-${c(a.getDate())}`
  	const b = a => `${c(a.getHours())}:${c(a.getMinutes())}`
		document.querySelector('#i1').value = i == -1 ? '' : Data[i].name
		document.querySelector('#i2').value = a(new Date(i == -1 ? Date.now() : Data[i].timeC))
		document.querySelector('#i3').value = b(new Date(i == -1 ? Date.now() : Data[i].timeC))
		document.querySelector('#i4').value = a(new Date(i == -1 ? Date.now() : Data[i].timeM))
		document.querySelector('#i5').value = b(new Date(i == -1 ? Date.now() : Data[i].timeM))
		document.querySelector('#i6').value = i == -1 ? '' : Data[i].content
  	this.setState({UI: 1})
  	this.SetMent(false)
  	this.i = i
  }
  EditActon(v) {
  	if(v == 1) {
  		v = {
	  		name: document.querySelector('#i1').value,
	  		timeC: Date.parse(document.querySelector('#i2').value + ' ' + document.querySelector('#i3').value),
	  		timeM: Date.parse(document.querySelector('#i4').value + ' ' + document.querySelector('#i5').value),
	  		content: document.querySelector('#i6').value
	  	}
	  	if(v.name == '') {
				Dialog.Visibility(Dialog.create(NaN, 'Save Entry', 'Please add a name for this entry.', ['OK'], (i, b) => Dialog.remove(i)), true)
				return
	  	}
	  	Data[this.i == -1 ? Data.length : this.i] = v
	  }
  	this.setState({UI: 0})
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
				<div className='Entry' style={{display: this.state.UI == 0 ? 'flex' : 'none'}}>{
					Data.map((v, i) => <div key={'k' + i + v.timeC} onClick={(e) => this.EditCall(i, e)}><span className='c1'>{v.name}</span><span className='c2'>{v.content}</span><span className='c3'>{new Date(v.timeM).toString()}</span></div>)
				}</div>
				<div className='Editor' style={{display: this.state.UI == 1 ? 'flex' : 'none'}}>
					<div className='c2'>
						<label>Name:<input id='i1' type='text'/></label>
					</div>
					<div className='c1'>
						<label>Create Date:<input id='i2' type='date'/></label>
					</div>
					<div className='c1'>
						<label>Create Time:<input id='i3' type='time'/></label>
					</div>
					<div className='c1'>
						<label>Last Update Date:<input id='i4' type='date'/></label>
					</div>
					<div className='c1'>
						<label>Last Update Time:<input id='i5' type='time'/></label>
					</div>
					<textarea id='i6'></textarea>
					<div>
						<button onClick={() => this.EditActon(0)}>CANCEL</button>
						<button onClick={() => this.EditActon(1)} className='c1'>SAVE</button>
					</div>
				</div>
				<div className='menu'>
					<div className='c1'>
						<div>
							<button onClick={e => this.EditCall(-1, e)}>Create New</button>
							<button onClick={e => Dialog.Visibility(Dialog.create(NaN, 'Error', 'Unable to start the action.', ['OK'], (i, b) => Dialog.remove(i)), true)}>Import</button>
							<button onClick={e => Dialog.Visibility(Dialog.create(NaN, 'Error', 'Unable to start the action.', ['OK'], (i, b) => Dialog.remove(i)), true)}>Export</button>
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
