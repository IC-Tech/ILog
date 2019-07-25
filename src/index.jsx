/* Copyright © Imesh Chamara 2019 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './Themes.css'
import _IC_Common from './IC.Common.js';
const IC_Common = _IC_Common.IC_Common;
const ColorThemes = [ 'red','pink','purple','indeigo','blue','teal','yellow','orange','green','black' ]

var Data = localStorage.getItem('IC-Tech.ILog-Data')
Data = Data != null && Data != undefined ? JSON.parse(Data) : []

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
			e3.classList.add('ic-btn0')
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

/*From Project 201905141045[DOM Ver.]*/
const getTimeCode = () => {
    var _d = Date.now()
    var d = new Date(_d)
    d.setMonth(d.getMonth() + 1)
    var v = (d.getFullYear().toString() + (d.getMonth() < 10 ? '0' : '') + d.getMonth().toString() + (d.getDate() < 10 ? '0' : '') + d.getDate().toString()),
    v1 = v + (d.getHours() < 10 ? '0' : '') + d.getHours().toString() + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes().toString()
    return {
        v0: v,
        v1: v1,
        v2: v1 + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds().toString() + (d.getMilliseconds() >= 100 ? '' : (d.getMilliseconds() >= 10 ? '0' : '00')) + d.getMilliseconds().toString(),
        v3: new Date(_d).toString()
    }
}

/*From Project 201905271231 src/client/MessageUI.js*/
const ICApp = {
	set ColorTheme(color) {
		var _root = document.querySelector('#root')
		_root.classList.remove(...ColorThemes)
		var v = IC_Common.arrayReciver(color, ColorThemes)
		if(v == -1) v = 0;
		_root.classList.add(ColorThemes[v])
		var col = getComputedStyle(document.querySelector('#root')).getPropertyValue('--ic-c-i4').replace(' ', '').replace(' ', '').replace(' ', '')
		var i = 0, a = '', b = '#'
		a = parseInt(col.substring(0, i = col.indexOf(','))).toString(16)
		if(a.length < 1) a = '0' + a
		b = '#' + a
		col = col.substring(i + 1, col.length)
		a = parseInt(col.substring(0, i = col.indexOf(','))).toString(16)
		if(a.length < 1) a = '0' + a
		b += a
		col = col.substring(i + 1, col.length)
		a = parseInt(col).toString(16)
		if(a.length < 1) a = '0' + a
		b += a
		document.querySelector('[name=theme-color]').setAttribute('content', b)
		document.querySelector('[name=msapplication-navbutton-color]').setAttribute('content', b)
		document.querySelector('[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', b)
	}
}

