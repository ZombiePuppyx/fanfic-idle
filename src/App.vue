<template>
  <div class="app">
    <div class="tab-buttons">
      <button @click="activateTab(1)" :class="{ active: activeTab === 1 }">Runtime</button>
      <button @click="activateTab(2)" :class="{ active: activeTab === 2 }">Your fic</button>
      <button @click="activateTab(3)" :class="{ active: activeTab === 3 }">Automation</button>
      <button @click="activateTab(4)" :class="{ active: activeTab === 4 }">Upgrades</button>
      <button @click="activateTab(5)" :class="{ active: activeTab === 5 }">Prestige</button>
      <button @click="activateTab(6)" :class="{ active: activeTab === 6 }">How to play</button>
      <button @click="activateTab(7)" :class="{ active: activeTab === 7 }">Statistics</button>
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

          <div class="button-container">
            <button @click="handleJobButton(4)">Study Character</button>
            <div class="timer">{{ job4Timer }}</div>
          </div>
          <div class="button-container">
            <button @click="handleJobButton(5)">Discover Plot</button>
            <div class="timer">{{ job5Timer }}</div>
          </div>
          <div class="button-container">
            <button @click="handleJobButton(6)">Job 6</button>
            <div class="timer">{{ job6Timer }}</div>
          </div>



        </div>

        <div class="box third-box">
          <p>THE QUEUE SHALL LIVE HERE, FEAR ME AND TREMBLE</p>
          <div class="go-box">
            <button @click="runJobs">Go!</button>
          </div>
          <div class="progress-container">
            <div class="progress-bar" id="jobQueueItem1" width="100%">
              <!--                <div class="progress-fill" id="jobQueueFill1" style="width: 54%" > </div> -->

              <div class="progress-fill" id="jobQueueFill1"> </div>
              <div class="progress-text" id="jobQueueItemName1"> </div>

            </div>
          </div>
          <hr class="section-divider" />

          <ul class="job-queue">
            <li v-for="item in jobqueue" :key="item.id">
              <!--  <div class="progress-bar">
                <div class="progress-fill progressFill"></div>
                <div class="progress-text">{{ item.name }}</div>
              </div> -->
              {{item.name }}

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
        <!-- content for tab 2, which is where you'll select and construct your fic -->
        <div class="box left-box">
          <h2>Characters</h2>
          <div>
            <button @click="unlockCharacter" :disabled="unlockCharacterButtonDisabled">Unlock character</button>
          </div>

          <p>In here is where we're gonna put the list of unlocked characters.</p>

          <ul class="character-list">
            <li v-for="item in characters" :key="item.id">
              <!--  <div class="progress-bar">
                <div class="progress-fill progressFill"></div>
                <div class="progress-text">{{ item.name }}</div>
              </div> -->
              {{item.name }}

            </li>
          </ul>


        </div>

        <div class="box center-box">
          <h2>Your fic</h2>
          <p>You will eventually unlock more complex story structures, with multiple POVs, love triangles, non-linear
             narratives, a wider array of bad guys, and myriad other complexifications. For now, though, you can only
             write a slice of life with a love interest. So go do that.
          </p>

          <div>
            <label for="selectCharacter">Select a love interest:</label>
            <select id="selectCharacter" v-model="selectedCharacter">
              <option v-for="option in characters" :value="option.id" :key="option.id">{{ option.name }}</option>
            </select>
          </div>
          
          <hr class="section-divider"/>

          <div>
            <label for="selectPlot">Select a plot:</label>
            <select id="selectPlot" v-model="selectedPlot">
              <option v-for="option in plots" :value="option.id" :key="option.id">{{ option.name }}</option>
            </select>
          </div>

          <hr class="section-divider"/>

          <div>
