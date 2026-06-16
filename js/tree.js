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

function displayUpgBig(img, title, desc, cost, upgId){
	// img: overlay; h1-h8: text
	let isBoughtText
	if (hasUpgrade(upgId[0], upgId[1])) {
		if (upgradeEffect(upgId[0], upgId[1])) {
			isBoughtText = `<h3 style="color: #00ff00">Current: x${format(upgradeEffect(upgId[0], upgId[1]))}</h3>`
		} else {
			isBoughtText = `<h3 style="color: #00ff00">Bought!</h3>`
		}
	} else {
		isBoughtText = `<h3 style="color: white">${cost}</h3>`
	}
	
	return `
		<div style="position:relative; overflow:hidden;">
			<img src="resources/${img}.png" style="width: 100%; height: 100%; display: block; opacity: 0.6">
			
			<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
				<h1>${title}</h1><br>
				<h2>${desc}</h2><br>
				${isBoughtText}
			<div>
		<div>
		`
}
function displayUpgSmall(img, title, desc, cost, upgId){
	let isBoughtText
	if (hasUpgrade(upgId[0], upgId[1])) {
		if (upgradeEffect(upgId[0], upgId[1])) {
			if (upgId[0] == "c1" && upgId[1] == 51) 
				isBoughtText = `<h4 style="color: #00ff00">Current: -${format(upgradeEffect(upgId[0], upgId[1]))}s</h4>`
			else isBoughtText = `<h4 style="color: #00ff00">Current: x${format(upgradeEffect(upgId[0], upgId[1]))}</h4>`
		} else isBoughtText = `<h4 style="color: #00ff00">Bought!</h4>`
	} else {
		isBoughtText = `<h4 style="color: white">${cost}</h4>`
	}
	
	return `
		<div style="position:relative; overflow:hidden;">
			<img src="resources/${img}.png" style="width: 100%; height: 100%; display: block; opacity: 0.6">
			
			<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
				<h3>${title}</h2><br>
				<h4>${desc}</h3><br>
				${isBoughtText}
			<div>
		<div>
		`
}
function cssTemplate1(bg, col) {
	return {
		"background-color": bg,
		"outline": "2px solid " + col,
		"color": col,
		"border-radius": "0%",
		"text-shadow": "0.5px 0.5px 2.5px #000000",
	}
}
function jay(x, n = 1) {
	if (n == 1) return ExpantaNum.arrow(10, x, 10)
	else return jay(x, n - 1)
}
function unjay(x, n = 1) {
	let arr = x.array[x.array.length-1]
	if (x.layer == 0) return ExpantaNum(arr[0] + Math.log2(arr[1]) / 15.9545898)
	if (n == 1) {
		x.layer -= 1
		return x
	}
	else return unjay(x, n - 1)
}
function appendIf(bool, a) {
	if (bool) return a
	return ""
}
function randNum(min, max) {
	max += 1
    return Math.floor( Math.random() * (max - min) + min )
}

function c1_durr(i) {
	let cd = 15
	if (hasUpgrade("c1", 73)) cd -= 1
	if (hasUpgrade("c1", 51)) cd -= upgradeEffect("c1", 51).toNumber()
	if (hasUpgrade("c1", 42)) cd -= 0.5
	if (hasUpgrade("c1", 24)) cd -= 1
	if (hasUpgrade("c1", 22)) cd -= 1.5
	if (hasUpgrade("c1", 21)) cd -= 2
	
	if (hasUpgrade("c2", 13)) cd -= 2
	player.c1.keyboardCD[i] = cd
}
function c1_key(i) {
	// thanks agent from vscode :heart_eyes:
	if (i == " ") {
		if (player.c1.keyboardCD[0] <= 0) {
			player.c1.points = player.c1.points.add(1 * player.c1.mult)
			c1_durr(0)
		}
	} else if (i == "w") {
		if (player.c1.keyboardCD[1] <= 0) {
			if (Math.random() <= player.c1.keyboardAttributes[1] / 100) player.c1.points = player.c1.points.add(2 * player.c1.mult)
			else player.c1.points = player.c1.points.add(1 * player.c1.mult)

			c1_durr(1)
		}
	} else if (i == "a") {
		if (player.c1.keyboardCD[2] <= 0) {
			player.c1.points = player.c1.points.add(1 * player.c1.mult)
			for (let j = 0; j < player.c1.keyboardCD.length; j++) player.c1.keyboardCD[j] -= player.c1.keyboardAttributes[2]

			c1_durr(2)
		}
	} else if (i == "s") {
		if (player.c1.keyboardCD[3] <= 0) {
			if (Math.random() <= player.c1.keyboardAttributes[3] / 100) player.c1.points = player.c1.points.add(3 * player.c1.mult)
			else player.c1.points = player.c1.points.add(1 * player.c1.mult)

			c1_durr(3)
		}
	} else if (i == "d") {
		if (player.c1.keyboardCD[4] <= 0) {
			player.c1.points = player.c1.points.add(2 * player.c1.mult)
			for (let j = 0; j < player.c1.keyboardCD.length; j++) player.c1.keyboardCD[j] += player.c1.keyboardAttributes[4]

			c1_durr(4)
		}
	}
}
function pl_grid(rows, x = 0, y = 0, offx = 0, offy = 0){
	return Number(`${(rows+1)-Math.floor(y+offy+1)}${x+offx+1 < 10 ?"0":""}${x+offx+1}`)
}
function pl_gen(coords, sizex, sizey) {
	let r = []
	for (let x = 0; x < sizex; x++) {
		for (let y = 0; y < sizey; y++) {
			r.push(coords + x + y*100)
		}
	}
	return r
}
function pl_regen() {
	player.pl.blocks = []
				
	let mode = Math.random()
	if (mode < 0.5) {
		for (let i = 1; i <= 23; i++) {
			player.pl.blocks = [...player.pl.blocks, ...pl_gen(
				(1+i) * 100 + randNum(1, 40),
				randNum(4, 15), 1
			)]
		}
	} else if (mode > 0.5) {
		for (let i = 0; i <= 5; i++) {
			for (let j = 0; j <= 5; j++) {
				player.pl.blocks = [...player.pl.blocks, ...pl_gen(
					(i*4+1) * 100 + (1+j*10),
					randNum(1, 9), randNum(1, 3)
				)]
			}
		}
	}

	player.pl.x = 0
	player.pl.y = 0
}

const lerp = (start, end, t) => start * (1 - t) + end * t

