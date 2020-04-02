/* Copyright © 2019-2020, Imesh Chamara. All rights reserved. */
"use strict";
import '../icApp/icApp.js'
import {IAR} from '../icApp/icApp-render.js'
import './style.css'
import './Themes.css'
import {pram} from '../icApp/common.js'

const ColorThemes = [ 'red', 'pink', 'purple', 'indeigo', 'blue', 'teal', 'yellow', 'orange', 'green', 'black' ]

var saveData = _ => {
	var a = []
	while((_ = Array.from(_)).length > 0) a.push(_.splice(0, 20))
	localStorage[`IC-Tech.ILog-v2-DataSize`] = a.length
	a.forEach((_, a) => localStorage[`IC-Tech.ILog-v2-Data:${a}`]=JSON.stringify(_))
}
var Data = (_=> {
	_ = JSON.parse(localStorage['IC-Tech.ILog-Data'] || "[]")
	if(_.length > 0) {
		saveData(_)
		localStorage.removeItem('IC-Tech.ILog-Data')
	}
	else {
		var a, b = 0
		if((a = parseInt(localStorage[`IC-Tech.ILog-v2-DataSize`] || "0")) <= 0) return []
		_ = []
		while(++b <= a) _.push(...JSON.parse(localStorage[`IC-Tech.ILog-v2-Data:${b - 1}`] || "[]"))
	}
	return _
})()

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js')


