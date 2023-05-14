<template>
  <div class="app">
    <div class="tab-buttons">
      <button @click="activateTab(1)" :class="{ active: activeTab === 1 }">Runtime</button>
      <button @click="activateTab(2)" :class="{ active: activeTab === 2 }">Automation</button>
      <button @click="activateTab(3)" :class="{ active: activeTab === 3 }">Upgrades</button>
      <button @click="activateTab(4)" :class="{ active: activeTab === 4 }">Prestige</button>
      <button @click="activateTab(5)" :class="{ active: activeTab === 5 }">Statistics</button>
    </div>

    <div class="tab-content">
      <div class="tab-1">
        <!-- content for tab 1, which is the main game tab -->

        <div class="box left-box">
          <div class="skill-widget" v-for="skill in skills" :key="skill.id">
            <h2>{{ skill.name }}</h2>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Level</th>
                  <th>XP</th>
                  <th>XP needed</th>
                  <th>Multiplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>WIP XP</td>
                  <td>{{ skill.wipLevel }}</td>
                  <td>{{ skill.wipDisplayXp }}</td>
                  <td>{{ skill.wipDisplayXpNeeded }}</td>
                  <td>{{ skill.wipDisplayMultiplier }}</td>
                </tr>
                <tr>
                  <td>Canon XP</td>
                  <td>{{ skill.canonLevel }}</td>
                  <td>{{ skill.canonDisplayXp }}</td>
                  <td>{{ skill.canonDisplayXpNeeded }}</td>
                  <td>{{ skill.canonDisplayMultiplier }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box center-box">
          <h2>fanfic-idle</h2>
          <p>{{ storyText }}</p>
          <div class="button-container">
            <button @click="readPage">Read page</button>
            <div class="timer">{{ readTimer }}</div>
          </div>
          <div class="button-container">
            <button @click="loveCharacter" :disabled="loveButtonDisabled">Love character</button>
            <div class="timer">{{ loveTimer }}</div>
          </div>
          <div class="button-container">
            <button @click="analText" :disabled="analButtonDisabled">Analyze Text</button>
            <div class="timer">{{ analTimer }}</div>
          </div>
        </div>
        <div class="box right-box">
          <h2>Right Box</h2>
          <p>This is the right box.</p>
          <ul class="inventory-list">
            <li v-for="item in inventory" :key="item.id">
              <span>{{ item.name }}</span>
              <small>{{ item.count }}</small>
            </li>
          </ul>
        </div>

      </div>
      <div class="tab-2" style="display: none">
        <!-- content for tab 2, which is where i plan to put automation controls -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Automation</h2>
          <p>This will eventually be where the automation controls are found</p>
        </div>

        <div class="box right-box">

        </div>
      </div>

      <div class="tab-3" style="display: none">
        <!-- content for tab 3, which is where upgrades will be. that's probably not right, this will
             probably actually end up being where the lists of characters, plots, tropes, settings, etc
             are stored and selected. i guess that can be 'upgrades' if you kinda squint at it-->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Upgrades and Purchases</h2>
          <p>This will eventually be where the upgrades are found and by upgrades I mean the lists of characters,
            character types, tropes, plots, settings, and so on that you've unlocked in prior run</p>
        </div>

        <div class="box right-box">

        </div>
      </div>

      <div class="tab-4" style="display: none">
        <!-- content for tab 4 -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Write that fic!</h2>
          <p>This will eventually be where the prestige controls are found. Prestiging in this game is when you generate
            the fanfic prompt that you can feed to chatgpt</p>
        </div>

        <div class="box right-box">

        </div>

      </div>

      <div class="tab-5" style="display: none">
        <!-- content for tab 5 -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Automation</h2>
          <p>This will eventually be where the statistics are found</p>
        </div>

        <div class="box right-box">

        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 1,

      storyText: "You need to create, but first you must find inspiration. Read something. Read a lot of things. Read 5 things.",

      storyTexts: [
        "You need to create, but first you must find inspiration. Read something. Read a lot of things. Read 5 things.",
        "Some of these characters you meet resonate at a deeper level of your self",
        "You have found inspiration. Now go and create something amazing!"
      ],

      skills: [
        {
          id: 1,
          name: 'Reading',
          wipLevel: 1,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          wipDisplayXp: 0,
          wipDisplayXpNeeded: 100,
          wipDisplayMultiplier: 1,

          canonLevel: 1,
          canonXp: 0,
          canonXpNeeded: 100,
          canonMultiplier: 1,
          canonDisplayXp: 0,
          canonDisplayXpNeeded: 100,
          canonDisplayMultiplier: 1,

        },
        {
          id: 2,
          name: 'Characterization',
          wipLevel: 1,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          canonLevel: 1,
          canonXp: 0,
          canonXpNeeded: 100,
          canonMultiplier: 1,
        },

        {
          id: 3,
          name: 'Analysis',
          wipLevel: 1,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          canonLevel: 1,
          canonXp: 0,
          canonXpNeeded: 100,
          canonMultiplier: 1,
        },

      ],

      inventory: [
        { id: 1, name: "Pages read", count: 0 },
        { id: 2, name: "Characters loved", count: 0 },
        { id: 3, name: "Trope parts", count: 0 }
      ],
      readTimer: '0/10', // Added timer variable here
      loveTimer: '0/20', // the right way for this to work is for these timers to actually
      analTimer: '0/30', // be the job cost and for that to be carried around in a job object
      // we'll do that Real Soon Now

      loveButtonDisabled: true,
      analButtonDisabled: true,

      // xp growth factor is how much more xp is needed for the next level
      canonXpGrowthFactor: 1.02,
      wipXpGrowthFactor: 1.2,

      // mult growth factor is how much the multiplier goes up
      canonMultGrowthFactor: 2,
      wipMultGrowthFactor: 5,
      // canonMultGrowthFactor: 1.01,
      // wipMultGrowthFactor: 1.1,


    }
  },
  methods: {
    activateTab(tabIndex) {
      // hide the currently active tab
      document.querySelector(`.tab-${this.activeTab}`).style.display = 'none';

      // show the newly selected tab
      document.querySelector(`.tab-${tabIndex}`).style.display = 'block';

      // set the active tab index
      this.activeTab = tabIndex;
    },

    readPage() {
      let counter = 0;
      // get our current xp values and multiplier for the reading skill
      let readMult = this.skills[0].canonMultiplier * this.skills[0].wipMultiplier;

      const interval = setInterval(() => {
        counter += readMult;
        this.readTimer = `${counter}/10`;

        // add to our experience, update the display value, level if necessary
        this.addSkillXp(this.skills[0], readMult);

        if (counter >= 10) {
          clearInterval(interval);
          this.readTimer = `0/10`;
          this.inventory[0].count++;
          if (this.inventory[0].count >= 5) {
            this.storyText = this.storyTexts[1];
            this.loveButtonDisabled = false;
          }
          if (this.inventory[0].count >= 10) {  // i need to update the story text to reflect the analyze button working,
            // but doing that requires fixing where i change for the character button and
            // i'm trying to get other stuff working first
            this.analButtonDisabled = false;
          }
        }
      }, 1000);
    }, // readPage

    loveCharacter() {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        this.loveTimer = `${counter}/20`;
        if (counter === 20) {
          clearInterval(interval);
          this.loveTimer = `0/20`;
          this.inventory[1].count++;     // add a loved character
          this.inventory[0].count -= 5;  // remove 5 read pages
          if (this.inventory[0].count < 5) {
            this.loveButtonDisabled = true;
          }

        }
      }, 1000);
    }, // loveCharacter

    analText() {
      let counter = 0;
      const intrerval = setInterval(() => {
        counter++;
        this.analTimer = `${counter}/30`;
        if (counter === 30) {
          clearInterval(intrerval);
          this.analTimer = '0/30';
          this.inventory[2]++;  // add a trope fragment
          this.inventory[0].count -= 10; // remove 10 read pages
          if (this.inventory[0].count < 10) {
            this.analButtonDisabled = true;
          }
        }
      }, 1000);
    }, // analText

    formatDisplayNumber(v) {
      if (v < 10) {
        return Math.floor(v * 100) / 100;
      }
      if (v < 100) {
        return Math.floor(v * 10) / 10;
      }
      return Math.floor(v);

    },

    addSkillXp(skill, xp) {
      // xp has a number, skill is a skill structure. we add the xp to the
      // current skill's wip and canon xp, we check both for level up and do
      // that if necessary, then we set the rounded display versions and return
      skill.canonXp += xp;
      skill.canonDisplayXp = this.formatDisplayNumber(skill.canonXp);
        if (skill.canonXp > skill.canonXpNeeded) {
          skill.canonLevel++;
          skill.canonMultiplier *= this.canonMultGrowthFactor;
          skill.canonXpNeeded *= this.canonXpGrowthFactor;
          skill.canonXp = 0;
          skill.canonDisplayXp = 0;
          skill.canonDisplayXpNeeded = this.formatDisplayNumber(skill.canonXpNeeded);
          skill.canonDisplayMultiplier = this.formatDisplayNumber(skill.canonMultiplier);
        }

        skill.wipXp += xp;
        skill.wipDisplayXp = this.formatDisplayNumber(skill.wipXp);

        if (skill.wipXp > skill.wipXpNeeded) {
          skill.wipLevel++;
          skill.wipMultiplier *= this.wipMultGrowthFactor;
          skill.wipXpNeeded *= this.wipXpGrowthFactor;
          skill.wipXp = 0;
          skill.wipDisplayXp = 0;
          skill.wipDisplayXpNeeded = this.formatDisplayNumber(skill.wipXpNeeded);
          skill.wipDisplayMultiplier = this.formatDisplayNumber(skill.wipMultiplier);
        }


    },

  },


}
</script>

