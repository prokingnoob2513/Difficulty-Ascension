let modInfo = {
	name: "Difficulty Ascension",
	id: "ejtslop",
	author: "prokingnoob2513",
	pointsName: "Skill",
	discordName: "Inside Jokes Studios",
	discordLink: "https://discord.gg/eAzQPyXTPc",
	initialStartPoints: new ExpantaNum(0), // Used for hard resets and new players

	offlineLimit: 0,  // In hours
	allowSmall: true
}

// Set your version in num and name
let VERSION = {
	num: "2.5",
	name: "Pre-Release",
}

let changelog = `
	x.y: New class<br>
	0/x: Changes<br>
	<h1>Changelog</h1><br>
	<h3>v2.5: Pre-Release</h3><br>
	- Scroll down ;)

	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

	[prokingnoob2513]: Former Proking's Upgrade Tree developer here. Roblox made it so that I can't even develop games on roblox anymore... you know,
	that incremental game is designed to reach ExpantaNum limit. It started with only me working on PrUT, but as the community grew, it expanded into
	a medium-sized dev team. Roblox updates are slowly getting worse, to the point where you need to complete evaluation process to make games public.
	I can't just keep up with this anymore. I had to discontinue PrUT from now on. (more soon)<br>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("cn", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return ExpantaNum(0)

	let gain = player.baseSkillGain

	if (hasUpgrade("cn", 21)) {gain = gain.mul(2)}
	if (hasUpgrade("cn", 31)) {gain = gain.mul(1.5)}
	if (hasUpgrade("cn", 32)) {gain = gain.mul(1.75)}
	if (hasUpgrade("cn", 33)) {gain = gain.mul(2.5)}
	if (hasUpgrade("cn", 34)) {gain = gain.mul(upgradeEffect("cn", 34))}
	if (hasUpgrade("cn", 41)) {gain = gain.mul(3)}
	if (hasUpgrade("cn", 44)) {gain = gain.mul(1.25)}
	if (hasUpgrade("cn", 51)) {gain = gain.mul(upgradeEffect("cn", 51))}
	if (hasUpgrade("cn", 65)) {gain = gain.mul(4)}

	if (hasUpgrade("c0", 14)) {gain = gain.mul(1.8)}
	if (hasUpgrade("c0", 51)) {gain = gain.div(4.5)}
	if (hasUpgrade("c0", 53)) {gain = gain.mul(3)}
	if (hasUpgrade("c0", 61)) {gain = gain.mul(2)}
	
	if (hasUpgrade("c1", 21)) {gain = gain.mul(3)}
	if (hasUpgrade("c1", 43)) {gain = gain.mul(2.34)}
	if (hasUpgrade("c1", 62)) {gain = gain.mul(3)}
	
	if (hasUpgrade("c2", 12)) {gain = gain.mul(1.5)}

	gain = gain.mul(tmp.c0.effect)
	gain = gain.mul(tmp.c1.effect)
	gain = gain.mul(tmp.sl.effect[0])

	gain = gain.mul(buyableEffect("tw", 11))
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {return {
	baseSkillGain: ExpantaNum(0),

	// options stuff
	opt_preview_ordinals: false,
	opt_hide_bought_upg: false,
}}

// Display extra things at the top of the page
var displayThings = [
	'Offline progression disabled',
	'This is a pre-release, so join <a href="https://discord.gg/eAzQPyXTPc">the server</a> for feedback/criticism, and bugs.'
]

// Determines when the game "ends"
function isEndgame() {
	return false
}


// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}