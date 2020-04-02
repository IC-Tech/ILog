/* Copyright © 2019-2020, Imesh Chamara. All rights reserved. */
"use strict";
import '../icApp/icApp.js'
import {IAR} from '../icApp/icApp-render.js'
import './style.css'
import './Themes.css'
//import {} '../icApp/common.js'

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
			ui: 0
		}
	}
	didMount() {
		console.log('icApp-render:speed - ' + (Date.now() - window.ic.pageLoad))
	}
	didUpdate() {}
	willUpdate() {}
	render() {
		return (
			{t: 'div', at: [['id', 'ILog']], cl: 'ICApp', ch: [
				{t: 'div', cl: 'top-c1'},
				{t: 'div', cl: 'top', ch: [
					{t: 'div', cl: 'c2' /*onClick={() => this.SetMent(true)}*/, ch: [
						{t: 'div'},
						{t: 'div'},
						{t: 'div'}
					]},
					{t: 'div', cl: 'c1', ch: [
						{t: 'span', txt: 'ILog'}
					]}
				]},
				{t: 'div', cl: 'Entry', s: {display: this.data.ui == 0 ? 'flex' : 'none'}},
				/*<div className='Entry' style={{display: this.state.UI == 0 ? 'flex' : 'none'}}>{
					Data.slice().reverse().map((v, i) => <div key={'k0' + i + v.timeC} onClick={(e) => this.EditCall(i, e)}><span className='c1'>{v.name}</span><span className='c2'>{v.content}</span><span className='c3'>{new Date(v.timeM).toString()}</span></div>)
				}</div>*/
				{t: 'div', cl: 'Editor', s: {display: this.data.ui == 1 ? 'flex' : 'none'}, ch: [
					{t: 'div', ch: [
						{t: 'label', nodes: 1, ch: [
							`Name:`,
							{t: 'input', at:[['type', 'text'], ['id', 1]]}
						]}
					]},
					...(_ => ([['Create', 'Last Update'].forEach((a, _a) => ['Date', 'Time'].forEach((b, _b) => _.push({t: 'div', cl: 'c1', ch: [
						{t: 'label', nodes: 1, ch: [
							`${a} ${b}:`,
							{t: 'input', at:[['type', _b ? 'time' : 'date'], ['id', _.length + 2]]}
						]}
					]}))), _])[1])([]),
					{t: 'textarea', at:[['id', 'i6']]},
					{t: 'div', ch: [
						{t: 'button', cl: 'ic-btn0', txt: 'CANCEL' /*onClick={() => this.EditActon(0)}*/},
						{t: 'button', cl: 'ic-btn0', txt: 'DELETE' /*onClick={() => this.EditActon(2)}*/},
						{t: 'button', cl: ['ic-btn0', 'c1'], txt: 'SAVE' /*onClick={() => this.EditActon(1)}*/}
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
							{t: 'button', txt: 'Create New' /*onClick={e => this.EditCall(-1, e)}*/},
							{t: 'input', at: [['type', 'file'], ['id', 'i8']] /*onChange={this.Import}*/},
							{t: 'label', txt: 'Import', at: [['for', 'i8']]},
							{t: 'button', txt: 'Export' /*onClick={e => this.Export()}*/},
							{t: 'a', txt: 'Contact', at:[['href', 'https://ic-tech.now.sh/']]},
							{t: 'button', txt: 'Settings' /*onClick={e => this.SettingsAction(1)}*/},
							{t: 'button', txt: 'Exit' /*onClick={window.close}*/}
						]}
					]}
				]}
			]}
		)
	}
}
new ILog().mount(_root_.v)
})
