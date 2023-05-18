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

        <div class="box queue-box">
          <p>THE QUEUE SHALL LIVE HERE, FEAR ME AND TREMBLE</p>
          <div class="go-box">
            <button @click="runJobs">Go!</button>
          </div>
          <div class="progress-bar" id="jobQueueItem1" width="100%">
            <!--                <div class="progress-fill" id="jobQueueFill1" style="width: 54%" > </div> -->
            <div class="progress-text" id="jobQueueItemName1"> </div>

            <div class="progress-fill" id="jobQueueFill1"> </div>

          </div>
          <hr />

          <ul class="job-queue">
            <li v-for="item in jobqueue" :key="item.id">
              <div class="progress-bar">
                <div class="progress-fill progressFill"></div>
                <div class="progress-text">{{ item.name }}</div>
              </div>
            </li>
          </ul>

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
          multiplier: 1,

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
          multiplier: 1,

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
          id: 3,
          name: 'Analysis',
          multiplier: 1,

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

      ],

      // i need to figure out how i want to represent what a job costs here
      // there are a couple of components to cost. there is the xp cost, got that
      // covered. but there's also the material cost, ie love character costs 5 pages
      // and analyze plot costs 10 pages and so on and i'm not sure off the top of my
      // head how i want to solve for that. the way i've got the object laid out right now
      // there isn't really a natural way to do that, which i guess suggests i ought to change
      // how my inventory works.
      //
      // oh, yeah, that kinda makes sense. what i can do is put what item a job generates and what
      // item a job consumes into the job structure itself. then i don't have to have readPage logic
      // that knows to turn on and off the lovechar or analtext buttons
      jobs: [
        {
          id: 1,
          name: 'ReadPage',
          cost: 10,
          skill: 'Reading',
          produces: { Page: 1 },
          consumes: {},

        },

        {
          id: 2,
          name: 'LoveCharacter',
          cost: 20,
          skill: 'Characterization',
          produces: { CharLove: 1 },
          consumes: { Page: 5 },
        },

        {
          id: 3,
          name: 'AnalyzeText',
          cost: 30,
          skill: 'Analysis',
          produces: { TropeFragment: 1 },
          consumes: { Page: 10 },
        },

      ],

      items: [
        {
          id: 1,
          name: 'Page',
        },

        {
          id: 2,
          name: 'CharLove',
        },

        {
          id: 3,
          name: 'TropeFragment',
        },
      ],

      inventory: [
        { id: 1, name: "Pages read", count: 0 },
        { id: 2, name: "Characters loved", count: 0 },
        { id: 3, name: "Trope fragments", count: 0 }
      ],

      // dummyjob: { id: 1, job: "None",},
      jobqueue: [
        //  this.dummyjob,

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
      // canonMultGrowthFactor: 2,
      // wipMultGrowthFactor: 5,
      canonMultGrowthFactor: 1.01,
      wipMultGrowthFactor: 1.1,

      // arrayPushTest: true,

      jobsRunning: false,
      jobQueueEmpty: true,

      curJob: {},
      isTicking: false,  // not sure i'm going to use this in the job loop yet



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


    // this is the main game loop right here
    runJobs() {
      if (this.jobsRunning) {
        return; // alraedy jobs running, let's not double up on that
      }

      // if there aren't jobs in the queue, no point in being here
      if (this.jobqueue.length === 0) {
        return;
      }

      this.jobsRunning = true;

      // this is pretty straightforward. 
      //   we shift the first item out of the queue.
      //   we validate that the job pre-reqs are met
      //   we deduct the item cost, if any
      //   we run the job
      //   we add newly produced items to inventory, if any
      //   we set jobsRunning to false
      //   we call runJobs
      //
      // eventually the jobqueue will be empty and will short circuit out of the recursion

      this.curJob = this.jobqueue[0];
      let s = this.getSkillFromJob(this.curJob);
      if (s.id >= 132234) {
        this.foo = "bar"; // lol, this is just to shut up an error message
      }

      // check if we can afford the job
      if (!this.canAfford(this.curJob)) {
        // uh-oh, we can't afford this job. just return
        this.jobsRunning = false;
        return;
      }

      this.jobSpend(this.curJob);

      // ok, now we set our cost for this job, set our per-second generation (which is the multiplier), and
      // do a setInterval to repeatedly do that. when the job is complete we'll mark jobsRunning as false
      // from inside the interval

      // every tick we update the timer, add xp to the current skill, test to see if
      // we're done with the job. when we're done with the job we'll detect that and 
      // clear the interval

      let counter = 0; // this will accumulate the total number of xp
      // we've earned for this job during this execution
      // so that we can tell when we've done enough and
      // the job is complete
      let xpPerTick = s.multiplier;

      var pbar = document.getElementById("jobQueueFill1");
      //var pbar = document.getElementById("jobQueueItem1");
      var ptext = document.getElementById("jobQueueItemName1");

      const interval = setInterval(() => {
        counter += xpPerTick;
        this.addSkillXp(s, xpPerTick);
        var completion = ((counter / this.curJob.cost) * 100).toFixed(0);
        console.log(completion + "%");
        pbar.style.width = completion + "%";
        ptext.innerHTML = this.curJob.name;

        // this.curJob.completion = completion + "%";
        // this.jobqueue[0].completion = completion;
        /* this.curJob.completion = ((xpPerTick / this.curJob.cost) * 100).toFixed(0); */


        if (counter >= this.curJob.cost) {
          // job is done, handle that. this means adding new inventory, clearing the jobs running flag,
          // clearing the interval, removing this job from the queue, and calling runJobs
          this.jobComplete(this.curJob);
          this.curJob.completion = 0;
          clearInterval(interval);
          this.jobsRunning = false;
          this.jobqueue.shift(); // throw away the first job now that it's done
          pbar.style.width = "0%";
          ptext.innerHTML = "";
          this.runJobs();
        }


      }, 1000);

      /*   const interval = setInterval(() => {
     counter += this.skills[0].multiplier;
     this.readTimer = `${counter}/10`;

     // add to our experience, update the display value, level if necessary
     this.addSkillXp(this.skills[0], this.skills[0].multiplier);

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
   }, 1000); */

      //



    },

    getSkillFromJob(j) {
      let skillname = j.skill;
      console.log(skillname);

      for (let i in this.skills) {
        console.log(this.skills[i].name);
        if (this.skills[i].name === skillname) {
          return this.skills[i];
        }
      }
      return;
    },

    // can we afford this job
    canAfford(j) {
      let canWe = true; // be optimistic

      // we loop through all the keys in the
      // consumes field of the job and make
      // sure that we have at least that many of
      // that item in stock. if the answer for any
      // item is no, then we can't afford it
      for (let k in Object.keys(j.consumes)) {
        // refactor all this later. right now i'm just going to do it dumb
        if (k === 'Page') {

          if (this.inventory[0].count < j.consumes[k]) {
            canWe = false;

          }
        }
      }

      return canWe;


    },

    jobSpend(j) {

      if (j.consumes.Page > 0) {
        this.inventory[0].count -= j.consumes.Page;
      }

      if (j.consumes.CharLove > 0) {
        this.inventory[1].count -= j.consumes.CharLove;
      }

      if (j.consumes.TropeFragment > 0) {
        this.inventory[2].count -= j.consumes.TropeFragment;
      }

    },

    jobComplete(j) {
      // lets add the new production

      if (j.produces.Page > 0) {
        this.inventory[0].count += j.produces.Page;
        if (this.inventory[0].count >= 5) {
          this.loveButtonDisabled = false;
        }
        if (this.inventory[0].count >= 10) {
          this.analButtonDisabled = false;
        }

      }

      if (j.produces.CharLove > 0) {
        this.inventory[1].count += j.produces.CharLove;
      }

      if (j.produces.TropeFragment > 0) {
        this.inventory[2].count += j.produces.TropeFragment;
      }


    },

    // this is how a job gets added on to the queue
    queueJob(job) {
      if (this.jobqueue.length >= 5) {
        return; // max queue length. parameterize this eventually, dude
      }
      this.jobqueue.push(job);
    },



    // totally refactoring all of this. in the new design all that happens in the job button handlers
    // is we call queueJob
    readPage() {
      this.queueJob(this.jobs[0]);

      /*   const interval = setInterval(() => {
           counter += this.skills[0].multiplier;
           this.readTimer = `${counter}/10`;
   
           // add to our experience, update the display value, level if necessary
           this.addSkillXp(this.skills[0], this.skills[0].multiplier);
   
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
         }, 1000); */
    }, // readPage

    loveCharacter() {
      this.queueJob(this.jobs[1]);

      /*      let counter = 0;
      
            this.addSkillXp(this.skills[1], this.skills[1].multiplier);
      
      
      
            const interval = setInterval(() => {
              counter += this.skills[1].multiplier;
              this.loveTimer = `${counter}/20`;
      
              this.addSkillXp(this.skills[1], this.skills[1].multiplier);
      
              if (counter >= 20) {
                clearInterval(interval);
                this.loveTimer = `0/20`;
                this.inventory[1].count++;     // add a loved character
                this.inventory[0].count -= 5;  // remove 5 read pages
                if (this.inventory[0].count < 5) {
                  this.loveButtonDisabled = true;
                }
      
              }
            }, 1000); */
    }, // loveCharacter

    analText() {
      this.queueJob(this.jobs[2]);

      /*
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        this.analTimer = `${counter}/30`;

        this.addSkillXp(this.skills[2], this.skills[2].multiplier);


        if (counter >= 30) {
          clearInterval(interval);
          this.analTimer = '0/30';
          this.inventory[2].count++;  // add a trope fragment
          this.inventory[0].count -= 10; // remove 10 read pages
          if (this.inventory[0].count < 10) {
            this.analButtonDisabled = true;
          }
        }
      }, 1000); */
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
        skill.multiplier = skill.canonMultiplier * skill.wipMultiplier;
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
        skill.multiplier = skill.canonMultiplier * skill.wipMultiplier;
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


/* progress bar stuff */

.progress-text {
  position: absolute;
  top: 5%;
  left: 0.5em;
  bottom: 0%;
  color: #fff;
}

.progress-bar {
  margin-top: 0.05em;
  position: relative;
  background-color: rgb(12, 101, 173);
  width: 100%;
}

.progress-fill {
  height: 1.6em;
  background-color: rgb(46, 148, 231);
  transition: width 0.3s ease-in-out;

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

/* style the go button */
.go-box button {
  font-size: 16px;
  padding: 10px;
  border: none;
  background-color: hwb(136 6% 35%);
  cursor: pointer;
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
  width: calc(40% - 40px);
  float: left;
}

/* Style the queue box */
.queue-box {
  width: calc(20% - 40px);
  /* Adjust width as needed */
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

/* Style the job queue */
.job-queue {
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.job-queue li {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #555;
  border-radius: 5px;
  color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-queue li span {
  font-size: 18px;
  font-weight: bold;
}

.job-queue li small {
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
}
</style>
