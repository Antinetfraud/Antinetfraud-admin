function enabledBtn(id: string, color: string) {
	let btn = document.getElementById(id);
	let classVal = document.getElementById(id).getAttribute("class");
	classVal = classVal.replace("disabled", "waves-effect waves-light btn " + color);
	btn.setAttribute("class", classVal);
}

function disabledBtn(id: string) {
	let btn = document.getElementById(id);
	btn.setAttribute("class", "btn disabled");
}

export { enabledBtn, disabledBtn }