<style>
/* Set the background color to black */
body {
  background-color: #1e1e1e;
}

/* Set the text color to white */
h2,
p,
td {
  color: #fff;
}

/* style tabs */
/* styles for tab buttons */
.tab-buttons {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
}

.tab-buttons button {
  font-size: 16px;
  padding: 10px;
  border: none;
  background-color: #423434;
  cursor: pointer;
}

.tab-buttons button.active {
  background-color: #007aff;
  color: #423434;
}

/* styles for tab content */
.tab-content {
  position: relative;
}

.tab-content>div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* padding: 20px; */
  border: 1px solid #666;
  border-radius: 5px;
  box-sizing: border-box;
}

.tab-content>div:not(.tab-1) {
  display: none;
}

/* Style the boxes */
.box {
  background-color: #333;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  box-sizing: border-box;
}

/* Style the left box */
.left-box {
  width: calc(20% - 40px);
  float: left;
}

/* Style the center box */
.center-box {
  width: calc(60% - 40px);
  float: left;
}

/* Style the right box */
.right-box {
  width: calc(20% - 40px);
  float: right;
}

/* Style the inventory list */
.inventory-list {
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.inventory-list li {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #555;
  border-radius: 5px;
  color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inventory-list li span {
  font-size: 18px;
  font-weight: bold;
}

.inventory-list li small {
  font-size: 14px;
  color: #ddd;
}




/* Style the skill widget */
.skill-widget {
  margin-bottom: 20px;
}

.skill-widget h2 {
  font-size: 16px;
  margin-bottom: 10px;
}

.skill-widget table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid #666;
  /* Add border style */

}

.skill-widget th,
.skill-widget td {
  padding: 5px;
  text-align: center;
  color: #ddd;
  border: 1px solid #666;
  /* Add border style */
}

.skill-widget th {
  font-size: 12px;
}

.skill-widget td {
  font-size: 14px;
}


/* Style the button */
button {
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #617eb9;
}

button:disabled {
  background-color: grey;
}

.button-container {
  display: flex;
  align-items: center;
}

.timer {
  font-size: 24px;
  color: #ddd;
  margin-left: 10px;
}</style>
