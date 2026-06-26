// ************ Themes ************
const themes = {
	1: "aqua"
};
const theme_names = {
	aqua: "Default"
};
function tg() {
	if (player.maxClass == 2) return "#002700"
	if (player.maxClass == 1) return "#262b10"
	if (player.maxClass == 0) return "#172524"
	if (player.maxClass == -1) return "#000000"
}
function changeTheme() {
	document.body.style.setProperty('--background', tg());
	document.body.style.setProperty('--background_tooltip', tg());
}
function getThemeName() {
	return player.theme ? theme_names[player.theme] : "Default";
}
function switchTheme() {
	if (player.theme === null)
		player.theme = themes[1];
	else {
		player.theme = themes[Object.keys(themes)[player.theme] + 1];
		if (!player.theme)
			player.theme = null;
	}
	changeTheme();
	resizeCanvas();
}