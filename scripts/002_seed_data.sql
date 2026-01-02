-- Seed racetrack data with major racing venues in India
insert into public.racetracks (name, city, state, latitude, longitude, description, total_deaths, status) values
  ('Royal Calcutta Turf Club', 'Kolkata', 'West Bengal', 22.5448, 88.3426, 'One of the oldest racing venues in India, established in 1847', 47, 'active'),
  ('Mahalaxmi Racecourse', 'Mumbai', 'Maharashtra', 18.9771, 72.8146, 'Premier racing venue in Mumbai with a colonial heritage', 89, 'active'),
  ('Bangalore Turf Club', 'Bengaluru', 'Karnataka', 13.0097, 77.5970, 'Major racing venue in Southern India', 62, 'active'),
  ('Madras Race Club', 'Chennai', 'Tamil Nadu', 13.0569, 80.2497, 'Historic racing venue established in 1777', 54, 'active'),
  ('Hyderabad Race Club', 'Hyderabad', 'Telangana', 17.4401, 78.3489, 'Primary racing venue in Telangana', 38, 'active'),
  ('Pune Race Course', 'Pune', 'Maharashtra', 18.5362, 73.8893, 'Notable racing venue in Western India', 41, 'active');

-- Seed some horse memorial data
insert into public.horses (name, slug, image_url, date_of_birth, date_of_death, cause_of_death, story, racetrack_id) values
  (
    'Midnight Star',
    'midnight-star',
    '/placeholder.svg?height=400&width=600',
    '2018-03-15',
    '2023-11-22',
    'Catastrophic leg fracture during race',
    'Midnight Star was a spirited 5-year-old thoroughbred who showed immense promise. During a routine race at Mahalaxmi, she suffered a catastrophic leg fracture in the final stretch. Despite immediate veterinary intervention, the injury was too severe. Midnight Star''s death is a stark reminder of the inherent dangers horses face in racing.',
    (select id from public.racetracks where name = 'Mahalaxmi Racecourse' limit 1)
  ),
  (
    'Thunder Prince',
    'thunder-prince',
    '/placeholder.svg?height=400&width=600',
    '2017-07-08',
    '2023-09-14',
    'Cardiac arrest post-race',
    'Thunder Prince collapsed moments after finishing a grueling race in Bengaluru. Veterinary reports confirmed cardiac arrest brought on by extreme physical stress. He was only 6 years old. His trainer later admitted the horse had been pushed beyond safe limits.',
    (select id from public.racetracks where name = 'Bangalore Turf Club' limit 1)
  ),
  (
    'Golden Dawn',
    'golden-dawn',
    '/placeholder.svg?height=400&width=600',
    '2019-01-20',
    '2024-02-10',
    'Spinal injury from fall',
    'Golden Dawn was a gentle mare who never wanted to race. During a race in Chennai, she stumbled and fell, suffering a severe spinal injury. She was euthanized trackside. Witnesses reported she appeared distressed before the race even began.',
    (select id from public.racetracks where name = 'Madras Race Club' limit 1)
  ),
  (
    'Silver Dancer',
    'silver-dancer',
    '/placeholder.svg?height=400&width=600',
    '2016-05-12',
    '2023-07-19',
    'Heat exhaustion and dehydration',
    'Silver Dancer was forced to race in extreme heat at the Kolkata track. She collapsed from heat exhaustion and dehydration shortly after the race. Despite veterinary efforts, she died within hours. The race should never have been held in such conditions.',
    (select id from public.racetracks where name = 'Royal Calcutta Turf Club' limit 1)
  );

-- Seed blog posts
insert into public.blog_posts (title, slug, excerpt, content, image_url, published, published_at, author) values
  (
    'The Hidden Cost of Horse Racing: A Statistical Analysis',
    'hidden-cost-statistical-analysis',
    'A comprehensive look at horse racing injuries and fatalities in India over the past decade reveals disturbing trends.',
    'Over the past ten years, more than 400 horses have died on Indian racetracks. This number only accounts for documented deaths—the real figure is likely much higher. Our research shows that horses are dying at an average rate of one death every 9 days across major Indian racing venues.\n\nThe causes are varied but preventable: catastrophic leg injuries, cardiac events, heat exhaustion, and training accidents. Each death represents not just a statistic, but an individual horse with a unique personality and capacity for suffering.\n\nThe racing industry often frames these deaths as "accidents" or "unfortunate incidents." But when a pattern emerges over years, we must ask: at what point does an accident become systemic negligence?\n\nThis report presents data from RTI requests, veterinary records, and eyewitness accounts. The evidence is clear: horse racing in India is an industry built on animal suffering.',
    '/placeholder.svg?height=600&width=1200',
    true,
    '2024-01-15 10:00:00',
    'Erase Horseracing India Research Team'
  ),
  (
    'Victory for Animals: Legal Challenges to Racing in India',
    'legal-challenges-racing-india',
    'Recent legal developments offer hope for protecting horses from racing exploitation.',
    'In recent months, animal welfare advocates have filed multiple petitions challenging the legality of horse racing under the Prevention of Cruelty to Animals Act, 1960. These legal challenges argue that horse racing constitutes cruelty under Section 11 of the Act.\n\nThe petitions cite extensive evidence of injuries, deaths, and poor living conditions for racing horses. Legal experts argue that the "sport and entertainment" exemptions cannot justify systematic animal suffering.\n\nWhile racing authorities claim strict regulations protect horses, ground realities tell a different story. Investigations have revealed widespread use of whips, inadequate veterinary care, and horses racing while injured.\n\nThis legal strategy follows successful campaigns in other countries. In the United States, several states have banned or severely restricted horse racing following similar litigation.\n\nThe outcome of these cases could fundamentally change horse racing in India—or end it entirely.',
    '/placeholder.svg?height=600&width=1200',
    true,
    '2024-02-02 14:00:00',
    'Erase Horseracing India Legal Team'
  );
