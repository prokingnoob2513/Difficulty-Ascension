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
			isBoughtText = `<h3 style="color: #00ff00">Current: x${upgradeEffect(upgId[0], upgId[1]).toFixed(2)}</h3>`
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
			isBoughtText = `<h4 style="color: #00ff00">Current: x${upgradeEffect(upgId[0], upgId[1]).toFixed(2)}</h4>`
		} else {
			isBoughtText = `<h4 style="color: #00ff00">Bought!</h4>`
		}
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
const lerp = (start, end, t) => start * (1 - t) + end * t


addLayer("cn", {
    name: "Skill",
    resource: "Skill",
    nodeStyle: {
        "outline": "2px solid white",
        "border-radius": "0%",
        "outline-color": "#FFFFFF",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#000000",
        "background-image": "url('resources/-inf.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    position: 0,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0) // useless
    }},
    color: "#C1FF9F",
    type: "none",
    row: 0,
	
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
				return displayUpgSmall("-130", "Ifinite-Easy", "+0.0002 base Skill gain.", "Cost: 0.2 Skill", ["cn", 43])
			},
            style: {
				...cssTemplate1("#00bb00", "#d80000")
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
				player.cn.upgrades.length + player.c0.upgrades.length
			)},
			
			canAfford(){return player.points.gte(1)},
			pay(){player.points = player.points.minus(1)}
        },
		61: {
			fullDisplay(){
				return displayUpgSmall("-80", "Disco", "True Ease's effect is improved.", "Cost: 3 Skill", ["cn", 61])
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
			body() {return "too lazy 😴😴"}
		},
		info: {
			title: "Class Negative: Unlosable",
			body() {
				return `
				<h2>class info here</h2><br>
				Skill is the main currency, used for ascening difficulties. It is passively generated every second.<br>
				Formula: [Base gain] * [Multipliers]<br>
				Base gain: ${player.baseSkillGain}
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
        "outline": "2px solid white",
        "border-radius": "0%",
        "outline-color": "#FAC2FF",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#F470FE",
        "background-image": "url('resources/-30.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
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
    row: 0,
	
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
				<h2>class info here</h2><br>
				Time is a "waiting" currency and it's also passively generated.<br><br>
				There are sub-difficulties in this class, which you don't need to buy in order to unlock the next difficulty. However, they mostly use a different currency/multiple currencies for buying.
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
				let d = hasUpgrade("c0", 52) ? 4 : 30

				return `
				<h3>Convert Time into Skill</h3><br>
				(${format(getPointGen().mul(player.c0.points).div(d))} Skill)`
			},
			unlocked(){return hasUpgrade("c0", 41)},
			
			canClick(){return player.c0.points.gte(300)},
			onClick(){
				let d = hasUpgrade("c0", 52) ? 4 : 30

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
		if (player.c0.ms_boost_fill < 0) {
			player.c0.ms_boost_fill = 0
		} else {
			if (!hasUpgrade("c0", 63)) {
				player.c0.ms_boost_fill -= hasUpgrade("c0", 25) ? 0.0015 : 0.0025
			}
		}

		let time_gain = ExpantaNum(0.01 * diff)
		time_gain = time_gain.mul(lerp(1, player.c0.ms_boost_cap, player.c0.ms_boost_fill))
		
		if (hasUpgrade("c0", 12)) {time_gain = time_gain.mul(1.75)}
		if (hasUpgrade("c0", 14)) {time_gain = time_gain.mul(1.8)}
		if (hasUpgrade("c0", 21)) {time_gain = time_gain.mul(upgradeEffect("c0", 21))}
		if (hasUpgrade("c0", 24)) {time_gain = time_gain.mul(1.25)}
		if (hasUpgrade("c0", 33)) {
			if (hasUpgrade("c0", 61)) {
				player.c0.hardcap = hasUpgrade("c0", 71) ? 3600 : 2400
			} else {
				player.c0.hardcap = 1500
			}
		} else {
			player.c0.hardcap = 900
		}
		if (hasUpgrade("c0", 42)) {time_gain = time_gain.mul(upgradeEffect("c0", 42))}
		if (hasUpgrade("c0", 43)) {time_gain = time_gain.mul(1.5)}
		if (hasUpgrade("c0", 52)) {time_gain = time_gain.div(5)}
		if (hasUpgrade("c0", 53)) {time_gain = time_gain.div(2)}
		if (hasUpgrade("c0", 62)) {
			if (player.c0.points.lt(300)){time_gain = time_gain.mul(4)}
		}

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
        "outline": "2px solid white",
        "border-radius": "0%",
        "outline-color": "#90b101",
        "width": "125px",
        "height": "125px",
		
		"background-color": "#CEFA05",
        "background-image": "url('resources/-15.png')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat"
    },
    symbol: "",
    position: 1,
    startData() {return {
        unlocked: true,
        points: ExpantaNum(0),

		keyboardFocus: false,
		keyboardCD: 0,
		keyboardText: "Focus"
	}},
    color: "#e2ff61",
    type: "none",
    row: 0,
	
    upgrades: {
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
        },
    },
	infoboxes: {
		info: {
			title: "Class 1: Simple",
			body() {
				return `
				<h2>class info here</h2><br>
				Time is a "waiting" currency and it's also passively generated.<br><br>
				cry for me wah wah wah
				`
			},
		},
	},
	clickables: {
		// focus (4s cd)
		11: {
			display(){return `<h2>${player.c1.keyboardText}</h2><br>Available keys: Spacebar<br>Cooldown: ${format(player.c1.keyboardCD)}`},
			unlocked(){return hasUpgrade("c1", 11)},
			
			canClick(){return true},
			onClick(){player.c1.keyboardFocus = !player.c1.keyboardFocus},
			style(){
				if (player.c1.keyboardFocus) return {"background-color": "#fc3e3e"}
			}
		},
	},
	hotkeys: [
        {
			key: " ",
			description: "Spacebar: Jump (+1 input)",
			onPress(){
				if (player.c1.keyboardCD <= 0) {
					player.c1.points = player.c1.points.add(1)
					player.c1.keyboardCD = 4
				}
			},
			unlocked() {return player.c1.keyboardFocus}
		}
    ],

    layerShown() {return hasUpgrade("c0", 71)},
    tooltip() {return "Class 1"},
	effect(){
		// inputs+1
		return player.c1.points.add(1)
	},
	effectDescription(){return `which also boosts Skill by x${format(this.effect())}`},
	update(diff){
		if (player.c1.keyboardCD > 0) player.c1.keyboardCD -= diff
		else player.c1.keyboardCD = 0

		if (player.c1.keyboardFocus) player.c1.keyboardText = "Unfocus"
		else player.c1.keyboardText = "Focus"
	}
})


/*
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "-1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
	points: ExpantaNum(0),
    }},
    color: "#4BDC13",
    requires: ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = ExpantaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
currencyLocation() {return player[this.layer].buyables},
["points-display", ["skill", "#C1FF9F", 2]],
*/

addLayer("tree-tab", {
    tabFormat: [
		/*["tree", function() {
			return (hasUpgrade("c1", 11) ? [["cn", "c0", "c1"]] : [])
		}],*/
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
		
		player.baseSkillGain = gain
	}
})