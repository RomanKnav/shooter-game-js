// 'use strict';
// MODULES:
import Floor from "./floor.js";  
import Shooter from "./shooter.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import Button from "./button.js";
import Pickup from "./pickup.js";
import TextWall from "./textWall.js";
import Health from "./health.js";
import Grenade from "./grenade.js";

import { preloadedImagesPromise } from './imagePreloader2.js';

window.onload = () => {
    // ALL THE CLASSES THAT USE IMAGES: I can just pass in images parameter and use that.
    preloadedImagesPromise.then((preloadedImages) => {
        let background = preloadedImages["background-working3"];    // this is an Image object.
        document.getElementById('canvas0').style.backgroundImage=`url(${background.src})`; // specify the image path here

        initializeGame(preloadedImages);
    });

// console.log("ALL ASSETS LOADED");
// console.log(preloadedImages);

/*
        handleShooter();                // USES IMAGES
        handleSnack();                  // USES IMAGES
        handleState(elapsedTime);                               --DONE
        handleStatus();                                         --DONE
        handleProjectile(enemyQueue);                           --DONE
        handleNade(enemyQueue);         // USES IMAGES          --DONE

        // ALSO:
        // pickup.js        (in handleProjectile())             --DONE
        // health.js        (in HandleStatus())                 --DONE
        // enemy.js                                             --DONE
*/

function initializeGame(images) {
    // for static shit (background and floor, which don't require any updating)
    var canvas0 = document.getElementById("canvas0");

    var canvas = document.getElementById("canvas1");
    // var cxt = canvas.getContext("2d", { alpha: false });
    var cxt = canvas.getContext("2d");

    // STRICTLY FOR BULLETS:
    var bullet_canvas = document.getElementById("bullet-canvas");
    var bullet_cxt = bullet_canvas.getContext("2d");
    bullet_canvas.style.width=bullet_canvas.getBoundingClientRect().width;//actual width of canvas
    bullet_canvas.style.height=bullet_canvas.getBoundingClientRect().height;//actual height of canvas

    // FOR STATICS:
    var canvas2 = document.getElementById("canvas2");
    var cxt2 = canvas2.getContext("2d");

    // PORT: http://127.0.0.1:5500/
    // TEXTWALL FONT DEFINED IN TEXTWALL.JS
    /* TIPS FOR OPTIMIZATION:
        1. use integers instead of floating-points
        2. use MULTIPLE canvases
        3. recycle objects instead of deleting them
        4. no TEXT
    */

    let roundCounts = [6, 10]; 

    // single, triple, two shooters, ar hoarde (grounds and a few airs), grenade hoarde, civies (pows)

    // NEW SCORE STUFF:
    // CANNOT REMOVE ENTIRE: score determines when to cremate stats.
    let score = 0;
    let winningScore = 30;
    // let currentRound = 1;
    let currentRound = 0;

    // enemyCount determines num of enemies to add to array. It decrements as they spawn
    let enemyCount = roundCounts[0];
    // let tutCount = tutCounts[0];

    // used to show current enemies remaining:
    let enemiesLeft = roundCounts[0];
    let secondShooter = false;

    // objects
    // flora, drawn on static canvas:
    const flora = new Floor(canvas0);
    const shooter = new Shooter(100, images);


    //  NEEDS TO START OFF SCREEN, then walk over to position 200:
    // const shooter2 = new Shooter(200, flora.y - 50);
    // const shooter2 = new Shooter(0 - shooter.width, flora.y - 34);
    const shooter2 = new Shooter(100, images);

    shooter2.isSecond = true;
    //shooter2.weapon = shooter.weapon;

    // BRILLIANT IDEA: inputHandler doesn't need to take in these args. Use the ones from shooter.
    new InputHandler(shooter, canvas);
    new InputHandler(shooter2, canvas);

    // BUTTONS AND TEXT. (x, y, width, text, clickable)
    // skip tut. button necessary -don't want to force players to kill POWS. 
    // const skipTutButton = new Button(canvas.width / 2.2, canvas.height / 3, 100, "Skip", true);
    const playButton = new Button(canvas2.width / 2.2, canvas2.height / 2.5, 100, "Play", true);
    const startButton = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Initiate Bloodbath", true);
    const skipButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "skip", true);
    const yesButton = new Button(250, canvas.height / 1.2, 100, '"Defend"', true);
    const noButton = new Button(canvas.width - 250 - 100, canvas.height / 1.2, 100, "Give up", true);
    const disableButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "Disable Tips", true);
    // this one for giveup, final win, and credits (bottom right):
    const playAgainButton = new Button(canvas.width - 110, canvas.height / 1.15, 100, "Play again?", true);
    // this one for death (center)
    const playAgainButton2 = new Button(canvas.width / 2.5, canvas.height / 2, 100, "Play again?", true);
    const credButton = new Button(canvas.width / 2.5, canvas.height / 1.15, 100, "READ ME", true);

    const winText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Round Complete", false);
    const nextText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Next round incoming...", false);

    const failText = new Button(canvas.width / 2.5, canvas.height / 4.5, 100, "FAILURE", false);
    const healthText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "You perished in the heat of battle.", false);
    const wallText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "Too many enemies have broken through.", false);

    // UI
    // at left
    // const roundText = new Button(canvas.width / 3, 0, 100, `${currentRound}/10`, false);
    const roundText = new Button(canvas.width / 2.45, 0, 100, `${currentRound}/10`, false);
    // at right
    // const enemyText = new Button(canvas.width / 2.45, 0, 100, enemiesLeft, false);
    const enemyText = new Button(canvas.width / 2.10, 0, 100, enemiesLeft, false);

    // const scoreText = new Button(canvas.width / 2, 0, 100, score, false);
    // const ammoText = new Button(canvas.width - 100, 0, 100, shooter.specialAmmo, false);

    const specialText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "SPECIAL ROUND", false);
    const specialText2 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "MASSACRE THE CIVILIANS", false);

    const endText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Coalition defeated. City aquired.", false);
    const endText2 = new Button(canvas.width / 2.5, canvas.height / 1.7, 100, "Thanks for playing!!!", false);
    const endText3 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Made with ❤️ by", false);
    const endText4 = new Button(canvas.width / 2.5, canvas.height / 1.9, 100, "KAVEMANKORPS", false);

    const naturalText = new Button(canvas.width / 2.5, canvas.height / 3, 100, "You're a natural born killer!", false);

    const goodText = new Button(canvas.width / 2.5, canvas.height / 4.5, 100, "Excellent work, Leuitenant.", false);
    const soonText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "Help is arriving...", false);

    const aidText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "HELP HAS ARRIVED", false);
    const quietText = new Button(canvas.width / 2.5, canvas.height / 2.7, 100, "KILL KILL KILL KILL", false);

    // TUTORIAL CRAP:
    // BRUTAL IDEA: live captured enemies used as target practice
    // YES, player can take damage/die in tutorial
    // 3 static grounds
    const tt1 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Press Space to shoot", false);
    const tt2 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "Use WASD to aim in different directions", false);
    const tt3 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "hold S to crouch", false);
    const tt7 = new Button(canvas.width / 2.5, canvas.height / 3, 100, "press E to throw a grenade.", false);
    const tt7_2 = new Button(canvas.width / 2.5, canvas.height / 2.5, 100, "Press E twice quickly for a barrage", false);

    // rounds w/ tut text: 1-6
    let tutRounds = {1: [tt1], 2: [tt2], 3: [tt3], 4: [tt7, tt7_2]};

    const bossText = new TextWall(
    `Satellite imagery has exposed your horriffic atrocities in the city to the rest of the world,\n
    prompting international outcry and the formation of a Sheep-led coalition against YOU.\n
    \n
    This is it! Destroy the coalition and the city is yours. Will you give up now and turn yourself\n
    in for war crimes, or will you defend the city to your last dying breath lest your efforts so far\n
    be in vain?`, Math.floor(canvas.height / 5), canvas);

    // DONT USE FLESH LOG (GAY)
    const startText = new TextWall(
        `You are Lieutenant Warren Kilgore, the last remaining invader in Swinemanland. The very land of your\n
        eternal arch-nemesis. The armestice between the Sheep and the Swinemen had been signed days before,\n 
        but you reject returning to the corrupted civilian life at whatever cost. Even though all of your men\n 
        have deserted you, you refuse to give up the the strategic city of Vonn, the crown jewel of Swineman\n 
        "civilization".\n 
        It is now your undisputed domain, your very own kingdom, and everyone in it mere cattle. They are\n
        your servants, ready to satisfy your every depraved fantasy at any given moment. The city of Vonn took\n 
        months of gruesome house-to-house fighting and thousands of Sheep lives to completely conquer. Are you\n
        going to let it all slip now?`, Math.floor(canvas.height / 10), canvas);

    const giveupText = new TextWall(
        `You spare your fellow countrysheep and turn yourself in.\n
        \n
        The war crimes tribunal accuses you of innumerable atrocities, the charges of\n
        which are beyond the scope of this game.\n 
        \n
        You are put to the firing squad, necrophiled by 20 men, and your semen-glutted\n 
        corpse thrown into the dirty Googa River.`, Math.floor(canvas.height / 10), canvas);

    const credText = new TextWall(
        `**********Programming and Art**********
            KavemanKorps

        ********Music and Sound Effects*******
        Credits in description!

        *************PLEASE READ****************
        First of all, I want to thank you the Player for making it this far! it shows my game is at least ok enough
        for you to play through the whole thing (at least, that's what I hope :) ). I made this game during Summer 
        '23, my Sophomore year in college. A most shitty time in my life (I hate school LOL). You can say this 
        game is the byproduct of months of stored-up frustration, misery, and the sinking feeling of failure 
        at every turn. I understand that this game will get backlash due to encouraging the player to mass murder 
        civilians -but please understand, this to me is art! I hope to bring to you more games in the future, no 
        matter how negatively this one might be recieved. If you think otherwise, cliche as it sounds, I hope you 
        enjoyed playing this game as much as I had making it!
            -Kaveman
        `, Math.floor(canvas.height / 10), canvas);

    // const loadingText = new TextWall(`\n\n\n\n\nLoading`, canvas.height / 5);
    const loadingText = new TextWall(`Loading...`, Math.floor(canvas.height / 3), canvas);

    const playText = new TextWall(``, Math.floor(canvas.height / 5), canvas);

    // HEALTH:
    let playerHealth = new Health(30, "health", images);
    let wallHealth = new Health(60, "wall", images);
    let grenades = new Health(90, "nade", images);

    // TODO: USE SECONDS INSTEAD OF FRAMES:
    // let randomIntervals = [1, 3, 5, 8, 11]; // intervals in seconds
    let randomIntervals = [0.2, 0.5]; // intervals in seconds


    // UPDATE ENEMY ANIMATION ONCE EVERY 15 FRAMES. As this decreases in cremate(),
    // the animations move faster.
    let enemySpeed = 15;
    let enemyQueue = [];

    let tutorial = true;

    // ENEMY SHOOTING STUFF:
    // possible glitch fix: add "id" property. "distance" is distance AWAY from shooter. DONE
    // NO MORE THAN 4 ENEMIES SHOULD BE SHOOTING.
    let baddiePositions = {
        "1": {"inPos": false, "distance": 50, "type": "ground"}, 
        "2": {"inPos": false, "distance": 150, "type": "ground"}, 
        "3": {"inPos": false, "distance": 250, "type": "ground"},
        "4": {"inPos": false, "distance": 129, "type": "air"},
        "5": {"inPos": false, "distance": -5, "type": "crawl"},
        //  THESE POS ONLY AVAILABLE IN BOSS ROUND:
        // shooter.width = 44, -shooter.width = -44
        "6": {"inPos": false, "distance": -shooter.width, "type": "bomber"},
        // SHEEP:
        "7": {"inPos": false, "distance": 100, "type": "sheep"},
        "8": {"inPos": false, "distance": 200, "type": "sheep"},
    };

    // ENEMY ACTUAL MOVING SPEED:
    let currentSpeed = 1.5;

    // DROPPED PICKUPS:
    let snackQueue = [];
    let nadeQueue = [];

    // let state = "MENU";
    // let state = "BOSS";
    let state = "LOADING";
    // let state = "PLAY";

    // let loadingTime = [4000, 5000][Math.floor(Math.random() * 2)];
    let loadingTime = 6000;

    // FUNCTIONS:

    /* Howler accepts multiple versions of the same audio! (automatically 
    selects the best one for the current web browser */
    var sfx = {
        yelp: new Howl({
            src: [
                "src/assets/sounds/animals_dog_yelp_med_large.mp3",
            ],
            preload: true,
            loop: false,
            volume: 0.5,
        }),
        // it seems we're not even using these:
        nadePin: new Howl({
            src: [
                "src/assets/sounds/grenadePin.mp3",
            ],
            preload: true,
        }),
        flammenReload: new Howl({
            src: [
                "src/assets/sounds/futureReload.mp3",
            ],
            preload: true,
        }),
        rayBeam: new Howl({
            src: [
                "src/assets/sounds/pulse.wav",
            ],
            preload: true,
            loop: false,
        }),
        crowd: new Howl({
            src: [
                "src/assets/sounds/crowd2.mp3",
            ], 
            preload: true,
            loop: false,
            volume: 1,
        })
    };

    /* there is a stupid security measure in some browsers where no sound is allowed to play unless the 
    user explicitly interacts with the page. To work around this, add a "play" button that has to be clicked */

    // REMEMBER: volume accepts value from 0.1 - 1
    var music = {
        dramatic: new Howl({
            src: [
            "src/assets/music/prey's stand.mp3"
            // "src/assets/music/astro_race.mp3"
            ], 
            preload: true,
            loop: true,
            volume: 1,
            html5: true, // forces the use of the HTML5 Audio API (useful for large files)
            onplayerror: function() {
                console.error('Error playing dramatic music.');
            }
        }),
        hit_back: new Howl({
            src: [
            "src/assets/music/hit-back.mp3"
            ], 
            preload: true,
            loop: false,
            volume: 1,
            html5: true, // forces the use of the HTML5 Audio API (useful for large files)
            onplayerror: function() {
                console.error('Error playing hit back music.');
            },
        }),
    };

    // this seems to have stopped the shitty ass audio:
    let soundLastPlayed = 0;
    const soundCooldown = 150000; // 150 second "cooldown"

    function playSound(sound) {
        const now = Date.now();     // number of millisecs since the "epoch"
        if (now - soundLastPlayed > soundCooldown || soundLastPlayed == 0) {
            sound.play();
            soundLastPlayed = now;
        }
    }

    function playSound2(sound) {
        if (!sound.playing()) {
            sound.play();
        } 
    }

    // stupid timer vars:
    let showPlay = false
    let specialRound = false;
    let showNextRound = false;
    let showNextText = false;
    let showSpecialText = false;
    let showMenu = false;
    let startRound = false;
    let finalRound = false;
    let startEnd = false;
    let showAidText = false;
    let showNatText = false;

    let endSpecRound = false;

    function handleStatus() {
        if (state == "RUNNING" || state == "WIN" || state == "QUIET" || state == "RELIEF" || state == "TUTORIAL") {
            roundText.text = currentRound;
            enemyText.text = enemiesLeft;
            enemyText.draw(cxt2);
            roundText.draw(cxt2);
            // scoreText.draw(cxt2);
        
            // removed to save on memory!
            // if (shooter.weapon != "pistol") {
            //     ammoText.draw(cxt2);
            //     ammoText.text = shooter.specialAmmo;
            // }

            playerHealth.draw(cxt2);
            wallHealth.draw(cxt2);
            grenades.draw(cxt2);
        }
    }

    function resetBaddies() {
        for (let i = 1; i <= Object.keys(baddiePositions).length; i++) {
            baddiePositions[i.toString()]["inPos"] = false;
        }
    }

    function greatReset() {
        startEnd = false;
        shooter.angle = "straight";
        shooter.dead = false;
        endSpecRound = false;
        currentSpeed = 1.5;
        enemySpeed = 15;
        score = 0;
        // scoreText.text = score;
        enemyCount = enemiesLeft = roundCounts[0];
        enemyQueue = [];

        playerHealth.number = 4;
        wallHealth.number = 4;
        grenades.number = 4;

        winningScore = 30;
        currentRound = 1;

        // second shooter gets this hard-coded crap:
        shooter.weapon = "pistol";
        shooter.fireRate = 0;       // THIS MAKES PISTOL SEMI AUTO:
        shooter.specialAmmo = 0;

        // shooter.weapon = "ar";
        // shooter.fireRate = 5;

        // if (slowAssMonitor) {
        //     shooter.fireRate = 8;
        // } else shooter.fireRate = 15;  

        shooter.specialAmmo = 100;
        
        shooter.secondStream = false;
        secondShooter = false;
        // shooter2.weapon = shooter.weapon;
        shooter2.image = shooter.image;
        shooter2.fireRate = 0;
        shooter2.specialAmmo = 0;
        shooter2.x = 0 - shooter.width;

        roundCounts = [6, 10];

        // ALL ENEMY COUNTS ADDED HERE!:
        for (let i = 0; i <= 7; i++) {
            roundCounts.push(Math.floor(roundCounts[roundCounts.length -1] * 1.3));
        };
        roundCounts[roundCounts.length - 1] = 200;  // 200 ORCS IN LAST ROUND!

        resetBaddies();

        snackQueue = [];
        showMenu = false;
        // grenades.number = 10;
        showSpecialText = false;
        showAidText = false;
        specialRound = false;
        finalRound = false;

        // RESET MUSIC:
        music.hit_back.stop();
    };

    function endRound() {
        if (!showNextRound) {
            winText.draw(cxt);
            setTimeout(() => {
                showNextRound = true;
            }, 1000);
        }
        else {
            nextText.draw(cxt);
            setTimeout(() => {
                state = "RUNNING";
                if (enemiesLeft <= 0) { 
                    cremate();
                }
            }, 1000);
        }
    }

    function musicToggler() {
        // 10
        if (!finalRound) {
            playSound2(music.dramatic);
            // music.dramatic.play();     // causes endless looping every frame
        } 
        else {
            music.dramatic.stop();
            playSound2(music.hit_back);
            // music.hit_back.play();
        }
    }

    // elapsedTime for use in pushEnemy():
    function handleState(elapsedTime) {
        switch(state) {
            // INITIAL BLACK SCREEN:
            case "PLAY":
                playText.draw(cxt);
                playButton.draw(cxt);
                mouseCollision(shooter.mouse, playButton, () => state = "INTRO");
                break;

            // THE VERY FIRST STATE THAT APPEARS.
            case "LOADING":
                loadingText.draw(cxt);
                
                // how about we just fucking get rid of this on good monitors? NOPE. 
                let girly = new Enemy(canvas.width, 0, currentRound, 15, images);
                girly.type = "bomber";

                if (enemyQueue.length < 1) enemyQueue.push(girly);
                handleEnemy();
                // if (enemyQueue.length < 1) pushEnemy();
                if (enemyQueue.length < 1) pushEnemy(elapsedTime);

                setTimeout(() => {
                    // showLoading = false;
                    showPlay = true;
                    if (score >= winningScore) {
                        cremate();
                    }
                }, loadingTime);

                if (showPlay) state = "PLAY";

                break;

            // GLITCH SOMEWHERE IN INTRO:
            case "INTRO":
                musicToggler();
            
                startText.draw(cxt);

                skipButton.draw(cxt);
                mouseCollision(shooter.mouse, skipButton, () => state = "MENU");

                setTimeout(() => {
                    // what's up with this again?
                    showMenu = true;
                    // if (score >= winningScore) {
                    //     cremate();
                    // }
                }, 30000);

                if (showMenu) state = "MENU";
                break;
                
            // glitch: MENU -> RUNNING -> MENU
            case "MENU": 
                currentRound = 0;
                shooter.init = true;
                // shooter.disabled = false;
                shooter.disabled = true;

                // bossText.draw(cxt);
                // so button immediately disapears when in another state?
                startButton.draw(cxt);

                if (score >= winningScore) {
                    cremate();
                }

                // FIX THIS CRAP:   ---DONE
                // REMEMBER TO UNCOMMENT THIS:
                greatReset();
                mouseCollision(shooter.mouse, startButton, () => state = "RUNNING");
                break;

            // this state is only for the boss text:
            case "BOSS":
                musicToggler();
                finalRound = true;
                bossText.draw(cxt);
                yesButton.draw(cxt);
                noButton.draw(cxt);
        
                if (score >= winningScore) {
                    cremate();
                }

                mouseCollision(shooter.mouse, yesButton, () => state = "QUIET");
                mouseCollision(shooter.mouse, noButton, () => state = "GIVEUP");
                break;

            case "QUIET":
                musicToggler();
                quietText.draw(cxt);

                setTimeout(() => {
                    startEnd = true
                }, 4000);

                resetBaddies();
                if (startEnd) state = "RUNNING";
                break;
        
            case "RUNNING":
                musicToggler();
                // state = "RUNNING";
                shooter.disabled = false;
                shooter2.disabled = false;

                if (finalRound == true) {
                    if (enemiesLeft <= 150) currentSpeed = 6;
                    if (enemiesLeft <= 100) currentSpeed = 7;
                    if (enemiesLeft <= 50) currentSpeed = 8;
                }

                // remains true only if there's 5 or less enemies
                if (specialRound == true) {
                    playSound2(sfx.crowd);
                };

                // wtf is going on here? draw the "disabled tips" while tutorial taking place
                if (Object.keys(tutRounds).includes(currentRound.toString()) && tutorial === true) {
                    disableButton.draw(cxt);
                    mouseCollision(shooter.mouse, disableButton, () => {
                        tutorial = false;
                        disableButton.show = false;
                    });

                    for (let i = 0; i < tutRounds[currentRound].length; i++) {
                        tutRounds[currentRound][i].draw(cxt);
                    }
                }
        
                // one second delay before round 1:
                if (currentRound == 1) {
                    setTimeout(() => {
                        startRound = true
                    }, 1000);
                }

                // when does tutorial end? 
                if (currentRound > 4) tutorial = false;

                // reset after each round
                if (startRound) {
                    showNextRound = false;
                    handleEnemy();
                    // pushEnemy();
                    pushEnemy(elapsedTime);
                }

                if (playerHealth.number <= 0 || wallHealth.number <= 0) {
                    state = "LOSE";
                }
                break;
            
            // what state is this?
            case "WIN": 
                musicToggler();
                if (tutorial) disableButton.draw(cxt);
                mouseCollision(shooter.mouse, disableButton, () => {
                    tutorial = false;
                    disableButton.show = false;
                });

                resetBaddies();

                // special round cases:
                // the key is the round BEFORE event occurs:
                // THIS THE ONE vv
                // SPEC ROUND SHOULD BE 5. 
                // enemy speed on final round is 5.1.

                let specRounds = {4: "SPECIAL", 6: "NATURAL", 7: "RELIEF", 9: "BOSS", 10: "END"};
                // let specRounds = {4: "SPECIAL", 6: "NATURAL", 7: "RELIEF", 1: "BOSS", 10: "END"};

                if (Object.keys(specRounds).includes(currentRound.toString())) {
                    state = specRounds[currentRound];
                }
                endRound();
                break;
            
            case "LOSE":
                musicToggler();
                shooter.disabled = true;
                shooter2.disabled = true;
                shooter.secondStream = false;
                failText.draw(cxt);
                if (playerHealth.number <= 0) {
                    healthText.draw(cxt);
                    shooter.dead = true;
                } else {
                    wallText.draw(cxt);
                }
                handleEnemy();

                playAgainButton2.draw(cxt);
                mouseCollision(shooter.mouse, playAgainButton2, () => state = "MENU");  
                break;

            // MASSACRE ROUND HERE.
            case "SPECIAL":
                musicToggler();
                specialRound = true;
                if (!showSpecialText) {
                    specialText.draw(cxt);
                    setTimeout(() => {
                        showSpecialText = true;
                    }, 1000);
                } else { 
                    specialText2.draw(cxt);
                    setTimeout(() => {
                        if (score >= winningScore) {
                            cremate();
                        }
                        state = "RUNNING";
                    }, 1000);
                }
                break;

            // where did I want to put this state again? After massacre
            case "NATURAL":
                musicToggler();
                specialRound = false;
                if (!showNatText) {
                    naturalText.draw(cxt);
                    setTimeout(() => {
                        showNatText = true;
                    }, 2000);
                }
                else {
                    goodText.draw(cxt);
                    soonText.draw(cxt);
                    setTimeout(() => {
                        // state = "RUNNING";
                        if (score >= winningScore) {
                            cremate();
                        }
                        state = "RUNNING";
                    }, 3000);
                };
                break;

            // AIDTEXT IS CONFLICTING WITH ROUNDTEXT
            case "RELIEF":
                musicToggler();
                secondShooter = true;
                shooter2.duckable = false;
                shooter2.initSecond = true;
                if (!showAidText) {
                    aidText.draw(cxt);
                    setTimeout(() => {
                        shooter.secondStream = true;
                        showAidText = true;
                    }, 2000);
                } else {
                    nextText.draw(cxt);
                    setTimeout(() => {
                        state = "RUNNING";
                        if (score >= winningScore) {
                            cremate();
                            shooter2.duckable = true;
                        }
                    }, 1000);
                };
                break;

            case "END":
                musicToggler();
                shooter.disabled = true;
        
                if (!showNextText) {
                    // YOU WIN 
                    endText.draw(cxt);
                    endText2.draw(cxt);
                    setTimeout(() => {
                        showNextText = true;
                    }, 4000);
                } else {
                    endText3.draw(cxt);
                    endText4.draw(cxt);
                    playAgainButton.draw(cxt);
                    credButton.draw(cxt);
                    mouseCollision(shooter.mouse, playAgainButton, () => {
                        greatReset();
                        state = "INTRO";
                    });
                    mouseCollision(shooter.mouse, credButton, () => state = "CREDITS");
                }
                break;

            case "GIVEUP":
                musicToggler();
                shooter.disabled = true;
                shooter2.disabled = true;
                giveupText.draw(cxt);
                playAgainButton.draw(cxt);
                mouseCollision(shooter.mouse, playAgainButton, () => state = "MENU");
                break;

            case "CREDITS":
                musicToggler();
                shooter.disabled = true;
                shooter2.disabled = true;
                credText.draw(cxt);
                playAgainButton.draw(cxt);
                mouseCollision(shooter.mouse, playAgainButton, () => state = "MENU");
                break;
        }
    }

    // increment stuff to make next round slightly harder:
    function cremate() {
        // really hope this fixes civy glitch
        if (enemiesLeft <= 0 || enemiesLeft > 10) {
            enemySpeed--;
            currentRound++;
            // currentSpeed += 0.4;
            currentSpeed += 1;
            roundCounts.splice(0, 1);
            enemyCount = enemiesLeft = roundCounts[0];
            winningScore += enemyCount * 10;
            resetBaddies();
        }
    }

    // NEED AN ALT TO NADEQUEUE
    // TODO: GET THIS FUCKING SHIT RUNNING LIKE HOW IT DID EARLIER  --DONE
    function handleShooter() {
        shooter.draw(cxt2);
        // shooter2.image = shooter.image;
        shooter2.weapon = shooter.weapon;
        if (secondShooter) shooter2.draw(cxt2);

        if ((state != "MENU" || state != "LOSE")) {
            shooter.update(cxt2, deltaGlobal);
            if (secondShooter) {
                shooter2.update(cxt2, deltaGlobal);
            }
        }

        // GRENADE FUNCTIONALITY:
        if (shooter.throwBoom && grenades.number > 0 && state != "MENU" && !shooter.disabled) {
            if (nadeQueue.length < 1) {
                shooter.secondNade = false;
            } else {
                shooter.secondNade = true;
            }

            // THIS IS NECESSARY:
            // BLOOP AND BOOM ARE EXTREMELY LOUD:
            if (shooter.secondNade == false) {
                nadeQueue.push(new Grenade(canvas.width / 2, shooter, canvas, images));
            } else {
                nadeQueue.push(new Grenade(canvas.width / 1.2, shooter, canvas, images));
            }
            shooter.throwBoom = false;
            grenades.number--;
        }
    }

    // only one or two nades should be in the queue at any given time:
    // when nade is thrown, there is 1 second fuse. Before that Sec. is up, the x for next nade will change

    // GLITCH: if enemy  was present at time of throw, it gets deleted later on.
    // maximum "size" is 101

    // maybe I can make this accept an array arg (one array for tuts, other for enemyQueue)
    function handleNade(arr) {
        for (let i = 0; i < nadeQueue.length; i++) {
            let current = nadeQueue[i];

            if (current.dudY > 0) {
                current.drawDud(cxt);
                current.updateDud(deltaGlobal);
            }

            if (!current.bloopPlayed && !current.bloop.playing()) {
                current.bloop.volume = 0.5;
                current.bloop.play();
                current.bloopPlayed = false;
            }

            setTimeout(() => {
                current.ready = true;
            }, 500);

            // current.ready = true;
            if (current.ready) {
                current.draw(cxt);
                current.update(elapsedTime);

                // why is this used? with playSound it doesn't work.
                // No, this does NOT use howler, just the raw sound:
                // current.sound.play();
                if (!current.sound.playing()) {
                    current.sound.volume = 0.5;
                    current.sound.play();
                }

                if (current.size <= 100) {
                    current.size += 4;
                }
                else {
                    nadeQueue.splice(i, 1);
                    i--;
                } 
            }

            // FIGURED OUT WHY IT WAS WORKING YESTERDAY: BECAUSE IT WAS RUNNING SLOW LOOOL  
            // REMEMBER TO UNCOMMENT:
            for (let y = 0; y <= arr.length; y++) { 
                let currOrc = arr[y];
                if (arr.length > 0 && currOrc) {
                    if (nadeCollision(current, currOrc) && current.ready == true) {    
                        currOrc.dead = true;
                    } 
                    // else currOrc.inNadeRange = false;
                }
            }
        }
    };

    // where this used?
    function handleEnemyProjectiles(orc) {
        // this NEVER exceeds more than one object.
        let projes = orc.projectiles;

        for (let i = 0; i < projes.length; i++) {
            let current = projes[i];

            if (current.x > orc.x - 50) orc.animation = true;
            else orc.animation = false;
            
            // what's bulletLimit? either the player or 0.
            if (current.x > orc.bulletLimit) {
            // if (current.x > 150) {
                current.update(deltaGlobal);
                current.draw(cxt);
            }
            else {
                projes.splice(i, 1);
                i--;

                // UNCOMMENT THIS:
                if ((!shooter.duck) || (["air", "bomber", "crawl"].includes(orc.type))) playerHealth.number--;
            }
        }
    }

    // Idea: make shooter completely immune when ducking? nope
    // PASS IN ENEMY/TUT QUEUE
    function handleProjectile(arr) {
        let projectiles = shooter.projectiles;

        for (let i = 0; i < shooter.projectiles.length; i++) {
            let current = projectiles[i];

            // HERE'S THE CULPRIT:
            // if (shooter.angle == "down" || shooter.angle == "down-back") current.y = 203;
            // else current.y = 195;

            // BUG HERE:
            // increase size of flammen "bullets"
            if (projectiles.length > 0 && current) {

                if (shooter.weapon == "flammen" && current.size <= 20) {
                    current.size += 2;
                }
        
                // TO REVERT LATER ON:
                if (current.x < canvas.width - 100 && (state == "RUNNING" || state == "WIN" 
                || state == "QUIET" || state == "TUTORIAL" || state == "MENU")) {
                    
                    current.update(deltaGlobal);
                    current.draw(bullet_cxt);
                    // current.draw(cxt2);
                    // current.draw(cxt);
                }
                else {
                    projectiles.splice(i, 1);
                    i--;
                }
            }

            // enemy kill handling:
            for (let j = 0; j < arr.length; j++) {
                let currentEnemy = arr[j];
                /* remove bullet and enemy if they contact eachother. Also make enemy 
                drop pickup if applicable: */ 

                if (currentEnemy.isCivie && currentEnemy.type == "crawl" 
                && (currentEnemy.x > current.x - 30 && currentEnemy.x < current.x + 30 && 
                    current.y >= currentEnemy.y)) playSound2(sfx.yelp);

                if (arr[j] && projectiles[i] && collision(projectiles[i], arr[j])) {

                    projectiles.splice(i, 1);
                    i--;

                    // FIX BOMBER HEALTH CRAP:
                    if (((shooter.angle == "down" || shooter.angle == "down-back" || currentEnemy.type == "bomber"
                    || currentEnemy.type == "sheep") && shooter.weapon != "flammen")) {
                        currentEnemy.health -= 1;
                    } else currentEnemy.health -= 2;    

                    if (currentEnemy.health <= 0) {
                        score += 10;
                        // scoreText.text = score;

                        if (currentEnemy.pickup && currentRound >= 3) {
                            snackQueue.push(new Pickup(currentEnemy.x, flora.y - 150, currentRound, images));
                        }

                        // what is position again? initially 0. Changes to respective number once in position (1-6)
                        // the keys of baddiePositions are those position numbers.
                        if (Object.keys(baddiePositions).includes(currentEnemy.position)) {
                            baddiePositions[currentEnemy.position]["inPos"] = false;
                        }
        
                        // here is how the enemies get deleted:
                        arr.splice(j, 1);
                        j--;
                        if (enemiesLeft > 0) enemiesLeft--;
                    }
                }
            }

            // PICKUP HANDLING CRAP:
            for (let l = 0; l < snackQueue.length; l++) {
                let snack = snackQueue[l];
                if (currentRound >= 5) snack.flammenReady == true;
                if (snack && projectiles[i] && collision(projectiles[i], snack)) {
                    snack.sound.play();
                    projectiles.splice(i, 1);
                    i--;

                    if (snack.type == "health" && playerHealth.number < 5) {
                        playerHealth.number++;
                    }
                    else if (snack.type == "wall" && wallHealth.number < 5) {
                        wallHealth.number++;
                    }
                    else if (snack.type == "grenade" && grenades.number < 6) {
                        grenades.number++;
                    }

                    // what's this? pick up weapon if current one is not flammen.
                    if (shooter.weapon != "flammen") {
                        if (snack.type == "ar") {
                            shooter.weapon = "ar";

                            // AUTOMATIC FIRERATE
                            shooter.fireRate = 8;
                            // if (slowAssMonitor) {
                            //     shooter.fireRate = 8;
                            // } else shooter.fireRate = 15;  

                            shooter.specialAmmo = 50;

                            // shooter.fireRate = 15;
                            // shooter.specialAmmo = 50;
                        } 
                        else if (snack.type == "flammen") {
                            shooter.weapon = "flammen";
                            if (slowAssMonitor) {
                                shooter.fireRate = 3;
                            } else shooter.fireRate = 10;  

                            // shooter.fireRate = 10;
                            shooter.specialAmmo = 45;
                        }
                    } 
                    else if (shooter.weapon == "flammen" && snack.type == "flammen") {
                        shooter.weapon = "flammen";

                        if (slowAssMonitor) {
                            shooter.fireRate = 3;
                        } else shooter.fireRate = 10;  

                        // shooter.fireRate = 10;
                        shooter.specialAmmo = 45;
                    }
                    snackQueue.splice(l, 1);
                    l--;
                }
            }
            // projectiles despawn logic. Takes into account all types:
            if (projectiles[i]) {
                // delete when leaving canvas (for small arms)
                if (
                (projectiles[i].x > canvas.width - 100 || projectiles[i].x < 0 || projectiles[i].y < 0
                && shooter.weapon != "launcher")
                // deletion for flammen
                || (shooter.weapon == "flammen" && (projectiles[i].x > canvas.width - 350 
                || projectiles[i].x < 0 || projectiles[i].y < 0))) {
                    projectiles.splice(i, 1);
                    i--;
                }
            }
        }
    }

    // SNACK HANDLING (just makes them drop to the floor)
    function handleSnack() {
        for (let i = 0; i < snackQueue.length; i++) {
            let snack = snackQueue[i];
            snack.draw(cxt);

            // drop until it touches the floor
            if (snack.y + snack.height < flora.y) {
                snack.update();
            }
        }
    }

    // handleEnemy is used in MANY areas, so deltaTime must be global.
    function handleEnemy() {
        for (let i = 0; i < enemyQueue.length; i++) {
            let current = enemyQueue[i];

            if (currentRound == 0) current.type = "bomber";

            if (!shooter.duck) current.bulletLimit = shooter.x + shooter.width;
            else {
                // WHEN DUCKING:
                if (current.type == "ground" || current.type == "crawl") current.bulletLimit = 0
                else if (current.type == "air") current.bulletLimit = shooter.x + shooter.width / 2;
            }

            // HERE'S HOW WE DISCRIMINATE CIVIES:
            if (current.speed < 0) current.isCivie = true;

            // ALL enemies given civie status on specialRound
            if (specialRound) current.isCivie = true;

            if (state != "LOSE") handleEnemyProjectiles(current);

            // DETERMINE ENEMY Y AXIS BASED ON THEIR TYPE
            if (current.type == "ground" || current.type == "crawl" || current.type == "sheep") {
                current.y = flora.y - current.height;
                current.angle = "back";
                if (current.type == "sheep" && current.duck == true) current.angle = "down-back";
            } else if (current.type == "air") {
                current.y = flora.y - 150;
                current.angle = "down-diagnal";
            } else {
                // BOMBER:
                current.y = flora.y - 190;
                current.angle = "straight-down";
            }

            // FIX THIS CRAP --DONE. Takes into account both regular and special rounds:
            // delete enemies if they are off-canvas:
            if ((current.x + current.width >= 0) && (current.x <= canvas.width + 50)) {
            // REVISION: don't force player to kill civilians
                current.draw(cxt);
                current.update(elapsedTime, deltaGlobal); 
            } else {
                current.dead = true;
                // UNCOMMENT:
                if (!current.isCivie) wallHealth.number--;
            }

            if (current.dead) {
                enemyQueue.splice(i, 1);
                score += 10;
                if (enemiesLeft > 0) enemiesLeft--;
            }

            // this.angle = "back";
            if (current.type == "sheep" && current.inPosition == true && shooter.duck) {
                current.duck = true;
                current.angle = "down-back"
            } else {
                current.duck = false;
                current.angle = "back";
            }

            if (current.type == "bomber" && current.inPosition == true) {
                current.renderBeam(cxt);
                if (!current.dead && current.timer >= current.openFire && currentRound > 1) {
                    playSound(sfx.rayBeam);
                }
                // else sfx.rayBeam.stop();
            };

            // FIX THIS CRAP ASAP:  --DONE
            // FIX THIS STUPID GLITCH   --DONE
            for (let i = 1; i <= Object.keys(baddiePositions).length; i++) {   
                // this is the distance applicable to enemy (50, 150, 250, 180 (aerial))
                let trueDistance = shooter.x + shooter.width + baddiePositions[i.toString()]["distance"];
                if (!baddiePositions[i.toString()]["inPos"] &&
                    // what was my thought process behind this? If orc is within "true" distance, set "inPos" to true
                    (current.x <= trueDistance && current.x >= trueDistance - 10) && 
                    // (current.x <= trueDistance &&
                    // current.x > trueDistance - shooter.width)  &&
                    current.type == baddiePositions[i.toString()]["type"] && 
                    !specialRound &&
                    current.speed > 0) {
                        // enemy stops moving at shooting (enemy class logic)
                        current.shooting = true; 
                        baddiePositions[i.toString()]["inPos"] = true;
                        current.position = i.toString();
                        current.inPosition = true;
                }

                if (current.type == "crawl" && current.shooting) {
                    if (!current.growl.playing()) {
                        current.growl.play();
                    }
                }
            }
        }
    }

    let nextSpawnTime = 0; // time to spawn the next enemy

    // BOTH INSTANCES OF pushEnemy used in handleState.
    function pushEnemy(elapsedTime) {

        if (elapsedTime >= nextSpawnTime) {

            nextSpawnTime = elapsedTime + randomIntervals[Math.floor(Math.random() * randomIntervals.length)];

            if (specialRound == true && enemiesLeft <= 3) {
                specialRound = false;
                endSpecRound = true;
            }
            
            if (enemyCount > 0) {   
                if (!specialRound) {
                    // DO NOT REVERT. NEED TO MAKE WAY FOR DIFFERENT SPEEDS:
                    // NORMAL ENEMY SPAWNS:
                    // currentSpeed is ACTUAL SPEED. EnemySpeed is for the frames:
                    enemyQueue.push(new Enemy(canvas.width, currentSpeed, currentRound, enemySpeed, images));
                    enemyCount--;  

                    // SPAWN CIVIES IN LATTER PART OF FINAL ROUND:
                    if (finalRound && enemyCount % 3 == 0 && (enemyCount < 20 && enemyCount > 10)) {
                        enemyQueue.push(new Enemy(-42, -currentSpeed, currentRound, enemySpeed, images));
                        enemyCount--; 
                    }
                }  
                else {
                    // CIVIES SPAWNED HERE IN SPECIAL ROUND:
                    // DOESN'T ACTUALLY SPAWN CIVIES. Just normal enemies at coord -50 lol:
                    // REMEMBER: enemyCount only refers to num. of enemies to push to array :)
                    if (!endSpecRound) {
                        enemyQueue.push(new Enemy(-42, -currentSpeed, currentRound, enemySpeed, images));
                        enemyCount--; 
                    }
                }
            } 

            else if (enemiesLeft <= 0) {
                specialRound = false;
                state = "WIN";
            }

            // attempt to stop win breaks from not showing up (that is, from being skipped):
            // else if ([1, 2, 3].includes(currentRound) && enemiesLeft <= 0) state = "WIN";
        };
    }



    function nadeCollision(nade, orc) {
        if (
            // FRONT:
            nade.y + nade.size >= orc.y && 
            nade.x + nade.size >= orc.x && 
            // BACK:
            // YES, THIS IS CORRECT:
            nade.x - nade.size <= orc.x + orc.width
            
        ) {
            return true;
        }
    }

    // collission successful.
    function collision(bullet, orc) {
        if (
            // BACKWARDS SHOOTING:
            //  for forward ground and air (ensure bullet is inbetween x and width)
            (bullet.x + bullet.size >= orc.x && bullet.x <= orc.x + orc.width &&
            bullet.y + bullet.size >= orc.y && bullet.y <= orc.y + orc.height) 
            // GRENADE SHIT:
            //  && bullet.x - bullet.size >= orc.x && bullet.x - bullet.size <= orc.x + orc.width)
            || (bullet.x <= orc.x + orc.width && 
                bullet.x >= orc.x &&
                bullet.y > orc.y && 
                bullet.y < orc.y + orc.width &&
                (bullet.y < orc.y + orc.height))
            //  BULLET ON BULLET CONTACT:
            // || (bullet.x + bullet.size >= orc.x && bullet.y <= orc.y + orc.size && 
            //     bullet.y + bullet.size >= orc.y)
        ) {
            return true;
        }
        //else return false;
    }

    // used to determine if the mouse is inside a given button. (mouse, button, state)
    function mouseCollision(first, second, callback) {
        if (
        first.x >= second.x &&
        first.x <= second.x + second.width &&
        first.y >= second.y &&
        first.y <= second.y + second.height
        ) {
            second.stroke = "red";
            if (first.clicked) {
                callback();
            }
        } else {
            second.stroke = "black";
        }
    }

    // FUNCTION TO GET ALL OUR OBJECTS UP AND RUNNING
    let lastTime = 0;
    let elapsedTime = 0; // TOTAL elapsed time in SUPER precise seconds (since starting game)
    let deltaGlobal = 0;    // yes, identical to deltaTime.

    let slowAssMonitor = false;

    // what's difference between elapsedTime and timestamp?
    // timestamp is just elapsedTime but in MILLISECONDS.
    // remember: deltaTime is the time difference between each frame and the one before it.
    function animate(timestamp) {

        if (!lastTime) lastTime = timestamp; // delta time is the difference in time from current frame to last one.

        let deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
        deltaGlobal = deltaTime;
        lastTime = timestamp;

        elapsedTime += deltaTime;

        // normalize deltaTime across all monitors (at expensive of objects moving slower)
        // if (slowAssMonitor) 
        if (deltaTime > 0.01) {
            // deltaTime = deltaTime - 0.01;
            deltaTime = deltaGlobal = deltaTime - 0.0084; 
        }


        bullet_cxt.clearRect(0, 0, bullet_canvas.width, bullet_canvas.height);

        // what's this canvas have? for enemies and text
        cxt.clearRect(0, 0, canvas.width, canvas.height);

        // was this? ui, shooter, pickups
        cxt2.clearRect(0, 0, canvas2.width, canvas2.height);

        // what's handleShooter? shit relating to nades and states. No input handling.
        handleShooter();                // USES IMAGES
        handleSnack();                  // USES IMAGES
        handleState(elapsedTime);       
        handleStatus();
        handleProjectile(enemyQueue);
        handleNade(enemyQueue);         // USES IMAGES

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);  // yes, everyone else seems to use this twice.

    };  // remember: this is for the window.onload at the very top of file.
}

// How is initializeGame running when it's not even called?
// CALLED IN WINDOW.ONLOAD()!