class ILog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			UI: 0,
			latestUpdate: 0
		}
		this.SetMent = this.SetMent.bind(this)
		this.EditCall = this.EditCall.bind(this)
		this.EditActon = this.EditActon.bind(this)
		this.Export = this.Export.bind(this)
		this.Import = this.Import.bind(this)
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
			if(e.target.classList.contains('menu')) this.SetMent()
		})
  }
  SetMent(v) {
  	document.querySelector('html').style.overflow = v ? 'hidden' : 'unset'
  	document.querySelector('body').style.overflow = v ? 'hidden' : 'unset'
  	document.querySelector('body').style.height = v ? '100%' : 'auto'
  	document.querySelector('html').style.height = v ? '100%' : 'auto'
  	document.querySelector('.menu').style.display = v ? 'block' : 'none'
  	this.backAction = v ? (() => this.SetMent()) : null
  }
  EditCall(i, e) {
  	const c = a => a.toString().length == 1 ? '0' + a : a.toString()
  	const a = a => `${a.getFullYear()}-${c(a.getMonth() + 1)}-${c(a.getDate())}`
  	const b = a => `${c(a.getHours())}:${c(a.getMinutes())}`
		document.querySelector('#i1').value = i == -1 ? getTimeCode().v1 : Data[i].name
		document.querySelector('#i2').value = a(new Date(i == -1 ? Date.now() : Data[i].timeC))
		document.querySelector('#i3').value = b(new Date(i == -1 ? Date.now() : Data[i].timeC))
		document.querySelector('#i4').value = a(new Date(i == -1 ? Date.now() : Data[i].timeM))
		document.querySelector('#i5').value = b(new Date(i == -1 ? Date.now() : Data[i].timeM))
		document.querySelector('#i6').value = i == -1 ? '' : Data[i].content
		document.querySelector('#i7').style.display = i == -1 ? 'none' : 'inline-block'
  	this.setState({UI: 1})
  	this.SetMent()
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
	  	localStorage.setItem('IC-Tech.ILog-Data', JSON.stringify(Data))
	  }
	  else if(v == 2) {
	  	Dialog.Visibility(Dialog.create(NaN, 'Delete Entry', 'Are you sure you want to delete this entry. Remember by any chance this action can not be undone.', ['CANCEL', 'OK'], (i, b) => {
	  		if(b == 1) {
			  	Data.splice(this.i, 1)
			  	localStorage.setItem('IC-Tech.ILog-Data', JSON.stringify(Data))
	  		}
	  		this.setState({UI: 0})
			  Dialog.remove(i)
	  	}), true)
	  	return
	  }
  	this.setState({UI: 0})
  }
  Export() {
		var a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ILog: {Data: Data}})], {type: 'application/json'}))
		a.download = "IC-Tech.ILog." + getTimeCode().v1 + '.json'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
  }
  Import(e) {
  	var a = e.target.files[0]
  	if(!a) return
	  var b = new FileReader()
	  b.onload = e => {
	  	try {
		  	var c = JSON.parse(e.target.result)
		  	if(!c || !c.ILog || !c.ILog.Data) return
		  	Data = c.ILog.Data
	  		localStorage.setItem('IC-Tech.ILog-Data', JSON.stringify(Data))
		  }
		  catch (e) {
		    Dialog.Visibility(Dialog.create(NaN, 'Error', 'The file could not be read.', ['OK'], (i, b) => Dialog.remove(i)), true)
		  	console.error(e)
		  }
			this.setState({latestUpdate: Date.now()})
			this.SetMent()
		}
	  b.onerror = e => {
		  if(evt.target.error.name == "NotReadableError") {
		    Dialog.Visibility(Dialog.create(NaN, 'Error', 'The file could not be read.', ['OK'], (i, b) => Dialog.remove(i)), true)
		  }
		  else console.error(e)
		}
	  b.readAsText(a)
  }
  SettingsAction(a, b) {
  	if(a == 1 || a == 0) {
  		this.setState({UI: a == 0 ? 0 : 2})
  		this.SetMent()
  	}
  	else if(a == 2) {
  		var c = ColorThemes[parseInt(b.target.dataset.a)]
  		localStorage.setItem('IC-Tech.ILog-Theme', c)
  		ICApp.ColorTheme = c
  	}
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
					Data.map((v, i) => <div key={'k0' + i + v.timeC} onClick={(e) => this.EditCall(i, e)}><span className='c1'>{v.name}</span><span className='c2'>{v.content}</span><span className='c3'>{new Date(v.timeM).toString()}</span></div>)
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
						<button className='ic-btn0' onClick={() => this.EditActon(0)}>CANCEL</button>
						<button className='ic-btn0' onClick={() => this.EditActon(2)} id='i7' >DELETE</button>
						<button className='ic-btn0 c1' onClick={() => this.EditActon(1)}>SAVE</button>
					</div>
				</div>
				<div className='Settings' style={{display: this.state.UI == 2 ? 'flex' : 'none'}}>
					<span>Theme</span>
					<div className='c1'>{
						(()=>{
							var b = []
							for(var a=0; a<10; a++)
								b[a] = <div key={'k1' + a} data-a={a} className={'c' + a} onClick={e => this.SettingsAction(2, e)}></div>
							return b
						})()
					}</div>
					<div>
						<button onClick={() => this.SettingsAction(0)} className='ic-btn0 c1'>CLOSE</button>
					</div>
				</div>
				<div className='menu'>
					<div className='c1'>
						<div>
							<button onClick={e => this.EditCall(-1, e)}>Create New</button>
							<input type='file' id='i8' onChange={this.Import}/>
							<label htmlFor='i8'>Import</label>
							<button onClick={e => this.Export()}>Export</button>
							<a href='http://ic-tech.dx.am/html/About.html'>Contact</a>
							<button onClick={e => this.SettingsAction(1)}>Settings</button>
							<button onClick={window.close}>Exit</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

var a = localStorage.getItem('IC-Tech.ILog-Theme')
ICApp.ColorTheme = a == null ? 'red' : a
console.info('\n██╗ ██████╗      ████████╗███████╗ ██████╗██╗  ██╗\n██║██╔════╝      ╚══██╔══╝██╔════╝██╔════╝██║  ██║\n██║██║     █████╗   ██║   █████╗  ██║     ███████║\n██║██║     ╚════╝   ██║   ██╔══╝  ██║     ██╔══██║\n██║╚██████╗         ██║   ███████╗╚██████╗██║  ██║\n╚═╝ ╚═════╝         ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\n        IC-Tech; Imesh Chamara (C) 2019;          \n')
setTimeout(() => ReactDOM.render(<ILog />, document.getElementById('root')), 1000)
