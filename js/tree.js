var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: "",
}

// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
})

addLayer("cn", {
    name: "skill",
    nodeStyle: {
        "outline": "2px solid white",
        "border-radius": "0%",
        "outline-color": "#FFFFFF",
        "width": "200px",
        "height": "200px",
        "background-image": "url('resources/-inf.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    position: 0,
    startData() {return {
        unlocked: true,
        points: MegotaNum(0) // useless
    }},
    color: "#FFFFFF",
    resource: "skill",
    type: "none",
    row: 0,
	
    upgrades: {
        11: {
			fullDisplay(){
				// img: overlay; h1-h8: text
				return `
				<div style="position:relative; overflow:hidden;">
					<img src="resources/-inf.png" style="width: 100%; height: 100%; display: block; opacity: 0.7">
					
					<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
						<h1>The First Difficulty [PRIMORDIAL]</h1><br>
						<h2>Start gaining skill at a rate of 0.0001/s</h2>
					<div>
				<div>
				`
			},
            style: {
				"width": "250px",
				"height": "250px",
				"background-color": "#000000",
				"outline": "2px solid white",
				"color": "#FFFFFF",
				"border-radius": "0%",
            },
			// free
        },
		21: {
			fullDisplay(){
				return `
				<div style="position:relative; overflow:hidden;">
					<img src="resources/-inf.png" style="width: 100%; height: 100%; display: block; opacity: 0.7">
					
					<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
						<h1>The Lower Gap [PRIMORDIAL]</h1><br>
						<h2>x2 Skill gain.</h2><br>
						<h3>Cost: 0.001 Skill</h3>
					<div>
				<div>
				`
			},
            style: {
				"width": "175px",
				"height": "175px",
				"background-color": "#000000",
				"outline": "2px solid #06D417",
				"color": "#06D417",
				"border-radius": "0%",
            },
			unlocked() {return hasUpgrade("cn", 11)},
			
			canAfford(){return player.points.gte(0.001)},
			pay(){player.points = player.points.minus(0.001)}
        },
		31: {
			fullDisplay(){
				return `
				<h2>Negativity</h2><br>
				<h3>x1.5 Skill gain.</h3><br>
				<h4>Cost: 0.0025 Skill</h4>
				`
			},
            style: {
				"background-color": "#000000",
				"outline": "2px solid #92248F",
				"color": "#92248F",
				"border-radius": "0%",
            },
            currencyLocation() {return player.points},
			unlocked() {return hasUpgrade("cn", 21)},
			
			canAfford(){return player.points.gte(0.0025)},
			pay(){player.points = player.points.minus(0.0025)}
        },
    },
	infoboxes: {
		lore: {
			title: "Lore (WIP)",
			body() {return "too lazy 😴😴"}
		}
	},
	tabFormat: [
		["infobox", "lore"],
		"blank",
		"upgrades"
	],
	
    layerShown() {return true},
    tooltip() {return "???"},
})

/*
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "-1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
	points: MegotaNum(0),
    }},
    color: "#4BDC13",
    requires: MegotaNum(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = MegotaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return MegotaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
currencyLocation() {return player[this.layer].buyables},
*/

addLayer("tree-tab", {
    tabFormat: [
	["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]
    ],
    previousTab: "",
    leftTab: true,
})