window.ic = window.ic || []
window.ic.pageLoad = Date.now()
document.addEventListener('DOMContentLoaded', () => {
let icApp = ic.icApp
var _root_ = new icApp.e('#root')
_root_.chr()
_root_.cla('red')
//Theme.set('red')

class ILog extends IAR {
	constructor() {
		super()
		this.data = {
			ui: 0,
			menu: false
		}
		this.hisUp = ((...a) => [
			a[0] = (this.his = Object.assign(this.his, a[0])),
			document.title = a[1] || 'ILog by IC-Tech',
			a[2] = a[2] || location.pathname + location.search,
			Object.keys(this.his).some(_ => this.his[_] != a[0][_]) || this.hisUp.sk ? 0 : history[a[3] ? 'replaceState' : 'pushState'](...a)]).bind(this)
	}
	didMount() {
		console.log('icApp-render:speed - ' + (window.ic.speed = Date.now() - window.ic.pageLoad))
		new icApp.e('.menu').ae('click', e => {
			if(e.target.classList.contains('menu')) history.go(-1) //this.setMenu()
		})
		const state = (_ => {
			var a = _.state
			this.hisUp.sk = 1
			if(a.i == 0) this.EditCall(-1)
			else if(a.i == 1) Data.some((_, b) => _.timeC == a.d ? (this.EditCall(Data.length - ++b) ? 1 : 1) : 0)
			else if(this.his.i >= 0) this.EditActon(0)
			this.setMenu(a.m)
			this.hisUp.sk = 0
			console.log(a)
		}).bind(this)
		var a = pram('ac'), b
		a = a ? ([['new', 'edit'].some((_, b) => a.toLowerCase() == _ ? ((a = b) ? 1 : 1) : !!0), a])[1] : -1
		if(a == 1 && !((b = pram('it')) && !isNaN(b = parseInt(b)))) {
			a = -1
			b = !!0
		}
		history.replaceState(this.his = {m:0, i: a, d: b}, document.title, location.pathname + location.search)
		state({state: {i: a, d: b}})
		window.addEventListener('popstate', state)
	}
  EditCall(i, e) {
  	this.data.scroll = document.scrollingElement.scrollTop
  	i = i >= 0 ? (Data.length - ++i) : -1
  	const c = a => a.toString().length == 1 ? '0' + a : a.toString()
  	const a = a => `${a.getFullYear()}-${c(a.getMonth() + 1)}-${c(a.getDate())}`
  	const b = a => `${c(a.getHours())}:${c(a.getMinutes())}`
  	var d = Date.now()
  	this.update({
  		e: [
  			i == -1 ? (_ => ([
  				_ = JSON.parse(localStorage['IC-Tech.ILog-v2-NameHelp'] || `{"d":0, "c":0}`),
  				_.c = _.c > 0 ? ((d - _.d > (1000 * 60 * 60 * 24) || new Date(_.c).getDate() != new Date().getDate()) ? 1 : _.c + 1) : 1,
  				_.d = d,
  				`${c(new Date().getDate())} ${(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])[new Date().getMonth()]}, ${c(_.c)}`])[3])() : Data[i].name,
  			a(new Date(i == -1 ? d : Data[i].timeC)),
  			b(new Date(i == -1 ? d : Data[i].timeC)),
  			a(new Date(i == -1 ? d : Data[i].timeM)),
  			b(new Date(i == -1 ? d : Data[i].timeM)),
  			i == -1 ? '' : Data[i].content,
  			i
  		],
  		ui: 1
  	})
		//document.querySelector('#i7').style.display = i == -1 ? 'none' : 'inline-block'
		this.hisUp({m: 0, i: i == -1 ? 0 : 1, d: i == -1 ? d : Data[i].timeC}, i == -1 ? 'Create New • ILog' : 'Edit • ILog', location.pathname + `?ac=${i == -1 ? 'new' : `edit&it=${i == -1 ? d : Data[i].timeC}`}`, i == -1 && this.his.m == 1)
  	this.i = i
  	this.setMenu()
  }
  setMenu(v) {
  	var a = new icApp.e('html')
  	a.st.overflow = v ? 'hidden' : 'unset'
  	a.st.height = v ? '100%' : 'auto'
  	a = new icApp.e('body')
  	a.st.overflow = v ? 'hidden' : 'unset'
  	a.st.height = v ? '100%' : 'auto'
  	new icApp.e('.menu').st.display = v ? 'block' : 'none'
  	if(v) this.hisUp({m: !!v})
  	this.update({menu: !!v})
  }
  EditActon(v) {
	  this.hisUp({i: -1, m: 0})
  	this.update({ui: 0})
  }
  Export() {
		var a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ILog: {Data: Data}})], {type: 'application/json'}))
		a.download = 'IC-Tech.ILog.' + (_ => ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'].map(b=>(a => ((a = (_['get' + a]() + (a == 'Month' ? 1 : 0)).toString()).length == 1 ? ('0'+a) : a))(b)).join(''))(new Date()) + '.json'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
  }
	didUpdate() {}
	willUpdate() {}
	render() {
		return (
			{t: 'div', at: [['id', 'ILog']], cl: 'ICApp', ch: [
				{t: 'div', cl: 'top-c1'},
				{t: 'div', cl: 'top', ch: [
					{t: 'div', cl: 'c2', e: [['onclick', _ => this.setMenu(1)]], ch: [
						{t: 'div'},
						{t: 'div'},
						{t: 'div'}
					]},
					{t: 'div', cl: 'c1', ch: [
						{t: 'span', txt: 'ILog'}
					]}
				]},
				{t: 'div', cl: 'Entry', s: {display: this.data.ui == 0 ? 'flex' : 'none'}, ch: Data.slice().reverse().map((_, a) => ({
					t: 'div', e: [['onclick',  _ => this.EditCall(a, 0)]], ch: [
						{t: 'span', cl: 'c1', txt: _.name},
						{t: 'span', cl: 'c2', txt: _.content},
						{t: 'span', cl: 'c3', txt: new Date(_.timeM).toString()},
					]}
				))},
				{t: 'div', cl: 'Editor', s: {display: this.data.ui == 1 ? 'flex' : 'none'}, ch: [
					{t: 'div', ch: [
						{t: 'label', nodes: 1, ch: [
							`Name:`,
							{t: 'input', e:[['type', 'text'], ['value', this.data.e ? this.data.e[0] : '']]}
						]}
					]},
					...(_ => ([['Create', 'Last Update'].forEach((a, _a) => ['Date', 'Time'].forEach((b, _b) => _.push({t: 'div', cl: 'c1', ch: [
						{t: 'label', nodes: 1, ch: [
							`${a} ${b}:`,
							{t: 'input', e:[['type', _b ? 'time' : 'date'], ['value', this.data.e ? this.data.e[_.length + 1] : '']]}
						]}
					]}))), _])[1])([]),
					{t: 'textarea', e:[['value', this.data.e ? this.data.e[5] : '']]},
					{t: 'div', ch: [
						{t: 'button', cl: 'ic-btn0', txt: 'CANCEL', e: [['onclick', _ => this.EditActon(0)]]},
						{t: 'button', cl: 'ic-btn0', txt: 'DELETE', e: [['onclick', _ => this.EditActon(2)]]},
						{t: 'button', cl: ['ic-btn0', 'c1'], txt: 'SAVE', e: [['onclick', _ => this.EditActon(1)]]}
					]}
				]},
				{t: 'div', cl: 'Settings', s: {display: this.data.ui == 2 ? 'flex' : 'none'}, ch: [
					{t: 'span', txt: 'Theme'},
					{t: 'div', cl: 'c1', ch: (_ => {
						for (var a=0;a<10;a++) _.push({t: 'div', cl: 'c' + a, d: {a: a, ty: 'co'} /*onClick={e => this.SettingsAction(2, e)}*/})
						return _
					})([])},
					{t: 'div', ch: [
						{t: 'button', txt: 'CLOSE', cl: ['ic-btn0', 'c1'] /*onClick={() => this.SettingsAction(0)}*/}
					]}
				]},
				{t: 'div', cl: 'menu', ch: [
					{t: 'div', cl: 'c1', ch: [
						{t: 'div', ch: [
							{t: 'button', txt: 'Create New', e: [['onclick', _ => this.EditCall()]]},
							{t: 'input', at: [['type', 'file'], ['id', 'i8']] /*onChange={this.Import}*/},
							{t: 'label', txt: 'Import', at: [['for', 'i8']]},
							{t: 'button', txt: 'Export' , e: [['onclick', this.Export]]},
							{t: 'a', txt: 'Contact', at:[['href', 'https://ic-tech.now.sh/']]},
							{t: 'button', txt: 'Settings' /*onClick={e => this.SettingsAction(1)}*/},
							{t: 'button', txt: 'Exit' , e: [['onclick', window.close]]}
						]}
					]}
				]}
			]}
		)
	}
}
new ILog().mount(_root_.v)
})