<!--            <button @click="generateFic" :disabled="genFicButtonDisabled">Generate fic</button> -->
            <button @click="generateFic">Generate fic</button>

          </div>


          


        </div>

        <div class="box third-box">
          <h2>Plots</h2>
          <div>
            <button @click="unlockPlot" :disabled="unlockPlotButtonDisabled">Unlock plot</button>
          </div>

          <p>In here is where we're gonna put the list of unlocked plots.</p>

          <ul class="plot-list">
            <li v-for="item in plots" :key="item.id">
              <!--  <div class="progress-bar">
                <div class="progress-fill progressFill"></div>
                <div class="progress-text">{{ item.name }}</div>
              </div> -->
              {{item.name }}

            </li>
          </ul>


        </div>

        <div class="box right-box">
          Another list in the box, probably plots.

        </div>
      </div>



      <div class="tab-3" style="display: none">
        <!-- content for tab 3, which is where i plan to put automation controls -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Automation</h2>
          <p>This will eventually be where the automation controls are found</p>
        </div>

        <div class="box right-box">

        </div>
      </div>

      <div class="tab-4" style="display: none">
        <!-- content for tab 4, which is where upgrades will be. that's probably not right, this will
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

      <div class="tab-5" style="display: none">
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

      <div class="tab-6" style="display: none">
        <!-- content for tab 6 -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>How to play</h2>
          <p>Keep reading pages and buying character loves and trope fragments.</p>
        </div>

        <div class="box right-box">

        </div>

      </div>

      <div class="tab-7" style="display: none">
        <!-- content for tab 6 -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Statistics</h2>
          <p>This will eventually be where the statistics are found</p>
        </div>

        <div class="box right-box">

        </div>

      </div>

    </div>


    <!-- POPUPS -->

    <div class="popup-box" id="main-popup">
      <button class="close-button" @click="closePopup('main-popup')"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>This is the popup banner up here</h2>
        <div>
          <p>This is the text area of the popup.</p>
        </div>
      </div>
<!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>


    <div class="popup-box" id="character-unlock-popup" style="display: none">
      <button class="close-button" @click="closePopup('character-unlock-popup')"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>You've unlocked a character!</h2>
        <div>
          <p id="unlockedCharacterPopupDisplayText">This is the text area of the popup.</p>
        </div>
      </div>
<!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>


    <div class="popup-box" id="plot-unlock-popup" style="display: none">
      <button class="close-button" @click="closePopup('plot-unlock-popup')"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>You've unlocked a plot!</h2>
        <div>
          <p id="unlockedPlotPopupDisplayText">This is the text area of the popup.</p>
        </div>
      </div>
<!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>


    <div class="popup-box" id="generated-fic-popup" style="display: none">
      <button class="close-button" @click="closePopup('generated-fic-popup')"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>After all that work, here's your fic</h2>
        <div>
          <p id="generatedFicPopupDisplayText">This is the text area of the popup.</p>
        </div>
        <hr class="section-divider"/>
        <div class="button-container">
          <button @click="restartRun">Restart run</button>
        </div>
      </div>
<!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>




  </div> <!-- div.app -->
</template>

<script>
import { characters, plots } from './ficdata.js';
// import plots from './ficdata.js';

