let modInfo = {
	name: "Difficulty Ascension",
	id: "ejtslop",
	author: "prokingnoob2513",
	pointsName: "skill",
	discordName: "Inside Jokes Studios",
	discordLink: "https://discord.gg/eAzQPyXTPc",
	initialStartPoints: new MegotaNum(1), // Used for hard resets and new players

	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- roblox sucks ngl`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new MegotaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("cn", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return MegotaNum(0)

	let gain = MegotaNum(1)
	
	if (hasUpgrade("cn", 11)) {gain = gain.mul(0.0001)}
	if (hasUpgrade("cn", 21)) {gain = gain.mul(2)}
	if (hasUpgrade("cn", 31)) {gain = gain.mul(1.5)}
	//console.log(player.points.toString())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	'Why not xd'
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