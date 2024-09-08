// the text that makes up the story, surprisingly enough
//
//
//  story layout:
//
//     chapter 1:
//
//         "you are a reader": ReadPage is active, nothing else. after reading 5 pages
//          you unlock love char
//
//         "you meet people": LoveChar is now also active. loving 5 characters or reading 10 pages
//          will advance the story state
//
//         "cause and effect": Analyze plot is now active. Once the players inventory has 5 character loves
//          and 5 tropes, the story will advance

export var storytexts = [
    // this is the start
    `You are a reader. You always have been. You love stories and characters and worlds and action
     and romance and daring heists and dramatic betrayals and hot, sudden, ummmmm, kisses. You should
     read right now
    `,

    // we just unlocked love character 
    `You meet people in real life, you awkwardly get introduced, but you always feel like you're not as
     interesting as you should be, not as exciting, like the people you meet know that you're just not as
     cool as they are. This is ridiculous, of course. They're just as awkward and weird inside as you are,
     but you're too young to know that, so instead you turn to the imaginary people in your books, and them
     you learn to love deeply and wholly   
    `,

    // we just unlocked analyze plot 
    `Cause. Effect. If this, then that. The more you read, the more you start to see the consistent patterns
    from story to story. Boy meets girl. Girl meets boy. Girl falls in love with inexplicable cosmic horror and
    devours boy's soul. You start to see the classic arcs, but you don't have words to describe them. Yet.     
    `,
	
    // we just unlocked study character and discover plot
    `You start to imagine variations on the stories you read. You imagine yourself, not as someone special so
     much, more as someone like you who sommehow manages to meet one of the characters you've come to love. You
     can let hours pass this way, flipping pages while your brain fills in details of the world outside the edges
     of the pages. SOME JUSTIFICATION HERE FOR WHY YOU NEED TO READ X PAGES AND LOVE Y  CHARACTERS IN ORDER TO UNLOCK
     A PROGRESSION STEP CALLED "Get a journal"
    `,
	
	// we just unlocked buy journal
	`It soon dawns on you that you don't have to just read. Maybe you could write. Once the idea came it never left.
	Every daydream where you are the beautiful prince being rescued by a dashing princess in a battle corset makes you
	yearn to get a record of it; to pour the words out.`,

    // we just bought the journal. a write job unlocks. it produces pages to pay for more
	// 
    `You run your fingers slows along the cardboard cover of the notebook you bought. 60 pages, college ruled,
     endless possibility. THE WRITE JOB IS NOW ACTIVE AND PRODUCES $NUM PAGES
    `,

    `
    
    `,
    
     "You are a writer. You have a story to tell. You have a character to tell it with. You have a plot to tell it through. You have a world to tell it in. You have a job to pay the bills. You have a life to live. You have a story to tell. You are a writer.",

];

export var flavorQuotes = [
    "These words are all I have so I write them",


];