export default {
  data() {
    return {
      activeTab: 1,

      storyText: "You need to create, but first you must find inspiration. Read something. Read a lot of things. Read 5 things.",

      storyTexts: [
        "You need to create, but first you must find inspiration. Read something. Read a lot of things. Read 5 things.",
        // backticks on this next string because it is multi line
        `You are going to write a fan-fic. But first you must read a lot, learn to love characters, analyze text to
         identify standard plots and identify tropes, and a bunch of other skills before you can produce your first fic.
         
         To start with you need to read pages, love characters, and analyze text. Every time you read a page it will add
         one to your inventory. Loving a character costs 5 pages. Analyzing a text costs 10. `,
        "You have found inspiration. Now go and create something amazing!"
      ],

      // the stuff we imported
      characters: [ ],
      plots: [ ],


      // gameStates is an array of the states that you pass through as you make a run through the
      // game. in this first pass,the current game state controls the storytext that is displayed
      // and updates it to the next storytext when all of the pre-reqs have been satisfied. eventually
      // we'll complxify that so that we can change what jobs are available, what inventory slots are displayed,
      // and so on as we move through the game on any particular loop
      gameStates: [
        // this is our starting state
        {
          storyText: "You need to create, but first you must find inspiration. Read something. Read a lot of things. Read 5 things.",
          advanceCriteria: [
            () => {
              // console.log("in the advcrit callback for state 0 and pagesRead is (" + this.stats.currentRun.pagesRead + ")");
              return this.stats.currentRun.pagesRead >= 5;
            },
          ],

          advanceState: [
            () => {
              // turn on the loveChar button here
              this.loveButtonDisabled = false;
              

              // this is what we call to advance to the next state. it does any clean up that is required on the current
              // state in order to do that and then advances the state index pointer by one. i may refactor how this works
              // while doing the initial implementation
            },
          ],

          enterState: [
            () => {
              // handle entering this state here
            },
          ],
        },

        // this state is after the initial state, but before trope fragments are unlocked
        {
          storyText: `You are going to write a fan-fic. But first you must read a lot, learn to love characters, analyze text to
         identify standard plots and identify tropes, and a bunch of other skills before you can produce your first fic.`,
          advanceCriteria: [
            () => { return this.stats.currentRun.pagesRead >= 10; },
          ],
          advanceState: [ 
            () => {
              // turn on the analText button
              this.analButtonDisabled = false;

            },
          ],

          enterState: [
            () => {
              // handle entering this state here
              this.storyText = this.gameStates[this.curGameStateIdx].storyText;
            },
          ],

        },

        // this state is after trope fragments are unlocked
        {
          storyText: `You can feel connections being made in your mind and in your soul. These characters and their stories speak
                      to you in a way that nothing has before. Something deep inside you tells you that you need to collect 20
                      loved characters and 20 extracted tropes. `,
          advanceCriteria: [
            () => { 
              return this.stats.currentRun.tropesExtracted >= 3 && this.stats.currentRun.charactersLoved >= 3;
 
            },
          ],
          advanceState: [
            () => {


            }
          ],

          enterState: [
            () => {
              // handle entering this state here
              this.storyText = this.gameStates[this.curGameStateIdx].storyText;

            },
          ],


        },

        // we've collected 20 character loves and 20 trope fragments. time to offer the chance to 
        // get a trope or a character
        {
          storyText: `You can now unlock a character and a plot over on the 'Your fic' tab, or you can stay here
                      and keep collecting character and plot unlocks or pages, loves, and tropes. `,
          advanceCriteria: [
            () => { 
              return false; // nothing past here yet
            },
          ],
          advanceState: [
            () => {


            }
          ],

          enterState: [
            () => {
              // handle entering this state here
              this.storyText = this.gameStates[this.curGameStateIdx].storyText;
              this.unlockCharacterButtonDisabled = false;
              this.unlockPlotButtonDisabled = false;

            },
          ],

        },



      ],

      skills: [
        {
          id: 1,
          name: 'Reading',
          multiplier: 1,

          wipLevel: 0,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          wipDisplayXp: 0,
          wipDisplayXpNeeded: 100,
          wipDisplayMultiplier: 1,

          canonLevel: 0,
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

          wipLevel: 0,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          wipDisplayXp: 0,
          wipDisplayXpNeeded: 100,
          wipDisplayMultiplier: 1,

          canonLevel: 0,
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

          wipLevel: 0,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          wipDisplayXp: 0,
          wipDisplayXpNeeded: 100,
          wipDisplayMultiplier: 1,

          canonLevel: 0,
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
          produces: { Page: 10 },
          consumes: {},

        },

        {
          id: 2,
          name: 'LoveCharacter',
          cost: 20,
          skill: 'Characterization',
          produces: { CharLove: 10 },
          consumes: { Page: 5 },
        },

        {
          id: 3,
          name: 'AnalyzeText',
          cost: 30,
          skill: 'Analysis',
          produces: { TropeFragment: 10 },
          consumes: { Page: 10 },
        },

        {
          id: 4,
          name: 'StudyCharacter',
          cost: 3,
          skill: 'Characterization',
          produces: { CharacterUnlock: 1 },
          consumes: { CharLove: 3 },
        },

        {
          id: 5,
          name: 'FindPlot',
          cost: 3,
          skill: 'Analysis',
          produces: { PlotUnlock: 1 },
          consumes: { TropeFragment: 3 },
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

        {
          id: 4,
          name: 'CharacterUnlock',
        },

        {
          id: 5,
          name: 'PlotUnlock',
        },


      ],

      inventory: [
        { id: 1, name: "Pages read", count: 0 },
        { id: 2, name: "Characters loved", count: 0 },
        { id: 3, name: "Trope fragments", count: 0 },
        { id: 4, name: "Character unlocks", count: 0 },
        { id: 5, name: "Plot unlocks", count: 0 },

      ],

      // dummyjob: { id: 1, job: "None",},
      jobqueue: [
        //  this.dummyjob,

      ],
      readTimer: 'Cost: 10 reading', // Added timer variable here
      loveTimer: 'Cost: 20 characterization', // the right way for this to work is for these timers to actually
      analTimer: 'Cost: 30 analysis', // be the job cost and for that to be carried around in a job object
      // we'll do that Real Soon Now
      job4Timer: 'Cost: 300 characterization',
      job5Timer: 'Cost: 300 analysis',
      job6Timer: '0/60',

      loveButtonDisabled: true,
      analButtonDisabled: true,
      unlockCharacterButtonDisabled: true,
      unlockPlotButtonDisabled: true,

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

      // how many times per second do we tick
      tickScaleFactor: 30,

      // the current game state index
      curGameStateIdx: 0,

      // the selected character and plot for the actual fic generation
      selectedCharacter: 0,
      selectedPlot: 0,

      // the stats object
      stats: {
        currentRun: {
          pagesRead: 0,
          charactersLoved: 0,
          tropesExtracted: 0,
          charactersUnlocked: 0,
          plotsUnlocked: 0,

        },

        lastRun: {
          pagesRead: 0,
          charactersLoved: 0,
          tropesExtracted: 0,
          charactersUnlocked: 0,
          plotsUnlocked: 0,

        },

        alltime: {
          pagesRead: 0,
          charactersLoved: 0,
          tropesExtracted: 0,
          charactersUnlocked: 0,
          plotsUnlocked: 0,

        },
      },



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
      let xpPerTick = s.multiplier / this.tickScaleFactor;

      var pbar = document.getElementById("jobQueueFill1");
      //var pbar = document.getElementById("jobQueueItem1");
      var ptext = document.getElementById("jobQueueItemName1");

      const interval = setInterval(() => {
        counter += xpPerTick;
        this.addSkillXp(s, xpPerTick);
        var completion = ((counter / this.curJob.cost) * 100).toFixed(0);
        // console.log(completion + "%");
        pbar.style.width = completion + "%";
        ptext.innerHTML = this.curJob.name;

        // this.curJob.completion = completion + "%";
        // this.jobqueue[0].completion = completion;
        /* this.curJob.completion = ((xpPerTick / this.curJob.cost) * 100).toFixed(0); */


        if (counter >= this.curJob.cost) {
          // job is done, handle that. this means adding new inventory, clearing the jobs running flag,
          // clearing the interval, removing this job from the queue, checking if we have a game state
          // advance and handling it if so, and calling runJobs
          this.jobComplete(this.curJob);
          this.curJob.completion = 0;
          clearInterval(interval);
          this.jobsRunning = false;
          this.jobqueue.shift(); // throw away the first job now that it's done
          pbar.classList.add('instant');
          pbar.style.width = "0%";
          pbar.classList.remove('instant');
          ptext.innerHTML = "";
          // check if we finished the current gameState. as soon as an advancement criteria fails we'll mark
          // the done var as false and bail out of the loop. if we get past the loop with done still equal to true
          // it means that every advancement criteria was met
          let done = true;
          for (let idx = 0; idx < this.gameStates[this.curGameStateIdx].advanceCriteria.length; idx++) {
            let test = this.gameStates[this.curGameStateIdx].advanceCriteria[idx]();
            if (test === false) {
              done = false;
              break;
            }
          }

          if (done) {
            // we're done, we need to advance the state
            this.gameStates[this.curGameStateIdx].advanceState[0]();
            this.curGameStateIdx++;

            // now call enterstate for the new gamestate
            this.gameStates[this.curGameStateIdx].enterState[0]();
          }

          this.runJobs();
        }


      }, 1000 / this.tickScaleFactor);



    },

    getSkillFromJob(j) {
      let skillname = j.skill;
      // console.log(skillname);

      for (let i in this.skills) {
        // console.log(this.skills[i].name);
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
        this.stats.currentRun.pagesRead += j.produces.Page;
      }

      if (j.produces.CharLove > 0) {
        this.inventory[1].count += j.produces.CharLove;
        this.stats.currentRun.charactersLoved += j.produces.CharLove;
      }

      if (j.produces.TropeFragment > 0) {
        this.inventory[2].count += j.produces.TropeFragment;
        this.stats.currentRun.tropesExtracted += j.produces.TropeFragment;
      }

      if (j.produces.CharacterUnlock > 0) {
        this.inventory[3].count += j.produces.CharacterUnlock;
        this.stats.currentRun.charactersUnlocked += j.produces.CharacterUnlock;
      }

      if (j.produces.PlotUnlock > 0) {
        this.inventory[4].count += j.produces.PlotUnlock;
        this.stats.currentRun.plotsUnlocked += j.produces.PlotUnlock;
      }


    },

    // this is how a job gets added on to the queue
    queueJob(job) {
      if (this.jobqueue.length >= 500) {
        return; // max queue length. parameterize this eventually, dude
      }
      this.jobqueue.push(job);
    },


    handleJobButton(num) {
      // 1 is readPage
      if(num === 1) {
        this.queueJOb(this.jobs[0]);
        return;
      }
      // 2 is loveChar
      else if (num === 2) {
        this.queueJob(this.jobs[1]);
      }
      // 3 is analtext
      else if (num === 3) {
        this.queueJob(this.jobs[2]);
      }
      // 4 is character study
      else if (num === 4) {
        this.queueJob(this.jobs[3]);
      }
      // 5 is find plot
      else if (num === 5) {
        this.queueJob(this.jobs[4]);
      }
      else {
        console.log("unknown job (" + num + ")");
      }

    },

    // totally refactoring all of this. in the new design all that happens in the job button handlers
    // is we call queueJob
    readPage() {
      this.queueJob(this.jobs[0]);
    }, // readPage

    loveCharacter() {
      this.queueJob(this.jobs[1]);
    }, // loveCharacter

    analText() {
      this.queueJob(this.jobs[2]);
    }, // analText

    // this unlocks a random character. it is called from the characters pane of the your fic tab
    unlockCharacter() {
      let i = Math.floor(Math.random() * characters.length);
      let c = characters[i];
      this.characters.push(c);

      // let's update the text in our popup that we're about to pop up
      let p = document.getElementById('unlockedCharacterPopupDisplayText');
      p.innerHTML = "Fuck yeah! You've unlocked the very famous " + c.name + " to be a character in your fic";

      this.displayPopup('character-unlock-popup');
//      console.log(c.name);

    },

    unlockPlot() {
      let i = Math.floor(Math.random() * plots.length);
      let p = plots[i];
      this.plots.push(p);

      // let's update the text in our popup that we're about to pop up
      let t = document.getElementById('unlockedPlotPopupDisplayText');
      t.innerHTML = "Fuck yeah! You've unlocked the very famous " + p.name + " plot to enjoy with your love interest";

      this.displayPopup('plot-unlock-popup');


      console.log(p.name);
    },

    generateFic() {
      // this is where we gen our fic. we're gonna do this dumb the first time and then refactor it
      // later on.
      //
      // what we need to do here:
      //   1. get our love interest
      //   2. get our plot
      //   3. get our text template (hardcode it here for now)
      //   4. interpolate our vars into the text
      //   5. display it in a popup
      //   6. look at boobs
      //      6a.  ( . Y . )
      //   7. profit


      var char, plot; // these will be the actual objs
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i].id === this.selectedCharacter) {
          char = this.characters[i];
          console.log(char.name);
          break;
        }
      } 

      for (let i = 0; i < this.plots.length; i++) {
        if (this.plots[i].id === this.selectedPlot) {
          plot = this.plots[i];
          console.log(plot.name);
          break;
        }
      } 

      var fic = `Generate a 5-7 paragraph star wars fan fic detailing a slice of life day between the main character, a heterosexual man,
                 and his love interest ${char.name} as they navigate ${plot.name}

      `;

      var dispText = document.getElementById("generatedFicPopupDisplayText");
      dispText.innerHTML = fic;

      this.displayPopup('generated-fic-popup');



    },

    restartRun() {
      // this will get complicated eventually, but for now we just reset the character and plot menus
      // and wipe out the wip xp and inventory, and return to game state 0

      this.characters = [ ];
      this.plots = [ ];

      for (let i = 0; i < this.inventory.length; i++) {
        this.inventory[i].count = 0;
      }

      for (let i = 0; i < this.skills.length; i++) {
        this.skills[i].wipLevel = 0;
        this.skills[i].wipXp = 0;
        this.skills[i].wipXpNeeded = 100;
        this.skills[i].wipMultiplier = 1;
        this.skills[i].wipDisplayXp = 0;
        this.skills[i].wipDisplayXpNeeded = 100;
        this.skills[i].wipDisplayMultiplier = 1;
      }

      this.closePopup('generated-fic-popup');
      this.activateTab(1);
    },

    formatDisplayNumber(v) {
      if (v < 10) {
        return Math.floor(v * 100) / 100;
      }
      if (v < 100) {
        return Math.floor(v * 10) / 10;
      }
      return Math.floor(v);

    },
 
    displayPopup(name) {
      let popup = document.getElementById(name);
      popup.style.display = 'block';

    },

    closePopup(name) {
      let popup = document.getElementById(name);
      popup.style.display = 'none';
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
  color: #ffffff;
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
  font-weight: bold;
}

