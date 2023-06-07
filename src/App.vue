<template>
  <div class="app">
    <div class="tab-buttons">
      <button @click="activateTab(1)" :class="{ active: activeTab === 1 }">Runtime</button>
      <button @click="activateTab(2)" :class="{ active: activeTab === 2 }">Your fic</button>
      <!--
      <button @click="activateTab(3)" :class="{ active: activeTab === 3 }">Automation</button>
      <button @click="activateTab(4)" :class="{ active: activeTab === 4 }">Upgrades</button>
      <button @click="activateTab(5)" :class="{ active: activeTab === 5 }">Prestige</button>
-->
      <button @click="activateTab(6)" :class="{ active: activeTab === 6 }">How to play</button>
      <button @click="activateTab(7)" :class="{ active: activeTab === 7 }">Statistics</button>
      <button @click="activateTab(8)" :class="{ active: activeTab === 8 }">Options</button>
      <button class="tickBox">{{ ticksRemaining }}</button>

    </div>

    <div class="tab-content">
      <div class="tab-1">
        <!-- content for tab 1, which is the main game tab -->

        <div class="box left-box">
          <div class="skill-widget" v-for="skill in skills" :key="skill.id">
            <h2>{{ skill.name }} : {{ skill.displayMultiplier }}x normal</h2>
            <table>
              <tr>
                <td colspan="5">
                  <div class="progress-container" style="height: 1px; padding: 0">
                    <div class="progress-bar tooltip" width="100%" style="height: 10px">
                      <div class="progress-fill-wip" :id="'skillWipProgressFill-' + skill.id" style="height: 10px"></div>
                      <span class="tooltipText">
                        <p>Work in Progress experience (resets each run)</p>
                        <p>Lvl: {{ skill.wipLevel }} </p>
                        <p>XP: {{ skill.wipDisplayXp }}/{{ skill.wipDisplayXpNeeded }} </p>
                        <p>Multiplier: {{ skill.wipDisplayMultiplier }} </p>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="5">
                  <div class="progress-container" style="height: 1px; padding: 0">
                    <div class="canonXpBar tooltip" width="100%" style="height: 10px">
                      <div class="progress-fill-canon" :id="'skillCanonProgressFill-' + skill.id" style="height: 10px">
                      </div>
                      <span class="tooltipText">
                        <p>Canon experience (doesn't reset between runs)</p>
                        <p>Lvl: {{ skill.canonLevel }} </p>
                        <p>XP: {{ skill.canonDisplayXp }}/{{ skill.canonDisplayXpNeeded }} </p>
                        <p>Multiplier: {{ skill.canonDisplayMultiplier }} </p>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- </tbody> -->
            </table>
          </div>
        </div>
        <div class="box center-box">
          <h2>Ficremental</h2>
          <p>{{ storyText }}</p>


          <!--     ORIGINAL JOB BUTTONS, DOING AN EXPERIMENT
          <div class="button-container tooltip" id="job-button-1-container">
            <span class="tooltipText">{{ readTimer }}</span>
            <button @click="handleJobButton(1)">Read page</button>            
          </div>
          <div class="button-container tooltip" id="job-button-2-container" style="display: none">
            <button @click="handleJobButton(2)">Love character</button>
            <span class="tooltipText">{{ loveTimer }}</span>
          </div>
          <div class="button-container tooltip" id="job-button-3-container" style="display: none">
            <button @click="handleJobButton(3)">Analyze Text</button>
            <span class="tooltipText">{{ analTimer }}</span>
          </div>
        -->

          <div class="button-container">
            <span class="button-container tooltip" id="job-button-1-container">
              <span class="tooltipText">{{ readTimer }}</span>
              <button @click="handleJobButton(1)">Read page</button>
            </span>
            <span class="button-container tooltip" id="job-button-2-container" style="display: none">
              <button @click="handleJobButton(2)">Love character</button>
              <span class="tooltipText">{{ loveTimer }}</span>
            </span>
            <span class="button-container tooltip" id="job-button-3-container" style="display: none">
              <button @click="handleJobButton(3)">Analyze Text</button>
              <span class="tooltipText">{{ analTimer }}</span>
            </span>
          </div>




          <div class="button-container tooltip" id="job-button-4-container" style="display: none">
            <button @click="handleJobButton(4)">Study Character</button>
            <span class="tooltipText">{{ job4Timer }}</span>
          </div>
          <div class="button-container tooltip" id="job-button-5-container" style="display: none">
            <button @click="handleJobButton(5)">Discover Plot</button>
            <span class="tooltipText">{{ job5Timer }}</span>
          </div>
          <div class="button-container tooltip" id="job-button-6-container" style="display: none">
            <button @click="handleJobButton(6)">Writing class</button>
            <span class="tooltipText">
              <p>
                This job is very expensive. You will not be able to finish it on your first run.
              </p>
              <p>
                {{ job6Timer }}
              </p>
            </span>
          </div>

          <div class="button-container tooltip" id="job-button-7-container" style="display: none">
            <button @click="handleJobButton(7)">Read series</button>
            <span class="tooltipText">{{ job7Timer }}</span>
          </div>

          <div class="button-container tooltip" id="job-button-8-container" style="display: none">
            <button @click="handleJobButton(8)">Job 8</button>
            <span class="tooltipText">{{ job6Timer }}</span>
          </div>

          <div class="button-container tooltip" id="job-button-9-container" style="display: none">
            <button @click="handleJobButton(9)">Job 9</button>
            <span class="tooltipText">{{ job6Timer }}</span>
          </div>



        </div>

        <div class="box third-box">
          <p>JOB QUEUE</p>
          <div class="go-box">
            <button class="go-button" @click="runJobs">Go!</button>
            <button class="pause-button" @click="pauseJobs">Pause</button>
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
            <li v-for="(item, index) in jobqueue" :key="item.id" @click="handleJobQueueClick(index)">
              {{ item.name }}
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
            <button @click="unlockCharacter">Unlock character</button>
          </div>

          <p>In here is where we're gonna put the list of unlocked characters.</p>

          <ul class="character-list">
            <li v-for="item in characters" :key="item.id">
              <!--  <div class="progress-bar">
                <div class="progress-fill progressFill"></div>
                <div class="progress-text">{{ item.name }}</div>
              </div> -->
              {{ item.name }}

            </li>
          </ul>


        </div>

        <div class="box center-box">
          <h2>Your fic</h2>
          <p>If you've followed directions, you've already gotten yourself a character unlock and plot unlock over there
            on
            the runtime tab. If you haven't, that's ok, you can still read about what's gonna happen here, but you can't
            do it yet.
          </p>
          <p>How this works is that you spend character unlock tokens and plot unlock tokens. The character and plot you
            draw are
            random. You can draw more than one per run. You can also draw the same character or plot more than once per
            run.
            Once you're happy with the character and plot you have you can generate your fic. Right now you're super
            limiited.
            This first fic is a meet cute between a protagonist of random gender and orientation and their love interest.
            You've
            got limited choices of venues for the meet cute to happen.
          </p>
          <p>You'll be given a large amount of experience for completing your fic and your run will restart. Your WIP
            experience
            and levels will be reset to 0, but your Canon experience and levels will remain. You'll start the next run
            able to do
            everything faster than you could the first time. How much experience you get for this fic will depend on how
            rare the
            character and plot are. Rarer characters and plots will give you more experience.
          </p>

          <div class="fic-generator-container" id="chapter-1-generator">
            <div>
              <label for="selectCharacter">Select a love interest:</label>
              <select id="selectCharacter" v-model="selectedCharacter">
                <option v-for="option in characters" :value="option.id" :key="option.id">{{ option.name }}</option>
              </select>
            </div>

            <hr class="section-divider" />

            <div>
              <label for="selectPlot">Select a plot:</label>
              <select id="selectPlot" v-model="selectedPlot">
                <option v-for="option in plots" :value="option.id" :key="option.id">{{ option.name }}</option>
              </select>
            </div>
          </div>

          <hr class="section-divider" />

          <div>
            <!--            <button @click="generateFic">Generate fic</button> -->
            <button @click="generateFic">Generate fic (this will wipe your WIP xp and inventory and restart you at the
              beginning)</button>

          </div>





        </div>

        <div class="box third-box">
          <h2>Plots</h2>
          <div>
            <button @click="unlockPlot">Unlock plot</button>
          </div>

          <p>In here is where we're gonna put the list of unlocked plots.</p>

          <ul class="plot-list">
            <li v-for="item in plots" :key="item.id">
              <!--  <div class="progress-bar">
                <div class="progress-fill progressFill"></div>
                <div class="progress-text">{{ item.name }}</div>
              </div> -->
              {{ item.name }}

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
          <p>The mechanics are pretty straightforward. You complete jobs to earn resources that are
            required to complete more jobs. You start by reading pages, and as your love for stories grows you
            begin to fall in love with characters. You start to analyze the way the stories you read are constructed.
          </p>
          <p>Once you've loved a certain number of characters and discovered a certain number of tropes you will unlock
            the ability to do much more intensive study of each. The tokens you receive for these jobs can be used to buy
            characters and plot elements for your current run.
          </p>
          <p>You only have 100,000 ticks per run. When you run out of ticks, you restart the run from the start, but
            the next run starts with everything starting out from a faster place, due to how the experience mechanic
            works.
          </p>
          <p>Which brings us to the experience mechanic. You'll note that each job has a cost next to it expressed
            as a number and the name of that skill. Each skill, such as Reading, has two experience bars, corresponding
            to two different types of experience. One type is called WIP experience, or Work In Progress, and this type
            of experience resets to 0 each time you restart the run. The other type of experience is called canon
            experience,
            and it is permanent. On your next run you'll start out with a higher canon multiplier, which will let
            you make it farther into the game during the 100,000 ticks you get.
          </p>
          <p>The two types of experience generate a multiplier. These are called the WIP multiplier and the Canon
            multiplier,
            in a burst of profound creative excellence. Multiplying them by each other gives the total multiplier for that
            skill. That number is roughly the number of points of that skill generated per second to pay for the current
            job.
            As the multipliers get bigger, you'll finish jobs faster.
          </p>
          <p>Keep reading pages and buying character loves and trope fragments.</p>
        </div>

        <div class="box third-box">
          <h2>THE TO-DO LIST</h2>
          <hr class="section-divider" />

          <ul class="todo-list">
            <li v-for="item in todolist" :key="item.id">
              {{ item.text }}
            </li>
          </ul>

          <hr class="section-divider" />
          <h2>THE TO-DONE LIST</h2>

          <ul class="todo-list">
            <li v-for="item in toDone" :key="item.id">
              {{ item.text + " (" + item.date + ")" }}
            </li>
          </ul>


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

          <div class="grid-container" display="flex" style="width: 100%">

            <div class="grid-cell">Item</div>
            <div class="grid-cell">Current Run</div>
            <div class="grid-cell">Last Run</div>
            <div class="grid-cell">All Time</div>

            <div class="grid-cell">Pages read</div>
            <div class="grid-cell">{{ stats.currentRun.pagesRead }}</div>
            <div class="grid-cell">{{ stats.lastRun.pagesRead }}</div>
            <div class="grid-cell">{{ stats.alltime.pagesRead }}</div>

            <div class="grid-cell">Characters loved</div>
            <div class="grid-cell">{{ stats.currentRun.charactersLoved }}</div>
            <div class="grid-cell">{{ stats.lastRun.charactersLoved }}</div>
            <div class="grid-cell">{{ stats.alltime.charactersLoved }}</div>

            <div class="grid-cell">Tropes extracted</div>
            <div class="grid-cell">{{ stats.currentRun.tropesExtracted }}</div>
            <div class="grid-cell">{{ stats.lastRun.tropesExtracted }}</div>
            <div class="grid-cell">{{ stats.alltime.tropesExtracted }}</div>

            <div class="grid-cell">Characters unlocked</div>
            <div class="grid-cell">{{ stats.currentRun.charactersUnlocked }}</div>
            <div class="grid-cell">{{ stats.lastRun.charactersUnlocked }}</div>
            <div class="grid-cell">{{ stats.alltime.charactersUnlocked }}</div>

            <div class="grid-cell">Plots unlocked</div>
            <div class="grid-cell">{{ stats.currentRun.plotsUnlocked }}</div>
            <div class="grid-cell">{{ stats.lastRun.plotsUnlocked }}</div>
            <div class="grid-cell">{{ stats.alltime.plotsUnlocked }}</div>

            <div class="grid-cell">Fics generated</div>
            <div class="grid-cell">{{ stats.currentRun.ficsGenerated }}</div>
            <div class="grid-cell">{{ stats.lastRun.ficsGenerated }}</div>
            <div class="grid-cell">{{ stats.alltime.ficsGenerated }}</div>
          </div>
        </div>

        <div class="box right-box">

        </div>

      </div>

      <div class="tab-8" style="display: none">
        <!-- content for tab 6 -->
        <div class="box left-box">

        </div>

        <div class="box center-box">
          <h2>Options</h2>
          <p>This will eventually be where the options are found</p>
          <button @click="wipeSave">Wipe the save file</button>


        </div>

        <div class="box right-box">

        </div>

      </div>


    </div>


    <!-- POPUPS -->

    <div class="popup-box" id="main-popup" style="display: none">
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



    <div class="popup-box" id="start-game-popup" style="display: flex">
      <button class="close-button" @click="startGame"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>Welcome to Ficremental</h2>
        <div>
          <p id="startGamePopupText">Are you ready to become a glamrous and adored author of fan fiction?</p>
        </div>
        <hr class="section-divider" />
        <div class="button-container">
          <button @click="startGame" style="width: 100%">Fuck yeah let's fic it up</button>
        </div>

      </div>
      <!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>


    <div class="popup-box" id="game-over-popup" style="display: none">
      <button class="close-button" @click="restartRun"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>After all that work, time for rebirth</h2>
        <div>
          <p id="gameOverPopupDisplayText">You'll make it farther</p>
        </div>
        <hr class="section-divider" />
        <div class="button-container">
          <button @click="restartRun">Restart run</button>
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
        <hr class="section-divider" />
        <div class="button-container">
          <button @click="restartRun">Restart run</button>
        </div>
      </div>
      <!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>

    <div class="popup-box" id="start-chapter-2-popup" style="display: none">
      <button class="close-button" @click="closePopup('start-chapter-2-popup')"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>Holy shit, Chapter 2!</h2>
        <div>
          <p id="chapter2StartPopupDisplayText">This is the text area of the popup.</p>
        </div>
        <hr class="section-divider" />
        <div class="button-container">
          <button @click="closePopup('start-chapter-2-popup')">Non-obvious placeholder text</button>
        </div>
      </div>
      <!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>


    <div class="popup-box" id="error-popup" style="display: none">
      <button class="close-button" @click="closePopup('error-popup')"></button>
      <!-- Content for the popup -->
      <div class="popup-content">
        <h2>Something ain't right</h2>
        <div>
          <p id="errorPopupDisplayText">{{ currentErrorText }}</p>
        </div>
        <hr class="section-divider" />
        <div class="button-container">
          <button @click="closePopup('error-popup')">Continue</button>
        </div>
      </div>
      <!--      <button class="close-button bottom" @click="closePopup"></button> -->
    </div>




  </div> <!-- div.app -->
</template>

<script>
import { characters, plots } from './ficdata.js';
import { todoItems, toDoneList } from './todolist.js';
// import plots from './ficdata.js';


export default {
  data() {
    return {
      activeTab: 1,

      storyText: "You need to create, but first you must find inspiration. Read something. Read a lot of things. Read 5 things.",


      // use dev weights for jobs and leveling
      //devJobCost: false,
      devJobCost: true,

      // the stuff we imported
      characters: [],
      plots: [],



      // this is part of the game state management system. what we're doing is keeping a list of all
      // UI elements that get turned off or on by various game states changes. i'm going to start by only
      // tracking that changed when compared to what the initial state of the game is (meaning the state of
      // the UI when the game is first loaded in the browser). when a run is reset this will let us revert
      // everything back to what we start with
      //
      // as i add additional UI elements and game states, i'll just make sure i keep this list up to date

      UIElementsBaseVis: [
        {
          name: 'job-button-1-container',
          enabled: true,
        },
        {
          name: 'job-button-2-container',
          enabled: false,
        },
        {
          name: 'job-button-3-container',
          enabled: false,
        },
        {
          name: 'job-button-4-container',
          enabled: false,
        },
        {
          name: 'job-button-5-container',
          enabled: false,
        },
        {
          name: 'job-button-6-container',
          enabled: false,
        },
        {
          name: 'job-button-7-container',
          enabled: false,
        },
        {
          name: 'job-button-8-container',
          enabled: false,
        },
        {
          name: 'job-button-9-container',
          enabled: false,
        },


      ],



      // gameStates is an array of the states that you pass through as you make a run through the
      // game. in this first pass,the current game state controls the storytext that is displayed
      // and updates it to the next storytext when all of the pre-reqs have been satisfied. eventually
      // we'll complxify that so that we can change what jobs are available, what inventory slots are displayed,
      // and so on as we move through the game on any particular loop
      gameStates: [

        // GAMESTATE 0: you must read
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
              // this is what we call to advance to the next state. it does any clean up that is required on the current
              // state in order to do that and then advances the state index pointer by one. i may refactor how this works
              // while doing the initial implementation
            },
          ],

          enterState: [
            () => {
              // handle entering this state here
              // set the story text
              this.storyText = this.gameStates[this.curGameStateIdx].storyText;
              // make sure job 1 is set to visible
              let bc = document.getElementById("job-button-1-container");
              bc.style.display = "block";
            },
          ],
        },


        ////////////////////////////////////////////////////////////////
        // GAMESTATE 1: love character unlocked
        // this state is after the initial state, but before trope fragments are unlocked
        {
          storyText: `You can't stop reading. You can't stop imagining. Your mind builds dreamscapes from the stories you read
          and your heart aches for the friends you'll never meet. You find you can fall in love with a fictional character, and so
          you do. Maybe things will happen after you've fallen in love with 3 characters.`,
          advanceCriteria: [
            () => { return this.stats.currentRun.pagesRead >= 10; },
          ],
          advanceState: [
            () => {

            },
          ],

          enterState: [
            () => {
              // handle entering this state here
              this.storyText = this.gameStates[this.curGameStateIdx].storyText;
              // turn on the loveChar button here
              let bc = document.getElementById("job-button-2-container");
              bc.style.display = '';
            },
          ],

        },


        ////////////////////////////////////////////////////////////////
        // GAMESTATE 2: anal plot unlocked
        // this state is after trope fragments are unlocked
        {
          storyText: `You can feel connections being made in your mind and in your soul. These characters and their stories speak
                      to you in a way that nothing has before. You start to see recurring themes. Something deep inside you tells 
                      you that you need to collect 3 loved characters and 3 extracted tropes. `,
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
              // turn on the analText button
              let bc = document.getElementById("job-button-3-container");
              bc.style.display = '';


            },
          ],


        },


        ////////////////////////////////////////////////////////////////
        // GAMESTATE 3: character researech and plot research 1 unlocked
        // we've collected 20 character loves and 20 trope fragments. time to offer the chance to 
        // get a trope or a character
        {
          storyText: `You can now produce a character unlock and a plot unlock by performing the relatively expensive
                      You can use thoseover on the 'Your fic' tab, 
                      or you can stay here and keep collecting character and plot unlocks or pages, loves, and tropes. Once
                      you've unlocked a character and a plot, you'll open up a new opportunity. `,
          advanceCriteria: [
            () => {
              return (this.stats.currentRun.charactersUnlocked >= 1 && this.stats.currentRun.plotsUnlocked >= 1);
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

              let bc = document.getElementById("job-button-4-container");
              let bc2 = document.getElementById("job-button-5-container");
              bc.style.display = '';
              bc2.style.display = '';
            },
          ],

        },

        ////////////////////////////////////////////////////////////////
        // GAMESTATE 4: 
        // we've unlocked a character and a plot. time to offer the chance to go take
        // a class 

        {
          storyText: `Congratulations, you've reached an important milestone. You've gained a character unlock and a plot unlock.
                      You can go over to the 'Your fic' tab and ues those unlocks now. Once you've unlocked a character and a plot,
                      you will have the option of generating your first fan fic. Doing this will give you a substantial amount of
                      xp in all 3 skills and will then restart your run. On the other hand, you can choose to take a writing class.
                      You will not be able to complete that on your first try, but the experience you earn in the process will ensure
                      that you make it farther next time.`,
          advanceCriteria: [
            () => {
              return this.inventory[5].count >= 3;
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

              let bc = document.getElementById("job-button-6-container");
              bc.style.display = '';
            },
          ],

        },

        ////////////////////////////////////////////////////////////////
        // GAMESTATE 5: 
        // this is the start of chapter 2

        {
          storyText: `Formal training? Now that was a good damn idea. Too bad you gained more confidence than knowledge. `,
          advanceCriteria: [
            () => {
              return false;
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

              // we're gonna turn off the chapter one job buttons and turn
              // on the first chapter 2 button
              for (let i = 1; i < 7; i++) {
                let b = document.getElementById("job-button-" + i + "-container");
                b.style.display = 'none';
              }

              let bc = document.getElementById("job-button-7-container");
              bc.style.display = '';

              // and finish with the welcome to chapter 2 popup
              this.displayPopup('start-chapter-2-popup');


            },
          ],

        },



      ],

      skills: [
        {
          id: 1,
          name: 'Reading',
          multiplier: 1,
          displayMultiplier: 1,

          wipLevel: 0,
          wipXp: 0,
          wipXpNeeded: 100,
          wipMultiplier: 1,
          wipDisplayXp: 0,
          wipDisplayXpNeeded: 100,
          wipDisplayMultiplier: 1,
          wipXpDisplayPercentage: 0,

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
          displayMultiplier: 1,

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
          displayMultiplier: 1,

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

        {
          id: 4,
          name: 'StudyCharacter',
          cost: 300,
          skill: 'Characterization',
          produces: { CharacterUnlock: 1 },
          consumes: { CharLove: 3 },
        },

        {
          id: 5,
          name: 'FindPlot',
          cost: 300,
          skill: 'Analysis',
          produces: { PlotUnlock: 1 },
          consumes: { TropeFragment: 3 },
        },

        {
          id: 6,
          name: 'Writing class (reading)',
          cost: 1000,
          skill: 'Reading',
          produces: { ClassCredit: 1 },
          consumes: {},
        },

        {
          id: 7,
          name: 'Writing class (character)',
          cost: 1000,
          skill: 'Characterization',
          produces: { ClassCredit: 1 },
          consumes: {},
        },

        {
          id: 8,
          name: 'Writing class (analysis)',
          cost: 1000,
          skill: 'Analysis',
          produces: { ClassCredit: 1 },
          consumes: {},
        },

        {
          id: 9,
          name: 'Read series',
          cost: 50,
          skill: 'Reading',
          produces: { Page: 10 },
          consumes: {},
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

        {
          id: 6,
          name: 'ClassCredit',
        },



      ],

      inventory: [
        { id: 1, name: "Pages read", count: 0 },
        { id: 2, name: "Characters loved", count: 0 },
        { id: 3, name: "Trope fragments", count: 0 },
        { id: 4, name: "Character unlocks", count: 0 },
        { id: 5, name: "Plot unlocks", count: 0 },
        { id: 6, name: "Class credits", count: 0 },

      ],

      // dummyjob: { id: 1, job: "None",},
      jobqueue: [
        //  this.dummyjob,

      ],

      todolist: [],
      toDone: [],

      readTimer: 'Cost: 10 reading', // Added timer variable here
      loveTimer: 'Cost: 20 characterization and 5 pages', // the right way for this to work is for these timers to actually
      analTimer: 'Cost: 30 analysis and 10 pages', // be the job cost and for that to be carried around in a job object
      // we'll do that Real Soon Now
      job4Timer: 'Cost: 300 characterization and 3 character loves',
      job5Timer: 'Cost: 300 analysis and 3 trope fragments',
      job6Timer: 'Cost: 1000 reading and 1000 characterization and 1000 analysis',
      job7Timer: 'NOT YET IMPLEMENTED. COST TBD. USE GEN FIC TO RESTART IF YOU GET HERE',

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
      paused: false,
      jobQueueEmpty: true,

      curJob: {},
      isTicking: false,  // not sure i'm going to use this in the job loop yet
      curTick: 0,
      lastSaveTick: 0,

      currentErrorText: 'This is where error text goes',

      saveGameKey: 'fanfic-game-save',
      saveGame: '',
      saveInterval: 1000, // how many ticks between saves. this is about 33 seconds

      initted: false, // has the game initialized yet



      // how many times per second do we tick
      tickScaleFactor: 30,
      ticksRemaining: 100000,

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
          classCredits: 0,
          ficsGenerated: 0,

        },

        lastRun: {
          pagesRead: 0,
          charactersLoved: 0,
          tropesExtracted: 0,
          charactersUnlocked: 0,
          plotsUnlocked: 0,
          classCredits: 0,
          ficsGenerated: 0,

        },

        alltime: {
          pagesRead: 0,
          charactersLoved: 0,
          tropesExtracted: 0,
          charactersUnlocked: 0,
          plotsUnlocked: 0,
          classCredits: 0,
          ficsGenerated: 0,

        },
      },
    }
  },



  methods: {
    startGame() {
      this.closePopup('main-popup');
      this.closePopup('start-game-popup');
      this.init();
    },

    init() {
      if (this.initted) {
        return;
      }

      // first we'll load our save
      this.saveGame = localStorage.getItem(this.saveGameKey);
      // console.log("in init with savetext (" + this.saveGame + ")");
      if (this.saveGame === '') {
        // no save
      }
      else {
        var s = JSON.parse(this.saveGame);
        this.skills = s.savedSkills;
        this.stats = s.savedStats;
      }

      // let's populate the todolist and todone data structure for display
      for (let i = 0; i < todoItems.length; i++) {
        this.todolist.push({ id: i, text: todoItems[i] });
      }

      for (let i = 0; i < toDoneList.length; i++) {
        this.toDone.push({ id: i, text: toDoneList[i].item, date: toDoneList[i].date });
      }

      // do we need to set the development values (meaning: really cheap) for
      // costs of all jobs
      if (this.devJobCost === true) {
        this.setDevJobCosts();
      }

      this.initted = true;

    },

    save() {
      var saveString = "This is the save string";
      saveString = this.constructSaveString();
      localStorage.setItem(this.saveGameKey, saveString);
      // console.log("in save() with savestring (" + saveString + ")");




    },

    wipeSave() {
      var saveString = '';
      localStorage.setItem(this.saveGameKey, saveString);
    },

    setDevJobCosts() {
      // just directly set the costs instead of looping because
      // at some point i may want to vary them maybe
      this.jobs[0].cost = 5;
      this.jobs[1].cost = 8;
      this.jobs[2].cost = 12;
      this.jobs[3].cost = 15;
      this.jobs[4].cost = 15;
      this.jobs[5].cost = 25;
      this.jobs[6].cost = 25;
      this.jobs[7].cost = 5;

      // lets also bump up production
      this.jobs[0].produces.Page = 10;
      this.jobs[1].produces.CharLove = 10;
      this.jobs[2].produces.TropeFragment = 10;

    },




    activateTab(tabIndex) {
      // hide the currently active tab
      document.querySelector(`.tab-${this.activeTab}`).style.display = 'none';

      // show the newly selected tab
      document.querySelector(`.tab-${tabIndex}`).style.display = 'block';

      // set the active tab index
      this.activeTab = tabIndex;
    },


    // flip the pause status
    pauseJobs() {
      this.paused = !this.paused;
    },

    // this is the main game loop right here
    runJobs() {
      if (!this.initted) {
        this.init();
      }

      if (this.jobsRunning) {
        // already jobs running, let's not double up on that, but
        // we might be paused, if so let's unpause here and return. 
        // the running interval will pick up and keep going
        if (this.paused) {
          this.paused = false;
        }
        return;
      }

      // if there aren't jobs in the queue, no point in being here
      if (this.jobqueue.length === 0) {
        return;
      }

      // if it's been more than a thousand ticks since our last save, let's save
      if (this.curTick > this.lastSaveTick + 1000) {
        this.save();
        this.lastSaveTick = this.curTick;
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
      this.jobqueue.shift();
      let s = this.getSkillFromJob(this.curJob);

      // check if we can afford the job
      if (!this.canAfford(this.curJob)) {
        // uh-oh, we can't afford this job. take it off the queue and return. we call
        // runJobs again here because there may be things queued after this one that can
        // be afforded
        this.jobsRunning = false;
        // this.jobqueue.shift();
        return this.runJobs();
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
        // see if we're paused, return if we are, but don't clean up the interval, so we
        // won't set jobsRunning to false
        if (this.paused) {
          return;
        }

        this.curTick++;
        this.ticksRemaining--;

        if (this.ticksRemaining === 0) {
          // run's over. we're gonna clear the jobqueue
          this.jobqueue = [];
          this.jobsRunning = false;
          // clear the interval
          clearInterval(interval);

          // reset the job progress bar
          pbar.classList.add('instant');
          pbar.style.width = "0%";
          pbar.classList.remove('instant');
          ptext.innerHTML = "";

          // display the game over popup
          this.displayPopup('game-over-popup');
          return;
        }


        counter += xpPerTick;
        this.addSkillXp(s, xpPerTick);

        // update the job progress bar. the xp progress bars were updated in addSkillXp
        var completion = ((counter / this.curJob.cost) * 100).toFixed(0);
        // console.log(completion + "%");
        pbar.style.width = completion + "%";
        ptext.innerHTML = this.curJob.name;

        // this.curJob.completion = completion + "%";
        // this.jobqueue[0].completion = completion;
        /* this.curJob.completion = ((xpPerTick / this.curJob.cost) * 100).toFixed(0); */


        if (counter >= this.curJob.cost) {
          // job is done, handle that. this means adding new inventory, clearing the jobs running flag,
          // clearing the interval, checking if we have a game state
          // advance and handling it if so, and calling runJobs
          this.jobComplete(this.curJob);
          this.curJob.completion = 0;
          clearInterval(interval);
          this.jobsRunning = false;
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

      if (j.consumes.Page > this.inventory[0].count) {
        // not enough pages
        canWe = false;
      }
      if (j.consumes.CharLove > this.inventory[1].count) {
        // not enough charLove
        canWe = false;
      }
      if (j.consumes.TropeFragment > this.inventory[2].count) {
        // not enough tropes
        canWe = false;
      }
      if (j.consumes.CharacterUnlock > this.inventory[3].count) {
        // not enough charunlocks
        canWe = false;
      }
      if (j.consumes.PlotUnlock > this.inventory[4].count) {
        // not enough plotunlocks
        canWe = false;
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
        this.stats.alltime.pagesRead += j.produces.Page;
      }

      if (j.produces.CharLove > 0) {
        this.inventory[1].count += j.produces.CharLove;
        this.stats.currentRun.charactersLoved += j.produces.CharLove;
        this.stats.alltime.charactersLoved += j.produces.CharLove;
      }

      if (j.produces.TropeFragment > 0) {
        this.inventory[2].count += j.produces.TropeFragment;
        this.stats.currentRun.tropesExtracted += j.produces.TropeFragment;
        this.stats.alltime.tropesExtracted += j.produces.TropeFragment;
      }

      if (j.produces.CharacterUnlock > 0) {
        this.inventory[3].count += j.produces.CharacterUnlock;
        this.stats.currentRun.charactersUnlocked += j.produces.CharacterUnlock;
        this.stats.alltime.charactersUnlocked += j.produces.CharacterUnlock;
      }

      if (j.produces.PlotUnlock > 0) {
        this.inventory[4].count += j.produces.PlotUnlock;
        this.stats.currentRun.plotsUnlocked += j.produces.PlotUnlock;
        this.stats.alltime.plotsUnlocked += j.produces.PlotUnlock;
      }

      if (j.produces.ClassCredit > 0) {
        this.inventory[5].count += j.produces.ClassCredit;
        this.stats.currentRun.classCredits += j.produces.ClassCredit;
        this.stats.alltime.classCredits += j.produces.ClassCredit;
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
      if (num === 1) {
        this.queueJob(this.jobs[0]);
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
      // 6 is writing class and is the first complex job
      else if (num === 6) {
        this.queueJob(this.jobs[5]);
        this.queueJob(this.jobs[6]);
        this.queueJob(this.jobs[7]);

      }
      else if (num === 7) {
        this.queueJob(this.jobs[8]);
      }
      else {
        console.log("unknown job (" + num + ")");
      }

    },

    handleJobQueueClick(i) {
      this.jobqueue.splice(i, 1);
    },

    // this unlocks a random character. it is called from the characters pane of the your fic tab
    unlockCharacter() {
      // first let's make sure we have enough character unlocks
      if (this.inventory[3].count < 1) {
        // not enough character unlocks
        return;
      }

      let i = Math.floor(Math.random() * characters.length);
      let c = characters[i];
      this.characters.push(c);
      this.inventory[3].count--;

      // let's update the text in our popup that we're about to pop up
      let p = document.getElementById('unlockedCharacterPopupDisplayText');
      p.innerHTML = "Fuck yeah! You've unlocked the very famous " + c.name + " to be a character in your fic";

      this.displayPopup('character-unlock-popup');
      //      console.log(c.name);

    },

    unlockPlot() {
      // first let's make sure we have enough plot unlocks
      if (this.inventory[4].count < 1) {
        return;
      }
      let i = Math.floor(Math.random() * plots.length);
      let p = plots[i];
      this.plots.push(p);
      this.inventory[4].count--;

      // let's update the text in our popup that we're about to pop up
      let t = document.getElementById('unlockedPlotPopupDisplayText');
      t.innerHTML = "Fuck yeah! You've unlocked the very famous " + p.name + " plot to enjoy with your love interest";

      this.displayPopup('plot-unlock-popup');


      // console.log(p.name);
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
          // console.log(char.name);
          break;
        }
      }

      for (let i = 0; i < this.plots.length; i++) {
        if (this.plots[i].id === this.selectedPlot) {
          plot = this.plots[i];
          // console.log(plot.name);
          break;
        }
      }

      if (!plot || !char) {
        this.currentErrorText = "You need to select a plot and a character to generate a meetcute";
        this.displayPopup('error-popup');
        return;

      }

      this.stats.currentRun.ficsGenerated++;
      this.stats.alltime.ficsGenerated++;


      var fic = `Generate a short meet-cute encounter between our protagonist, a 33-year-old femme-presenting AFAB 
                 enby, and their potential love interest, ${char.name} taking place against a setting of ${plot.name}

      `;

      var dispText = document.getElementById("generatedFicPopupDisplayText");
      dispText.innerHTML = fic;

      this.displayPopup('generated-fic-popup');



    },

    restartRun() {
      // this will get complicated eventually, but for now we just reset the character and plot menus
      // and wipe out the wip xp and inventory, and return to game state 0

      // clear the chars and plots lists
      this.characters = [];
      this.plots = [];

      // wipe the inventory
      for (let i = 0; i < this.inventory.length; i++) {
        this.inventory[i].count = 0;
      }

      // wipe work in progress xp
      for (let i = 0; i < this.skills.length; i++) {
        this.skills[i].wipLevel = 0;
        this.skills[i].wipXp = 0;
        this.skills[i].wipXpNeeded = 100;
        this.skills[i].wipMultiplier = 1;
        this.skills[i].wipDisplayXp = 0;
        this.skills[i].wipDisplayXpNeeded = 100;
        this.skills[i].wipDisplayMultiplier = 1;
        this.skills[i].multiplier = this.skills[i].canonMultiplier;
      }

      // move the curRun stats to become the lastRun stats
      let ts = this.getBlankStatStruct();
      this.stats.lastRun = this.stats.currentRun;
      this.stats.currentRun = ts;

      // make sure the job queue is empty
      this.jobqueue = [];

      // reset the ticks remaining
      this.ticksRemaining = 100000;

      // reset the UI
      for (let i = 0; i < this.UIElementsBaseVis.length; i++) {
        let e = document.getElementById(this.UIElementsBaseVis[i].name);
        if (this.UIElementsBaseVis[i].enabled === true) {
          e.style.display = '';
        }
        else {
          e.style.display = 'none';
        }
      }


      this.curGameStateIdx = 0;
      this.gameStates[this.curGameStateIdx].enterState[0]();

      this.save();

      // we either restart because a fic was generated or because we ran out of ticks
      // let's just close both of those popups here
      this.closePopup('game-over-popup');
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
      // that if necessary, then we set the rounded display versions, update the
      // progress bars, and return

      let canonXpBar = document.getElementById("skillCanonProgressFill-" + skill.id);
      let wipXpBar = document.getElementById("skillWipProgressFill-" + skill.id);

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
        skill.displayMultiplier = this.formatDisplayNumber(skill.multiplier);
      }
      canonXpBar.style.width = (skill.canonXp / skill.canonXpNeeded) * 100 + "%";

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
        skill.wipXpDisplayPercentage = this.formatDisplayNumber((skill.wipXp / skill.wipXpNeeded) * 100);
        skill.multiplier = skill.canonMultiplier * skill.wipMultiplier;
        skill.displayMultiplier = this.formatDisplayNumber(skill.multiplier);
      }
      wipXpBar.style.width = (skill.wipXp / skill.wipXpNeeded) * 100 + "%";


    },

    constructSaveString() {
      // we need to save our skills, our stats, and eventually our unlocks
      // for now i'm scrubbing the currentRun stats when we save. i'll do something smarter with this eventually

      var saveData = {
        savedStats: {
          currentRun: {
            pagesRead: 0,
            charactersLoved: 0,
            tropesExtracted: 0,
            charactersUnlocked: 0,
            plotsUnlocked: 0,
          },

          lastRun: this.stats.lastRun,
          alltime: this.stats.alltime,
        },
        savedSkills: this.skills,
      };

      var s = JSON.stringify(saveData);
      return s;
    },

    // this returns a blank stats structure with all fields defined and zero'd
    getBlankStatStruct() {
      return {
        pagesRead: 0,
        charactersLoved: 0,
        tropesExtracted: 0,
        charactersUnlocked: 0,
        plotsUnlocked: 0,
        classCredits: 0,
        ficsGenerated: 0,
      };
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

.tickBox {
  color: #f00;
  font-weight: bold;
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
  /* background-color: rgb(12, 101, 173); */
  width: 100%;
}

.canonXpBar {
  margin-top: 0.05em;
  position: relative;
  /* background-color: #dacd21; */
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

.progress-fill-canon {
  position: absolute;
  /*  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  height: 1.6em;
  background-color: #da4d21;

  transition-property: width;
  transition-duration: 0s, 0.3s;
  /* Two transition durations */
  transition-timing-function: linear, ease-in-out;
  /* Two transition timing functions */


  /* transition: width 0.3s ease-in-out; */

}

.progress-fill-wip {
  position: absolute;
  /*  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  height: 1.6em;
  background-color: #daa921;

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


/* tooltip stuff */

.tooltip {
  position: relative;
}

.tooltip .tooltipText {
  visibility: hidden;
  /* width: 25em; */
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 0.5em 0.5em;
  border-style: solid;
  border-width: 3px;
  border-color: #333;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0%;
  /* width: 32em; */
  opacity: 0;
  transition: opacity 0.5s;
}


.tooltip:hover .tooltipText {
  visibility: visible;
  opacity: 0.8;
}

.tooltip-pointer .tooltipText-pointer {
  visibility: hidden;
  width: 20em;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 0.5em;
  padding: 0.5em 0.5em;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 0;
  left: 5%;
  opacity: 0;
  transition: opacity 0.5s;
}

.tooltip-pointer:hover .tooltipText-pointer {
  visibility: visible;
  opacity: 0.8;
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
.go-box .go-button {
  font-size: 16px;
  padding: 10px;
  border: none;
  background-color: hwb(136 6% 35%);
  cursor: pointer;
}

.go-box .pause-button {
  font-size: 16px;
  padding: 10px;
  border: none;
  background-color: hwb(5 8% 31%);
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


/* statistics display */
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: 100%;
}

/* .grid-header,
.grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #444;
  color: #fff;
  padding: 5px;
}
*/

.grid-cell-header {
  padding: 5px;
  background-color: #777;
  color: #fff;
  border: 1px solid #666;
}

.grid-cell {
  padding: 5px;
  background-color: #777;
  color: #fff;
  border: 1px solid #666;
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