addLayer("cn", {
    name: "Skill",
    resource: "Skill",
    nodeStyle: {
        "outline": "2px solid #FFFFFF",
        "border-radius": "0%",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#000000",
        "background-image": "url('resources/-inf.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    row: 0,
    position: 0,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0) // useless
    }},
    color: "#ffffff",
    type: "none",
	
    upgrades: {
        11: {
			fullDisplay(){
				return displayUpgBig("-inf", "The First Difficulty [PRIMORDIAL]", "Start gaining skill at a rate of 0.0001/s", "", ["cn", 11])
			},
            style: {
				"width": "250px",
				"height": "250px",
				...cssTemplate1("#000000", "#FFFFFF")
            },
			// free
        },
		12: {
			fullDisplay(){
				return displayUpgBig("sob", "Winning", "vert", "Cost: K9.007e15 Skill", ["cn", 12])
			},
            style: {
				"width": "250px",
				"height": "250px",
				...cssTemplate1("#00b7ff", "#40c9ff")
            },
			unlocked() {return false}
			// free
        },
		21: {
			fullDisplay(){
				return displayUpgBig("-inf2", "The Lower Gap [PRIMORDIAL]", "x2 Skill gain.", "Cost: 0.0005 Skill", ["cn", 21])
			},
            style: {
				"width": "225px",
				"height": "225px",
				...cssTemplate1("#000000", "#06D417")
            },
			unlocked() {return hasUpgrade("cn", 11)},
			
			canAfford(){return player.points.gte(0.0005)},
			pay(){player.points = player.points.minus(0.0005)}
        },
		31: {
			fullDisplay(){
				return displayUpgSmall("-250", "Negativity", "x1.5 Skill gain.", "Cost: 0.0015 Skill", ["cn", 31])
			},
            style: {
				...cssTemplate1("#000000", "#92248F")
            },
			unlocked() {return hasUpgrade("cn", 21)},
			
			canAfford(){return player.points.gte(0.0015)},
			pay(){player.points = player.points.minus(0.0015)}
        },
		32: {
			fullDisplay(){
				return displayUpgSmall("-225", "Unimpossible", "x1.75 Skill gain.", "Cost: 0.0025 Skill", ["cn", 32])
			},
            style: {
				...cssTemplate1("#000000", "#C000FF")
            },
			unlocked() {return hasUpgrade("cn", 31)},
			
			canAfford(){return player.points.gte(0.0025)},
			pay(){player.points = player.points.minus(0.0025)}
        },
		33: {
			fullDisplay(){
				return displayUpgSmall("-200", "Friendliness", "x2.5 Skill gain.", "Cost: 0.005 Skill", ["cn", 33])
			},
            style: {
				...cssTemplate1("#FFFFFF", "#00FF00")
            },
			unlocked() {return hasUpgrade("cn", 32)},
			
			canAfford(){return player.points.gte(0.005)},
			pay(){player.points = player.points.minus(0.005)}
        },
		34: {
			fullDisplay(){
				return displayUpgSmall("-175", "True Ease", "Boost Skill gain based on itself.", "Cost: 0.0125 Skill", ["cn", 34])
			},
            style: {
				...cssTemplate1("#FFFFFF", "#FF0000")
            },
			unlocked() {return hasUpgrade("cn", 33)},
			effect(){
				// ln(skill+10)
				pow = hasUpgrade("cn", 61) ? 1.25 : 1
				return player.points.add(10).ln().pow(pow)
			},
			
			canAfford(){return player.points.gte(0.0125)},
			pay(){player.points = player.points.minus(0.0125)}
        },
		41: {
			fullDisplay(){
				return displayUpgSmall("-150", "A", "x3 Skill gain.", "Cost: 0.04 Skill", ["cn", 41])
			},
            style: {
				...cssTemplate1("#FF0000", "#FFFF00")
            },
			unlocked() {return hasUpgrade("cn", 34)},
			
			canAfford(){return player.points.gte(0.04)},
			pay(){player.points = player.points.minus(0.04)}
        },
		42: {
			fullDisplay(){
				return displayUpgSmall("-140", "Ifinite-Long", "+0.0001 base Skill gain.", "Cost: 0.12 Skill", ["cn", 42])
			},
            style: {
				...cssTemplate1("#ff0000", "#ffffff")
            },
			unlocked() {return hasUpgrade("cn", 41)},
			
			canAfford(){return player.points.gte(0.12)},
			pay(){player.points = player.points.minus(0.12)}
        },
		43: {
			fullDisplay(){
				return displayUpgSmall("-130", "Disco-Ifinite-Easy", "+0.0002 base Skill gain.", "Cost: 0.2 Skill", ["cn", 43])
			},
            style: {
				...cssTemplate1("#d80000", "#FFFFFF")
            },
			unlocked() {return hasUpgrade("cn", 42)},
			
			canAfford(){return player.points.gte(0.2)},
			pay(){player.points = player.points.minus(0.2)}
        },
		44: {
			fullDisplay(){
				return displayUpgSmall("-125", "Felix the ДА", "x1.25 Skill gain.", "Cost: 0.5 Skill", ["cn", 44])
			},
            style: {
				...cssTemplate1("#00ff00", "#000000")
            },
			unlocked() {return hasUpgrade("cn", 43)},
			
			canAfford(){return player.points.gte(0.5)},
			pay(){player.points = player.points.minus(0.5)}
        },
		51: {
			fullDisplay(){
				return displayUpgBig("-100", "Exist", "Big boost incoming! Each difficulty gives x1.125 Skill gain.", "Cost: 1 Skill", ["cn", 51])
			},
            style: {
				"width": "150px",
				"height": "150px",
				...cssTemplate1("#ffffff", "#ff2727")
            },
			unlocked() {return hasUpgrade("cn", 44)},
			effect(){return ExpantaNum.pow(1.125,
				player.cn.upgrades.length + player.c0.upgrades.length + player.c1.upgrades.length + player.c2.upgrades.length
			)},
			
			canAfford(){return player.points.gte(1)},
			pay(){player.points = player.points.minus(1)}
        },
		61: {
			fullDisplay(){
				return displayUpgSmall("-80", "Disco", "True Ease's boost is improved.", "Cost: 3 Skill", ["cn", 61])
			},
            style: {
				...cssTemplate1("#ffffff", "#ff4c4c")
            },
			unlocked() {return hasUpgrade("cn", 51)},
			
			canAfford(){return player.points.gte(3)},
			pay(){player.points = player.points.minus(3)}
        },
		62: {
			fullDisplay(){
				return displayUpgSmall("-70", "Relax", "+0.0003 base Skill gain.", "Cost: 6 Skill", ["cn", 62])
			},
            style: {
				...cssTemplate1("#ffffff", "#000000")
            },
			unlocked() {return hasUpgrade("cn", 61)},
			
			canAfford(){return player.points.gte(6)},
			pay(){player.points = player.points.minus(6)}
        },
		63: {
			fullDisplay(){
				return displayUpgSmall("-60", "Skip", "Be careful buying this! x4 current Skill.", "Requires: 14 Skill", ["cn", 63])
			},
            style: {
				...cssTemplate1("#FFAC65", "#000000")
            },
			unlocked() {return hasUpgrade("cn", 62)},
			
			canAfford(){return player.points.gte(14)},
			pay(){player.points = player.points.mul(4)}
        },
		64: {
			fullDisplay(){
				return displayUpgSmall("-50", "Restful", "+0.0008 base Skill gain.", "Cost: 50 Skill", ["cn", 64])
			},
            style: {
				...cssTemplate1("#044300", "#ffffff")
            },
			unlocked() {return hasUpgrade("cn", 62)},
			
			canAfford(){return player.points.gte(50)},
			pay(){player.points = player.points.sub(50)}
        },
		65: {
			fullDisplay(){
				return displayUpgSmall("-40", "Ifinity", "x4 Skill gain.", "Cost: 110 Skill", ["cn", 65])
			},
            style: {
				...cssTemplate1("#661096", "#af1dfd")
            },
			unlocked() {return hasUpgrade("cn", 64)},
			
			canAfford(){return player.points.gte(110)},
			pay(){player.points = player.points.sub(110)}
        },
		71: {
			fullDisplay(){
				return displayUpgBig("-31", "Instant Win", "+0.002 base Skill gain, and ascend to next class!", "Cost: 500 Skill", ["cn", 71])
			},
            style: {
				"width": "175px",
				"height": "175px",
				...cssTemplate1("#0000ff", "#ffffff")
            },
			unlocked() {return hasUpgrade("cn", 65)},
			
			canAfford(){return player.points.gte(500)},
			pay(){player.points = player.points.sub(500)}
        },
    },
	infoboxes: {
		lore: {
			title: "Lore (WIP)",
			body() {return "might make it soon"}
		},
		info: {
			title: "Class Negative: Unlosable",
			body() {
				return `
				Placeholder quote<br><br>
				Skill is the main currency, used for ascening difficulties. It is passively generated every second.<br>
				Formula: [Base gain] * [Multipliers]<br>
				Base gain: ${player.baseSkillGain}<br><br>

				DISCLAIMER: This difficulty may be modified due to not having enough gameplay ideas.
				`
			},
			unlocked(){return hasUpgrade("cn", 11)}
		},
	},
	
    layerShown() {return true},
    tooltip() {return "Class -1"},
})
addLayer("c0", {
    name: "Time",
    resource: "of Time",
    nodeStyle: {
        "outline": "2px solid #FAC2FF",
        "border-radius": "0%",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#F470FE",
        "background-image": "url('resources/-30.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    row: 0,
    position: 1,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0),

		ms_boost_fill: 0,
		ms_boost_cap: 3,
		hardcap: 900
	}},
    color: "#9ffff7",
    type: "none",
	
    upgrades: {
        11: {
			fullDisplay(){
				return displayUpgSmall("-30", "Millisecondless", "Add a button that lets you boost time.", "Cost: 850 Skill", ["c0", 11])
			},
            style: {
				...cssTemplate1("#F470FE", "#f8a9ff")
            },
			unlocked() {return hasUpgrade("cn", 71)},
			
			canAfford(){return player.points.gte(850)},
			pay(){player.points = player.points.minus(850)}
        },
		12: {
			fullDisplay(){
				return displayUpgSmall("-29p5", "Astronomical", "x1.75 Time gain.", "Cost: 0.5s of Time", ["c0", 12])
			},
            style: {
				...cssTemplate1("#5207ff", "#6f31ff")
            },
			unlocked() {return hasUpgrade("c0", 11)},
			
			canAfford(){return player.c0.points.gte(0.5)},
			pay(){player.c0.points = player.c0.points.minus(0.5)}
        },
		13: {
			fullDisplay(){
				return displayUpgSmall("-29", "Win", "x2.65 Time gain.", "Cost: 1,500 Skill", ["c0", 13])
			},
            style: {
				...cssTemplate1("#2877e7", "#0badff")
            },
			unlocked() {return hasUpgrade("c0", 11)},
			
			canAfford(){return player.points.gte(1500)},
			pay(){player.points = player.points.minus(1500)}
        },
		14: {
			fullDisplay(){
				return displayUpgSmall("-28", "Winsome", "x1.8 Time and Skill gain.", "Cost: 3,000 Skill", ["c0", 14])
			},
            style: {
				...cssTemplate1("#6acdff", "#00a5ff")
            },
			unlocked() {return hasUpgrade("c0", 13)},
			
			canAfford(){return player.points.gte(3000)},
			pay(){player.points = player.points.minus(3000)}
        },
		21: {
			fullDisplay(){
				return displayUpgSmall("-27", "Do Nothing", "Boost Time gain based on itself. ", "Cost: 5,500 Skill", ["c0", 21])
			},
            style: {
				...cssTemplate1("#99D1E5", "#FFFFFF")
            },
			unlocked() {return hasUpgrade("c0", 14)},
			effect(){
				// (time+4)^0.4
				let f = player.c0.points.add(4).pow(0.4)
				if (hasUpgrade("c0", 31)) {
					// (time+4)^0.6
					f = player.c0.points.add(4).pow(0.6)
					if (f.lte(25)) {return f}
					return 25
				} else {
					if (f.lte(10)) {return f}
					return 10
				}
			},
			
			canAfford(){return player.points.gte(5500)},
			pay(){player.points = player.points.minus(5500)}
        },
		22: {
			fullDisplay(){
				return displayUpgSmall("-26p5", "Sleepful", "Millisecondless' boost is improved.", "Cost: 2s of Time", ["c0", 22])
			},
            style: {
				...cssTemplate1("#67c9ec", "#FFFFFF")
            },
			unlocked() {return hasUpgrade("c0", 21)},
			
			canAfford(){return player.c0.points.gte(2)},
			pay(){player.c0.points = player.c0.points.minus(2)}
        },
		23: {
			fullDisplay(){
				return displayUpgSmall("-26", "Blessing", "Time's effect is sligtly improved.", "Cost: 15,500 Skill", ["c0", 23])
			},
            style: {
				...cssTemplate1("#01e7b9", "#00a581")
            },
			unlocked() {return hasUpgrade("c0", 21)},
			
			canAfford(){return player.points.gte(15500)},
			pay(){player.points = player.points.minus(15500)}
        },
		24: {
			fullDisplay(){
				return displayUpgSmall("-25", "Vintage", "x1.25 Time gain.", "Cost: 37,500 Skill", ["c0", 24])
			},
            style: {
				...cssTemplate1("#732f81", "#ffffff")
            },
			unlocked() {return hasUpgrade("c0", 23)},
		
			canAfford(){return player.points.gte(37500)},
			pay(){player.points = player.points.minus(37500)}
        },
		25: {
			fullDisplay(){
				return displayUpgSmall("-24p5", "Ifinitude", "Millisecondless' boost drains slower.", "Cost: 1m of Time", ["c0", 25])
			},
            style: {
				...cssTemplate1("#000000", "#ffffff")
            },
			unlocked() {return hasUpgrade("c0", 23)},
		
			canAfford(){return player.c0.points.gte(60)},
			pay(){player.c0.points = player.c0.points.minus(60)}
        },
		31: {
			fullDisplay(){
				return displayUpgSmall("-24", "Just Air", "Do Nothing's boost is improved.", "Cost: 112,500 Skill", ["c0", 31])
			},
            style: {
				...cssTemplate1("#0000E0", "#ffffff")
            },
			unlocked() {return hasUpgrade("c0", 24)},
		
			canAfford(){return player.points.gte(112500)},
			pay(){player.points = player.points.minus(112500)}
        },
		32: {
			fullDisplay(){
				return displayUpgSmall("-23", "Happylike", "+0.006 base Skill gain.", "Cost: 350,000 Skill", ["c0", 32])
			},
            style: {
				...cssTemplate1("#000000", "#ffffff")
            },
			unlocked() {return hasUpgrade("c0", 31)},
		
			canAfford(){return player.points.gte(350000)},
			pay(){player.points = player.points.minus(350000)}
        },
		33: {
			fullDisplay(){
				return displayUpgSmall("-22", "Locomotion", "+10m (600s) Time Hardcap.", "Cost: 1,750,000 Skill", ["c0", 33])
			},
            style: {
				...cssTemplate1("#ff4747", "#ffffff")
            },
			unlocked() {return hasUpgrade("c0", 32)},
	
			canAfford(){return player.points.gte(1750000)},
			pay(){player.points = player.points.minus(1750000)}
        },
		41: {
			fullDisplay(){
				return displayUpgSmall("-21", "Walkthrough", "You can convert Time into Skill.", "Cost: 4,500,000 Skill", ["c0", 41])
			},
            style: {
				...cssTemplate1("#00cbff", "#94d1ff")
            },
			unlocked() {return hasUpgrade("c0", 33)},
		
			canAfford(){return player.points.gte(4500000)},
			pay(){player.points = player.points.minus(4500000)}
        },
		42: {
			fullDisplay(){
				return displayUpgSmall("-20", "Auto Joyful", "Slightly boost Time gain based on Skill.", "Cost: 15,000,000 Skill", ["c0", 42])
			},
            style: {
				...cssTemplate1("#CEFA05", "#000000")
            },
			unlocked() {return hasUpgrade("c0", 41)},
			effect(){
				//17.5th root of (skill+10)
				return player.points.add(10).root(17.5)
			},
		
			canAfford(){return player.points.gte(15000000)},
			pay(){player.points = player.points.minus(15000000)}
        },
		43: {
			fullDisplay(){
				return displayUpgSmall("-19", "Unlosable", "x1.5 Time gain.", "Cost: 25,000,000 Skill", ["c0", 43])
			},
            style: {
				...cssTemplate1("#ea7ffb", "#000000")
            },
			unlocked() {return hasUpgrade("c0", 42)},
		
			canAfford(){return player.points.gte(25000000)},
			pay(){player.points = player.points.minus(25000000)}
        },
		51: {
			fullDisplay(){
				return displayUpgSmall("-18p75", "Roll", "Millisecondless' boost is improved, but /4.5 Skill gain. Locks difficulties in this row.", "Cost: 15m of Time", ["c0", 51])
			},
            style: {
				...cssTemplate1("#eb7fda", "#c53fff")
            },
			unlocked() {return hasUpgrade("c0", 43)},
		
			canAfford(){return player.c0.points.gte(900) && !hasUpgrade("c0", 52) && !hasUpgrade("c0", 53)},
			pay(){player.c0.points = player.c0.points.minus(900)}
        },
		52: {
			fullDisplay(){
				return displayUpgSmall("-18p5", "Mazeophobia", "Walkthrough's conversion is stronger, but /5 Time gain. Locks difficulties in this row.", "Cost: 15m of Time", ["c0", 52])
			},
            style: {
				...cssTemplate1("#ff0048", "#000000")
            },
			unlocked() {return hasUpgrade("c0", 43)},
		
			canAfford(){return player.c0.points.gte(900) && !hasUpgrade("c0", 51) && !hasUpgrade("c0", 53)},
			pay(){player.c0.points = player.c0.points.minus(900)}
        },
		53: {
			fullDisplay(){
				return displayUpgSmall("-18p25", "Shattered Babass", "x3 Skill gain, but /2 Time gain. Locks difficulties in this row.", "Cost: 15m of Time", ["c0", 53])
			},
            style: {
				...cssTemplate1("#9e65f3", "#6c3bb4")
            },
			unlocked() {return hasUpgrade("c0", 43)},
		
			canAfford(){return player.c0.points.gte(900) && !hasUpgrade("c0", 51) && !hasUpgrade("c0", 52)},
			pay(){player.c0.points = player.c0.points.minus(900)}
        },
		61: {
			fullDisplay(){
				return displayUpgSmall("-18", "Frivolous", "+15m (900s) Time Hardcap and x2 Skill gain.", "Cost: 60,000,000 Skill", ["c0", 61])
			},
            style: {
				...cssTemplate1("#71cad9", "#5195a3")
            },
			unlocked() {return hasUpgrade("c0", 43)},
		
			canAfford(){return player.points.gte(60000000)},
			pay(){player.points = player.points.minus(60000000)}
        },
		62: {
			fullDisplay(){
				return displayUpgSmall("-17p5", "Vibeness", "x4 Time gain if Time < 5m.", "Cost: 125,000,000 Skill", ["c0", 62])
			},
            style: {
				...cssTemplate1("#ff2873", "#8900c4")
            },
			unlocked() {return hasUpgrade("c0", 61)},
		
			canAfford(){return player.points.gte(125000000)},
			pay(){player.points = player.points.minus(125000000)}
        },
		63: {
			fullDisplay(){
				return displayUpgSmall("-17", "Automatic", "Millisecondless' boost no longer gets drained.", "Cost: 275,000,000 Skill", ["c0", 63])
			},
            style: {
				...cssTemplate1("#dcfadb", "#000000")
            },
			unlocked() {return hasUpgrade("c0", 62)},
		
			canAfford(){return player.points.gte(300000000)},
			pay(){player.points = player.points.minus(300000000)}
        },
		71: {
			fullDisplay(){
				return displayUpgBig("-16", "Spontaneous", "+20m Time Hardcap, and ascend to next class!", "Cost: 550,000,000 Skill", ["c0", 71])
			},
            style: {
				"width": "175px",
				"height": "175px",
				...cssTemplate1("#5aff54", "#06c000")
            },
			unlocked() {return hasUpgrade("c0", 63)},
		
			canAfford(){return player.points.gte(550000000)},
			pay(){player.points = player.points.minus(550000000)}
        },
    },
	infoboxes: {
		info: {
			title: "Class 0: Automatic",
			body() {
				return `
				Placeholder quote<br><br>
				Time is a "waiting" currency and it's also passively generated.<br><br>
				There are sub-difficulties in this class, which you don't need to buy in order to unlock the next difficulty. However, they mostly use a different currency for buying.
				Additionally, you can hide bought upgrades in the options.
				`
			},
		},
	},
	clickables: {
		// click to fill, then decrease overtime
		11: {
			display(){return "<h2>Hold to boost time!</h2>"},
			unlocked(){return hasUpgrade("c0", 11)},
			
			canClick(){return player.c0.ms_boost_fill <= 1},
			onHold(){
				player.c0.ms_boost_fill += hasUpgrade("c0", 51) ? 0.0125 : 0.0075
			}
		},
		// time -> skill
		12: {
			display(){
				let d
				if (hasUpgrade("c1", 71)) d = 1.75
				else d = hasUpgrade("c0", 52) ? 4 : 30

				return `
				<h2>Convert Time into Skill</h2><br>
				<h3>(${format(getPointGen().mul(player.c0.points).div(d))} Skill)</h3>`
			},
			unlocked(){return hasUpgrade("c0", 41)},
			
			canClick(){return player.c0.points.gte(300)},
			onClick(){
				let d
				if (hasUpgrade("c1", 71)) d = 1.75
				else d = hasUpgrade("c0", 52) ? 4 : 30

				player.points = player.points.add(getPointGen().mul(player.c0.points).div(d))
				player.c0.points = ExpantaNum(0)
			}
		}
	},
	bars: {
		ms_boost: {
			direction: RIGHT,
			width: 400,
			height: 25,
			progress(){return player.c0.ms_boost_fill},
			unlocked(){return hasUpgrade("c0", 11)},
			display(){return `x${format(lerp(1, player.c0.ms_boost_cap, player.c0.ms_boost_fill))} Time gain`},
			fillStyle: {"background-color": "#9ffff7"},
			textStyle: function(){
				if (player.c0.ms_boost_fill <= 0.5){return {"color": "#FFFFFF"}}
				return {"color": "#000000"}
			}
		}
	},
	
    layerShown() {return hasUpgrade("cn", 71)},
    tooltip() {return "Class 0"},
	effect(){
		if (hasUpgrade("c0", 23)){
			// (time+1)^0.7
			return player.c0.points.add(1).pow(0.7)
		}
		// (time+1)^0.6
		return player.c0.points.add(1).pow(0.6)
	},
	effectDescription(){return `which boosts Skill by x${format(this.effect())}`},
	update(diff){
		if (player.c0.ms_boost_fill <= 0) player.c0.ms_boost_fill = 0
		else {
			if (!hasUpgrade("c0", 63)) {
				player.c0.ms_boost_fill -= hasUpgrade("c0", 25) ? 0.0015 : 0.0025
			}
		}

		let h = 900
		if (hasUpgrade("c0", 33)) h += 600
		if (hasUpgrade("c0", 61)) h += 900
		if (hasUpgrade("c0", 71)) h += 1200
		if (hasUpgrade("c2", 21)) h += 900
		player.c0.hardcap = h

		let time_gain = ExpantaNum(0.01 * diff)
		time_gain = time_gain.mul(lerp(1, player.c0.ms_boost_cap, player.c0.ms_boost_fill))
		
		if (hasUpgrade("c0", 12)) {time_gain = time_gain.mul(1.75)}
		if (hasUpgrade("c0", 14)) {time_gain = time_gain.mul(1.8)}
		if (hasUpgrade("c0", 21)) {time_gain = time_gain.mul(upgradeEffect("c0", 21))}
		if (hasUpgrade("c0", 24)) {time_gain = time_gain.mul(1.25)}
		if (hasUpgrade("c0", 42)) {time_gain = time_gain.mul(upgradeEffect("c0", 42))}
		if (hasUpgrade("c0", 43)) {time_gain = time_gain.mul(1.5)}
		if (hasUpgrade("c0", 52)) {time_gain = time_gain.div(5)}
		if (hasUpgrade("c0", 53)) {time_gain = time_gain.div(2)}
		if (hasUpgrade("c0", 62)) {
			if (player.c0.points.lt(300)){time_gain = time_gain.mul(4)}
		}

		if (hasUpgrade("c1", 23)) {time_gain = time_gain.mul(1.5)}
		if (hasUpgrade("c1", 61)) {time_gain = time_gain.mul(3)}
		if (hasUpgrade("c2", 12)) {time_gain = time_gain.mul(1.5)}
		
		time_gain = time_gain.mul(tmp.sl.effect[1])

		if (hasUpgrade("cn", 71)) {player.c0.points = player.c0.points.add(time_gain).min(player.c0.hardcap)}

		if (hasUpgrade("c0", 22)) {
			player.c0.ms_boost_cap = hasUpgrade("c0", 51) ? 35 : 10
		} else {
			player.c0.ms_boost_cap = 3
		}
	}
})
addLayer("c1", {
    name: "Inputs",
    resource: "Inputs",
    nodeStyle: {
        "outline": "2px solid #90b101",
        "border-radius": "0%",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#CEFA05",
        "background-image": "url('resources/-15.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    row: 0,
    position: 1,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0),
		mult: 1,

		keyboardFocus: false,
		keyboardCD: [0,0,0,0,0],
		keyboardAttributes: [0,25,3,10,4],
		keyboardText: "Focus"
	}},
    color: "#e2ff61",
    type: "none",
	
    upgrades: {
        11: {
			fullDisplay(){
				return displayUpgBig("-15", "Joyful", "-2s Input Cooldown.", "Cost: 1 Input, 1e9 Skill", ["c1", 11])
			},
            style: {
				"width": "150px",
				"height": "150px",
				...cssTemplate1("#CEFA05", "#8cac00")
            },
			unlocked() {return hasUpgrade("c0", 71)},
			
			canAfford(){return player.c1.points.gte(1) && player.points.gte(1e9)},
			pay(){
				player.points = player.points.minus(1e9)
				player.c1.points = player.c1.points.minus(1)
			}
        },
		21: {
			fullDisplay(){
				return displayUpgSmall("-14p5", "Do Something", "x3 Skill gain, and unlock a new hotkey.", "Cost: 2 Inputs, 2.75e9 Skill", ["c1", 21])
			},
            style: {
				...cssTemplate1("#0099fe", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 11)},
			
			canAfford(){return player.c1.points.gte(2) && player.points.gte(2.75e9)},
			pay(){
				player.points = player.points.minus(2.75e9)
				player.c1.points = player.c1.points.minus(2)
			}
        },
		22: {
			fullDisplay(){
				return displayUpgSmall("-14", "Placid", "-1.5s Input Cooldown.", "Cost: 3 Inputs, 6e9 Skill", ["c1", 22])
			},
            style: {
				...cssTemplate1("#ffffff", "#999999")
            },
			unlocked() {return hasUpgrade("c1", 11)},
			
			canAfford(){return player.c1.points.gte(3) && player.points.gte(6e9)},
			pay(){
				player.points = player.points.minus(6e9)
				player.c1.points = player.c1.points.minus(3)
			}
        },
		23: {
			fullDisplay(){
				return displayUpgSmall("-13", "Press a Key", "x1.5 Time, and unlock a new hotkey (again)", "Cost: 5 Inputs, 1.75e10 Skill", ["c1", 23])
			},
            style: {
				...cssTemplate1("#ffffff", "#1b1b1b")
            },
			unlocked() {return hasUpgrade("c1", 22)},
			
			canAfford(){return player.c1.points.gte(5) && player.points.gte(1.75e10)},
			pay(){
				player.points = player.points.minus(1.75e10)
				player.c1.points = player.c1.points.minus(5)
			}
        },
		24: {
			fullDisplay(){
				return displayUpgSmall("-12", "Climb a Truss", "-1s Input Cooldown.", "Cost: 7 Inputs, 2.8e10 Skill", ["c1", 24])
			},
            style: {
				...cssTemplate1("#868686", "#dadada")
            },
			unlocked() {return hasUpgrade("c1", 23)},
			
			canAfford(){return player.c1.points.gte(7) && player.points.gte(2.8e10)},
			pay(){
				player.points = player.points.minus(2.8e10)
				player.c1.points = player.c1.points.minus(7)
			}
        },
		31: {
			fullDisplay(){
				return displayUpgSmall("-11p5", "Tranquil", "Input's boost is slightly improved.", "Cost: 11 Inputs, 4.2e10 Skill", ["c1", 31])
			},
            style: {
				...cssTemplate1("#0000ff", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 24)},
			
			canAfford(){return player.c1.points.gte(11) && player.points.gte(4.2e10)},
			pay(){
				player.points = player.points.minus(4.2e10)
				player.c1.points = player.c1.points.minus(11)
			}
        },
		32: {
			fullDisplay(){
				return displayUpgSmall("-11", "Jumpless", "Unlocks 2 new hotkeys.", "Cost: 14 Inputs, 8e10 Skill", ["c1", 32])
			},
            style: {
				...cssTemplate1("#C8BFE6", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 24)},
			
			canAfford(){return player.c1.points.gte(14) && player.points.gte(8e10)},
			pay(){
				player.points = player.points.minus(8e10)
				player.c1.points = player.c1.points.minus(14)
			}
        },
		33: {
			fullDisplay(){
				return displayUpgSmall("-10", "Starter", "Increase chance by 10% for W and S hotkeys.", "Cost: 20 Inputs, 1.5e11 Skill", ["c1", 33])
			},
            style: {
				...cssTemplate1("#008cff", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 32)},
			
			canAfford(){return player.c1.points.gte(20) && player.points.gte(1.5e11)},
			pay(){
				player.points = player.points.minus(1.5e11)
				player.c1.points = player.c1.points.minus(20)
			}
        },
		34: {
			fullDisplay(){
				return displayUpgSmall("-9p5", "Cakewalk", "x2 Input gain.", "Cost: 28 Inputs, 2.2e11 Skill", ["c1", 34])
			},
            style: {
				...cssTemplate1("#0079db", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 33)},
			
			canAfford(){return player.c1.points.gte(28) && player.points.gte(2.2e11)},
			pay(){
				player.points = player.points.minus(2.2e11)
				player.c1.points = player.c1.points.minus(28)
			}
        },
		41: {
			fullDisplay(){
				return displayUpgSmall("-9", "Sweet", 'Unlock Platforming, accessed on "PL" button.', "Cost: 36 Inputs, 3e11 Skill", ["c1", 41])
			},
            style: {
				...cssTemplate1("#fffd96", "#1f1f1f")
            },
			unlocked() {return hasUpgrade("c1", 33)},
			
			canAfford(){return player.c1.points.gte(36) && player.points.gte(3e11)},
			pay(){
				player.points = player.points.minus(3e11)
				player.c1.points = player.c1.points.minus(36)
			}
        },
		42: {
			fullDisplay(){
				return displayUpgSmall("-8p66", "Sugary", '-0.5s Input Cooldown.', "Cost: 40 Inputs, 4.32e11 Skill", ["c1", 42])
			},
            style: {
				...cssTemplate1("#ffff00", "#1f1f1f")
            },
			unlocked() {return hasUpgrade("c1", 41)},
			
			canAfford(){return player.c1.points.gte(40) && player.points.gte(4.32e11)},
			pay(){
				player.points = player.points.minus(4.32e11)
				player.c1.points = player.c1.points.minus(40)
			}
        },
		43: {
			fullDisplay(){
				return displayUpgSmall("-8p33", "Aesthetic", 'x2.34 Skill gain.', "Cost: 44 Inputs, 6.78e11 Skill", ["c1", 43])
			},
            style: {
				...cssTemplate1("#76f447", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 41)},
			
			canAfford(){return player.c1.points.gte(44) && player.points.gte(5.67e11)},
			pay(){
				player.points = player.points.minus(5.67e11)
				player.c1.points = player.c1.points.minus(44)
			}
        },
		44: {
			fullDisplay(){
				return displayUpgSmall("-8", "Lovely", 'x2.5 Input gain.', "Cost: 53 Inputs, 1e12 Skill", ["c1", 44])
			},
            style: {
				...cssTemplate1("#dcfadb", "#c8e7c7")
            },
			unlocked() {return hasUpgrade("c1", 41)},
			
			canAfford(){return player.c1.points.gte(53) && player.points.gte(1e12)},
			pay(){
				player.points = player.points.minus(1e12)
				player.c1.points = player.c1.points.minus(53)
			}
        },
		45: {
			fullDisplay(){
				return displayUpgSmall("-7p5", "Glee", 'Boost Input gain based on Skill.', "Cost: 108 Inputs, 3.33e12 Skill", ["c1", 45])
			},
            style: {
				...cssTemplate1("#f7d1d7", "#e4adad")
            },
			unlocked() {return hasUpgrade("c1", 44)},
			
			effect() {
				// log_3.75(skill/1e12+10)-0.3, min. 1
				return player.points.div(1e12).add(10).logBase(5.5).sub(0.3).max(1).min(4)
			},
			canAfford(){return player.c1.points.gte(108) && player.points.gte(3.33e12)},
			pay(){
				player.points = player.points.minus(3.33e12)
				player.c1.points = player.c1.points.minus(108)
			}
        },
		51: {
			fullDisplay(){
				return displayUpgSmall("-7", "Flowerness", 'Decrease Input Cooldown based on Skill.', "Cost: 160 Inputs, 7e12 Skill", ["c1", 51])
			},
            style: {
				...cssTemplate1("#b791ff", "#c3a7f7")
            },
			unlocked() {return hasUpgrade("c1", 44)},
			
			effect() {
				// (skill/1e12)^0.6
				return player.points.add(1).div(1e12).add(0.5).logBase(12.5).div(3).min(2)
			},
			canAfford(){return player.c1.points.gte(160) && player.points.gte(7e12)},
			pay(){
				player.points = player.points.minus(7e12)
				player.c1.points = player.c1.points.minus(160)
			}
        },
		52: {
			fullDisplay(){
				return displayUpgSmall("-6p66", "Coasterifying", "Hotkey A's boost is increased. (-3s -> -4s)", "Cost: 250 Inputs, 1.11e13 Skill", ["c1", 52])
			},
            style: {
				...cssTemplate1("#0073ff", "#2889ff")
            },
			unlocked() {return hasUpgrade("c1", 51)},
			
			canAfford(){return player.c1.points.gte(250) && player.points.gte(1.11e13)},
			pay(){
				player.points = player.points.minus(1.11e13)
				player.c1.points = player.c1.points.minus(250)
			}
        },
		53: {
			fullDisplay(){
				return displayUpgSmall("-6p33", "A Difficulty Named Difficulty", "Hotkey D's penalty is decreased. (+4s -> +3s)", "Cost: 250 Inputs, 1.77e13 Skill", ["c1", 53])
			},
            style: {
				...cssTemplate1("#eb1d3e", "#e47083")
            },	
			unlocked() {return hasUpgrade("c1", 51)},
			
			canAfford(){return player.c1.points.gte(250) && player.points.gte(1.77e13)},
			pay(){
				player.points = player.points.minus(1.77e13)
				player.c1.points = player.c1.points.minus(250)
			}
        },
		61: {
			fullDisplay(){
				return displayUpgSmall("-6", "Pleasant", "x3 Time gain.", "Cost: 350 Inputs, 2.5e13 Skill", ["c1", 61])
			},
            style: {
				...cssTemplate1("#90E1FF", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 51)},
			
			canAfford(){return player.c1.points.gte(350) && player.points.gte(2.5e13)},
			pay(){
				player.points = player.points.minus(2.5e13)
				player.c1.points = player.c1.points.minus(350)
			}
        },
		62: {
			fullDisplay(){
				return displayUpgSmall("-5p5", "Piece o' Cake", "x3 Skill gain.", "Cost: 575 Inputs, 3.25e13 Skill", ["c1", 62])
			},
            style: {
				...cssTemplate1("#fec0fe", "#f876e0")
            },
			unlocked() {return hasUpgrade("c1", 61)},
			
			canAfford(){return player.c1.points.gte(575) && player.points.gte(3.25e13)},
			pay(){
				player.points = player.points.minus(3.25e13)
				player.c1.points = player.c1.points.minus(575)
			}
        },
		63: {
			fullDisplay(){
				return displayUpgSmall("-5", "Tutorial", "Increase the reward from platformer completions.", "Cost: 615 Inputs, 6.15e13 Skill", ["c1", 63])
			},
            style: {
				...cssTemplate1("#227919", "#37ce26")
            },
			unlocked() {return hasUpgrade("c1", 61)},
			
			canAfford(){return player.c1.points.gte(615) && player.points.gte(6.15e13)},
			pay(){
				player.points = player.points.minus(6.15e13)
				player.c1.points = player.c1.points.minus(615)
			}
        },
		64: {
			fullDisplay(){
				return displayUpgSmall("-4p33", "Delightful", "+0.0105 base Skill gain.", "Cost: 675 Inputs, 2.55e14 Skill", ["c1", 64])
			},
            style: {
				...cssTemplate1("#e6d073", "#000000")
            },
			unlocked() {return hasUpgrade("c1", 63)},
			
			canAfford(){return player.c1.points.gte(675) && player.points.gte(2.55e14)},
			pay(){
				player.points = player.points.minus(2.55e14)
				player.c1.points = player.c1.points.minus(675)
			}
        },
		65: {
			fullDisplay(){
				return displayUpgSmall("-4", "TooEasy", "Boost Input gain based on platformer completions.", "Cost: 825 Inputs, 9e14 Skill", ["c1", 65])
			},
            style: {
				...cssTemplate1("#105402", "#1da003")
            },
			unlocked() {return hasUpgrade("c1", 63)},

			effect() {
				// (x+1)^0.5/7.5+1
				if (hasUpgrade("c2", 22))
					return ((player.pl.comp+1)**0.7)/6+1
				return ((player.pl.comp+1)**0.5)/7.5+1
			},
			canAfford(){return player.c1.points.gte(825) && player.points.gte(9e14)},
			pay(){
				player.points = player.points.minus(9e14)
				player.c1.points = player.c1.points.minus(825)
			}
        },
		71: {
			fullDisplay(){
				return displayUpgSmall("-3", "Peaceful", "Time conversion is improved again.", "Cost: 2,000 Inputs, 2.5e15 Skill", ["c1", 71])
			},
            style: {
				...cssTemplate1("#c7b0da", "#e8d1ff")
            },
			unlocked() {return hasUpgrade("c1", 65)},

			canAfford(){return player.c1.points.gte(2000) && player.points.gte(2.5e15)},
			pay(){
				player.points = player.points.minus(2.5e15)
				player.c1.points = player.c1.points.minus(2000)
			}
        },
		72: {
			fullDisplay(){
				return displayUpgSmall("-2p5", "Playful", "Input's boost is improved again.", "Cost: 3,250 Inputs, 4.2e15 Skill", ["c1", 72])
			},
            style: {
				...cssTemplate1("#93ff1b", "#141414")
            },
			unlocked() {return hasUpgrade("c1", 71)},

			canAfford(){return player.c1.points.gte(3250) && player.points.gte(4.2e15)},
			pay(){
				player.points = player.points.minus(4.2e15)
				player.c1.points = player.c1.points.minus(3250)
			}
        },
		73: {
			fullDisplay(){
				return displayUpgSmall("-2", "Babying", "-1s Input Cooldown.", "Cost: 3,500 Inputs, 6.42e15 Skill", ["c1", 73])
			},
            style: {
				...cssTemplate1("#01FFD7", "#141414")
            },
			unlocked() {return hasUpgrade("c1", 71)},

			canAfford(){return player.c1.points.gte(3500) && player.points.gte(6.42e15)},
			pay(){
				player.points = player.points.minus(6.42e15)
				player.c1.points = player.c1.points.minus(3500)
			}
        },
		74: {
			fullDisplay(){
				return displayUpgSmall("-1p33", "Facile", "x1.5 Input gain.", "Cost: 3,250 Inputs, 8.76e15 Skill", ["c1", 74])
			},
            style: {
				...cssTemplate1("#01c4ff", "#009bca")
            },
			unlocked() {return hasUpgrade("c1", 73)},

			canAfford(){return player.c1.points.gte(3250) && player.points.gte(8.76e15)},
			pay(){
				player.points = player.points.minus(8.76e15)
				player.c1.points = player.c1.points.minus(3250)
			}
        },
		81: {
			fullDisplay(){
				return displayUpgBig("-1", "Effortlessless", "+0.03 base Skill gain, and ascend to EToH dificulties!", "Cost: 3,750 Inputs, 1.5e16 Skill", ["c1", 81])
			},
            style: {
				"width": "175px",
				"height": "175px",
				...cssTemplate1("#99D9EA", "#ffffff")
            },
			unlocked() {return hasUpgrade("c1", 73)},

			canAfford(){return player.c1.points.gte(3750) && player.points.gte(1.5e16)},
			pay(){
				player.points = player.points.minus(1.5e16)
				player.c1.points = player.c1.points.minus(3750)
			}
        },
    },
	infoboxes: {
		info: {
			title: "Class 1: Simple",
			body() {
				return `
				Placeholder quote<br><br>
				Inputs are a... (Placeholder again bruh)<br>
				All keys have a different cooldown, which you can use all at once instead of one at a time.<br><br>

				Some normal difficulties will require you to use different/multiple currencies beyond this point. Good luck tho, the journey to The Final Difficulty starts.<br>
				There's an "EA" button on the side, which lets you easily access some important features and stats.
				`
			},
		},
	},
	clickables: {
		// focus (15s cd)
		11: {
			display(){return `<h2>${player.c1.keyboardText}</h2>`},
			unlocked(){return hasUpgrade("c0", 71)},
			
			canClick(){return true},
			onClick(){player.c1.keyboardFocus = !player.c1.keyboardFocus},
			style(){
				if (player.c1.keyboardFocus) return {"background-color": "#fc3e3e"}
			}
		},

		// wasd
		// tried to add cooldowns for each button, but broke
		21: {
			display(){return `<h1>W</h1>`},
			unlocked(){return hasUpgrade("c0", 71) && player.c1.keyboardFocus},
			
			canClick(){return hasUpgrade("c1", 21) && player.c1.keyboardCD[1] <= 0},
			onClick(){ c1_key("w") }
		},
		31: {
			display(){return `<h1>A</h1>`},
			unlocked(){return hasUpgrade("c0", 71) && player.c1.keyboardFocus},
			
			canClick(){return hasUpgrade("c1", 32) && player.c1.keyboardCD[2] <= 0},
			onClick(){ c1_key("a") }
		},
		32: {
			display(){return `<h1>S</h1>`},
			unlocked(){return hasUpgrade("c0", 71) && player.c1.keyboardFocus},
			
			canClick(){return hasUpgrade("c1", 23) && player.c1.keyboardCD[3] <= 0},
			onClick(){ c1_key("s") }
		},
		33: {
			display(){return `<h1>D</h1>`},
			unlocked(){return hasUpgrade("c0", 71) && player.c1.keyboardFocus},
			
			canClick(){return hasUpgrade("c1", 32) && player.c1.keyboardCD[4] <= 0},
			onClick(){ c1_key("d") }
		},
		41: {
			display(){return `<h1>Spacebar</h1>`},
			unlocked(){return hasUpgrade("c0", 71) && player.c1.keyboardFocus},
			
			canClick(){return hasUpgrade("c0", 71) && player.c1.keyboardCD[0] <= 0},
			onClick(){ c1_key(" ") },
			style: {
				width: "300px"
			}
		},
	},
	hotkeys: [
        {
			key: " ",
			description: "Spacebar: Jump (+1 Input)",
			onPress(){ c1_key(" ") },
			unlocked() {return player.c1.keyboardFocus}
		},
		{
			key: "w",
			description: "More info on Class 1!",
			onPress(){ c1_key("w") },
			unlocked() {return player.c1.keyboardFocus && hasUpgrade("c1", 21)}
		},
		{
			key: "a",
			description: "",
			onPress(){ c1_key("a") },
			unlocked() {return player.c1.keyboardFocus && hasUpgrade("c1", 32)}
		},
		{
			key: "s",
			description: "",
			onPress(){ c1_key("s") },
			unlocked() {return player.c1.keyboardFocus && hasUpgrade("c1", 23)}
		},
		{
			key: "d",
			description: "",
			onPress(){ c1_key("d") },
			unlocked() {return player.c1.keyboardFocus && hasUpgrade("c1", 32)}
		},
    ],

    layerShown() {return hasUpgrade("c0", 71)},
    tooltip() {return "Class 1"},
	effect(){
		if (hasUpgrade("c1", 72)) {
			// log_1.3(inputs+1)+1
			return player.c1.points.add(1).logBase(1.2).add(1)
		}
		if (hasUpgrade("c1", 31)) {
			// log_1.75(inputs+1)+1
			return player.c1.points.add(1).logBase(1.75).add(1)
		}
		// log_2(inputs+1)+1
		return player.c1.points.add(1).logBase(2).add(1)
	},
	effectDescription(){return `which boosts Skill by x${format(this.effect())}`},
	update(diff){
		for (let i = 0; i < player.c1.keyboardCD.length; i++) {
			if (player.c1.keyboardCD[i] <= 0) player.c1.keyboardCD[i] = 0
			else player.c1.keyboardCD[i] -= diff
		}
		if (hasUpgrade("c1", 33)) {
			player.c1.keyboardAttributes[1] = 35
			player.c1.keyboardAttributes[3] = 20
		} else {
			player.c1.keyboardAttributes[1] = 25
			player.c1.keyboardAttributes[3] = 10
		}
		if (hasUpgrade("c1", 52)) player.c1.keyboardAttributes[2] = 4
		else player.c1.keyboardAttributes[2] = 3
		if (hasUpgrade("c1", 53)) player.c1.keyboardAttributes[4] = 3
		else player.c1.keyboardAttributes[4] = 4

		let g = 1
		if (hasUpgrade("c1", 34)) {g *= 2}
		if (hasUpgrade("c1", 44)) {g *= 2.5}
		if (hasUpgrade("c1", 45)) {g *= upgradeEffect("c1", 45).toNumber()}
		if (hasUpgrade("c1", 65)) {g *= upgradeEffect("c1", 65)}
		if (hasUpgrade("c1", 74)) {g *= 1.5}

		g *= buyableEffect("tw", 12).toNumber()
		g *= tmp.sl.effect[2].toNumber()
		
		player.c1.mult = Math.round(g)
		if (player.c1.keyboardFocus) player.c1.keyboardText = "Unfocus"
		else player.c1.keyboardText = "Focus"
	}
})
addLayer("c2", {
    name: "Tower Points",
    resource: "Tower Points",
    nodeStyle: {
        "outline": "2px solid #00ff00",
        "border-radius": "0%",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#00CE00",
        "background-image": "url('resources/0.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    row: 1,
    position: 0,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0),
	}},
    color: "#00CE00",
    type: "normal",
	baseResource: "Skill",
	baseAmount() {return player.points},
	requires: ExpantaNum(1e16),
	
    upgrades: {
        11: {
			fullDisplay(){
				return displayUpgSmall("0", "Effortless", 'Unlock Towers. (on "TW" button)', "Requires: 10 Tower Points", ["c2", 11])
			},
            style: {
				...cssTemplate1("#00CE00", "#00ff00")
            },
			unlocked() {return hasUpgrade("c1", 81) || player.c2.points.gt(0)},
			
			canAfford(){return player.c2.points.gte(10)},
			pay(){}
        },
		12: {
			fullDisplay(){
				return displayUpgSmall("0p5", "Elementary", 'x1.5 Skill and Time gain.', "Cost: 30 Tower Points", ["c2", 12])
			},
            style: {
				...cssTemplate1("#00ff00", "#2eff2e")
            },
			unlocked() {return hasUpgrade("c2", 11)},
			
			canAfford(){return player.c2.points.gte(30)},
			pay(){player.c2.points = player.c2.points.sub(30)}
        },
		13: {
			fullDisplay(){
				return displayUpgSmall("1", "Easy", '-2s Input Cooldown and unlock a new tower.', "Cost: 60 Tower Points", ["c2", 13])
			},
            style: {
				...cssTemplate1("#76F447", "#95ff6e")
            },
			unlocked() {return hasUpgrade("c2", 12)},
			
			canAfford(){return player.c2.points.gte(60)},
			pay(){player.c2.points = player.c2.points.sub(60)}
        },
		14: {
			fullDisplay(){
				return displayUpgSmall("1p5", "Calm", '+0.0002 base Skill gain.', "Cost: 100 Tower Points", ["c2", 14])
			},
            style: {
				...cssTemplate1("#befb24", "#d3ff62")
            },
			unlocked() {return hasUpgrade("c2", 13)},
			
			canAfford(){return player.c2.points.gte(100)},
			pay(){player.c2.points = player.c2.points.sub(100)}
        },
		21: {
			fullDisplay(){
				return displayUpgSmall("2", "Medium", '+15m Time Hardcap and unlock a new tower... again.', "Cost: 150 Tower Points", ["c2", 21])
			},
            style: {
				...cssTemplate1("#FFFF00", "#ffff6c")
            },
			unlocked() {return hasUpgrade("c2", 14)},
			
			canAfford(){return player.c2.points.gte(150)},
			pay(){player.c2.points = player.c2.points.minus(150)}
        },
		22: {
			fullDisplay(){
				return displayUpgSmall("2p5", "Intermediate", "TooEasy's boost is slightly improved.", "Cost: 225 Tower Points", ["c2", 22])
			},
            style: {
				...cssTemplate1("#ffbb00", "#ffdc52")
            },
			unlocked() {return hasUpgrade("c2", 21)},
			
			canAfford(){return player.c2.points.gte(225)},
			pay(){player.c2.points = player.c2.points.minus(225)}
        },
		23: {
			fullDisplay(){
				return displayUpgSmall("3", "Hard", 'Unlock Slamo Clicker. Also, each EToH difficulty unlocks a new tower.', "Cost: 350 Tower Points", ["c2", 23])
			},
            style: {
				...cssTemplate1("#FE7C00", "#ff9e43")
            },
			unlocked() {return hasUpgrade("c2", 22)},
			
			canAfford(){return player.c2.points.gte(350)},
			pay(){player.c2.points = player.c2.points.minus(350)}
        },
		24: {
			fullDisplay(){
				return displayUpgSmall("3p5", "Tricky", 'x1.5 Tower Point gain. (End of Pre-Release, for now)', "Cost: 500 Tower Points", ["c2", 24])
			},
            style: {
				...cssTemplate1("#ff2c00", "#ff5c3b")
            },
			unlocked() {return hasUpgrade("c2", 23)},
			
			canAfford(){return player.c2.points.gte(500)},
			pay(){player.c2.points = player.c2.points.minus(500)}
        },
    },
	gainMult() {
		let g = ExpantaNum(10)
		if (hasUpgrade("c2", 24)) g = g.mul(1.5)
		g = g.mul(buyableEffect("tw", 21))
		return g
	},
	gainExp() {return ExpantaNum(1)},
	resetDescription: "Towernify for ",
	exponent: 0.55,

	infoboxes: {
		info: {
			title: "Class 2: EToH Difficulties",
			body() {
				return `
				Placeholder quote<br><br>
				Towernify is the 1st reset layer in the game. The currency is Tower Points which is used to buy towers, and other things.<br>
				It's recommended to get 20+ Tower Points on your first Towernify.
				`
			},
		},
	},
	hotkeys: [
        {
			key: "2",
			description: "2: Towernify reset",
			onPress(){ doReset("c2") },
			unlocked() {return hasUpgrade("c1", 81) || player.c2.points.gt(0)}
		},
    ],

    layerShown() {return hasUpgrade("c1", 81) || player.c2.points.gt(0)},
    tooltip() {return "Class 2"},
})