.progress-bar {
  margin-top: 0.05em;
  position: relative;
  background-color: rgb(12, 101, 173);
  width: 100%;
}

.progress-fill {
  position: absolute;
  /*  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  height: 1.6em;
  background-color: rgb(46, 148, 231);

  transition-property: width;
  transition-duration: 0s, 0.3s;
  /* Two transition durations */
  transition-timing-function: linear, ease-in-out;
  /* Two transition timing functions */


  /* transition: width 0.3s ease-in-out; */

}

.progress.instant {
  transition-duration: 0s !important;
  /* Override the transition duration to be instant */
}


.progress-container {
  margin-bottom: 20px;
  padding: 2px;


}




/* style tabs */
/* styles for tab buttons */
.tab-buttons {
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  /* margin-bottom: 20px; */
}

.tab-buttons button {
  font-size: 16px;
  padding: 10px;
  border: none;
  background-color: #2c2929;
  cursor: pointer;
}

.tab-buttons button.active {
  background-color: #423434;
  color: #fff;
  font-weight: bold;
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

/* go box */
.go-box {
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
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
.third-box {
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

.section-divider {
  margin-top: 20px;
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

/* Style the popup box */
.popup-box {
  position: fixed;
  display: box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 20px;
  z-index: 9999;
}

/* Style the border for the popup content */
.popup-box .popup-content {
  border: 1px solid #ccc;
  padding: 10px;
}

/* Style the close button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.close-button::before,
.close-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 2px;
  background-color: #000;
}

.close-button::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close-button::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.close-button.bottom {
  top: auto;
  bottom: 10px;
}

</style>
