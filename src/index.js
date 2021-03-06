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

const setColor = c => {
	var b = new icApp.e('#root')
	ColorThemes.forEach(a => a == c ? (b.clc(c) ? 0 : b.cla(c)) : b.clr(a))
	var a = a => a.length == 1 ? '0' + a : a
	a = '#' + getComputedStyle(b.v).getPropertyValue('--ic-c-i4').replace(/ /g, '').split(',').map(b => a(parseInt(b).toString(16))).join('')
	new icApp.e('[name=theme-color]').sa('content', a)
	new icApp.e('[name=msapplication-navbutton-color]').sa('content', a)
	new icApp.e('[name=apple-mobile-web-app-status-bar-style]').sa('content', a)
}
var _root_ = new icApp.e('#root')
_root_.chr()
setColor((a => ColorThemes.indexOf(a) >= 0 ? a : 'red')(localStorage['IC-Tech.ILog-Theme'] || ''))

class ILog extends IAR {
	constructor() {
		super()
		this.data = {
			ui: 0,
			menu: false,
			esize: 20
		}
		this.dialog = {
			remove: (_ => [this.dialogs.splice(_, 1), this.update()]).bind(this),
			create: (_ => [this.dialogs.push(_), this.update()]).bind(this),
		}
		this.dialogs = []
		this.dc0 = (_ => new icApp.e(_.target).clc('dialog') ? this.dc(_) : 0).bind(this)
		this.dc = (_ => {
			var a = (_ = new icApp.e(_.target)).clc('dialog') ? _ : 0
			for(var b=0,c=_.p; !a && b < 5; b++)
				if(c.clc('dialog')) {
					a = c
					break
				}
				else c = c.p
			a = parseInt(a.d.in)
			if(_.clc('dialog')) {
				if(this.dialogs[a].f0) return this.dialogs[a].f0(a)
				_ = 'CANCEL'
				this.dialogs.forEach(a => a.b.forEach(a => a == 'CANCEL' || a == 'CLOSE' ? _ = a : 0))
			}
			else _ = _.txt
			this.dialogs[a].f(this.dialogs[a].b.indexOf(_), a, _)
		}).bind(this)
		this.EditActon = this.EditActon.bind(this)
		this.Import = this.Import.bind(this)
		this.load = this.load.bind(this)
		this.hisUp = ((...a) => [
			a[0] = (this.his = Object.assign(this.his, a[0])),
			document.title = a[1] || 'ILog by IC-Tech',
			a[2] = a[2] || location.pathname + location.search,
			Object.keys(this.his).some(_ => this.his[_] != a[0][_]) || this.hisUp.sk ? 0 : history[a[3] ? 'replaceState' : 'pushState'](...a)
		]).bind(this)
		this.his2 = ((...a) => {
			if(a[0].home) {
				a = 0
				if(this.his.i != -1) a++
				if(this.his.m) a++
				this.his2.go(a * -1)
			}
			else {
				if(this.his.i != -1 && this.his.m) {
					this.skipstate = 1
					this.his2.go(-1)
					a[3] = 1
				}
				this.hisUp(...a)
			}
		}).bind(this)
		this.his2.go = (a => history.go(a)).bind(this)
		this.his2.c = (_ => history.length - this.his2.sl).bind(this.his2)
		this.his2.sl = history.length
	}
	didMount() {
		console.log('icApp-render:speed - ' + (window.ic.speed = Date.now() - window.ic.pageLoad))
		new icApp.e('.menu').ae('click', e => {
			if(e.target.classList.contains('menu')) this.his2.go(-1)
		})
		this.skipstate = 0
		const state = (_ => {
			var a = _.state
			document.title = (['ILog by IC-Tech', 'Create New • ILog', 'Edit • ILog', 'Settings • ILog'])[a.i + 1]
			if(this.skipstate) {
				this.his = a
				return this.skipstate = 0
			}
			this.hisUp.sk = 1
			this.setMenu(a.m)
			if(a.i == 0) this.EditCall(-1)
			else if(a.i == 1) Data.some((_, b) => _.timeC == a.d ? (this.EditCall(Data.length - ++b) ? 1 : 1) : 0)
			else if(a.i == 2) this.update({ui: 2})
			else if(a.i == -1) this.update({ui: 0})
			this.his = a
			this.hisUp.sk = 0
		}).bind(this)
		var a = pram('ac'), b
		a = a ? ([['new', 'edit'].some((_, b) => a.toLowerCase() == _ ? ((a = b) ? 1 : 1) : !!0), a])[1] : -1
		if(a == 1 && !((b = pram('it')) && !isNaN(b = parseInt(b)))) {
			a = -1
			b = !!0
		}
		var c = location.pathname + location.search
		this.his2(this.his = {m:0, i: -1, d: 0}, document.title, location.pathname, 1)
		if(a != -1) this.his2({m:0, i: a, d: b}, document.title, c)
		state({state: {i: a, d: b}})
		window.addEventListener('popstate', state)
	}
	EditCall(i, e) {
		var d
		i = i >= 0 ? (Data.length - ++i) : -1
		this.scroll = {e: d = document.scrollingElement, v: i == -1 ? 0 : d.scrollTop}
		const c = a => a.toString().length == 1 ? '0' + a : a.toString()
		const a = a => `${a.getFullYear()}-${c(a.getMonth() + 1)}-${c(a.getDate())}`
		const b = a => `${c(a.getHours())}:${c(a.getMinutes())}`
		d = Date.now()
		this.update({
			e: [
				i == -1 ? (_ => {
					_ = `${c(new Date().getDate())} ${(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])[new Date().getMonth()]}, `
					var a = 1
					while(Data.some(b => (_ + c(a)) == b.name)) a++
					return _ + c(a)
				})() : Data[i].name,
				a(new Date(i == -1 ? d : Data[i].timeC)),
				b(new Date(i == -1 ? d : Data[i].timeC)),
				a(new Date(i == -1 ? d : Data[i].timeM)),
				b(new Date(i == -1 ? d : Data[i].timeM)),
				i == -1 ? '' : Data[i].content,
				i
			],
			ui: 1
		})
		this.his2({m: 0, i: i == -1 ? 0 : 1, d: i == -1 ? d : Data[i].timeC}, i == -1 ? 'Create New • ILog' : 'Edit • ILog', location.pathname + `?ac=${i == -1 ? 'new' : `edit&it=${i == -1 ? d : Data[i].timeC}`}`, i == -1 && this.his.m == 1)
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
		if(v) this.his2({m: !!v})
		this.update({menu: !!v})
	}
	EditActon(v) {
		if(v == 1) {
			v = {
				name: new icApp.e('#i0').val,
				timeC: Date.parse(new icApp.e('#i1').val + ' ' + new icApp.e('#i2').val),
				timeM: Date.now(),
				content: new icApp.e('#i5').val
			}
			if(v.name == '') {
				this.dialog.create({
					t: 'Save Entry',
					c: 'Please add a name for this entry.',
					b: ['OK'],
					db: 0,
					f: _ => this.dialog.remove(_[0])
				})
				return
			}
			Data[this.i = this.i == -1 ? Data.length : this.i] = v
			saveData(Data)
			this.his2({m: 0, i: 1, d: Data[this.i].timeC}, 'Edit • ILog', location.pathname + `?ac=edit&it=${Data[this.i].timeC}`, 1)
		}
		else if(v == 2) {
			this.dialog.create({
				t: 'Delete Entry',
				c: 'Are you sure you want to delete this entry. Remember by any chance this action can not be undone.',
				b: ['OK', 'CANCEL'],
				db: 1,
				f: (a,b) => {
					if(a == 0) {
			 	 		Data.splice(this.i, 1)
						saveData(Data)
						this.his2({home:1})
					}
					this.data.ui = 0
					this.dialog.remove(b)
				}
			})
			return
		}
		this.his2({home:1})
	}
	Export() {
		var a = document.createElement('a')
		a.href = URL.createObjectURL(new Blob([JSON.stringify({ILog: {Data: Data}})], {type: 'application/json'}))
		a.download = 'IC-Tech.ILog.' + (_ => ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'].map(b=>(a => ((a = (_['get' + a]() + (a == 'Month' ? 1 : 0)).toString()).length == 1 ? ('0'+a) : a))(b)).join(''))(new Date()) + '.json'
		a.style.display = 'none'
		document.body.appendChild(a)
		a.click()
	}
	Import(_) {
		if(!(_ = _.target).files[0]) return
		var b = new FileReader()
		b.onload = e => {
			try {
				var c = JSON.parse(e.target.result || "")
				if(!c || !(c = c.ILog) || !(c = c.Data)) return
				c.forEach(c => !Data.some(b => !['timeC', 'timeM', 'name', 'content'].some(a => c[a] != b[a])) ? Data.push(c) : 0)
				saveData(Data)
				this.update()
			}
			catch (e) {
				this.dialog.create({
					t: 'Error',
					c: 'The file couldn\'t import.',
					b: ['OK'],
					f: (a, b) => this.dialog.remove(b)
				})
				console.error(e)
			}
			this.setMenu()
		}
		b.onerror = e => {
			this.dialog.create({
				t: 'Error',
				c: e.name == 'NotReadableError' ? 'The file could not be read.' : 'The file didn\'t import.',
			 	b: ['OK'],
			 	f: (a, b) => this.dialog.remove(b)
			})
			if(e.name != 'NotReadableError') console.error(e)
		}
		b.readAsText(_.files[0])
	}
	sett(a, b) {
  	if(a == 1 || a == 0) {
  		this.update({ui: a == 0 ? 0 : 2})
  		this.setMenu()
			this.his2(a == 0 ? {home: 1} : {i: 2, m: 0}, 'Settings • ILog', location.pathname, 1)
  	}
  	else if(a == 2) {
  		var c = ColorThemes[parseInt(b.target.dataset.a)]
  		localStorage.setItem('IC-Tech.ILog-Theme', c)
  		setColor(c)
  	}
	}
	didUpdate() {
		if(this.data.ui == 0 && this.scroll) {
			this.scroll.e.scrollTop = this.scroll.v
			this.scroll == !!0
		}
	}
	load(a) {
		this.skipload = a.timeStamp
		this.scroll = {e: a = document.scrollingElement, v: a.scrollTop}
		this.update({esize: this.data.esize + 20})
	}
	willUpdate() {}
	render() {
		return (
			{t: 'div', at: [['id', 'ILog']], cl: 'ICApp', ch: [
				{t: 'div', cl: 'top-c1'},
				{t: 'header', cl: 'top', ch: [
					{t: 'div', cl: 'c2', e: [['onclick', _ => this.setMenu(1)]], ch: [
						{t: 'div'},
						{t: 'div'},
						{t: 'div'}
					]},
					{t: 'div', cl: 'c1', ch: [
						{t: 'span', txt: 'ILog'}
					]}
				]},
				{t: 'main', cl: 'Entry', s: {display: this.data.ui == 0 ? 'flex' : 'none'}, ch: [
					...Data.slice().reverse().slice(0, this.data.esize).map((_, a) => (
						{t: 'div', cl: 'c1', e: [['onclick', _ => _.timeStamp == this.skipload ? 0 : this.EditCall(a, 0)]], ch: [
							{t: 'span', cl: 'c1', txt: _.name},
							{t: 'span', cl: 'c2', txt: _.content},
							{t: 'span', cl: 'c3', txt: new Date(_.timeM).toString()},
						]}
					)),
				...([{t: 'div', cl: this.data.esize < Data.length ? ['c2'] : ['c2', 's1'], ch: [
					{t: 'span', e: [['onclick', this.load]], txt: 'Load More'}
				]}])
				]},
				{t: 'div', cl: 'Editor', s: {display: this.data.ui == 1 ? 'flex' : 'none'}, ch: [
					{t: 'div', ch: [
						{t: 'label', nodes: 1, ch: [
							`Name:`,
							{t: 'input', e:[['type', 'text'], ['value', this.data.e ? this.data.e[0] : ''], ['id', 'i0']]}
						]}
					]},
					...(_ => ([['Create', 'Last Update'].forEach((a, _a) => ['Date', 'Time'].forEach((b, _b) => _.push({t: 'div', cl: 'c1', ch: [
						{t: 'label', nodes: 1, ch: [
							`${a} ${b}:`,
							{t: 'input', e:[['type', _b ? 'time' : 'date'], ['value', this.data.e ? this.data.e[_.length + 1] : ''], ['id', 'i' + (_.length + 1)]]}
						]}
					]}))), _])[1])([]),
					{t: 'textarea', e:[['value', this.data.e ? this.data.e[5] : ''], ['id', 'i5']]},
					{t: 'div', ch: [
						{t: 'button', cl: 'ic-btn0', txt: 'CANCEL', e: [['onclick', _ => this.EditActon(0)]]},
						{t: 'button', cl: 'ic-btn0', s: {display: this.i == -1 ? 'none': 'inline-block'}, txt: 'DELETE', e: [['onclick', _ => this.EditActon(2)]]},
						{t: 'button', cl: ['ic-btn0', 'c1'], txt: 'SAVE', e: [['onclick', _ => this.EditActon(1)]]}
					]}
				]},
				{t: 'div', cl: 'Settings', s: {display: this.data.ui == 2 ? 'flex' : 'none'}, ch: [
					{t: 'span', txt: 'Theme'},
					{t: 'div', cl: 'c1', ch: (_ => {
						for (var a=0;a<10;a++) _.push({t: 'div', cl: 'c' + a, d: {a: a, ty: 'co'}, e: [['onclick', _ => this.sett(2, _)]]})
						return _
					})([])},
					{t: 'div', ch: [
						{t: 'button', txt: 'CLOSE', cl: ['ic-btn0', 'c1'], e: [['onclick', _ => this.sett(0)]]}
					]}
				]},
				{t: 'div', cl: 'menu', ch: [
					{t: 'div', cl: 'c1', ch: [
						{t: 'div', ch: [
							{t: 'button', txt: 'Create New', e: [['onclick', _ => this.EditCall()]]},
							{t: 'input', at: [['type', 'file'], ['id', 'i8']], e: [['onchange', this.Import]]},
							{t: 'label', txt: 'Import', at: [['for', 'i8']]},
							{t: 'button', txt: 'Export' , e: [['onclick', this.Export]]},
							{t: 'a', txt: 'Contact', at:[['href', 'https://ic-tech.now.sh/']]},
							{t: 'button', txt: 'Settings', e: [['onclick', _ => this.sett(1)]]},
							{t: 'button', txt: 'Exit' , e: [['onclick', window.close]]}
						]}
					]}
				]},
				...this.dialogs.map((_, a) => ({t: 'div', cl: ['dialog', 'show'], d: {ty: 'dia', in: a}, e: [['onclick', this.dc0]], ch: [
					{t: 'div', ch: [
						{t: 'span', cl: 'c1', txt: _.t},
						{t: 'span', txt: _.c},
						{t: 'div', ch: _.b.map((a,b) => ({t: 'button', cl: _.db == b || !_.db && b == 0 ? ['ic-btn0', 'c1'] : 'ic-btn0', txt: a, e: [['onclick', this.dc]]})).reverse()}
					]}
				]}))
			]}
		)
	}
}
new ILog().mount(_root_.v)
})
