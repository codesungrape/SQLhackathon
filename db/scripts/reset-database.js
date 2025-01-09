// import
import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // DROP EXISTING table if they exists
    // try catch
    // await poo.pery with the SQL code
    await pool.query(`
      DROP TABLE IF EXISTS movies CASCADE;
      DROP TABLE IF EXISTS reviews CASCADE;
    `);
    console.log("Existing tables dropped");
    
    // Create the movies table
    await pool.query(`
      CREATE TABLE movies (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        movie_name VARCHAR(255),
        release_date DATE,
        box_office_gross NUMERIC,
        lead_actor VARCHAR(255),
        director VARCHAR(255)
      );
    `);
    console.log("movies table created");

    // populate reviews table
    await pool.query(`
      CREATE TABLE Reviews (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        Name VARCHAR(255),
        Score VARCHAR(10),
        Review VARCHAR(255),
        movies_id INT REFERENCES movies(id)
      );
    `);
    console.log("reviews table created");

    //populate movies table
    await pool.query(`
    INSERT INTO movies (movie_name, release_date, box_office_gross, lead_actor, director) VALUES
      ('Amores Perros', '2000-05-19', 20940000, 'Gael García Bernal', 'Alejandro González Iñárritu'),
      ('Birdman', '2014-10-17', 103215094, 'Michael Keaton', 'Alejandro González Iñárritu'),
      ('Little Miss Sunshine', '2006-07-26', 100521607, 'Abigail Breslin', 'Jonathan Dayton, Valerie Faris'),
      ('Match Point', '2005-10-26', 85300000, 'Jonathan Rhys Meyers', 'Woody Allen'),
      ('My Best Friend’s Wedding', '1997-06-20', 299300000, 'Julia Roberts', 'P.J. Hogan'),
      ('The Favourite', '2018-11-23', 95900000, 'Olivia Colman', 'Yorgos Lanthimos'),
      ('Poor Things', '2023-09-08', 45000000, 'Emma Stone', 'Yorgos Lanthimos'),
      ('The Inbetweeners Movie', '2011-08-17', 88300000, 'Simon Bird', 'Ben Palmer'),
      ('Heaven Knows What', '2014-08-29', 70000, 'Arielle Holmes', 'Josh Safdie, Benny Safdie'),
      ('The Thing', '1982-06-25', 19629760, 'Kurt Russell', 'John Carpenter'),
      ('Nosferatu', '1922-03-04', NULL, 'Max Schreck', 'F.W. Murnau');
    `);

    await pool.query(`
      INSERT INTO Reviews (Name, Score, Review, movies_id) VALUES
        ('Amores Perros', '92%', 'A gripping triptych that explores the complexities of human relationships through interconnected stories.', 1),
        ('Birdman', '91%', 'A darkly comedic and innovative exploration of an actors struggle with relevance and self-worth.', 2),
        ('Little Miss Sunshine', '91%', 'A heartwarming and quirky family road trip that balances humor with poignant life lessons.', 3),
        ('Match Point', '77%', 'A suspenseful drama delving into themes of luck, ambition, and moral ambiguity in high society.', 4),
        ('My Best Friend’s Wedding', '73%', 'A charming romantic comedy where love and friendship are tested in unexpected ways.', 5),
        ('The Favourite', '93%', 'A wickedly entertaining period piece with sharp wit and outstanding performances.', 6),
        ('Poor Things', '95%', 'A visually stunning and thought-provoking tale that challenges societal norms and expectations.', 7),
        ('The Inbetweeners Movie', '54%', 'A raunchy comedy that extends the TV series'' humor, appealing mainly to its established fanbase.', 8),
        ('Heaven Knows What', '84%', 'A raw and unflinching portrayal of addiction and survival on the streets of New York.', 9),
        ('The Thing', '83%', 'A masterclass in tension and practical effects, this horror film remains chilling decades after release.', 10),
        ('Gattaca', '81%', 'A thought-provoking sci-fi drama that questions the ethics of genetic engineering and destiny.', 11)
    `);

  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await pool.end();
  }
}