// easy access
addLayer("ea", {
    symbol: "EA",
    position: 0,
    startData() {return {
        unlocked: true,
    }},
    color: "#2dceff",
    type: "none",
    row: "side",

	tabFormat: [
		// c0
		["layer-proxy", function(){ if (hasUpgrade("cn", 71)) {
			return ["c0", [
				"time-display",
				["display-text", `Time Hardcap is ${formatTime(player.c0.hardcap)}. (${player.c0.hardcap}s)`],
				"blank",
				["clickable", 12],
			]]
		}}],

		// c1
		["layer-proxy", function(){ if (hasUpgrade("c1", 81)) {
			return ["c1", [
				"main-display",
				"blank",
				"clickables",
				['display-text', `
					${appendIf(hasUpgrade("c0", 71), `Spacebar: +${player.c1.mult} Input (Cooldown: ${format(player.c1.keyboardCD[0])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 21), `W: +${player.c1.mult} Input (${player.c1.keyboardAttributes[1]}% chance for +${player.c1.mult} extra) (Cooldown: ${format(player.c1.keyboardCD[1])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 32), `A: +${player.c1.mult} Input, and -${player.c1.keyboardAttributes[2]}s current cooldown for all hotkeys (Cooldown: ${format(player.c1.keyboardCD[2])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 23), `S: +${player.c1.mult} Input (${player.c1.keyboardAttributes[3]}% chance for +${player.c1.mult*2} extra) (Cooldown: ${format(player.c1.keyboardCD[3])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 32), `D: +${player.c1.mult * 2} Inputs, but +${player.c1.keyboardAttributes[4]}s current cooldown for all hotkeys (Cooldown: ${format(player.c1.keyboardCD[4])}s)`)} <br>
					(You can also press WASD and Spacebar on your keyboard)
					`
				],
			]]
		}}],
	],
	
    layerShown() {return hasUpgrade("c0", 71)},
    tooltip() {return "Easy Access"},
})
// platforming
addLayer("pl", {
    symbol: "PL",
    row: 0,
    displayRow: "side",
    position: 1,
    startData() {return {
        unlocked: true,

		x: 0,
		y: 0,
		coords: 2401, // grid (hundreds = y, tens and unit = x)
		y_vel: 0,

		jumping: false,
		touching: false,
		blocks: [],
		win_delay: 5,
		win_mult: 1200,
		comp: 0
    }},
    color: "#92ff2d",
    type: "none",

	grid: {
		rows: 24,
        cols: 40,
        getStartData(id) {return 0},
        getCanClick(data, id) {return false},
		getStyle(data, id) {
			let ts = {
				"height":"20px",
                "width":"20px",
                "margin-left":"-2px",
                "margin-top":"-5px",
                'border':"0px",
    		    "border-radius": "0%",
			}

			// player
			if (id == player.pl.coords) return {
                "background-color":"#cc64cc",
				"transition-duration": "0s",
				...ts
			}

			// block
			if (player.pl.blocks.includes(id)) return {
                "background-color":"#a0f700",
				"transition-duration": "0s",
                ...ts
            }

			// blank
           	return {
                "background-color":"#dddddd",
                ...ts
			}
		},
		//getDisplay(data, id) {return player.pl.blocks.find(n => n == id)}
	},
	clickables: {
		11: {
			display(){return `<h1>Jump</h1>`},
			
			canClick(){return hasUpgrade("c1", 41)},
			onClick(){
				if (!player.pl.jumping) {
					player.pl.y_vel = 10
					player.pl.jumping = true
				}
			}
		},
		21: {
			display(){return `<h1>Go Left</h1>`},

			canClick(){return hasUpgrade("c1", 41)},
			onClick(){
				if (!player.pl.blocks.includes(player.pl.coords - 1))
					player.pl.x -= 1
			},
			onHold(){
				if (!player.pl.blocks.includes(player.pl.coords - 1))
					player.pl.x -= 1
			}
		},
		22: {
			display(){return `<h1>Go Right</h1>`},

			canClick(){return hasUpgrade("c1", 41)},
			onClick(){
				if (!player.pl.blocks.includes(player.pl.coords + 1))
					player.pl.x += 1
			},
			onHold(){
				if (!player.pl.blocks.includes(player.pl.coords + 1))
					player.pl.x += 1
			}
		},
		31: {
			display(){return `<h2>Regenerate Level</h2>`},

			canClick(){return hasUpgrade("c1", 41)},
			onClick(){pl_regen()}
		},
	},

	tabFormat: [
		"grid",
		"clickables",
		["display-text", function(){
			return `Reach to the top to win. Each completion gives ${format(getPointGen().mul(player.pl.win_mult))} Skill.<br>
			You have ${player.pl.comp} platformer completions.
			`
		}],
	],
	
    layerShown() {return hasUpgrade("c1", 41)},
    tooltip() {return "Platforming"},
	update(diff){
		// barrier + gravity
		if (player.pl.y_vel <= -7) player.pl.y_vel = -7
		else player.pl.y_vel -= 1
		if (player.pl.x < 0) player.pl.x = 0
		if (player.pl.x > 39) player.pl.x = 39
		if (player.pl.y >= 24 && player.pl.win_delay <= 0) {
			pl_regen()
			player.points = player.points.add(getPointGen().mul(player.pl.win_mult))
			player.pl.comp += 1
			player.pl.win_delay = 5
		}

		// collision (up and down)
		if (player.pl.blocks.includes(player.pl.coords + 100))
			player.pl.touching = true
		else player.pl.touching = false
		if (player.pl.blocks.includes(player.pl.coords - 100) && player.pl.y_vel >= 0)
			player.pl.y_vel = 0
		if (player.pl.blocks.includes(player.pl.coords))
			player.pl.y += 1
		
		if (player.pl.touching) {
			if (!player.pl.jumping) {
				player.pl.y_vel = 0
				player.pl.y = Math.floor(player.pl.y)
			}
			if (player.pl.y_vel <= 0) player.pl.jumping = false
		}
		
		if (player.pl.y <= 0 && player.pl.y_vel <= 0) {
			player.pl.y = 0
			player.pl.jumping = false
		} else player.pl.y += player.pl.y_vel / 10

		let m = 1200
		if (hasUpgrade("c1", 63)) {m = 4000}
		player.pl.win_mult = m

		player.pl.coords = pl_grid(24, player.pl.x, player.pl.y)
		player.pl.win_delay -= diff
	}
})
// towers
addLayer("tw", {
    symbol: "TW",
    row: "side",
    position: 2,
    startData() {return {
        unlocked: true,
    }},
    color: "#35c235",
    type: "none",

	buyables: {
		11: {
			title: "Tower of Genesis",
			display() {
				return `
				x${format(this.effect())} Skill gain. (${getBuyableAmount(this.layer, this.id)}/10)<br>
				Cost: ${format(this.cost())} Tower Points
				`
			},
			cost(x) {return ExpantaNum(7).mul(ExpantaNum.pow(2, x)).floor()},
			canAfford() { return player.c2.points.gte(this.cost()) },
			buy() {
        	    player.c2.points = player.c2.points.sub(this.cost())
        	    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
			purchaseLimit: 10,
			
			style() {
				if (this.canAfford() || getBuyableAmount(this.layer, this.id).eq(10)) return {
					"background": "linear-gradient(90deg, #A7D89D 0%,  #93BF8A 11%, #66B89A 22%, #008F9C 33%, #405198 44%, #2D4D75 55%, #D787BC 66%, #8C5B9F 77%, #4C3057 88%, #30154B 100%)",
					"border-left-color": "#A7D89D",
					"border-right-color": "#30154B",
        			"outline": "3px solid #35c235",
				}
				return {"outline": "3px solid #35c235",}
			},
			effect() {return ExpantaNum.pow(2, getBuyableAmount(this.layer, this.id))}
		},
		12: {
			title: "Tower of Slight Unhappiness",
			display() {
				return `
				x${format(this.effect())} Input gain. (${getBuyableAmount(this.layer, this.id)}/10)<br>
				Cost: ${format(this.cost())} Tower Points
				`
			},
			cost(x) {return ExpantaNum(15).mul(ExpantaNum.pow(3, x)).floor()},
			canAfford() { return player.c2.points.gte(this.cost()) },
			buy() {
        	    player.c2.points = player.c2.points.sub(this.cost())
        	    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
			purchaseLimit: 10,
			
			style() {
				if (this.canAfford() || getBuyableAmount(this.layer, this.id).eq(10)) return {
					"background": "linear-gradient(90deg, rgba(75, 151, 75, 1) 0%, rgba(148, 190, 129, 1) 11%, rgba(164, 189, 71, 1) 22%, rgba(193, 190, 66, 1) 33%, rgba(255, 255, 0, 1) 44%, rgba(245, 205, 48, 1) 55%, rgba(239, 184, 56, 1) 66%, rgba(255, 176, 0, 1) 77%, rgba(226, 155, 64, 1) 88%, rgba(213, 115, 61, 1) 100%)",
					"border-left-color": "rgba(75, 151, 75, 1)",
					"border-right-color": "rgba(213, 115, 61, 1)",
        			"outline": "3px solid #35c235",
				}
				return {"outline": "3px solid #35c235",}
			},
			effect() {return ExpantaNum.pow(1.25, getBuyableAmount(this.layer, this.id))}
		},
		13: {
			title: "Not Even a Tower",
			display() {
				return `
				x${format(this.effect())} Time gain. (${getBuyableAmount(this.layer, this.id)}/5)<br>
				Cost: ${format(this.cost())} Tower Points
				`
			},
			cost(x) {return ExpantaNum(40).mul(ExpantaNum.pow(3, x)).floor()},
			canAfford() { return player.c2.points.gte(this.cost()) },
			buy() {
        	    player.c2.points = player.c2.points.sub(this.cost())
        	    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
			unlocked() {return hasUpgrade("c2", 13)},
			purchaseLimit: 5,
			
			style() {
				if (this.canAfford() || getBuyableAmount(this.layer, this.id).eq(10)) return {
					"background": "linear-gradient(90deg, rgba(90, 76, 66, 1) 0%, rgba(163, 162, 165, 1) 25%, rgba(255, 148, 148, 1) 50%, rgba(8, 137, 207, 1) 75%, rgba(245, 205, 48, 1) 100%)",
					"border-left-color": "rgba(90, 76, 66, 1)",
					"border-right-color": "rgba(245, 205, 48, 1)",
        			"outline": "3px solid #76F447",
				}
				return {"outline": "3px solid #76F447",}
			},
			effect() {return ExpantaNum.pow(1.25, getBuyableAmount(this.layer, this.id))}
		},
		21: {
			title: "Tower of Phone Snapping",
			display() {
				return `
				x${format(this.effect())} Tower Point gain. (${getBuyableAmount(this.layer, this.id)}/10)<br>
				Cost: ${format(this.cost())} Tower Points
				`
			},
			cost(x) {return ExpantaNum(70).mul(ExpantaNum.pow(2.25, x)).floor()},
			canAfford() { return player.c2.points.gte(this.cost()) },
			buy() {
        	    player.c2.points = player.c2.points.sub(this.cost())
        	    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
			unlocked() {return hasUpgrade("c2", 21)},
			purchaseLimit: 10,
			
			style() {
				if (this.canAfford() || getBuyableAmount(this.layer, this.id).eq(10)) return {
					"background": "linear-gradient(90deg, #527CAE 0%, #0D69AC 11%, #2154B9 22%, #6225D1 33%, #62259F 44%, #6B327C 55%, #8C5B9F 66%, #B480FF 77%, #B1A7FF 88%, #B1C5FF 100%)",
					"border-left-color": "#527CAE",
					"border-right-color": "#B1C5FF",
        			"outline": "3px solid #FFFF00",
				}
				return {"outline": "3px solid #FFFF00",}
			},
			effect() {return ExpantaNum.mul(0.2, getBuyableAmount(this.layer, this.id)).add(1)}
		},
		22: {
			title: "Tower of Hecc",
			display() {
				return `
				x${format(this.effect())} Slamo Click gain. (${getBuyableAmount(this.layer, this.id)}/10)<br>
				Cost: ${format(this.cost())} Tower Points
				`
			},
			cost(x) {return ExpantaNum(75).mul(ExpantaNum.pow(2.15, x)).floor()},
			canAfford() { return player.c2.points.gte(this.cost()) },
			buy() {
        	    player.c2.points = player.c2.points.sub(this.cost())
        	    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
			unlocked() {return hasUpgrade("c2", 23)},
			purchaseLimit: 10,
			
			style() {
				if (this.canAfford() || getBuyableAmount(this.layer, this.id).eq(10)) return {
					"background": "linear-gradient(90deg, #A3A2A5 0%, #C4281C 11%, #E29B40 22%, #F5CD30 33%, #4B974B 44%, #008F9C 55%, #0D69AC 66%, #8C5B9F 77%, #FF66CC 88%, #FF00BF 100%)",
					"border-left-color": "#a3a2a5",
					"border-right-color": "#FF00BF",
        			"outline": "3px solid #FE7C00",
				}
				return {"outline": "3px solid #FE7C00",}
			},
			effect() {return ExpantaNum.mul(0.5, getBuyableAmount(this.layer, this.id)).add(1)}
		},
	},
	tabFormat: [
		["layer-proxy", ["c2", ["main-display"]]],
		"buyables",
	],
	
    layerShown() {return hasUpgrade("c2", 11)},
    tooltip() {return "Towers"},
})
// slamo
addLayer("sl", {
    symbol: "SL",
	name: "Slamo Clicks",
	resource: "Slamo Clicks",
    row: "side",
    position: 3,
    startData() {return {
        unlocked: true,

		points: ExpantaNum(0),
		cd: 0
    }},
    color: "#a3a2a5",
    type: "none",

	clickables: {
		11: {
			canClick() {return player.sl.cd <= 0},
			onClick() {
				player.sl.cd = 0.2
				player.sl.points = player.sl.points.add(buyableEffect("tw", 22))
			},

			style: {
				...cssTemplate1("#A3A2A5", "#000000"),
				"background-image": "url('resources/salmo.png')",
				"background-size": "cover",
				"background-position": "center",
				"background-repeat": "no-repeat",
				"width": "200px",
				"height": "200px",
			},
		}
	},
	tabFormat: [
		["main-display", 2],
		["display-text", function(){
			let a = player.sl.points.mul(5).pow(0.08).max(1) // skill
			let b = player.sl.points.mul(3.5).pow(0.05).max(1) // time
			let c = player.sl.points.mul(2).pow(0.02).max(1) // input
			return `
			...which gives x${format(a)} Skill gain<br>
			x${format(b)} Time gain<br>
			x${format(c)} Input gain<br>
			`
		}],
		"blank",
		"clickables"
	],

	effect() {
		let a = player.sl.points.mul(3).pow(0.08).max(1) // skill
		let b = player.sl.points.mul(2.5).pow(0.05).max(1) // time
		let c = player.sl.points.mul(2).pow(0.02).max(1) // input
		return [a,b,c]
	},
    layerShown() {return hasUpgrade("c2", 23)},
    tooltip() {return "Slamo Clicker"},
	update(diff){
		if (player.sl.cd <= 0) player.sl.cd = 0
		else player.sl.cd -= diff
	}
})

addLayer("ord1", {
    name: "Void",
    resource: "Void",
    nodeStyle: {
        "outline": "2px solid white",
        "border-radius": "0%",
        "outline-color": "#b3b3b3",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#8f8f8f",
        "background-image": "url('resources/ord1.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    position: 1,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0),
	}},
    color: "#8f8f8f",
    type: "custom",
    row: 67,
	requires: jay(1.7976e308),
	baseAmount() {return player.points},
	
    upgrades: {
		/*
        11: {
			fullDisplay(){
				return displayUpgBig("-15", "Joyful", "Unlock The Keyboard.", "Cost: 600,000,000 Skill", ["c1", 11])
			},
            style: {
				"width": "150px",
				"height": "150px",
				...cssTemplate1("#CEFA05", "#8cac00")
            },
			unlocked() {return hasUpgrade("c0", 71)},
			
			canAfford(){return player.points.gte(600000000)},
			pay(){player.points = player.points.minus(600000000)}
        },*/
    },
	infoboxes: {
		info: {
			title: "Class 21: Ordinals - Liminal",
			body() {
				return `
				filler
				`
			},
		},
	},
	clickables: {
	},
	hotkeys: [

    ],
	getResetGain() {
		let r = unjay(player.points).div(1.7976e308).sqrt()
		return r
	},
	getNextAt() {
		let r = jay(ExpantaNum(1.7976e308).pow(
			ExpantaNum.pow(2, player.ord1.points))
		)
		return r
	},
	prestigeButtonText(){
		return `Reset all progress to gain <b>${format(this.getResetGain())}</b> Void.<br><br>Next at ${format(this.getNextAt())} points.`
	},

    layerShown() {return hasUpgrade("c0", 71)},
    tooltip() {return "Class 21 - Liminal"},
	effect(){return 0},
	effectDescription(){return `which boosts Skill by x${format(this.effect())}`},
	update(diff){
	}
})

addLayer("tree-tab", {
    tabFormat: [
		["layer-proxy", ["cn", [
			["infobox", "lore"],
			["infobox", "info"],
			"blank",
			"upgrades-margin"
		]]],

		["layer-proxy", function(){ if (hasUpgrade("cn", 71)) {
			return ["c0", [
				["infobox", "info"],
				"time-display",
				["display-text", `Time Hardcap is ${formatTime(player.c0.hardcap)}. (${player.c0.hardcap}s)`],
				"blank",
				"clickables",
				["bar", "ms_boost"],
				"blank",
				"upgrades-margin"
			]]
		}}],

		["layer-proxy", function(){ if (hasUpgrade("c0", 71)) {
			return ["c1", [
				["infobox", "info"],
				"main-display",
				"blank",
				"clickables",
				['display-text', `
					${appendIf(hasUpgrade("c0", 71), `Spacebar: +${player.c1.mult} Input(s) (Cooldown: ${format(player.c1.keyboardCD[0])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 21), `W: +${player.c1.mult} Input(s) (${player.c1.keyboardAttributes[1]}% chance for +${player.c1.mult} extra) (Cooldown: ${format(player.c1.keyboardCD[1])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 32), `A: +${player.c1.mult} Input(s), and -${player.c1.keyboardAttributes[2]}s current cooldown for all hotkeys (Cooldown: ${format(player.c1.keyboardCD[2])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 23), `S: +${player.c1.mult} Input(s) (${player.c1.keyboardAttributes[3]}% chance for +${player.c1.mult*2} extra) (Cooldown: ${format(player.c1.keyboardCD[3])}s)`)} <br>
					${appendIf(hasUpgrade("c1", 32), `D: +${player.c1.mult * 2} Input(s), but +${player.c1.keyboardAttributes[4]}s current cooldown for all hotkeys (Cooldown: ${format(player.c1.keyboardCD[4])}s)`)} <br>
					(You can also press WASD and Spacebar on your keyboard)
					`
				],
				"blank",
				"upgrades-margin"
			]]
		}}],

		["layer-proxy", function(){ if (hasUpgrade("c1", 81) || player.c2.points.gt(0)) {
			return ["c2", [
				["infobox", "info"],
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				"upgrades-margin",
			]]
		}}],

		["layer-proxy", function(){ if (player.opt_preview_ordinals) {
			return ["ord1", [
				["infobox", "info"],
				"main-display",
				"prestige-button",
				"blank",
				"upgrades-margin"
			]]
		}}],
	],
    previousTab: "",
    leftTab: true,

	// update base skill gain
	update(){
		let gain = ExpantaNum(0)
		if (hasUpgrade("cn", 11)) {gain = gain.add(0.0001)}
		if (hasUpgrade("cn", 42)) {gain = gain.add(0.0001)}
		if (hasUpgrade("cn", 43)) {gain = gain.add(0.0002)}
		if (hasUpgrade("cn", 62)) {gain = gain.add(0.0003)}
		if (hasUpgrade("cn", 64)) {gain = gain.add(0.0008)}
		if (hasUpgrade("cn", 71)) {gain = gain.add(0.002)}
		if (hasUpgrade("c0", 32)) {gain = gain.add(0.006)}
		if (hasUpgrade("c1", 64)) {gain = gain.add(0.0105)}
		if (hasUpgrade("c1", 81)) {gain = gain.add(0.03)}

		if (hasUpgrade("c2", 14)) {gain = gain.add(0.0002)}
		
		player.baseSkillGain = gain
	}
})