/* create reviews table

await pool.query(`
INSERT INTO Reviews (Name, Score, Review, movies_id) VALUES
('Amores Perros', '92%', 'A gripping triptych that explores the complexities of human relationships through interconnected stories.'),
('Birdman', '91%', 'A darkly comedic and innovative exploration of an actor''s struggle with relevance and self-worth.'),
('Little Miss Sunshine', '91%', 'A heartwarming and quirky family road trip that balances humor with poignant life lessons.'),
('Match Point', '77%', 'A suspenseful drama delving into themes of luck, ambition, and moral ambiguity in high society.'),
('My Best Friend’s Wedding', '73%', 'A charming romantic comedy where love and friendship are tested in unexpected ways.'),
('The Favourite', '93%', 'A wickedly entertaining period piece with sharp wit and outstanding performances.'),
('Poor Things', '95%', 'A visually stunning and thought-provoking tale that challenges societal norms and expectations.'),
('The Inbetweeners Movie', '54%', 'A raunchy comedy that extends the TV series'' humor, appealing mainly to its established fanbase.'),
('Heaven Knows What', '84%', 'A raw and unflinching portrayal of addiction and survival on the streets of New York.'),
('The Thing', '83%', 'A masterclass in tension and practical effects, this horror film remains chilling decades after release.'),
('Gattaca', '81%', 'A thought-provoking sci-fi drama that questions the ethics of genetic engineering and destiny.'),
('Watchmen (Director''s Cut)', '65%', 'A visually striking adaptation that delves deep into the complexities of masked vigilantes.'),
('Office Space', '80%', 'A satirical look at corporate drudgery that has become a cult classic for its relatable humor.'),
('Platoon', '87%', 'A harrowing and realistic depiction of the Vietnam War''s impact on soldiers'' morality and psyche.'),
('Waking Life', '80%', 'An animated philosophical journey that explores the nature of reality and dreams.'),
('Mulholland Drive', '83%', 'A surreal and enigmatic thriller that captivates with its dreamlike narrative and imagery.'),
('No Hard Feelings', '70%', 'A lighthearted comedy that delivers laughs while touching on themes of personal growth.'),
('The Game', '74%', 'A suspenseful thriller that keeps viewers guessing with its intricate plot twists.'),
('This Is The End', '83%', 'A self-aware comedy where celebrities play exaggerated versions of themselves during an apocalypse.'),
('Dune', '83%', 'A visually breathtaking adaptation that captures the epic scope of the source material.'),
('Apollo 11', '99%', 'A stunning documentary that offers an intimate look at the historic moon landing mission.'),
('Átame!', '75%', 'A dark romantic comedy that explores unconventional relationships with a provocative edge.'),
('Dune 2', 'N/A', 'Anticipated sequel expected to continue the epic saga with grandeur and depth.'),
('Primer', '72%', 'A complex and low-budget sci-fi film that challenges viewers with its intricate time-travel narrative.'),
('Hereditary', '89%', 'A chilling horror film that delves into family trauma and the supernatural with unsettling effectiveness.'),
('The Impossible', '81%', 'A harrowing and emotional recount of a family''s survival during the 2004 Indian Ocean tsunami.'),
('Apocalypse Now', '98%', 'An epic war film that explores the darkness of human nature amidst the chaos of Vietnam.'),
('American Fiction', 'N/A', 'A forthcoming film expected to offer a satirical take on cultural and societal themes.'),
('Enemy', '71%', 'A surreal psychological thriller that delves into identity and the subconscious.'),
('Amelie', '89%', 'A whimsical and charming tale of a young woman''s quest to spread happiness in Paris.'),
('Go', '91%', 'A fast-paced and energetic film that intertwines multiple stories over a wild night.'),
('Leave The World Behind', 'N/A', 'An upcoming drama anticipated to explore complex family dynamics amidst a crisis.'),
('The Vanishing', '100%', 'A chilling and methodical thriller that delves into the obsession of loss and the unknown.'),
('Orfeu Negro', '90%', 'A vibrant and tragic retelling of the Orpheus myth set against the backdrop of Rio''s Carnival.'),
('The Florida Project', '96%', 'A poignant and beautifully shot glimpse into childhood and poverty on the fringes of Disney World.'),
('The Equalizer 3', 'N/A', 'The latest installment in the action series, expected to deliver intense sequences and vigilante justice.'),
('Batman V Superman: Dawn of Justice', '29%', 'A visually dark superhero showdown that struggles with its convoluted plot and character motivations.'),
('Philadelphia', '81%', 'A groundbreaking legal drama addressing AIDS discrimination, bolstered by powerful performances.'),
('American Beauty', '87%', 'A darkly satirical exploration of suburban life and personal dissatisfaction in America.'),
('Funny Pages', '90%', 'A darkly comedic coming-of-age story that delves into the world of underground comics.'),
('Terminator 2: Judgment Day', '93%', 'A groundbreaking action sequel that combines thrilling effects with a compelling narrative.'),
('Training Day', '73%', 'A gritty crime thriller showcasing a morally ambiguous day in the life of two LAPD officers.'),
('Shiva Baby', '97%', 'A sharp and claustrophobic comedy that captures the anxiety of familial and societal expectations.'),
('Renfield', '58%', 'A horror-comedy that offers a fresh perspective on Dracula''s loyal servant, blending gore with humor.'),
('Vice', '65%', 'A satirical biopic that delves into the controversial life and influence of Dick Cheney.'),
('Hit Man', 'N/A', 'An anticipated action-comedy expected to deliver a blend of humor and thrilling sequences.'),
('The World''s End', '89%', 'A comedic sci-fi adventure that reunites old friends for an apocalyptic pub crawl.'),
('Dead Poets Society', '84%', 'An inspiring drama that encourages the pursuit of passion and individuality against societal norms.'),
('Aftersun', '96%', 'A tender and introspective drama exploring the complexities of memory and parent-child relationships.'),
('Dawn of the Planet of the Apes', '90%', 'A compelling sci-fi sequel that balances action with profound themes of leadership and coexistence.'),
('Bottoms', '92%', 'A hilarious and subversive high school comedy that flips traditional tropes on their heads.'),
('Green Book', '77%', 'A heartwarming yet controversial road trip film about friendship and racial understanding.'),
('Magic Mike', '79%', 'A surprisingly heartfelt look into the lives of male strippers and their struggles beyond the stage.'),
('The Killers of the Flower Moon', 'N/A', 'A highly anticipated Scorsese film expected to shed light on a chilling chapter in American history.'),
('Twister', '61%', 'A visually thrilling disaster movie that delivers action-packed tornado sequences.'),
('Crumb', '96%', 'A fascinating documentary about the eccentric life of underground cartoonist Robert Crumb.'),
('Inside Llewyn Davis', '92%', 'A melancholic and beautifully crafted portrait of a struggling folk musician.'),
('Smiley Face', '67%', 'A quirky and absurd stoner comedy full of charm and randomness.'),
('The Gift', '91%', 'A taut psychological thriller that unravels secrets with a sinister edge.'),
('Drugstore Cowboy', '91%', 'A gritty and moving exploration of addiction and its consequences.'),
('A.I. Artificial Intelligence', '74%', 'A visually stunning sci-fi drama that tackles profound existential themes.'),
('Kinds of Kindness', 'N/A', 'A forthcoming film expected to explore themes of empathy and human connection.'),
('The Whale', '65%', 'A deeply emotional character study anchored by Brendan Fraser’s remarkable performance.'),
('Last Tango in Paris', '73%', 'A provocative and controversial exploration of intimacy and emotional pain.'),
('Manchester By The Sea', '96%', 'A heartbreaking and beautifully acted drama about grief and family.'),
('Side Effects', '81%', 'A gripping thriller that blurs the line between psychology and deception.'),
('The Day After Tomorrow', '45%', 'A visually ambitious disaster movie hampered by scientific implausibilities.'),
('Contagion', '85%', 'A chillingly realistic portrayal of a global pandemic and humanity’s response to it.'),
('Uncut Gems', '91%', 'A tense and electrifying character study of a compulsive gambler''s descent into chaos.'),
('Annihilation', '88%', 'A visually stunning and cerebral sci-fi exploration of self-destruction and transformation.'),
('I Saw The TV Glow', 'N/A', 'An upcoming horror film expected to blend unsettling visuals with existential themes.'),
('The Substance', 'N/A', 'An anticipated film exploring the boundaries of human consciousness and scientific discovery.'),
('Dawn of the Dead', '93%', 'A masterful zombie thriller that combines horror with sharp social commentary.'),
('The VVitch', '90%', 'A slow-burn horror masterpiece steeped in folklore and unsettling atmosphere.'),
('Midsommar', '83%', 'A beautifully shot and unsettling folk horror film exploring grief and cult rituals.'),
('Woman of the Hour', 'N/A', 'An anticipated biographical drama that delves into true crime and societal issues.'),
('Million Dollar Baby', '90%', 'A powerful and emotional sports drama about ambition, perseverance, and sacrifice.'),
('Talk To Me', '94%', 'A chilling and innovative horror film that explores grief and the supernatural.'),
('Tár', '91%', 'A haunting character study of power, music, and moral reckoning.'),
('Total Recall', '82%', 'A sci-fi classic blending mind-bending twists with intense action sequences.'),
('Anatomy of a Fall', '97%', 'A gripping and thought-provoking courtroom drama exploring truth and moral ambiguity.'),
('Trainspotting', '90%', 'A raw and energetic depiction of addiction, friendship, and self-destruction in Edinburgh.'),
('Election', '92%', 'A sharp and darkly comedic satire of high school politics and ambition.'),
('Kindergarten Teacher', '90%', 'A compelling and unsettling drama about the boundaries of passion and obsession.'),
('Trap', 'N/A', 'A highly anticipated mystery thriller expected to captivate audiences.'),
('Get Out', '98%', 'A brilliantly crafted and socially relevant horror film that redefines the genre.'),
('Titanic', '88%', 'A visually stunning and emotionally resonant epic about love and tragedy.'),
('Birdbox', '64%', 'A suspenseful apocalyptic thriller that captivates with its concept but divides with its execution.'),
('My Old Ass', 'N/A', 'A forthcoming comedy expected to bring laughs with its unconventional premise.'),
('Before The Devil Knows You’re Dead', '88%', 'A tense and tragic thriller about family and desperation.'),
('American Animals', '88%', 'A fascinating heist film blending narrative and documentary styles.'),
('Babel', '69%', 'A globally interconnected drama exploring the effects of miscommunication.'),
('Kiki’s Delivery Service', '98%', 'A heartwarming and charming tale of a young witch finding her way in the world.'),
('Grave of the Fireflies', '100%', 'A heartbreaking and beautifully animated story of survival during wartime.'),
('My Neighbor Totoro', '93%', 'A whimsical and magical exploration of childhood wonder and nature.'),
('Ricky Stanicky', 'N/A', 'An upcoming comedy anticipated to deliver outrageous laughs.'),
('The Last Picture Show', '100%', 'A poignant coming-of-age drama set in a fading Texas town.'),
('6 Below', '38%', 'An inspiring but uneven survival drama based on a true story.'),
('Happy-Go-Lucky', '93%', 'A vibrant and uplifting story about finding joy in everyday life.'),
('The People vs. Larry Flynt', '88%', 'A provocative drama about free speech and controversy.'),
('Collateral', '86%', 'A taut and stylish thriller about a hitman and his reluctant taxi driver.'),
('Bridget Jones’ Diary', '80%', 'A charming romantic comedy about self-discovery and love.'),
('Bridget Jones 2', '69%', 'A fun but less impactful sequel continuing Bridget''s romantic misadventures.'),
('Bridget Jones’ Baby', '78%', 'A delightful and heartfelt return to the beloved character.'),
('You’ve Got Mail', '69%', 'A sweet and nostalgic romantic comedy about finding love in the digital age.'),
('Molly’s Game', '82%', 'A gripping drama about high-stakes poker and personal ambition.'),
('A Simple Plan', '90%', 'A tense thriller about greed and its consequences.'),
('The Family Stone', '53%', 'A heartfelt but messy family dramedy about holiday tensions.'),
('Beavis & Butthead Movie', '72%', 'A hilariously absurd adventure with the iconic duo.'),
('Grease', '75%', 'A timeless musical about teenage love and rebellion.'),
('Society of the Snow', 'N/A', 'A gripping survival drama about the 1972 Andes plane crash.'),
('Just Friends', '43%', 'A light and goofy romantic comedy with moments of charm.'),
('Marnie', '83%', 'A psychological Hitchcock thriller exploring trauma and trust.'),
('Mad Max', '90%', 'A high-octane, post-apocalyptic action classic with unforgettable visuals.'),
('Office Christmas Party', '41%', 'A chaotic and raunchy holiday comedy that delivers scattered laughs.'),
('The Secret Garden', '85%', 'A charming adaptation of a classic tale about growth and discovery.'),
('The Notebook', '53%', 'A tear-jerking romantic drama about enduring love and memory.'),
('Forrest Gump', '71%', 'A sweeping and emotional journey through a simple man’s extraordinary life.'),
('Genie', 'N/A', 'An upcoming fantasy adventure anticipated to captivate audiences.'),
('The Crash Reel', '96%', 'An inspiring and emotional documentary about the resilience of an injured snowboarder.'),
('Tell Them You Love Me', 'N/A', 'An upcoming drama expected to explore themes of connection and redemption.'),
('Starlet', '88%', 'A touching indie drama about an unlikely friendship across generations.'),
('Game Night', '85%', 'A smart and hilarious comedy about a game night gone wrong.'),
('Y Tu Mamá También', '92%', 'A provocative and tender coming-of-age road trip story.'),
('Nosferatu', '97%', 'A chilling and atmospheric silent horror masterpiece.');
`);
*/

const wer = await resetDatabase();
